/**
 * Tailwind CSS + ElementPlus 课程数据
 */

import { Module, Lesson } from '../types';

export const courseData: Module[] = [
  // ==================== ElementPlus 入门 ====================
  {
    id: 'elementplus',
    title: 'ElementPlus',
    description: 'ElementPlus 组件库学习',
    icon: '⚡',
    lessons: [
      {
        id: 'ep-intro',
        title: 'ElementPlus 简介',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# ElementPlus 简介\n\nElementPlus 是基于 Vue 3 的企业级组件库。\n\n## 特点\n\n- 基于 Vue 3 Composition API\n- TypeScript 支持\n- 国际化支持\n- 主题定制\n\n## 安装\n\n```bash\nnpm install element-plus\n```',
        initialCode: '<div id="app">\n  <el-button>默认按钮</el-button>\n  <el-button type="primary">主要按钮</el-button>\n  <el-button type="success">成功按钮</el-button>\n  <el-button type="warning">警告按钮</el-button>\n  <el-button type="danger">危险按钮</el-button>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">ElementPlus 按钮组件</h2>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">\n    <el-button>默认按钮</el-button>\n    <el-button type="primary">主要按钮</el-button>\n    <el-button type="success">成功按钮</el-button>\n    <el-button type="warning">警告按钮</el-button>\n    <el-button type="danger">危险按钮</el-button>\n    <el-button type="info">信息按钮</el-button>\n  </div>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">\n    <el-button plain>朴素按钮</el-button>\n    <el-button type="primary" plain>主要按钮</el-button>\n    <el-button type="success" plain>成功按钮</el-button>\n    <el-button type="warning" plain>警告按钮</el-button>\n    <el-button type="danger" plain>危险按钮</el-button>\n  </div>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap;">\n    <el-button round>圆角按钮</el-button>\n    <el-button type="primary" round>主要按钮</el-button>\n    <el-button size="large" type="primary">大按钮</el-button>\n    <el-button size="small" type="primary">小按钮</el-button>\n    <el-button disabled>禁用按钮</el-button>\n    <el-button type="primary" loading>加载中</el-button>\n  </div>\n</div>',
        hints: ['使用 el-button 组件', '使用 type 属性设置类型', '使用 plain 属性设置朴素风格', '使用 round 属性设置圆角']
      },
      {
        id: 'ep-input',
        title: '输入框组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 输入框组件\n\nel-input 是 ElementPlus 的输入框组件。\n\n## 基本用法\n\n```html\n<el-input v-model="value" placeholder="请输入内容" />\n```\n\n## 属性\n\n- v-model: 绑定值\n- placeholder: 占位符\n- disabled: 禁用状态\n- clearable: 可清除\n- show-password: 密码显示切换',
        initialCode: '<div id="app">\n  <el-input placeholder="请输入用户名" />\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">输入框组件</h2>\n  <el-form label-width="80px" style="max-width: 400px;">\n    <el-form-item label="用户名">\n      <el-input v-model="form.username" placeholder="请输入用户名" />\n    </el-form-item>\n    <el-form-item label="密码">\n      <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />\n    </el-form-item>\n    <el-form-item label="邮箱">\n      <el-input v-model="form.email" placeholder="请输入邮箱" clearable />\n    </el-form-item>\n    <el-form-item label="描述">\n      <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="请输入描述" />\n    </el-form-item>\n    <el-form-item label="禁用">\n      <el-input v-model="form.disabled" disabled placeholder="禁用状态" />\n    </el-form-item>\n    <el-form-item>\n      <el-button type="primary" @click="submit">提交</el-button>\n      <el-button>重置</el-button>\n    </el-form-item>\n  </el-form>\n</div>',
        hints: ['使用 el-input 组件', '使用 v-model 双向绑定', '使用 type="textarea" 多行文本', '使用 disabled 属性禁用']
      },
      {
        id: 'ep-form',
        title: '表单组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 表单组件\n\nel-form 是 ElementPlus 的表单组件。\n\n## 基本用法\n\n```html\n<el-form :model="form" :rules="rules" label-width="80px">\n  <el-form-item label="名称" prop="name">\n    <el-input v-model="form.name" />\n  </el-form-item>\n</el-form>\n```\n\n## 属性\n\n- model: 表单数据对象\n- rules: 表单验证规则\n- label-width: 标签宽度',
        initialCode: '<div id="app">\n  <el-form :model="form" label-width="80px">\n    <el-form-item label="名称">\n      <el-input v-model="form.name" />\n    </el-form-item>\n  </el-form>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">完整表单示例</h2>\n  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" style="max-width: 500px;">\n    <el-form-item label="用户名" prop="username">\n      <el-input v-model="form.username" placeholder="4-16位字符" />\n    </el-form-item>\n    <el-form-item label="邮箱" prop="email">\n      <el-input v-model="form.email" placeholder="请输入邮箱" />\n    </el-form-item>\n    <el-form-item label="密码" prop="password">\n      <el-input v-model="form.password" type="password" placeholder="6-20位字符" show-password />\n    </el-form-item>\n    <el-form-item label="确认密码" prop="confirmPassword">\n      <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" show-password />\n    </el-form-item>\n    <el-form-item label="性别">\n      <el-radio-group v-model="form.gender">\n        <el-radio label="male">男</el-radio>\n        <el-radio label="female">女</el-radio>\n      </el-radio-group>\n    </el-form-item>\n    <el-form-item label="爱好">\n      <el-checkbox-group v-model="form.hobby">\n        <el-checkbox label="reading">阅读</el-checkbox>\n        <el-checkbox label="music">音乐</el-checkbox>\n        <el-checkbox label="sports">运动</el-checkbox>\n        <el-checkbox label="coding">编程</el-checkbox>\n      </el-checkbox-group>\n    </el-form-item>\n    <el-form-item label="城市">\n      <el-select v-model="form.city" placeholder="请选择城市" style="width: 100%;">\n        <el-option label="北京" value="beijing" />\n        <el-option label="上海" value="shanghai" />\n        <el-option label="广州" value="guangzhou" />\n        <el-option label="深圳" value="shenzhen" />\n      </el-select>\n    </el-form-item>\n    <el-form-item label="简介">\n      <el-input v-model="form.bio" type="textarea" :rows="3" placeholder="请输入个人简介" />\n    </el-form-item>\n    <el-form-item>\n      <el-button type="primary" @click="submitForm">立即创建</el-button>\n      <el-button @click="resetForm">重置</el-button>\n    </el-form-item>\n  </el-form>\n</div>',
        hints: ['使用 el-form 组件', '使用 el-form-item 表单项', '使用 el-radio-group 单选组', '使用 el-checkbox-group 复选组', '使用 el-select 下拉选择']
      },
      {
        id: 'ep-dialog',
        title: '对话框组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 对话框组件\n\nel-dialog 是 ElementPlus 的对话框组件。\n\n## 基本用法\n\n```html\n<el-dialog v-model="visible" title="标题">\n  内容\n</el-dialog>\n```\n\n## 属性\n\n- v-model: 绑定显示状态\n- title: 对话框标题\n- width: 对话框宽度\n- close-on-click-modal: 点击遮罩关闭',
        initialCode: '<div id="app">\n  <el-button @click="visible = true">打开对话框</el-button>\n  <el-dialog v-model="visible" title="提示">\n    <p>这是一个对话框</p>\n  </el-dialog>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">对话框示例</h2>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap;">\n    <el-button type="primary" @click="dialogVisible = true">基本对话框</el-button>\n    <el-button type="success" @click="formVisible = true">表单对话框</el-button>\n    <el-button type="warning" @click="centerVisible = true">居中布局</el-button>\n    <el-button type="info" @click="nestVisible = true">嵌套对话框</el-button>\n  </div>\n\n  <el-dialog v-model="dialogVisible" title="提示" width="30%">\n    <span>这是一条消息</span>\n    <template #footer>\n      <el-button @click="dialogVisible = false">取消</el-button>\n      <el-button type="primary" @click="dialogVisible = false">确定</el-button>\n    </template>\n  </el-dialog>\n\n  <el-dialog v-model="formVisible" title="收货地址" width="50%">\n    <el-form :model="form" label-width="80px">\n      <el-form-item label="姓名">\n        <el-input v-model="form.name" />\n      </el-form-item>\n      <el-form-item label="地址">\n        <el-input v-model="form.address" />\n      </el-form-item>\n      <el-form-item label="电话">\n        <el-input v-model="form.phone" />\n      </el-form-item>\n    </el-form>\n    <template #footer>\n      <el-button @click false">取消</el-button>\n      <el-button="formVisible = type="primary" @click="formVisible = false">确定</el-button>\n    </template>\n  </el-dialog>\n\n  <el-dialog v-model="centerVisible" title="提示" width="30%" center>\n    <span>是否确定删除？</span>\n    <template #footer>\n      <el-button @click="centerVisible = false">取消</el-button>\n      <el-button type="primary" @click="centerVisible = false">确定</el-button>\n    </template>\n  </el-dialog>\n\n  <el-dialog v-model="nestVisible" title="外层对话框">\n    <el-button @click="innerVisible = true">打开内层对话框</el-button>\n    <el-dialog v-model="innerVisible" title="内层对话框" width="30%" append-to-body>\n      <span>这是内层对话框</span>\n    </el-dialog>\n  </el-dialog>\n</div>',
        hints: ['使用 el-dialog 组件', '使用 v-model 控制显示', '使用 title 属性设置标题', '使用 template #footer 自定义底部', '使用 append-to-body 嵌套']
      },
      {
        id: 'ep-table',
        title: '表格组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 表格组件\n\nel-table 是 ElementPlus 的表格组件。\n\n## 基本用法\n\n```html\n<el-table :data="tableData">\n  <el-table-column prop="name" label="姓名" />\n</el-table>\n```\n\n## 属性\n\n- data: 表格数据\n- stripe: 斑马纹\n- border: 边框\n- height: 固定表头',
        initialCode: '<div id="app">\n  <el-table :data="tableData">\n    <el-table-column prop="name" label="姓名" />\n  </el-table>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">表格示例</h2>\n  <el-table :data="tableData" stripe border style="width: 100%" max-height="400">\n    <el-table-column type="selection" width="55" />\n    <el-table-column prop="date" label="日期" width="120" />\n    <el-table-column prop="name" label="姓名" width="120" />\n    <el-table-column prop="address" label="地址" />\n    <el-table-column prop="status" label="状态" width="100">\n      <template #default="scope">\n        <el-tag :type="scope.row.status === \"成功\" ? \"success\" : \"warning\"">\n          {{ scope.row.status }}\n        </el-tag>\n      </template>\n    </el-table-column>\n    <el-table-column label="操作" width="180">\n      <template #default="scope">\n        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>\n        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>\n      </template>\n    </el-table-column>\n  </el-table>\n</div>',
        hints: ['使用 el-table 组件', '使用 el-table-column 列', '使用 stripe 斑马纹', '使用 border 边框', '使用 #default 自定义列内容']
      },
      {
        id: 'ep-message',
        title: '消息提示',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 消息提示\n\nElMessage 是 ElementPlus 的消息提示函数。\n\n## 基本用法\n\n```javascript\nimport { ElMessage } from \'element-plus\'\n\nElMessage.success(\'操作成功\')\n```\n\n## 方法\n\n- ElMessage.success()\n- ElMessage.warning()\n- ElMessage.error()\n- ElMessage.info()',
        initialCode: '<div id="app">\n  <el-button @click="showMessage">显示消息</el-button>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">消息提示示例</h2>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">\n    <el-button type="success" @click="success">成功</el-button>\n    <el-button type="warning" @click="warning">警告</el-button>\n    <el-button type="danger" @click="error">错误</el-button>\n    <el-button type="info" @click="info">信息</el-button>\n  </div>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap;">\n    <el-button @click="customDuration">自定义时长</el-button>\n    <el-button @click="withClose">可关闭</el-button>\n    <el-button @click="centerText">居中文字</el-button>\n    <el-button @click="htmlContent">HTML 内容</el-button>\n  </div>\n</div>',
        hints: ['使用 ElMessage.success 成功提示', '使用 duration 设置显示时长', '使用 showClose 显示关闭按钮', '使用 dangerouslyUseHTMLString 支持 HTML']
      },
      {
        id: 'ep-notification',
        title: '通知提醒',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 通知提醒\n\nElNotification 是 ElementPlus 的通知提醒函数。\n\n## 基本用法\n\n```javascript\nimport { ElNotification } from \'element-plus\'\n\nElNotification({\n  title: \'提示\',\n  message: \'内容\'\n})\n```\n\n## 属性\n\n- title: 标题\n- message: 内容\n- type: 类型\n- position: 位置',
        initialCode: '<div id="app">\n  <el-button @click="showNotify">显示通知</el-button>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">通知提醒示例</h2>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">\n    <el-button @click="basic">基本用法</el-button>\n    <el-button type="success" @click="successNotify">成功</el-button>\n    <el-button type="warning" @click="warningNotify">警告</el-button>\n    <el-button type="danger" @click="dangerNotify">错误</el-button>\n  </div>\n  <div style="display: flex; gap: 10px; flex-wrap: wrap;">\n    <el-button @click="topRight">右上角</el-button>\n    <el-button @click="topLeft">左上角</el-button>\n    <el-button @click="bottomRight">右下角</el-button>\n    <el-button @click="bottomLeft">左下角</el-button>\n  </div>\n</div>',
        hints: ['使用 ElNotification 函数', '使用 position 设置位置', '使用 type 设置类型', '使用 duration 设置时长']
      },
      {
        id: 'ep-select',
        title: '选择器组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 选择器组件\n\nel-select 是 ElementPlus 的选择器组件。\n\n## 基本用法\n\n```html\n<el-select v-model="value" placeholder="请选择">\n  <el-option label="选项1" value="1" />\n</el-select>\n```',
        initialCode: '<div id="app">\n  <el-select v-model="value" placeholder="请选择">\n    <el-option label="选项一" value="1" />\n    <el-option label="选项二" value="2" />\n    <el-option label="选项三" value="3" />\n  </el-select>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">选择器示例</h2>\n  <el-form label-width="80px" style="max-width: 400px;">\n    <el-form-item label="城市">\n      <el-select v-model="form.city" placeholder="请选择城市" style="width: 100%;">\n        <el-option label="北京" value="beijing" />\n        <el-option label="上海" value="shanghai" />\n        <el-option label="广州" value="guangzhou" />\n        <el-option label="深圳" value="shenzhen" />\n      </el-select>\n    </el-form-item>\n    <el-form-item label="多选">\n      <el-select v-model="form.multiple" multiple placeholder="请选择" style="width: 100%;">\n        <el-option label="苹果" value="apple" />\n        <el-option label="香蕉" value="banana" />\n        <el-option label="橙子" value="orange" />\n        <el-option label="葡萄" value="grape" />\n      </el-select>\n    </el-form-item>\n    <el-form-item label="可搜索">\n      <el-select v-model="form.search" filterable placeholder="搜索选项" style="width: 100%;">\n        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />\n      </el-select>\n    </el-form-item>\n  </el-form>\n</div>',
        hints: ['使用 el-select 组件', '使用 v-model 绑定值', '使用 multiple 多选', '使用 filterable 可搜索']
      },
      {
        id: 'ep-datepicker',
        title: '日期选择器',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 日期选择器\n\nel-date-picker 是 ElementPlus 的日期选择器组件。\n\n## 基本用法\n\n```html\n<el-date-picker v-model="date" type="date" placeholder="选择日期" />\n```',
        initialCode: '<div id="app">\n  <el-date-picker v-model="date" type="date" placeholder="选择日期" />\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">日期选择器示例</h2>\n  <el-form label-width="100px" style="max-width: 500px;">\n    <el-form-item label="日期">\n      <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;" />\n    </el-form-item>\n    <el-form-item label="日期范围">\n      <el-date-picker v-model="form.daterange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" />\n    </el-form-item>\n    <el-form-item label="月份">\n      <el-date-picker v-model="form.month" type="month" placeholder="选择月份" style="width: 100%;" />\n    </el-form-item>\n    <el-form-item label="年份">\n      <el-date-picker v-model="form.year" type="year" placeholder="选择年份" style="width: 100%;" />\n    </el-form-item>\n    <el-form-item label="时间">\n      <el-time-picker v-model="form.time" placeholder="选择时间" style="width: 100%;" />\n    </el-form-item>\n  </el-form>\n</div>',
        hints: ['使用 el-date-picker 组件', '使用 type 选择类型', '使用 daterange 日期范围', '使用 TimePicker 时间选择']
      },
      {
        id: 'ep-tabs',
        title: '标签页组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 标签页组件\n\nel-tabs 是 ElementPlus 的标签页组件。\n\n## 基本用法\n\n```html\n<el-tabs v-model="activeTab">\n  <el-tab-pane label="标签1" name="tab1">内容1</el-tab-pane>\n</el-tabs>\n```',
        initialCode: '<div id="app">\n  <el-tabs v-model="activeTab">\n    <el-tab-pane label="用户管理" name="first">用户管理内容</el-tab-pane>\n    <el-tab-pane label="配置管理" name="second">配置管理内容</el-tab-pane>\n  </el-tabs>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">标签页示例</h2>\n  <el-tabs v-model="activeTab" type="border-card">\n    <el-tab-pane label="用户管理" name="first">\n      <p>用户管理面板</p>\n      <el-table :data="tableData" style="width: 100%; margin-top: 20px;">\n        <el-table-column prop="name" label="姓名" />\n        <el-table-column prop="address" label="地址" />\n      </el-table>\n    </el-tab-pane>\n    <el-tab-pane label="配置管理" name="second">\n      <p>配置管理面板</p>\n      <el-button type="primary">添加配置</el-button>\n    </el-tab-pane>\n    <el-tab-pane label="角色管理" name="third">角色管理内容</el-tab-pane>\n  </el-tabs>\n</div>',
        hints: ['使用 el-tabs 组件', '使用 el-tab-pane 添加标签', '使用 v-model 绑定活动标签', '使用 type 设置样式']
      },
      {
        id: 'ep-dropdown',
        title: '下拉菜单',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 下拉菜单\n\nel-dropdown 是 ElementPlus 的下拉菜单组件。\n\n## 基本用法\n\n```html\n<el-dropdown>\n  <span class="el-dropdown-link">\n    下拉菜单<el-icon><arrow-down /></el-icon>\n  </span>\n  <template #dropdown>\n    <el-dropdown-menu>\n      <el-dropdown-item>个人中心</el-dropdown-item>\n      <el-dropdown-item>设置</el-dropdown-item>\n    </el-dropdown-menu>\n  </template>\n</el-dropdown>\n```',
        initialCode: '<div id="app">\n  <el-dropdown>\n    <span class="el-dropdown-link">\n      下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>\n    </span>\n    <template #dropdown>\n      <el-dropdown-menu>\n        <el-dropdown-item>个人中心</el-dropdown-item>\n        <el-dropdown-item>设置</el-dropdown-item>\n        <el-dropdown-item divided>退出登录</el-dropdown-item>\n      </el-dropdown-menu>\n    </template>\n  </el-dropdown>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">下拉菜单示例</h2>\n  <div style="display: flex; gap: 20px; flex-wrap: wrap;">\n    <el-dropdown>\n      <el-button type="primary">\n        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>\n      </el-button>\n      <template #dropdown>\n        <el-dropdown-menu>\n          <el-dropdown-item>个人中心</el-dropdown-item>\n          <el-dropdown-item>设置</el-dropdown-item>\n          <el-dropdown-item divided>退出登录</el-dropdown-item>\n        </el-dropdown-menu>\n      </template>\n    </el-dropdown>\n    <el-dropdown split-button type="primary" @click="handleClick">\n      默认菜单\n      <template #dropdown>\n        <el-dropdown-menu>\n          <el-dropdown-item>个人中心</el-dropdown-item>\n          <el-dropdown-item>设置</el-dropdown-item>\n        </el-dropdown-menu>\n      </template>\n    </el-dropdown>\n  </div>\n</div>',
        hints: ['使用 el-dropdown 组件', '使用 el-dropdown-menu 菜单项', '使用 el-dropdown-item 菜单选项', '使用 divided 分割线']
      },
      {
        id: 'ep-steps',
        title: '步骤条',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 步骤条\n\nel-steps 是 ElementPlus 的步骤条组件。\n\n## 基本用法\n\n```html\n<el-steps :active="active">\n  <el-step title="步骤1" />\n  <el-step title="步骤2" />\n</el-steps>\n```',
        initialCode: '<div id="app">\n  <el-steps :active="active" finish-status="success">\n    <el-step title="步骤1"></el-step>\n    <el-step title="步骤2"></el-step>\n    <el-step title="步骤3"></el-step>\n  </el-steps>\n  <el-button style="margin-top: 20px;" @click="next">下一步</el-button>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">步骤条示例</h2>\n  <el-steps :active="active" align-center>\n    <el-step title="提交订单" description="2024-01-15 10:30" />\n    <el-step title="支付成功" description="2024-01-15 10:35" />\n    <el-step title="商家发货" description="2024-01-16 09:00" />\n    <el-step title="确认收货" />\n    <el-step title="完成评价" />\n  </el-steps>\n  <div style="margin-top: 40px; display: flex; gap: 10px; justify-content: center;">\n    <el-button :disabled="active === 0" @click="active--">上一步</el-button>\n    <el-button :disabled="active === 4" type="primary" @click="active++">下一步</el-button>\n  </div>\n</div>',
        hints: ['使用 el-steps 组件', '使用 el-step 添加步骤', '使用 active 当前步骤', '使用 align-center 居中对齐']
      },
      {
        id: 'ep-card',
        title: '卡片组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 卡片组件\n\nel-card 是 ElementPlus 的卡片组件。\n\n## 基本用法\n\n```html\n<el-card>\n  <template #header>\n    <span>卡片标题</span>\n  </template>\n  卡片内容\n</el-card>\n```',
        initialCode: '<div id="app">\n  <el-card>\n    <template #header>\n      <span>卡片标题</span>\n    </template>\n    卡片内容\n  </el-card>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">卡片示例</h2>\n  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">\n    <el-card>\n      <template #header>\n        <div style="display: flex; justify-content: space-between; align-items: center;">\n          <span>简单卡片</span>\n          <el-button type="text">操作</el-button>\n        </div>\n      </template>\n      <div v-for="o in 4" :key="o" style="margin-bottom: 10px;">内容{{o}}</div>\n    </el-card>\n    <el-card shadow="hover">\n      <template #header><span>悬浮阴影</span></template>\n      <div v-for="o in 4" :key="o" style="margin-bottom: 10px;">内容{{o}}</div>\n    </el-card>\n    <el-card shadow="never">\n      <template #header><span>无阴影</span></template>\n      <div v-for="o in 4" :key="o" style="margin-bottom: 10px;">内容{{o}}</div>\n    </el-card>\n  </div>\n</div>',
        hints: ['使用 el-card 组件', '使用 #header 具名插槽', '使用 shadow 属性控制阴影', '可以放入任何内容']
      },
      {
        id: 'ep-progress',
        title: '进度条',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 进度条\n\nel-progress 是 ElementPlus 的进度条组件。\n\n## 基本用法\n\n```html\n<el-progress :percentage="50" />\n```',
        initialCode: '<div id="app">\n  <el-progress :percentage="50" />\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">进度条示例</h2>\n  <div style="max-width: 600px;">\n    <div style="margin-bottom: 20px;">\n      <el-progress :percentage="50" />\n    </div>\n    <div style="margin-bottom: 20px;">\n      <el-progress :percentage="70" status="exception" />\n    </div>\n    <div style="margin-bottom: 20px;">\n      <el-progress :percentage="100" status="success" />\n    </div>\n    <div style="margin-bottom: 20px;">\n      <el-progress :percentage="60" :stroke-width="20" />\n    </div>\n    <div style="margin-bottom: 20px;">\n      <el-progress type="circle" :percentage="75" />\n      <el-progress type="circle" :percentage="50" status="exception" style="margin-left: 20px;" />\n      <el-progress type="circle" :percentage="100" status="success" style="margin-left: 20px;" />\n    </div>\n    <div style="margin-bottom: 20px;">\n      <el-progress :percentage="percentage" />\n      <el-button-group style="margin-top: 20px;">\n        <el-button @click="decrease">-</el-button>\n        <el-button @click="increase">+</el-button>\n      </el-button-group>\n    </div>\n  </div>\n</div>',
        hints: ['使用 el-progress 组件', '使用 percentage 百分比', '使用 status 状态', '使用 type 圆形进度条']
      },
      {
        id: 'ep-pagination',
        title: '分页组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 分页组件\n\nel-pagination 是 ElementPlus 的分页组件。\n\n## 基本用法\n\n```html\n<el-pagination \n  :current-page="1" \n  :page-size="10" \n  :total="100" \n/>\n```',
        initialCode: '<div id="app">\n  <el-pagination \n    :current-page="1" \n    :page-size="10" \n    :total="100" \n    layout="total, prev, pager, next" \n  />\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">分页示例</h2>\n  <div style="margin-bottom: 40px;">\n    <el-pagination\n      background\n      layout="total, sizes, prev, pager, next, jumper"\n      :total="1000"\n      :page-sizes="[10, 20, 50, 100]"\n      :page-size="100"\n    />\n  </div>\n  <div>\n    <el-pagination\n      small\n      layout="prev, pager, next"\n      :total="50"\n    />\n  </div>\n</div>',
        hints: ['使用 el-pagination 组件', '使用 total 总数', '使用 page-size 每页条数', '使用 layout 布局']
      },
      {
        id: 'ep-badge',
        title: '标记组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 标记组件\n\nel-badge 是 ElementPlus 的标记组件。\n\n## 基本用法\n\n```html\n<el-badge :value="5" class="item">\n  <el-button>评论</el-button>\n</el-badge>\n```',
        initialCode: '<div id="app">\n  <el-badge :value="5" class="item">\n    <el-button>评论</el-button>\n  </el-badge>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">标记示例</h2>\n  <div style="display: flex; gap: 30px; flex-wrap: wrap;">\n    <el-badge :value="5" class="item">\n      <el-button>评论</el-button>\n    </el-badge>\n    <el-badge :value="12" type="primary" class="item">\n      <el-button>消息</el-button>\n    </el-badge>\n    <el-badge :value="3" type="success" class="item">\n      <el-button>通知</el-button>\n    </el-badge>\n    <el-badge :value="1" type="warning" class="item">\n      <el-button>警告</el-button>\n    </el-badge>\n    <el-badge :value="100" type="danger" class="item">\n      <el-button>错误</el-button>\n    </el-badge>\n    <el-badge is-dot class="item">\n      <el-button>新消息</el-button>\n    </el-badge>\n  </div>\n</div>',
        hints: ['使用 el-badge 组件', '使用 value 数值', '使用 type 类型', '使用 is-dot 小圆点']
      },
      {
        id: 'ep-avatar',
        title: '头像组件',
        module: 'elementplus',
        moduleTitle: 'ElementPlus',
        content: '# 头像组件\n\nel-avatar 是 ElementPlus 的头像组件。\n\n## 基本用法\n\n```html\n<el-avatar>User</el-avatar>\n<el-avatar src="https://xxx.jpg" />\n```',
        initialCode: '<div id="app">\n  <el-avatar>User</el-avatar>\n</div>',
        solution: '<div id="app">\n  <h2 style="margin-bottom: 20px; color: #333;">头像示例</h2>\n  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">\n    <el-avatar :size="50">User</el-avatar>\n    <el-avatar size="large">大</el-avatar>\n    <el-avatar size="medium">中</el-avatar>\n    <el-avatar size="small">小</el-avatar>\n    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />\n    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="80" />\n    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="100" shape="square" />\n  </div>\n  <div style="margin-top: 30px; display: flex; gap: 20px; align-items: center;">\n    <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />\n    <div>\n      <div style="font-weight: bold;">用户名</div>\n      <div style="color: #999; font-size: 12px;">个人简介</div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 el-avatar 组件', '使用 size 大小', '使用 src 图片', '使用 shape 形状']
      }
    ]
  },
  // ==================== ElementPlus 实战项目 ====================
  {
    id: 'elementplus-project',
    title: 'ElementPlus 实战',
    description: 'ElementPlus 实战项目练习',
    icon: '💼',
    lessons: [
      {
        id: 'ep-project-login',
        title: '登录页面',
        module: 'elementplus-project',
        moduleTitle: 'ElementPlus 实战',
        content: '# 登录页面\n\n使用 ElementPlus 构建一个完整的登录页面。\n\n## 包含组件\n\n- 表单验证\n- 输入框组合\n- 复选框\n- 按钮',
        initialCode: '<div id="app">\n  <h2>登录</h2>\n  <el-input placeholder="请输入用户名" />\n  <el-input type="password" placeholder="请输入密码" />\n  <el-button>登录</el-button>\n</div>',
        solution: '<div id="app">\n  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">\n    <el-card style="width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">\n      <template #header>\n        <div style="text-align: center;">\n          <h2 style="margin: 0; color: #333;">欢迎登录</h2>\n          <p style="margin: 10px 0 0; color: #999; font-size: 14px;">使用您的账号登录系统</p>\n        </div>\n      </template>\n      <el-form :model="form" :rules="rules" ref="loginForm" label-position="top">\n        <el-form-item label="用户名" prop="username">\n          <el-input v-model="form.username" placeholder="请输入用户名" />\n        </el-form-item>\n        <el-form-item label="密码" prop="password">\n          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />\n        </el-form-item>\n        <el-form-item>\n          <div style="display: flex; justify-content: space-between; align-items: center;">\n            <el-checkbox v-model="form.remember">记住密码</el-checkbox>\n            <el-link type="primary">忘记密码？</el-link>\n          </div>\n        </el-form-item>\n        <el-form-item>\n          <el-button type="primary" style="width: 100%;" @click="handleLogin">登 录</el-button>\n        </el-form-item>\n        <div style="text-align: center; color: #999; font-size: 14px;">\n          还没有账号？<el-link type="primary">立即注册</el-link>\n        </div>\n      </el-form>\n    </el-card>\n  </div>\n</div>',
        hints: ['使用 el-card 卡片容器', '使用 el-form 表单验证', '使用 el-link 链接']
      },
      {
        id: 'ep-project-dashboard',
        title: '仪表盘',
        module: 'elementplus-project',
        moduleTitle: 'ElementPlus 实战',
        content: '# 管理仪表盘\n\n使用 ElementPlus 构建一个管理仪表盘。\n\n## 包含组件\n\n- 统计卡片\n- 表格\n- 进度条\n- 标签页',
        initialCode: '<div id="app">\n  <h1>仪表盘</h1>\n</div>',
        solution: '<div id="app">\n  <div style="min-height: 100vh; background: #f5f7fa; padding: 20px;">\n    <h2 style="margin-bottom: 20px; color: #333;">仪表盘</h2>\n    <el-row :gutter="20" style="margin-bottom: 20px;">\n      <el-col :span="6">\n        <el-card shadow="hover">\n          <div style="display: flex; align-items: center;">\n            <div style="width: 60px; height: 60px; border-radius: 10px; background: #409eff; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-right: 15px;">📊</div>\n            <div>\n              <div style="color: #999; font-size: 14px;">总访问量</div>\n              <div style="font-size: 24px; font-weight: bold; color: #333;">128,456</div>\n            </div>\n          </div>\n        </el-card>\n      </el-col>\n      <el-col :span="6">\n        <el-card shadow="hover">\n          <div style="display: flex; align-items: center;">\n            <div style="width: 60px; height: 60px; border-radius: 10px; background: #67c23a; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-right: 15px;">💰</div>\n            <div>\n              <div style="color: #999; font-size: 14px;">总收入</div>\n              <div style="font-size: 24px; font-weight: bold; color: #333;">¥68,900</div>\n            </div>\n          </div>\n        </el-card>\n      </el-col>\n      <el-col :span="6">\n        <el-card shadow="hover">\n          <div style="display: flex; align-items: center;">\n            <div style="width: 60px; height: 60px; border-radius: 10px; background: #e6a23c; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-right: 15px;">👥</div>\n            <div>\n              <div style="color: #999; font-size: 14px;">用户数</div>\n              <div style="font-size: 24px; font-weight: bold; color: #333;">8,642</div>\n            </div>\n          </div>\n        </el-card>\n      </el-col>\n      <el-col :span="6">\n        <el-card shadow="hover">\n          <div style="display: flex; align-items: center;">\n            <div style="width: 60px; height: 60px; border-radius: 10px; background: #f56c6c; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-right: 15px;">📦</div>\n            <div>\n              <div style="color: #999; font-size: 14px;">订单数</div>\n              <div style="font-size: 24px; font-weight: bold; color: #333;">1,234</div>\n            </div>\n          </div>\n        </el-card>\n      </el-col>\n    </el-row>\n    <el-row :gutter="20" style="margin-bottom: 20px;">\n      <el-col :span="16">\n        <el-card>\n          <template #header><span style="font-weight: bold;">销售趋势</span></template>\n          <div style="height: 200px; display: flex; align-items: flex-end; justify-content: space-around; padding: 20px 0;">\n            <div v-for="n in 7" :key="n" style="display: flex; flex-direction: column; align-items: center;">\n              <div :style="{ height: (n * 30 + 20) + \'px\', width: \'40px\', background: \'linear-gradient(to top, #409eff, #66b1ff)\', borderRadius: \'4px 4px 0 0\'}"></div>\n              <div style="margin-top: 10px; color: #999; font-size: 12px;">周{{n}}</div>\n            </div>\n          </div>\n        </el-card>\n      </el-col>\n      <el-col :span="8">\n        <el-card>\n          <template #header><span style="font-weight: bold;">任务进度</span></template>\n          <div style="padding: 10px 0;">\n            <div style="margin-bottom: 20px;">\n              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>进行中</span><span style="color: #409eff;">75%</span></div>\n              <el-progress :percentage="75" :stroke-width="10" />\n            </div>\n            <div style="margin-bottom: 20px;">\n              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>已完成</span><span style="color: #67c23a;">45%</span></div>\n              <el-progress :percentage="45" :stroke-width="10" status="success" />\n            </div>\n            <div>\n              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>待处理</span><span style="color: #e6a23c;">30%</span></div>\n              <el-progress :percentage="30" :stroke-width="10" status="warning" />\n            </div>\n          </div>\n        </el-card>\n      </el-col>\n    </el-row>\n    <el-card>\n      <template #header><span style="font-weight: bold;">订单列表</span></template>\n      <el-table :data="tableData" style="width: 100%">\n        <el-table-column prop="orderId" label="订单号" width="150" />\n        <el-table-column prop="product" label="商品" />\n        <el-table-column prop="amount" label="金额" width="100"><template #default="scope">¥{{ scope.row.amount }}</template></el-table-column>\n        <el-table-column prop="status" label="状态" width="100">\n          <template #default="scope"><el-tag :type="scope.row.status === \'已完成\' ? \'success\' : \'warning\'">{{ scope.row.status }}</el-tag></template>\n        </el-table-column>\n        <el-table-column label="操作" width="150">\n          <template #default="scope"><el-button size="small" type="primary" link>查看</el-button><el-button size="small" type="danger" link>删除</el-button></template>\n        </el-table-column>\n      </el-table>\n    </el-card>\n  </div>\n</div>',
        hints: ['使用 el-row el-col 栅格布局', '使用 el-card 卡片', '使用 el-progress 进度条', '使用 el-table 表格']
      },
      {
        id: 'ep-project-list',
        title: '数据列表',
        module: 'elementplus-project',
        moduleTitle: 'ElementPlus 实战',
        content: '# 数据列表页面\n\n使用 ElementPlus 构建一个包含筛选、排序、分页的数据列表。',
        initialCode: '<div id="app">\n  <h2>数据列表</h2>\n</div>',
        solution: '<div id="app">\n  <div style="min-height: 100vh; background: #f5f7fa; padding: 20px;">\n    <el-card>\n      <template #header>\n        <div style="display: flex; justify-content: space-between; align-items: center;">\n          <span style="font-weight: bold; font-size: 18px;">用户列表</span>\n          <el-button type="primary">新增用户</el-button>\n        </div>\n      </template>\n      <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">\n        <el-input v-model="search" placeholder="搜索用户名/邮箱" style="width: 250px;" clearable />\n        <el-select v-model="filterStatus" placeholder="状态" style="width: 120px;" clearable>\n          <el-option label="全部" value="" /><el-option label="活跃" value="active" /><el-option label="禁用" value="inactive" />\n        </el-select>\n        <el-button type="primary">搜索</el-button><el-button>重置</el-button>\n      </div>\n      <el-table :data="tableData" style="width: 100%;" stripe border>\n        <el-table-column type="selection" width="55" />\n        <el-table-column prop="id" label="ID" width="80" />\n        <el-table-column label="用户" width="200">\n          <template #default="scope">\n            <div style="display: flex; align-items: center;">\n              <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />\n              <div style="margin-left: 10px;"><div style="font-weight: bold;">{{ scope.row.name }}</div><div style="font-size: 12px; color: #999;">{{ scope.row.email }}</div></div>\n            </div>\n          </template>\n        </el-table-column>\n        <el-table-column prop="role" label="角色" width="100">\n          <template #default="scope"><el-tag :type="scope.row.role === \'管理员\' ? \'danger\' : \'warning\'">{{ scope.row.role }}</el-tag></template>\n        </el-table-column>\n        <el-table-column prop="status" label="状态" width="80">\n          <template #default="scope"><el-switch v-model="scope.row.status" active-value="active" inactive-value="inactive" /></template>\n        </el-table-column>\n        <el-table-column prop="createTime" label="创建时间" width="180" />\n        <el-table-column label="操作" width="180" fixed="right">\n          <template #default="scope"><el-button type="primary" link>编辑</el-button><el-button type="success" link>查看</el-button><el-button type="danger" link>删除</el-button></template>\n        </el-table-column>\n      </el-table>\n      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">\n        <div style="color: #999;">共 128 条记录，当前第 1/13 页</div>\n        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="128" :page-sizes="[10, 20, 50, 100]" :page-size="10" />\n      </div>\n    </el-card>\n  </div>\n</div>',
        hints: ['使用 el-input 搜索框', '使用 el-select 筛选', '使用 el-table 表格', '使用 el-pagination 分页']
      },
      {
        id: 'ep-project-form',
        title: '复杂表单',
        module: 'elementplus-project',
        moduleTitle: 'ElementPlus 实战',
        content: '# 复杂表单页面\n\n使用 ElementPlus 构建一个包含多种表单项的复杂表单。',
        initialCode: '<div id="app">\n  <h2>创建项目</h2>\n</div>',
        solution: '<div id="app">\n  <div style="min-height: 100vh; background: #f5f7fa; padding: 20px;">\n    <el-card>\n      <template #header><span style="font-weight: bold; font-size: 18px;">创建新项目</span></template>\n      <el-form :model="form" label-width="120px" style="max-width: 800px;">\n        <el-divider content-position="left">基本信息</el-divider>\n        <el-row :gutter="20">\n          <el-col :span="12"><el-form-item label="项目名称"><el-input v-model="form.name" placeholder="请输入项目名称" /></el-form-item></el-col>\n          <el-col :span="12"><el-form-item label="项目类型"><el-select v-model="form.type" placeholder="请选择" style="width: 100%;"><el-option label="Web应用" value="web" /><el-option label="移动应用" value="mobile" /><el-option label="桌面应用" value="desktop" /></el-select></el-form-item></el-col>\n        </el-row>\n        <el-form-item label="项目描述"><el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入项目描述" /></el-form-item>\n        <el-divider content-position="left">时间设置</el-divider>\n        <el-row :gutter="20">\n          <el-col :span="12"><el-form-item label="开始日期"><el-date-picker v-model="form.startDate" type="date" placeholder="选择日期" style="width: 100%;" /></el-form-item></el-col>\n          <el-col :span="12"><el-form-item label="截止日期"><el-date-picker v-model="form.endDate" type="date" placeholder="选择日期" style="width: 100%;" /></el-form-item></el-col>\n        </el-row>\n        <el-divider content-position="left">高级设置</el-divider>\n        <el-form-item label="优先级"><el-radio-group v-model="form.priority"><el-radio label="low">低</el-radio><el-radio label="medium">中</el-radio><el-radio label="high">高</el-radio></el-radio-group></el-form-item>\n        <el-form-item label="标签"><el-checkbox-group v-model="form.tags"><el-checkbox label="重要" value="important" /><el-checkbox label="紧急" value="urgent" /><el-checkbox label="文档" value="docs" /></el-checkbox-group></el-form-item>\n        <el-form-item label="可见范围"><el-switch v-model="form.public" active-text="公开" inactive-text="私有" /></el-form-item>\n        <el-form-item><el-button type="primary">创 建</el-button><el-button>重 置</el-button></el-form-item>\n      </el-form>\n    </el-card>\n  </div>\n</div>',
        hints: ['使用 el-divider 分割线', '使用 el-row el-col 栅格', '使用 el-radio-group 单选组', '使用 el-switch 开关']
      }
    ]
  },
  // ==================== Vue3 入门 ====================
  {
    id: 'vue3',
    title: 'Vue3',
    description: 'Vue3 组合式 API 学习',
    icon: '💚',
    lessons: [
      {
        id: 'vue3-intro',
        title: 'Vue3 简介',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# Vue3 简介\n\nVue3 是 Vue.js 的最新版本，引入了组合式 API。\n\n## 特点\n\n- 组合式 API\n- Teleport 组件\n- Fragments\n- 更快的渲染速度\n- 更好的 TypeScript 支持',
        initialCode: '<div id="app">\n  <h1>Hello Vue3!</h1>\n  <p>{{ message }}</p>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; font-size: 32px; margin-bottom: 20px;">Vue3 组合式 API</h1>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">\n    <p style="font-size: 18px; margin-bottom: 10px;">当前计数: <strong style="color: #42b883; font-size: 24px;">{{ count }}</strong></p>\n    <button @click="count++" style="background: #42b883; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">+ 增加</button>\n    <button @click="count--" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">- 减少</button>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n    <p style="font-size: 18px;">输入内容: <strong>{{ inputValue }}</strong></p>\n    <input v-model="inputValue" placeholder="请输入内容" style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ddd; border-radius: 4px;" />\n  </div>\n</div>',
        hints: ['使用 ref 创建响应式数据', '使用 v-model 双向绑定', '使用 @click 绑定事件']
      },
      {
        id: 'vue3-reactive',
        title: '响应式系统',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 响应式系统\n\nVue3 使用 ref 和 reactive 创建响应式数据。\n\n## ref vs reactive\n\n- ref: 基础类型数据\n- reactive: 对象类型数据',
        initialCode: '<div id="app">\n  <p>{{ message }}</p>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">响应式系统</h1>\n  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">\n    <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n      <h3 style="margin-bottom: 15px;">ref (基础类型)</h3>\n      <p>计数: <strong>{{ count }}</strong></p>\n      <button @click="count++" style="background: #42b883; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">+1</button>\n    </div>\n    <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n      <h3 style="margin-bottom: 15px;">reactive (对象)</h3>\n      <p>姓名: {{ user.name }}</p>\n      <p>年龄: {{ user.age }}<button @click="</p>\n      user.age++" style="background: #42b883; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">+1 年龄</button>\n    </div>\n  </div>\n</div>',
        hints: ['使用 ref 定义基础类型', '使用 reactive 定义对象', '自动解包']
      },
      {
        id: 'vue3-computed',
        title: '计算属性',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 计算属性\n\n使用 computed 创建计算属性。\n\n## 特点\n\n- 基于依赖缓存\n- 依赖变化时重新计算',
        initialCode: '<div id="app">\n  <p>{{ message }}</p>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">计算属性</h1>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">\n    <input v-model="firstName" placeholder="名" style="padding: 8px; margin-right: 10px; border: 1px solid #ddd; border-radius: 4px;" />\n    <input v-model="lastName" placeholder="姓" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />\n    <p style="margin-top: 15px; font-size: 18px;">全名: <strong>{{ fullName }}</strong></p>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n    <p>价格: ¥{{ price }}</p>\n    <p>数量: {{ quantity }}</p>\n    <p style="font-size: 20px; color: #42b883;">总价: ¥{{ total }}</p>\n  </div>\n</div>',
        hints: ['使用 computed 创建计算属性', '计算属性基于依赖缓存', '直接使用 getter 函数']
      },
      {
        id: 'vue3-watch',
        title: '监听器',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 监听器\n\n使用 watch 和 watchEffect 监听数据变化。',
        initialCode: '<div id="app">\n  <p>{{ message }}</p>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">监听器</h1>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">\n    <input v-model="keyword" placeholder="搜索..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;" />\n    <p>搜索历史: {{ history.join(\', \') }}</p>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n    <p>当前值: <strong>{{ count }}</strong></p>\n    <button @click="count++" style="background: #42b883; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">+1</button>\n    <p style="margin-top: 15px;">变化次数: {{ watchCount }}</p>\n  </div>\n</div>',
        hints: ['使用 watch 监听特定数据', '使用 watchEffect 自动收集依赖', '使用 immediate 选项立即执行']
      },
      {
        id: 'vue3-methods',
        title: '方法与事件',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 方法与事件\n\n在 Vue3 中定义方法和处理事件。',
        initialCode: '<div id="app">\n  <button @click="greet">点击</button>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">方法与事件</h1>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">\n    <p style="font-size: 48px; margin: 20px 0;">{{ emoji }}</p>\n    <button @click="randomEmoji" style="background: #42b883; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 16px;">换 Emoji</button>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; text-align: center;">\n    <p style="font-size: 24px; margin-bottom: 15px;">{{ message }}</p>\n    <button @click="showAlert(\'你好!\')" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">打招呼</button>\n    <button @click="showAlert(\'再见!\')" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">告别</button>\n  </div>\n</div>',
        hints: ['使用 @click 绑定点击事件', '在 methods 中定义方法', '方法可以接收参数']
      },
      {
        id: 'vue3-conditional',
        title: '条件渲染',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 条件渲染\n\n使用 v-if, v-else, v-show 条件渲染。',
        initialCode: '<div id="app">\n  <p v-if="show">显示内容</p>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">条件渲染</h1>\n  <div style="margin-bottom: 20px;">\n    <button @click="show = !show" style="background: #42b883; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">切换显示</button>\n    <button @click="type = type === \'A\' ? \'B\' : \'A\'" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-left: 10px;">切换类型</button>\n  </div>\n  <div v-if="show" style="background: #42b883; color: white; padding: 20px; border-radius: 8px; margin-bottom: 10px;">\n    <p>v-if 条件为 true 时渲染</p>\n  </div>\n  <div v-else style="background: #e74c3c; color: white; padding: 20px; border-radius: 8px;">\n    <p>v-else 条件为 false 时渲染</p>\n  </div>\n  <div style="margin-top: 20px;">\n    <div v-if="type === \'A\'" style="background: #9b59b6; color: white; padding: 20px; border-radius: 8px;">类型 A</div>\n    <div v-else-if="type === \'B\'" style="background: #e67e22; color: white; padding: 20px; border-radius: 8px;">类型 B</div>\n    <div v-else style="background: #95a5a6; color: white; padding: 20px; border-radius: 8px;">其他类型</div>\n  </div>\n</div>',
        hints: ['使用 v-if 条件渲染', '使用 v-else-if 和 v-else', 'v-show 使用 display 控制显示']
      },
      {
        id: 'vue3-list',
        title: '列表渲染',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 列表渲染\n\n使用 v-for 渲染列表数据。',
        initialCode: '<div id="app">\n  <ul>\n    <li v-for="item in items">{{ item }}</li>\n  </ul>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">列表渲染</h1>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">\n    <h3 style="margin-bottom: 15px;">简单列表</h3>\n    <ul style="list-style: none; padding: 0;">\n      <li v-for="(item, index) in fruits" :key="index" style="padding: 10px; background: white; margin-bottom: 5px; border-radius: 4px;">\n        {{ index + 1 }}. {{ item }}\n      </li>\n    </ul>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n    <h3 style="margin-bottom: 15px;">对象列表</h3>\n    <div v-for="user in users" :key="user.id" style="background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">\n      <div>\n        <strong>{{ user.name }}</strong>\n        <span style="color: #999; margin-left: 10px;">{{ user.email }}</span>\n      </div>\n      <span :style="{ color: user.online ? \'#42b883\' : \'#e74c3c\' }">\n        {{ user.online ? \'在线\' : \'离线\' }}\n      </span>\n    </div>\n  </div>\n</div>',
        hints: ['使用 v-for 遍历数组', '使用 :key 绑定唯一标识', '可以遍历对象和数字']
      },
      {
        id: 'vue3-lifecycle',
        title: '生命周期',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 生命周期钩子\n\nVue3 组件的生命周期钩子。\n\n## 常用钩子\n\n- onMounted - 组件挂载后\n- onUpdated - 组件更新后\n- onUnmounted - 组件卸载后',
        initialCode: '<div id="app">\n  <p>{{ message }}</p>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">生命周期钩子</h1>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">\n    <p style="font-size: 18px;">计数器: <strong>{{ count }}</strong></p>\n    <button @click="count++" style="background: #42b883; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px;">+1</button>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n    <h3 style="margin-bottom: 15px;">生命周期日志</h3>\n    <ul style="list-style: none; padding: 0;">\n      <li v-for="log in logs" :key="log" style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">\n        {{ log }}\n      </li>\n    </ul>\n  </div>\n</div>',
        hints: ['使用 onMounted 监听挂载', '使用 onUpdated 监听更新', '使用 onUnmounted 监听卸载']
      },
      {
        id: 'vue3-components',
        title: '组件基础',
        module: 'vue3',
        moduleTitle: 'Vue3',
        content: '# 组件基础\n\n学习 Vue3 组件的基本用法。',
        initialCode: '<div id="app">\n  <h1>组件示例</h1>\n</div>',
        solution: '<div id="app">\n  <h1 style="color: #42b883; margin-bottom: 20px;">组件示例</h1>\n  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">\n    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">\n      <div style="font-size: 48px;">📊</div>\n      <h3 style="margin: 10px 0;">数据展示</h3>\n      <p style="color: #666;">{{ stats.views }}</p>\n    </div>\n    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">\n      <div style="font-size: 48px;">❤️</div>\n      <h3 style="margin: 10px 0;">点赞</h3>\n      <p style="color: #666;">{{ stats.likes }}</p>\n    </div>\n    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">\n      <div style="font-size: 48px;">💬</div>\n      <h3 style="margin: 10px 0;">评论</h3>\n      <p style="color: #666;">{{ stats.comments }}</p>\n    </div>\n  </div>\n  <div style="background: #f5f7fa; padding: 20px; border-radius: 8px;">\n    <h3 style="margin-bottom: 15px;">功能按钮</h3>\n    <button @click="stats.views++" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">浏览 +1</button>\n    <button @click="stats.likes++" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">点赞 +1</button>\n    <button @click="stats.comments++" style="background: #9b59b6; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">评论 +1</button>\n  </div>\n</div>',
        hints: ['组件是 Vue 的核心概念', 'props 传递数据', 'events 发送事件']
      }
    ]
  },
  // ==================== 基础入门 ====================
  // ==================== 基础入门 ====================
  {
    id: 'foundation',
    title: '基础入门',
    description: '掌握 Tailwind CSS 的核心概念',
    icon: '📖',
    lessons: [
      {
        id: 'intro',
        title: '什么是 Utility-First',
        module: 'foundation',
        moduleTitle: '基础入门',
        content: '# 欢迎学习 Tailwind CSS\n\nTailwind CSS 是一个**Utility-First**（工具优先）的 CSS 框架。\n\n## 传统 CSS vs Tailwind\n\n传统 CSS 需要编写自定义类名，而 Tailwind 直接在 HTML 中使用工具类。\n\n## 为什么选择 Utility-First？\n\n1. **无需离开 HTML** - 样式就在标签上\n2. **响应式设计** - 内置断点支持\n3. **状态变体** - hover、focus 等状态轻松处理\n4. **自定义设计系统** - 配置化主题',
        initialCode: '<button class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">\n  点击我\n</button>',
        solution: '<div class="min-h-screen bg-gray-100 flex items-center justify-center">\n  <button class="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all transform hover:scale-105">\n    开始学习\n  </button>\n</div>',
        hints: ['使用 bg-blue-500 设置背景色', '使用 text-white 设置文字颜色', '使用 px- py- 设置内边距']
      },
      {
        id: 'setup',
        title: '安装与配置',
        module: 'foundation',
        moduleTitle: '基础入门',
        content: '# 安装与配置\n\n学习如何安装和配置 Tailwind CSS。\n\n## 安装\n\n使用 npm 或 pnpm 安装：\n\n```bash\nnpm install -D tailwindcss\n```\n\n## 初始化\n\n```bash\nnpx tailwindcss init\n```\n\n## 配置\n\n在 tailwind.config.js 中配置 content 路径。',
        initialCode: '<div class="p-8">\n  <h1 class="text-3xl font-bold">安装配置</h1>\n</div>',
        solution: '<div class="min-h-screen bg-gray-900 text-white p-8">\n  <h1 class="text-4xl font-bold mb-6">Tailwind CSS 安装</h1>\n  <div class="bg-gray-800 rounded-lg p-6 font-mono text-sm">\n    <p class="text-green-400"># 安装</p>\n    <p>npm install -D tailwindcss</p>\n    <p class="text-green-400 mt-4"># 初始化</p>\n    <p>npx tailwindcss init</p>\n  </div>\n</div>',
        hints: ['使用 bg-gray-900 深色背景', '使用 font-mono 等宽字体', '使用 rounded-lg 圆角']
      },
      {
        id: 'colors',
        title: '颜色系统',
        module: 'foundation',
        moduleTitle: '基础入门',
        content: '# 颜色系统\n\nTailwind CSS 提供了完整的颜色系统。\n\n## 使用颜色\n\n- text-{color}-{shade} - 文字颜色\n- bg-{color}-{shade} - 背景颜色\n- border-{color}-{shade} - 边框颜色\n\n## 颜色级别\n\n50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950',
        initialCode: '<div class="p-8">\n  <p class="text-red-500">红色文字</p>\n</div>',
        solution: '<div class="min-h-screen bg-gray-50 p-8">\n  <h1 class="text-3xl font-bold mb-6">颜色系统</h1>\n  <div class="grid grid-cols-4 gap-4">\n    <div class="bg-red-500 text-white p-4 rounded">red-500</div>\n    <div class="bg-blue-500 text-white p-4 rounded">blue-500</div>\n    <div class="bg-green-500 text-white p-4 rounded">green-500</div>\n    <div class="bg-yellow-500 text-white p-4 rounded">yellow-500</div>\n    <div class="bg-purple-500 text-white p-4 rounded">purple-500</div>\n    <div class="bg-pink-500 text-white p-4 rounded">pink-500</div>\n    <div class="bg-indigo-500 text-white p-4 rounded">indigo-500</div>\n    <div class="bg-teal-500 text-white p-4 rounded">teal-500</div>\n  </div>\n</div>',
        hints: ['使用 grid grid-cols-4 网格布局', '使用 gap-4 间距', '使用 rounded 圆角']
      },
      {
        id: 'spacing',
        title: '间距系统',
        module: 'foundation',
        moduleTitle: '基础入门',
        content: '# 间距系统\n\nTailwind CSS 的间距基于 4px 增量。\n\n## 外边距 (Margin)\n\n- m{size} - 四周\n- mt, mr, mb, ml - 单边\n- mx, my - 水平/垂直\n\n## 内边距 (Padding)\n\n- p{size} - 四周\n- pt, pr, pb, pl - 单边\n- px, py - 水平/垂直\n\n## 间距值\n\n0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32...',
        initialCode: '<div class="p-4">\n  <div class="bg-blue-200 p-2">内边距</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">间距系统</h1>\n  <div class="space-y-4">\n    <div class="bg-blue-500 text-white p-1">p-1</div>\n    <div class="bg-blue-500 text-white p-2">p-2</div>\n    <div class="bg-blue-500 text-white p-4">p-4</div>\n    <div class="bg-blue-500 text-white p-8">p-8</div>\n    <div class="bg-blue-500 text-white p-12">p-12</div>\n  </div>\n</div>',
        hints: ['使用 p- 大小控制内边距', '使用 space-y- 垂直间距', '使用 bg-blue- 背景色']
      },
      {
        id: 'typography',
        title: '字体与排版',
        module: 'foundation',
        moduleTitle: '基础入门',
        content: '# 字体与排版\n\n掌握文字大小、粗细、样式等。\n\n## 字体大小\n\ntext-xs, sm, base, lg, xl, 2xl, 3xl, 4xl\n\n## 字体粗细\n\nfont-light, normal, medium, semibold, bold\n\n## 其他样式\n\nitalic（斜体）, underline（下划线）, line-through（删除线）',
        initialCode: '<div class="p-8">\n  <p class="text-xl">大号文字</p>\n</div>',
        solution: '<div class="min-h-screen bg-white p-8">\n  <h1 class="text-5xl font-bold mb-6">字体排版</h1>\n  <div class="space-y-4">\n    <p class="text-xs">text-xs - 超小</p>\n    <p class="text-sm">text-sm - 小</p>\n    <p class="text-base">text-base - 基础</p>\n    <p class="text-lg">text-lg - 大</p>\n    <p class="text-xl">text-xl - 特大</p>\n    <p class="text-2xl font-bold">text-2xl bold - 加粗</p>\n    <p class="text-3xl font-black">text-3xl black - 特粗</p>\n    <p class="text-lg italic">italic - 斜体</p>\n  </div>\n</div>',
        hints: ['使用 text- 大小控制字号', '使用 font- 控制粗细', '使用 italic 斜体']
      },
      {
        id: 'borders',
        title: '边框与圆角',
        module: 'foundation',
        moduleTitle: '基础入门',
        content: '# 边框与圆角\n\n学习如何添加边框和圆角效果。\n\n## 边框\n\nborder, border-{color}, border-{width}\n\n## 圆角\n\nrounded, rounded-{sm,md,lg,xl,full}\n\n## 阴影\n\nshadow-{sm,md,lg,xl,2xl}',
        initialCode: '<div class="p-8">\n  <div class="border border-gray-300 p-4">边框</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">边框与圆角</h1>\n  <div class="grid grid-cols-3 gap-6">\n    <div class="bg-white p-4 rounded-none border-2 border-gray-300">rounded-none</div>\n    <div class="bg-white p-4 rounded-sm border-2 border-gray-300">rounded-sm</div>\n    <div class="bg-white p-4 rounded border-2 border-gray-300">rounded</div>\n    <div class="bg-white p-4 rounded-md border-2 border-gray-300">rounded-md</div>\n    <div class="bg-white p-4 rounded-lg border-2 border-gray-300">rounded-lg</div>\n    <div class="bg-white p-4 rounded-xl border-2 border-gray-300">rounded-xl</div>\n    <div class="bg-white p-4 rounded-full border-2 border-gray-300">rounded-full</div>\n  </div>\n</div>',
        hints: ['使用 rounded- 控制圆角', '使用 border- 设置边框', '使用 shadow- 添加阴影']
      }
    ]
  },
  // ==================== 布局系统 ====================
  {
    id: 'layout',
    title: '布局系统',
    description: '掌握 Flexbox 和 Grid 布局',
    icon: '📐',
    lessons: [
      {
        id: 'flexbox',
        title: 'Flexbox 基础',
        module: 'layout',
        moduleTitle: '布局系统',
        content: '# Flexbox 布局\n\nTailwind 的 Flexbox 工具类非常强大。\n\n## 容器属性\n\n- flex - 启用弹性盒\n- flex-col - 垂直排列\n- flex-row - 水平排列\n- flex-wrap - 换行\n\n## 主轴对齐\n\njustify-start, center, end, between, around, evenly',
        initialCode: '<div class="flex">\n  <div class="p-2 bg-blue-500 text-white">1</div>\n  <div class="p-2 bg-blue-500 text-white">2</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">Flexbox 布局</h1>\n  <div class="bg-white rounded-lg p-6 shadow-md mb-6">\n    <h2 class="text-lg font-semibold mb-4">justify-center</h2>\n    <div class="flex justify-center gap-4">\n      <div class="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white">1</div>\n      <div class="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white">2</div>\n      <div class="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white">3</div>\n    </div>\n  </div>\n  <div class="bg-white rounded-lg p-6 shadow-md mb-6">\n    <h2 class="text-lg font-semibold mb-4">justify-between</h2>\n    <div class="flex justify-between gap-4">\n      <div class="w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white">1</div>\n      <div class="w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white">2</div>\n      <div class="w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white">3</div>\n    </div>\n  </div>\n  <div class="bg-white rounded-lg p-6 shadow-md">\n    <h2 class="text-lg font-semibold mb-4">items-center</h2>\n    <div class="flex items-center gap-4">\n      <div class="w-16 h-24 bg-purple-500 rounded flex items-center justify-center text-white">1</div>\n      <div class="w-16 h-16 bg-purple-500 rounded flex items-center justify-center text-white">2</div>\n      <div class="w-16 h-32 bg-purple-500 rounded flex items-center justify-center text-white">3</div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 flex 启用弹性盒', '使用 justify- 控制主轴对齐', '使用 items- 控制交叉轴对齐']
      },
      {
        id: 'flex-responsive',
        title: '响应式 Flex',
        module: 'layout',
        moduleTitle: '布局系统',
        content: '# 响应式 Flexbox\n\n学习如何在不同屏幕使用不同布局。\n\n## 响应式前缀\n\n- sm: - 小屏 (640px+)\n- md: - 中屏 (768px+)\n- lg: - 大屏 (1024px+)\n- xl: - 超大屏 (1280px+)\n\n## 示例\n\nflex-col md:flex-row - 移动端垂直，桌面水平',
        initialCode: '<div class="flex">\n  <div class="p-4 bg-red-500">A</div>\n  <div class="p-4 bg-blue-500">B</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">响应式 Flex</h1>\n  <p class="text-gray-600 mb-4">调整窗口大小查看布局变化</p>\n  <div class="flex flex-col md:flex-row gap-4">\n    <div class="flex-1 bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-xl text-white text-center">\n      <h2 class="text-2xl font-bold">移动端优先</h2>\n      <p>小屏幕垂直排列</p>\n    </div>\n    <div class="flex-1 bg-gradient-to-br from-purple-400 to-purple-600 p-8 rounded-xl text-white text-center">\n      <h2 class="text-2xl font-bold">响应式</h2>\n      <p>大屏幕水平排列</p>\n    </div>\n    <div class="flex-1 bg-gradient-to-br from-pink-400 to-pink-600 p-8 rounded-xl text-white text-center">\n      <h2 class="text-2xl font-bold">Tailwind</h2>\n      <p>简单易用</p>\n    </div>\n  </div>\n</div>',
        hints: ['使用 flex-col md:flex-row 响应式切换', '使用 flex-1 自动填充', '使用 gap- 间距']
      },
      {
        id: 'grid',
        title: 'Grid 网格布局',
        module: 'layout',
        moduleTitle: '布局系统',
        content: '# Grid 网格布局\n\nTailwind 的 CSS Grid 支持非常完善。\n\n## 基本属性\n\n- grid - 启用网格\n- grid-cols-{n} - 列数\n- gap-{n} - 间距\n\n## 跨列/行\n\n- col-span-{n} - 跨几列\n- row-span-{n} - 跨几行',
        initialCode: '<div class="grid grid-cols-3 gap-4">\n  <div class="bg-blue-500 p-4">1</div>\n  <div class="bg-blue-500 p-4">2</div>\n  <div class="bg-blue-500 p-4">3</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">Grid 网格布局</h1>\n  <div class="grid grid-cols-4 gap-4">\n    <div class="col-span-2 row-span-2 bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">1</div>\n    <div class="bg-green-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">2</div>\n    <div class="bg-green-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">3</div>\n    <div class="bg-yellow-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">4</div>\n    <div class="col-span-2 bg-purple-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">5</div>\n    <div class="bg-pink-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">6</div>\n    <div class="bg-red-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">7</div>\n    <div class="bg-orange-500 p-6 rounded-xl text-white flex items-center justify-center text-2xl font-bold">8</div>\n  </div>\n</div>',
        hints: ['使用 grid-cols- 设置列数', '使用 col-span- 跨列', '使用 gap- 间距']
      },
      {
        id: 'container',
        title: '容器与居中',
        module: 'layout',
        moduleTitle: '布局系统',
        content: '# 容器与居中\n\n学习页面布局和内容居中。\n\n## 容器\n\n- container - 响应式容器\n- max-w-{size} - 最大宽度\n- mx-auto - 水平居中\n\n## 常用最大宽度\n\nmax-w-sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl',
        initialCode: '<div class="container mx-auto">\n  <p>居中内容</p>\n</div>',
        solution: '<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">\n  <div class="container mx-auto px-4 py-16">\n    <h1 class="text-5xl font-bold text-gray-900 text-center mb-8">居中布局</h1>\n    <div class="max-w-2xl mx-auto">\n      <div class="bg-white rounded-2xl shadow-xl p-8">\n        <p class="text-lg text-gray-600 leading-relaxed">\n          使用 container + mx-auto 可以实现响应式居中布局。\n          container 类会设置 max-width 并在两侧添加 padding。\n          mx-auto 则让内容水平居中。\n        </p>\n      </div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 container 响应式容器', '使用 mx-auto 水平居中', '使用 max-w- 限制宽度']
      },
      {
        id: 'position',
        title: '定位与层级',
        module: 'layout',
        moduleTitle: '布局系统',
        content: '# 定位与层级\n\n掌握元素定位和层叠顺序。\n\n## 定位\n\n- static, relative, absolute, fixed, sticky\n- top, left, right, bottom - 位置\n\n## Z-index\n\nz-{index} - z-index: {index * 4}px',
        initialCode: '<div class="relative">\n  <div class="absolute top-0">定位</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">定位与层级</h1>\n  <div class="relative h-64 bg-white rounded-xl shadow-lg overflow-hidden">\n    <div class="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded">absolute top-4 left-4</div>\n    <div class="absolute top-8 left-8 bg-green-500 text-white px-4 py-2 rounded">z-10</div>\n    <div class="absolute bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded">absolute bottom-4 right-4</div>\n    <div class="absolute inset-0 flex items-center justify-center">\n      <div class="bg-white/90 backdrop-blur px-6 py-3 rounded-lg shadow">半透明背景</div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 absolute 绝对定位', '使用 top- left- 控制位置', '使用 bg-white/90 透明度']
      }
    ]
  },
  // ==================== 交互与状态 ====================
  {
    id: 'interaction',
    title: '交互与状态',
    description: '处理用户交互和状态变化',
    icon: '✨',
    lessons: [
      {
        id: 'hover',
        title: 'Hover 悬浮状态',
        module: 'interaction',
        moduleTitle: '交互与状态',
        content: '# Hover 悬浮状态\n\n使用 hover: 前缀添加悬浮效果。\n\n## 基本用法\n\nhover:bg-blue-600 - 悬浮时背景变深\nhover:text-white - 悬浮时文字变白\nhover:scale-105 - 悬浮时放大',
        initialCode: '<button class="bg-blue-500 text-white p-4">悬浮按钮</button>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">Hover 悬浮状态</h1>\n  <div class="flex flex-wrap gap-4 justify-center">\n    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Background</button>\n    <button class="px-6 py-3 bg-white text-gray-800 rounded-lg hover:text-blue-500 hover:shadow-lg transition-all">Text</button>\n    <button class="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all">Gradient</button>\n    <div class="w-24 h-24 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold hover:scale-110 hover:rotate-12 transition-transform cursor-pointer">Scale</div>\n  </div>\n</div>',
        hints: ['使用 hover: 前缀添加悬浮效果', '使用 transition- 控制过渡', '使用 scale- 变换大小']
      },
      {
        id: 'focus',
        title: 'Focus 焦点状态',
        module: 'interaction',
        moduleTitle: '交互与状态',
        content: '# Focus 焦点状态\n\n使用 focus: 前缀处理焦点状态。\n\n## 常见用法\n\n- focus:ring - 添加聚焦环\n- focus:ring-{color}\n- focus:outline-none - 移除默认轮廓\n- focus:border-{color} - 边框颜色',
        initialCode: '<input type="text" class="border p-2" placeholder="输入框" />',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">Focus 焦点状态</h1>\n  <div class="max-w-md mx-auto space-y-6">\n    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="输入框 1" />\n    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="输入框 2 - 绿色" />\n    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-lg transition-shadow" placeholder="输入框 3 - 阴影" />\n    <button class="w-full px-6 py-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">提交按钮</button>\n  </div>\n</div>',
        hints: ['使用 focus:ring 添加聚焦环', '使用 focus:outline-none 移除默认轮廓', '使用 transition- 过渡效果']
      },
      {
        id: 'active',
        title: 'Active 激活状态',
        module: 'interaction',
        moduleTitle: '交互与状态',
        content: '# Active 激活状态\n\n使用 active: 前缀处理点击状态。\n\n## 常见用法\n\n- active:bg-blue-700 - 点击时背景更深\n- active:scale-95 - 点击时缩小\n- active:shadow-inner - 点击时内阴影',
        initialCode: '<button class="bg-blue-500 text-white p-4">点击</button>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">Active 激活状态</h1>\n  <div class="flex flex-wrap gap-6 justify-center">\n    <button class="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold active:bg-blue-700 active:shadow-inner transition-all">\n      点击效果\n    </button>\n    <button class="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold active:scale-95 transition-transform">\n      缩小效果\n    </button>\n    <button class="px-8 py-4 bg-purple-500 text-white rounded-xl font-semibold active:translate-y-1 transition-transform">\n      按下效果\n    </button>\n    <button class="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold active:opacity-75 transition-opacity">\n      透明度效果\n    </button>\n  </div>\n</div>',
        hints: ['使用 active: 前缀添加点击效果', '使用 active:scale-95 点击缩小', '使用 active:translate-y 点击位移']
      },
      {
        id: 'group-hover',
        title: 'Group Hover 组悬浮',
        module: 'interaction',
        moduleTitle: '交互与状态',
        content: '# Group Hover 组悬浮\n\n使用 group 和 group-hover 实现复杂交互。\n\n## 用法\n\n1. 父元素添加 group 类\n2. 子元素使用 group-hover: 控制\n\n## 常见场景\n\n- 卡片悬浮显示详情\n- 图片悬浮显示文字\n- 列表项悬浮效果',
        initialCode: '<div class="group">\n  <div class="bg-blue-500">图片</div>\n  <div class="group-hover:text-red-500">文字</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">Group Hover 组悬浮</h1>\n  <div class="grid grid-cols-3 gap-6">\n    <div class="group relative overflow-hidden rounded-xl cursor-pointer">\n      <img src="https://picsum.photos/400/300?random=1" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />\n      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">\n        <span class="text-white text-xl font-bold">查看详情</span>\n      </div>\n    </div>\n    <div class="group relative overflow-hidden rounded-xl cursor-pointer">\n      <img src="https://picsum.photos/400/300?random=2" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />\n      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">\n        <span class="text-white text-xl font-bold">查看详情</span>\n      </div>\n    </div>\n    <div class="group relative overflow-hidden rounded-xl cursor-pointer">\n      <img src="https://picsum.photos/400/300?random=3" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />\n      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">\n        <span class="text-white text-xl font-bold">查看详情</span>\n      </div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 group 标记父元素', '使用 group-hover: 控制子元素', '使用 absolute 绝对定位']
      },
      {
        id: 'transitions',
        title: '过渡与动画',
        module: 'interaction',
        moduleTitle: '交互与状态',
        content: '# 过渡与动画\n\nTailwind 内置了丰富的过渡和动画。\n\n## 过渡\n\n- transition - 启用过渡\n- transition-{property} - 指定属性\n- duration-{ms} - 持续时间\n- ease-{timing} - 缓动函数\n\n## 动画\n\n- animate-spin - 旋转\n- animate-pulse - 脉冲\n- animate-bounce - 弹跳',
        initialCode: '<div class="p-8">\n  <div class="w-16 h-16 bg-blue-500"></div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">过渡与动画</h1>\n  <div class="grid grid-cols-3 gap-8">\n    <div class="flex flex-col items-center">\n      <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>\n      <p class="mt-4 text-gray-600">animate-spin</p>\n    </div>\n    <div class="flex flex-col items-center">\n      <div class="w-16 h-16 bg-purple-500 rounded-full animate-pulse"></div>\n      <p class="mt-4 text-gray-600">animate-pulse</p>\n    </div>\n    <div class="flex flex-col items-center">\n      <div class="w-16 h-16 bg-green-500 rounded-full animate-bounce"></div>\n      <p class="mt-4 text-gray-600">animate-bounce</p>\n    </div>\n    <div class="col-span-3 flex flex-wrap gap-6 justify-center mt-8">\n      <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">duration-300</button>\n      <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-500">duration-500</button>\n      <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-700">duration-700</button>\n      <button class="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 hover:scale-110 transition-transform">hover:scale-110</button>\n    </div>\n  </div>\n</div>',
        hints: ['使用 animate-spin 旋转动画', '使用 animate-pulse 脉冲动画', '使用 duration- 控制时间']
      }
    ]
  },
  // ==================== 高级技巧 ====================
  {
    id: 'advanced',
    title: '高级技巧',
    description: '深入掌握 Tailwind 高级特性',
    icon: '🚀',
    lessons: [
      {
        id: 'dark-mode',
        title: '深色模式',
        module: 'advanced',
        moduleTitle: '高级技巧',
        content: '# 深色模式\n\nTailwind 支持多种深色模式策略。\n\n## 启用深色模式\n\n在 tailwind.config.js 中：\n\n```js\nmodule.exports = {\n  darkMode: "class",\n}\n```\n\n## 使用深色模式\n\ndark:bg-gray-900 - 深色背景\ndark:text-white - 深色文字',
        initialCode: '<div class="bg-white p-8">\n  <p class="text-gray-900">浅色模式</p>\n</div>',
        solution: '<div class="min-h-screen bg-white dark:bg-gray-900 p-8">\n  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">深色模式</h1>\n  <div class="grid grid-cols-2 gap-6">\n    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">\n      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">浅色/深色</h2>\n      <p class="text-gray-600 dark:text-gray-300">这段文字会根据主题自动切换颜色。</p>\n    </div>\n    <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">\n      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">背景变化</h2>\n      <p class="text-gray-600 dark:text-gray-300">背景色也会自动切换。</p>\n    </div>\n  </div>\n  <button class="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">\n    按钮\n  </button>\n</div>',
        hints: ['使用 dark: 前缀深色模式样式', '使用 dark:bg- 深色背景', '使用 dark:text- 深色文字']
      },
      {
        id: 'custom-values',
        title: '自定义值',
        module: 'advanced',
        moduleTitle: '高级技巧',
        content: '# 自定义值\n\n使用任意值语法添加自定义样式。\n\n## 语法\n\n[class-name]-[{value}]\n\n## 示例\n\n- top-[100px] - 自定义 top 值\n- w-[500px] - 自定义宽度\n- z-[9999] - 自定义 z-index',
        initialCode: '<div class="p-8">\n  <div class="w-32 bg-blue-500">固定宽度</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">自定义值</h1>\n  <div class="space-y-6">\n    <div class="flex items-center gap-4">\n      <span class="w-20 text-gray-600">w-[200px]</span>\n      <div class="h-8 bg-blue-500 rounded" style="width: 200px;"></div>\n    </div>\n    <div class="flex items-center gap-4">\n      <span class="w-20 text-gray-600">w-[300px]</span>\n      <div class="h-8 bg-green-500 rounded" style="width: 300px;"></div>\n    </div>\n    <div class="flex items-center gap-4">\n      <span class="w-20 text-gray-600">top-[50px]</span>\n      <div class="relative h-20 w-20">\n        <div class="absolute bg-purple-500 rounded p-2 text-white text-xs" style="top: 50px;">top-50</div>\n      </div>\n    </div>\n    <div class="flex items-center gap-4">\n      <span class="w-20 text-gray-600">z-[100]</span>\n      <div class="relative h-20">\n        <div class="absolute bg-red-500 w-16 h-16 rounded flex items-center justify-center text-white z-10">z-10</div>\n        <div class="absolute bg-blue-500 w-16 h-16 rounded flex items-center justify-center text-white left-8 top-8" style="z-index: 100;">z-100</div>\n      </div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 [value] 语法自定义值', '使用 px-[20px] 自定义像素', '使用 z-[999] 自定义层级']
      },
      {
        id: 'pseudo-classes',
        title: '伪类变体',
        module: 'advanced',
        moduleTitle: '高级技巧',
        content: '# 伪类变体\n\nTailwind 支持所有 CSS 伪类。\n\n## 常用伪类\n\n- first:, last:, odd:, even:\n- first-child, last-child\n- visited:, checked:\n- disabled:, read-only:',
        initialCode: '<ul class="list-disc pl-5">\n  <li>项目 1</li>\n  <li>项目 2</li>\n  <li>项目 3</li>\n</ul>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">伪类变体</h1>\n  <div class="max-w-2xl mx-auto space-y-8">\n    <div class="bg-white rounded-xl p-6 shadow">\n      <h2 class="text-xl font-semibold mb-4">first: 和 last:</h2>\n      <ul class="space-y-2">\n        <li class="p-3 bg-blue-50 first:bg-blue-100 first:rounded-t-lg last:bg-green-50 last:rounded-b-lg">第一个 - first:bg-blue-100</li>\n        <li class="p-3 bg-blue-50">中间项</li>\n        <li class="p-3 bg-blue-50 last:bg-green-50 last:rounded-b-lg">最后一个 - last:bg-green-50</li>\n      </ul>\n    </div>\n    <div class="bg-white rounded-xl p-6 shadow">\n      <h2 class="text-xl font-semibold mb-4">odd: 和 even:</h2>\n      <ul class="space-y-2">\n        <li class="p-3 odd:bg-gray-50">奇数行 - odd:bg-gray-50</li>\n        <li class="p-3 odd:bg-gray-50">偶数行</li>\n        <li class="p-3 odd:bg-gray-50">奇数行</li>\n        <li class="p-3 odd:bg-gray-50">偶数行</li>\n      </ul>\n    </div>\n  </div>\n</div>',
        hints: ['使用 first: 第一项样式', '使用 last: 最后一项样式', '使用 odd:/even: 奇偶样式']
      },
      {
        id: 'mix-blend',
        title: '混合模式',
        module: 'advanced',
        moduleTitle: '高级技巧',
        content: '# 混合模式\n\n使用 mix-blend 实现创意效果。\n\n## 常用模式\n\n- mix-blend-multiply - 正片叠底\n- mix-blend-screen - 滤色\n- mix-blend-overlay - 叠加\n- mix-blend-difference - 差值',
        initialCode: '<div class="p-8">\n  <div class="w-32 h-32 bg-blue-500"></div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">混合模式</h1>\n  <div class="grid grid-cols-4 gap-8">\n    <div class="relative">\n      <div class="absolute inset-0 bg-red-500 rounded-full"></div>\n      <div class="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply opacity-75"></div>\n      <div class="h-32 flex items-center justify-center text-white font-bold">multiply</div>\n    </div>\n    <div class="relative">\n      <div class="absolute inset-0 bg-yellow-400 rounded-full"></div>\n      <div class="absolute inset-0 bg-blue-500 rounded-full mix-blend-screen opacity-75"></div>\n      <div class="h-32 flex items-center justify-center text-white font-bold">screen</div>\n    </div>\n    <div class="relative">\n      <div class="absolute inset-0 bg-pink-500 rounded-full"></div>\n      <div class="absolute inset-0 bg-blue-500 rounded-full mix-blend-overlay opacity-75"></div>\n      <div class="h-32 flex items-center justify-center text-white font-bold">overlay</div>\n    </div>\n    <div class="relative">\n      <div class="absolute inset-0 bg-purple-500 rounded-full"></div>\n      <div class="absolute inset-0 bg-green-500 rounded-full mix-blend-difference opacity-75"></div>\n      <div class="h-32 flex items-center justify-center text-white font-bold">difference</div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 mix-blend- 设置混合模式', '使用 opacity- 控制透明度', '使用 absolute 定位']
      },
      {
        id: 'gradients',
        title: '渐变与背景',
        module: 'advanced',
        moduleTitle: '高级技巧',
        content: '# 渐变与背景\n\nTailwind 的渐变功能非常强大。\n\n## 线性渐变\n\nbg-gradient-to-{direction}\n\n方向: t, tr, r, br, b, bl, l, tl\n\n## 多重渐变\n\nfrom-{color} via-{color} to-{color}',
        initialCode: '<div class="p-8">\n  <div class="w-32 h-32 bg-blue-500"></div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">渐变与背景</h1>\n  <div class="grid grid-cols-3 gap-6">\n    <div class="h-32 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700"></div>\n    <div class="h-32 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"></div>\n    <div class="h-32 rounded-xl bg-gradient-to-t from-purple-500 to-pink-500"></div>\n    <div class="h-32 rounded-xl bg-gradient-to-l from-green-400 to-blue-500"></div>\n    <div class="h-32 rounded-xl bg-gradient-to-tr from-orange-400 to-pink-600"></div>\n    <div class="h-32 rounded-xl bg-gradient-to-bl from-cyan-400 to-blue-600"></div>\n  </div>\n  <h2 class="text-2xl font-bold mt-12 mb-6">文字渐变</h2>\n  <div class="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">\n    渐变文字效果\n  </div>\n</div>',
        hints: ['使用 bg-gradient-to- 渐变方向', '使用 from- via- to- 设置颜色', '使用 bg-clip-text 文字裁剪']
      }
    ]
  },
  // ==================== 实战项目篇 ====================
  {
    id: 'projects',
    title: '实战项目篇',
    description: '通过项目实践掌握 Tailwind',
    icon: '💼',
    lessons: [
      {
        id: 'landing-page',
        title: 'Landing Page 制作',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# Landing Page 制作\n\n综合运用所学知识制作落地页。\n\n## 页面结构\n\n- Hero 区域\n- 特性介绍\n- 价格展示\n- CTA 按钮\n- 页脚',
        initialCode: '<div class="p-8">\n  <h1>标题</h1>\n</div>',
        solution: '<div class="min-h-screen bg-white">\n  <nav class="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">\n    <div class="text-2xl font-bold text-blue-600">Brand</div>\n    <div class="hidden md:flex gap-6">\n      <a href="#" class="text-gray-600 hover:text-blue-600">特性</a>\n      <a href="#" class="text-gray-600 hover:text-blue-600">价格</a>\n      <a href="#" class="text-gray-600 hover:text-blue-600">关于</a>\n    </div>\n    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">开始</button>\n  </nav>\n  <section class="text-center py-20 px-4">\n    <h1 class="text-5xl font-bold text-gray-900 mb-6">构建美好的网络体验</h1>\n    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">使用 Tailwind CSS 快速构建现代网站，让你的想法变为现实。</p>\n    <div class="flex gap-4 justify-center">\n      <button class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">立即开始</button>\n      <button class="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-lg">了解更多</button>\n    </div>\n  </section>\n  <section class="py-20 bg-gray-50 px-4">\n    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">\n      <div class="bg-white p-8 rounded-xl shadow-sm">\n        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">🚀</div>\n        <h3 class="text-xl font-semibold mb-2">快速开发</h3>\n        <p class="text-gray-600">无需编写自定义 CSS，所有样式都可通过工具类实现。</p>\n      </div>\n      <div class="bg-white p-8 rounded-xl shadow-sm">\n        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-4">💎</div>\n        <h3 class="text-xl font-semibold mb-2">精美好观</h3>\n        <p class="text-gray-600">内置专业设计的默认值，让你的网站看起来更专业。</p>\n      </div>\n      <div class="bg-white p-8 rounded-xl shadow-sm">\n        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-4">⚡</div>\n        <h3 class="text-xl font-semibold mb-2">响应式</h3>\n        <p class="text-gray-600">内置响应式支持，一个网站适配所有设备。</p>\n      </div>\n    </div>\n  </section>\n</div>',
        hints: ['使用 max-w- 限制宽度', '使用 grid-cols- 网格布局', '使用 gap- 间距']
      },
      {
        id: 'dashboard',
        title: '仪表盘布局',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# 仪表盘布局\n\n学习管理后台的常见布局模式。\n\n## 组成部分\n\n- 侧边栏导航\n- 顶部栏\n- 主内容区\n- 卡片组件',
        initialCode: '<div class="p-8">\n  <h1>仪表盘</h1>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 flex">\n  <aside class="w-64 bg-white shadow-lg">\n    <div class="p-6 border-b">\n      <h1 class="text-2xl font-bold text-blue-600">Admin</h1>\n    </div>\n    <nav class="p-4">\n      <a href="#" class="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">\n        <span>📊</span> 仪表盘\n      </a>\n      <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">\n        <span>👥</span> 用户\n      </a>\n      <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">\n        <span>📦</span> 产品\n      </a>\n      <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">\n        <span>📈</span> 统计\n      </a>\n    </nav>\n  </aside>\n  <main class="flex-1">\n    <header class="bg-white shadow-sm px-8 py-4 flex items-center justify-between">\n      <h2 class="text-xl font-semibold">仪表盘</h2>\n      <div class="flex items-center gap-4">\n        <button class="p-2 hover:bg-gray-100 rounded">🔔</button>\n        <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>\n      </div>\n    </header>\n    <div class="p-8">\n      <div class="grid grid-cols-4 gap-6 mb-8">\n        <div class="bg-white p-6 rounded-xl shadow-sm">\n          <p class="text-gray-500 text-sm">总用户</p>\n          <p class="text-3xl font-bold text-gray-900">12,345</p>\n        </div>\n        <div class="bg-white p-6 rounded-xl shadow-sm">\n          <p class="text-gray-500 text-sm">总收入</p>\n          <p class="text-3xl font-bold text-green-600">$98,765</p>\n        </div>\n        <div class="bg-white p-6 rounded-xl shadow-sm">\n          <p class="text-gray-500 text-sm">订单</p>\n          <p class="text-3xl font-bold text-blue-600">1,234</p>\n        </div>\n        <div class="bg-white p-6 rounded-xl shadow-sm">\n          <p class="text-gray-500 text-sm">转化率</p>\n          <p class="text-3xl font-bold text-purple-600">23.5%</p>\n        </div>\n      </div>\n      <div class="bg-white p-6 rounded-xl shadow-sm">\n        <h3 class="text-lg font-semibold mb-4">最近活动</h3>\n        <div class="space-y-4">\n          <div class="flex items-center gap-4 pb-4 border-b">\n            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-text">✓</div>\n            <div>\n              <p class="font-medium">新用户注册</p>\n              <p class="text-sm text-gray-500">2分钟前</p>\n            </div>\n          </div>\n          <div class="flex items-center gap-4 pb-4 border-b">\n            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-text">$</div>\n            <div>\n              <p class="font-medium">新订单产生</p>\n              <p class="text-sm text-gray-500">15分钟前</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>',
        hints: ['使用 flex 布局侧边栏', '使用 grid-cols- 卡片网格', '使用 shadow- 阴影']
      },
      {
        id: 'card-component',
        title: '卡片组件',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# 卡片组件\n\n创建可复用的卡片组件。\n\n## 卡片类型\n\n- 文章卡片\n- 产品卡片\n- 用户卡片\n- 统计卡片',
        initialCode: '<div class="p-8">\n  <div class="border p-4">卡片</div>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">卡片组件</h1>\n  <div class="grid md:grid-cols-3 gap-6">\n    <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">\n      <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-105 transition-transform"></div>\n      <div class="p-6">\n        <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">教程</span>\n        <h3 class="text-xl font-semibold mt-3 group-hover:text-blue-600 transition-colors">Tailwind CSS 入门指南</h3>\n        <p class="text-gray-600 mt-2 text-sm">学习如何使用 Tailwind CSS 构建现代网站...</p>\n        <div class="flex items-center gap-3 mt-4 pt-4 border-t">\n          <div class="w-8 h-8 bg-gray-300 rounded-full"></div>\n          <div class="text-sm text-gray-500">张三 · 2024-01-15</div>\n        </div>\n      </div>\n    </div>\n    <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">\n      <div class="h-48 bg-gradient-to-br from-green-400 to-teal-500 group-hover:scale-105 transition-transform"></div>\n      <div class="p-6">\n        <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">教程</span>\n        <h3 class="text-xl font-semibold mt-3 group-hover:text-green-600 transition-colors">Flexbox 布局详解</h3>\n        <p class="text-gray-600 mt-2 text-sm">深入理解 Flexbox 弹性盒模型的各项属性...</p>\n        <div class="flex items-center gap-3 mt-4 pt-4 border-t">\n          <div class="w-8 h-8 bg-gray-300 rounded-full"></div>\n          <div class="text-sm text-gray-500">李四 · 2024-01-10</div>\n        </div>\n      </div>\n    </div>\n    <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">\n      <div class="h-48 bg-gradient-to-br from-orange-400 to-pink-500 group-hover:scale-105 transition-transform"></div>\n      <div class="p-6">\n        <span class="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">教程</span>\n        <h3 class="text-xl font-semibold mt-3 group-hover:text-orange-600 transition-colors">响应式设计技巧</h3>\n        <p class="text-gray-600 mt-2 text-sm">掌握响应式设计的最佳实践和技巧...</p>\n        <div class="flex items-center gap-3 mt-4 pt-4 border-t">\n          <div class="w-8 h-8 bg-gray-300 rounded-full"></div>\n          <div class="text-sm text-gray-500">王五 · 2024-01-05</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 rounded-xl 圆角', '使用 shadow- 阴影', '使用 group-hover: 组合悬浮']
      },
      {
        id: 'form-design',
        title: '表单设计',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# 表单设计\n\n创建美观且易用的表单。\n\n## 表单元素\n\n- 输入框\n- 下拉选择\n- 复选框\n- 单选按钮\n- 文本域',
        initialCode: '<div class="p-8">\n  <input type="text" class="border p-2" />\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8 flex items-center justify-center">\n  <div class="w-full max-w-md">\n    <div class="bg-white rounded-2xl shadow-xl p-8">\n      <h1 class="text-2xl font-bold text-gray-900 mb-6">创建账户</h1>\n      <form class="space-y-5">\n        <div>\n          <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>\n          <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="请输入用户名" />\n        </div>\n        <div>\n          <label class="block text-sm font-medium text-gray-700 mb-2">邮箱</label>\n          <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="your@email.com" />\n        </div>\n        <div>\n          <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>\n          <input type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="至少8位" />\n        </div>\n        <div class="flex items-center gap-2">\n          <input type="checkbox" id="terms" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />\n          <label for="terms" class="text-sm text-gray-600">我同意服务条款和隐私政策</label>\n        </div>\n        <button type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">\n          注册\n        </button>\n      </form>\n      <p class="text-center text-sm text-gray-500 mt-6">\n        已有账户？<a href="#" class="text-blue-600 hover:underline">立即登录</a>\n      </p>\n    </div>\n  </div>\n</div>',
        hints: ['使用 focus:ring 添加聚焦环', '使用 rounded-lg 圆角', '使用 space-y- 垂直间距']
      },
      {
        id: 'animation-example',
        title: '交互动画',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# 交互动画\n\n使用动画提升用户体验。\n\n## 动画类型\n\n- 页面加载动画\n- 列表项动画\n- 按钮反馈\n- 模态框动画',
        initialCode: '<div class="p-8">\n  <button class="bg-blue-500 text-white p-4">按钮</button>\n</div>',
        solution: '<div class="min-h-screen bg-gray-900 p-8">\n  <h1 class="text-3xl font-bold text-white mb-8">交互动画</h1>\n  <div class="grid md:grid-cols-2 gap-8">\n    <div class="bg-gray-800 rounded-xl p-6">\n      <h2 class="text-xl font-semibold text-white mb-6">按钮动画</h2>\n      <div class="flex flex-wrap gap-4">\n        <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all">Hover Scale</button>\n        <button class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:-translate-y-1 transition-all">Hover Up</button>\n        <button class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">Hover Shadow</button>\n        <button class="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 active:scale-95 transition-all">Click Scale</button>\n      </div>\n    </div>\n    <div class="bg-gray-800 rounded-xl p-6">\n      <h2 class="text-xl font-semibold text-white mb-6">加载动画</h2>\n      <div class="flex gap-8">\n        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>\n        <div class="w-12 h-12 bg-green-500 rounded-full animate-pulse"></div>\n        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin"></div>\n      </div>\n    </div>\n    <div class="bg-gray-800 rounded-xl p-6 md:col-span-2">\n      <h2 class="text-xl font-semibold text-white mb-6">卡片悬浮</h2>\n      <div class="grid md:grid-cols-3 gap-6">\n        <div class="bg-gray-700 rounded-xl p-6 cursor-pointer group hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">\n          <div class="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">1</div>\n          <h3 class="text-white font-semibold">卡片 1</h3>\n          <p class="text-gray-400 text-sm mt-2">悬浮查看效果</p>\n        </div>\n        <div class="bg-gray-700 rounded-xl p-6 cursor-pointer group hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">\n          <div class="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center text-2xl">2</div>\n          <h3 class="text-white font-semibold">卡片 2</h3>\n          <p class="text-gray-400 text-sm mt-2">悬浮查看效果</p>\n        </div>\n        <div class="bg-gray-700 rounded-xl p-6 cursor-pointer group hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">\n          <div class="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center text-2xl">3</div>\n          <h3 class="text-white font-semibold">卡片 3</h3>\n          <p class="text-gray-400 text-sm mt-2">悬浮查看效果</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 hover:scale- 悬浮缩放', '使用 animate-spin 旋转', '使用 transition-all 完整过渡']
      },
      {
        id: 'table-design',
        title: '表格设计',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# 表格设计\n\n创建美观的数据表格。\n\n## 表格元素\n\n- 表头样式\n- 斑马纹\n- 悬浮高亮\n- 响应式表格',
        initialCode: '<div class="p-8">\n  <table class="border">\n    <tr><td>数据</td></tr>\n  </table>\n</div>',
        solution: '<div class="min-h-screen bg-gray-100 p-8">\n  <h1 class="text-3xl font-bold mb-8">表格设计</h1>\n  <div class="bg-white rounded-xl shadow-sm overflow-hidden">\n    <table class="w-full">\n      <thead class="bg-gray-50 border-b">\n        <tr>\n          <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">产品</th>\n          <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">类别</th>\n          <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">价格</th>\n          <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">状态</th>\n          <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">操作</th>\n        </tr>\n      </thead>\n      <tbody class="divide-y divide-gray-100">\n        <tr class="hover:bg-gray-50 transition-colors">\n          <td class="px-6 py-4 text-sm text-gray-900 font-medium">iPhone 15 Pro</td>\n          <td class="px-6 py-4 text-sm text-gray-500">电子产品</td>\n          <td class="px-6 py-4 text-sm text-gray-900">¥8,999</td>\n          <td class="px-6 py-4"><span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">在售</span></td>\n          <td class="px-6 py-4"><button class="text-blue-600 hover:text-blue-800 text-sm font-medium">编辑</button></td>\n        </tr>\n        <tr class="hover:bg-gray-50 transition-colors">\n          <td class="px-6 py-4 text-sm text-gray-900 font-medium">MacBook Air</td>\n          <td class="px-6 py-4 text-sm text-gray-500">电子产品</td>\n          <td class="px-6 py-4 text-sm text-gray-900">¥9,499</td>\n          <td class="px-6 py-4"><span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">在售</span></td>\n          <td class="px-6 py-4"><button class="text-blue-600 hover:text-blue-800 text-sm font-medium">编辑</button></td>\n        </tr>\n        <tr class="hover:bg-gray-50 transition-colors">\n          <td class="px-6 py-4 text-sm text-gray-900 font-medium">AirPods Pro</td>\n          <td class="px-6 py-4 text-sm text-gray-500">音频设备</td>\n          <td class="px-6 py-4 text-sm text-gray-900">¥1,899</td>\n          <td class="px-6 py-4"><span class="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">预售</span></td>\n          <td class="px-6 py-4"><button class="text-blue-600 hover:text-blue-800 text-sm font-medium">编辑</button></td>\n        </tr>\n        <tr class="hover:bg-gray-50 transition-colors">\n          <td class="px-6 py-4 text-sm text-gray-900 font-medium">iPad Pro</td>\n          <td class="px-6 py-4 text-sm text-gray-500">平板电脑</td>\n          <td class="px-6 py-4 text-sm text-gray-900">¥6,999</td>\n          <td class="px-6 py-4"><span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">缺货</span></td>\n          <td class="px-6 py-4"><button class="text-blue-600 hover:text-blue-800 text-sm font-medium">编辑</button></td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>',
        hints: ['使用 divide-y 分隔线', '使用 hover:bg- 悬浮高亮', '使用 rounded-full 圆角标签']
      },
      {
        id: 'navbar',
        title: '导航栏制作',
        module: 'projects',
        moduleTitle: '实战项目篇',
        content: '# 导航栏制作\n\n创建响应式导航栏。\n\n## 导航栏要素\n\n- Logo\n- 导航链接\n- 搜索框\n- 移动端菜单\n- 下拉菜单',
        initialCode: '<div class="p-8">\n  <nav>\n    <a href="#">链接</a>\n  </nav>\n</div>',
        solution: '<div class="min-h-screen bg-white">\n  <nav class="bg-white border-b sticky top-0 z-50">\n    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\n      <div class="flex justify-between h-16">\n        <div class="flex items-center">\n          <a href="#" class="flex items-center gap-2">\n            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">\n              <span class="text-white font-bold text-sm">T</span>\n            </div>\n            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tailwind</span>\n          </a>\n          <div class="hidden md:flex ml-10 gap-8">\n            <a href="#" class="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">首页</a>\n            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">产品</a>\n            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">解决方案</a>\n            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">定价</a>\n            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">关于</a>\n          </div>\n        </div>\n        <div class="flex items-center gap-4">\n          <div class="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">\n            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>\n            <input type="text" placeholder="搜索..." class="bg-transparent border-none outline-none ml-2 text-sm w-40" />\n          </div>\n          <button class="hidden md:flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">\n            登录\n          </button>\n          <button class="md:hidden p-2 hover:bg-gray-100 rounded-lg">\n            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>\n          </button>\n        </div>\n      </div>\n    </div>\n  </nav>\n  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">\n    <h1 class="text-4xl font-bold text-gray-900 mb-4">欢迎使用 Tailwind CSS</h1>\n    <p class="text-xl text-gray-600 max-w-2xl">快速构建现代网站的首选 CSS 框架，无需离开 HTML，即可实现精美设计。</p>\n  </div>\n</div>',
        hints: ['使用 sticky top-0 粘性定位', '使用 hidden md:flex 响应式显示', '使用 bg-clip-text 文字渐变']
      }
    ]
  },
  // ==================== 工具链与生态 ====================
  {
    id: 'tools',
    title: '工具链与生态',
    description: '掌握 Tailwind 生态工具',
    icon: '🛠️',
    lessons: [
      {
        id: 'vscode-ext',
        title: 'VS Code 插件',
        module: 'tools',
        moduleTitle: '工具链与生态',
        content: '# VS Code 插件\n\n推荐提升开发效率的 VS Code 插件。\n\n## 必装插件\n\n1. Tailwind CSS IntelliSense\n2. Headwind\n3. Tailwind Shades\n\n## 配置建议\n\n启用自定义类名提示和颜色预览。',
        initialCode: '<div class="p-8">\n  <h1>VS Code 插件</h1>\n</div>',
        solution: '<div class="min-h-screen bg-gray-50 p-8">\n  <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">VS Code 插件推荐</h1>\n  <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">\n    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">\n      <div class="flex items-center gap-4 mb-4">\n        <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🎨</div>\n        <div>\n          <h3 class="font-semibold text-gray-800">Tailwind CSS IntelliSense</h3>\n          <p class="text-sm text-gray-500">官方插件</p>\n        </div>\n      </div>\n      <ul class="space-y-2 text-sm text-gray-600">\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 智能提示</li>\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 颜色预览</li>\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 类名重命名</li>\n      </ul>\n    </div>\n    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">\n      <div class="flex items-center gap-4 mb-4">\n        <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">💨</div>\n        <div>\n          <h3 class="font-semibold text-gray-800">Headwind</h3>\n          <p class="text-sm text-gray-500">类名排序</p>\n        </div>\n      </div>\n      <ul class="space-y-2 text-sm text-gray-600">\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 自动排序</li>\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 可配置规则</li>\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 快速格式化</li>\n      </ul>\n    </div>\n    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">\n      <div class="flex items-center gap-4 mb-4">\n        <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">🎭</div>\n        <div>\n          <h3 class="font-semibold text-gray-800">Tailwind Shades</h3>\n          <p class="text-sm text-gray-500">颜色生成</p>\n        </div>\n      </div>\n      <ul class="space-y-2 text-sm text-gray-600">\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 一键生成色阶</li>\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 复制到剪贴板</li>\n        <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 自定义配置</li>\n      </ul>\n    </div>\n  </div>\n</div>',
        hints: ['使用 grid-cols- 网格布局', '使用 shadow- 阴影', '使用 hover: 悬浮效果']
      },
      {
        id: 'component-libraries',
        title: '与组件库集成',
        module: 'tools',
        moduleTitle: '工具链与生态',
        content: '# 与组件库集成\n\nTailwind 可以与主流组件库完美配合。\n\n## 常见组合\n\n- Tailwind + React\n- Tailwind + Vue\n- Tailwind + UI 库\n\n## 整合策略\n\n1. 使用基础样式\n2. 覆盖默认样式\n3. 创建主题配置',
        initialCode: '<div class="p-8">\n  <button class="px-4 py-2 bg-blue-500 text-white">按钮</button>\n</div>',
        solution: '<div class="min-h-screen bg-gray-50 py-16">\n  <div class="max-w-4xl mx-auto px-4">\n    <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">与组件库集成</h1>\n    <div class="grid md:grid-cols-2 gap-6">\n      <div class="bg-white rounded-xl shadow-sm p-6">\n        <div class="flex items-center gap-4 mb-4">\n          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>\n          <div>\n            <h3 class="font-semibold text-gray-800">React + Tailwind</h3>\n            <p class="text-sm text-gray-500">现代 React 开发</p>\n          </div>\n        </div>\n        <div class="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">\n          <span class="text-purple-400">import</span> Button <span class="text-purple-400">from</span> <span class="text-green-400">./Button</span>;<br/><br/>\n          <span class="text-gray-500">// 使用 Tailwind</span><br/>\n          &lt;Button className=<span class="text-green-400">"bg-blue-500"</span> /&gt;\n        </div>\n      </div>\n      <div class="bg-white rounded-xl shadow-sm p-6">\n        <div class="flex items-center gap-4 mb-4">\n          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>\n          <div>\n            <h3 class="font-semibold text-gray-800">Vue + Tailwind</h3>\n            <p class="text-sm text-gray-500">渐进式框架</p>\n          </div>\n        </div>\n        <div class="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">\n          <span class="text-purple-400">&lt;template&gt;</span><br/>\n          &nbsp;&nbsp;&lt;button <span class="text-blue-300">class</span>=<span class="text-green-400">"bg-green-500"</span>&gt;<br/>\n          &nbsp;&nbsp;&nbsp;&nbsp;Click me<br/>\n          &nbsp;&nbsp;&lt;/button&gt;<br/>\n          <span class="text-purple-400">&lt;/template&gt;</span>\n        </div>\n      </div>\n    </div>\n    <div class="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">\n      <h2 class="text-2xl font-bold mb-2">最佳实践</h2>\n      <p>使用 clsx 和 tailwind-merge 管理类名，避免冲突</p>\n    </div>\n  </div>\n</div>',
        hints: ['使用 grid-cols- 网格', '使用 font-mono 等宽字体', '使用 gradient 渐变']
      },
      {
        id: 'utility-functions',
        title: '常用工具函数',
        module: 'tools',
        moduleTitle: '工具链与生态',
        content: '# 常用工具函数\n\n推荐配合 Tailwind 使用的工具函数库。\n\n## clsx\n\n条件类名组合库。\n\n## tailwind-merge\n\n合并冲突的 Tailwind 类名。\n\n## cn 函数\n\n组合 clsx 和 tailwind-merge 的最佳实践。',
        initialCode: '<div class="p-8">\n  <button class="px-4 py-2 bg-blue-500 text-white">按钮</button>\n</div>',
        solution: '<div class="min-h-screen bg-gray-50 py-16">\n  <div class="max-w-4xl mx-auto px-4">\n    <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">常用工具函数</h1>\n    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">\n      <div class="flex items-center gap-3 mb-4">\n        <span class="text-3xl">🔀</span>\n        <div>\n          <h3 class="font-semibold text-gray-800">clsx</h3>\n          <p class="text-sm text-gray-500">条件类名组合</p>\n        </div>\n      </div>\n      <div class="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm mb-4">\n        <span class="text-purple-400">import</span> clsx <span class="text-purple-400">from</span> <span class="text-green-400">clsx</span>;<br/><br/>\n        clsx(<span class="text-green-400">base</span>, isActive &amp;&amp; <span class="text-green-400">active</span>)\n      </div>\n      <div class="flex gap-2">\n        <button class="px-4 py-2 bg-blue-500 text-white rounded">按钮</button>\n        <button class="px-4 py-2 bg-blue-500/50 text-white/50 rounded cursor-not-allowed">禁用</button>\n      </div>\n    </div>\n    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">\n      <div class="flex items-center gap-3 mb-4">\n        <span class="text-3xl">🔄</span>\n        <div>\n          <h3 class="font-semibold text-gray-800">tailwind-merge</h3>\n          <p class="text-sm text-gray-500">冲突类名自动合并</p>\n        </div>\n      </div>\n      <div class="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm mb-4">\n        <span class="text-purple-400">import</span> { twMerge } <span class="text-purple-400">from</span> <span class="text-green-400">tailwind-merge</span>;<br/><br/>\n        twMerge(<span class="text-green-400">px-2 py-1</span>, <span class="text-green-400">p-3</span>)<br/>\n        <span class="text-gray-500">// p-3 (后面的覆盖前面的)</span>\n      </div>\n    </div>\n    <div class="bg-white rounded-xl shadow-sm p-6">\n      <div class="flex items-center gap-3 mb-4">\n        <span class="text-3xl">⚡</span>\n        <div>\n          <h3 class="font-semibold text-gray-800">cn - 最佳实践</h3>\n          <p class="text-sm text-gray-500">组合 clsx 和 tailwind-merge</p>\n        </div>\n      </div>\n      <div class="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">\n        <span class="text-purple-400">import</span> clsx <span class="text-purple-400">from</span> <span class="text-green-400">clsx</span>;<br/>\n        <span class="text-purple-400">import</span> { twMerge } <span class="text-purple-400">from</span> <span class="text-green-400">tailwind-merge</span>;<br/><br/>\n        <span class="text-purple-400">export</span> <span class="text-blue-400">function</span> cn(<span class="text-yellow-300">...inputs</span>) {<br/>\n        &nbsp;&nbsp;<span class="text-purple-400">return</span> twMerge(clsx(inputs));<br/>\n        }\n      </div>\n    </div>\n  </div>\n</div>',
        hints: ['使用 bg-blue-500/50 透明度', '使用 text-white/50 文字透明度', '使用 cursor-not-allowed 禁用游标']
      }
    ]
  }
];
