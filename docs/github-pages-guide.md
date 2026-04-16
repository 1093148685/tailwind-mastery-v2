# GitHub Pages 部署记录

## 遇到的问题

### 1. 资源路径 404 问题

**问题描述：**
部署到 `https://1093148685.github.io/tailwind-mastery-v2/` 后，JS 和 CSS 资源返回 404。

**原因：**
构建产物中的资源路径是绝对路径 `/assets/index-xxx.js`，但项目部署在子路径 `/tailwind-mastery-v2/` 下。

**错误请求：**
```
GET /assets/index-B92onrie.js  → 404
```

**正确请求：**
```
GET /tailwind-mastery-v2/assets/index-B92onrie.js  → 200
```

**解决方案：**
手动修改 `index.html` 中的资源路径：
```html
<!-- 原始 -->
<script type="module" crossorigin src="/assets/index-B92onrie.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-C9TOfxfy.css">

<!-- 修改后 -->
<script type="module" crossorigin src="/tailwind-mastery-v2/assets/index-B92onrie.js"></script>
<link rel="stylesheet" crossorigin href="/tailwind-mastery-v2/assets/index-C9TOfxfy.css">
```

---

## 创建 GitHub Pages 的步骤

### 方法一：使用 gh-pages 分支（推荐）

#### 1. 创建 dist 构建产物
```bash
pnpm build
```

#### 2. 创建 gh-pages 分支
```bash
git checkout -b gh-pages
```

#### 3. 清理源文件，只保留构建产物
```bash
# 删除所有源文件
git rm -rf .

# 或手动保留 dist 内容
mv dist/index.html .
mv dist/assets .
rm -rf dist
```

#### 4. 添加 .nojekyll 文件
```bash
touch .nojekyll
```
防止 GitHub Pages 使用 Jekyll 处理站点。

#### 5. 提交并推送
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages
```

#### 6. 配置 GitHub Pages
1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 `gh-pages` 分支
3. 点击 **Save**

#### 7. 访问
等待几分钟后访问：`https://用户名.github.io/仓库名/`

---

### 方法二：使用 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## GitHub Pages 路径说明

| 部署类型 | 访问地址格式 |
|---------|-------------|
| 用户/组织站点 | `https://用户名.github.io/` |
| 项目站点 | `https://用户名.github.io/仓库名/` |

## 注意事项

1. **子路径问题**：项目在子路径下时，需要修改资源路径或配置 base 路径。
2. **等待生效**：GitHub Pages 更新可能有几分钟延迟。
3. **自定义域名**：可在 Settings → Pages → Custom domain 中配置。
4. **HTTPS**：默认启用 HTTPS。
