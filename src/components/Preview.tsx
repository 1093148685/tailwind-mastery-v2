import { useRef, useEffect, useState } from 'react';
import { RefreshCw, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

interface PreviewProps {
  code: string;
  cssCode?: string;
  tailwindVersion?: 'v3' | 'v4';
  framework?: 'tailwind' | 'elementplus' | 'vue3';
}

function generateElementPlusHTML(htmlCode: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/element-plus/dist/index.full.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); }
    #app { font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; }
  </style>
</head>
<body>
  <div id="app">
    ${htmlCode}
  </div>
  <script>
    const { createApp, ref, reactive } = Vue;
    
    const app = createApp({
      setup() {
        const visible = ref(false);
        const dialogVisible = ref(false);
        const formVisible = ref(false);
        const centerVisible = ref(false);
        const nestVisible = ref(false);
        const innerVisible = ref(false);
        
        const form = reactive({
          username: '', password: '', email: '', desc: '', disabled: '',
          name: '', address: '', phone: '', gender: '', hobby: [], city: '', bio: '', confirmPassword: '',
          date: '', daterange: '', month: '', year: '', time: '',
          multiple: [], search: ''
        });
        
        const active = ref(0);
        const percentage = ref(50);
        
        const options = ref([
          { value: 'Option1', label: '选项1' },
          { value: 'Option2', label: '选项2' },
          { value: 'Option3', label: '选项3' },
          { value: 'Option4', label: '选项4' },
          { value: 'Option5', label: '选项5' }
        ]);
        
        const increase = () => { percentage.value = Math.min(100, percentage.value + 10); };
        const decrease = () => { percentage.value = Math.max(0, percentage.value - 10); };
        
        const activeTab = ref('first');
        
        const handleClick = () => ElementPlus.ElMessage.success('点击成功');
        
        const rules = {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        };
        
        const tableData = ref([
          { date: '2024-01-01', name: '张三', address: '北京市朝阳区', status: '成功' },
          { date: '2024-01-02', name: '李四', address: '上海市浦东新区', status: '处理中' },
          { date: '2024-01-03', name: '王五', address: '广州市天河区', status: '成功' },
          { date: '2024-01-04', name: '赵六', address: '深圳市南山区', status: '处理中' },
          { date: '2024-01-05', name: '钱七', address: '杭州市西湖区', status: '成功' }
        ]);
        
        const showMessage = () => ElementPlus.ElMessage.success('操作成功');
        const success = () => ElementPlus.ElMessage.success('成功信息');
        const warning = () => ElementPlus.ElMessage.warning('警告信息');
        const error = () => ElementPlus.ElMessage.error('错误信息');
        const info = () => ElementPlus.ElMessage.info('普通信息');
        
        const customDuration = () => ElementPlus.ElMessage({ message: '3秒后消失', duration: 3000 });
        const withClose = () => ElementPlus.ElMessage({ message: '可关闭', showClose: true });
        const centerText = () => ElementPlus.ElMessage({ message: '居中文字', center: true });
        const htmlContent = () => ElementPlus.ElMessage({ message: '<strong>加粗文字</strong>', dangerouslyUseHTMLString: true });
        
        const basic = () => ElementPlus.ElNotification({ title: '提示', message: '这是一条通知' });
        const successNotify = () => ElementPlus.ElNotification({ title: '成功', message: '操作成功', type: 'success' });
        const warningNotify = () => ElementPlus.ElNotification({ title: '警告', message: '警告信息', type: 'warning' });
        const dangerNotify = () => ElementPlus.ElNotification({ title: '错误', message: '操作失败', type: 'error' });
        
        const topRight = () => ElementPlus.ElNotification({ title: '右上角', message: '右上角通知', position: 'top-right' });
        const topLeft = () => ElementPlus.ElNotification({ title: '左上角', message: '左上角通知', position: 'top-left' });
        const bottomRight = () => ElementPlus.ElNotification({ title: '右下角', message: '右下角通知', position: 'bottom-right' });
        const bottomLeft = () => ElementPlus.ElNotification({ title: '左下角', message: '左下角通知', position: 'bottom-left' });
        
        const submit = () => ElementPlus.ElMessage.success('提交成功');
        const submitForm = () => ElementPlus.ElMessage.success('表单提交成功');
        const resetForm = () => ElementPlus.ElMessage.info('已重置');
        const handleEdit = (row) => ElementPlus.ElMessage.success('编辑: ' + row.name);
        const handleDelete = (row) => ElementPlus.ElMessage.warning('删除: ' + row.name);
        
        return {
          visible, dialogVisible, formVisible, centerVisible, nestVisible, innerVisible,
          form, rules, tableData, showMessage, success, warning, error, info,
          customDuration, withClose, centerText, htmlContent,
          basic, successNotify, warningNotify, dangerNotify,
          topRight, topLeft, bottomRight, bottomLeft,
          submit, submitForm, resetForm, handleEdit, handleDelete,
          active, percentage, increase, decrease, options, activeTab, handleClick
        };
      }
    });
    
    app.use(ElementPlus);
    app.mount('#app');
  </script>
</body>
</html>`;
}

function generateVue3HTML(htmlCode: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; }
    #app { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div id="app">
    ${htmlCode}
  </div>
  <script>
    const { createApp, ref, reactive, computed, watch, onMounted, onUpdated, watchEffect } = Vue;
    
    const app = createApp({
      setup() {
        const message = ref('Hello Vue3!');
        const count = ref(0);
        const inputValue = ref('');
        const firstName = ref('');
        const lastName = ref('');
        const price = ref(100);
        const quantity = ref(2);
        const keyword = ref('');
        const history = ref([]);
        const watchCount = ref(0);
        const show = ref(true);
        const type = ref('A');
        const fruits = ref(['苹果', '香蕉', '橙子', '葡萄', '西瓜']);
        const users = ref([
          { id: 1, name: '张三', email: 'zhangsan@example.com', online: true },
          { id: 2, name: '李四', email: 'lisi@example.com', online: false },
          { id: 3, name: '王五', email: 'wangwu@example.com', online: true }
        ]);
        const emoji = ref('😀');
        const emojiList = ['😀', '😂', '😊', '😍', '🤔', '😎', '🥳', '🤩', '😇', '🙃'];
        const stats = ref({ views: 0, likes: 0, comments: 0 });
        const logs = ref([]);
        
        const fullName = computed(() => firstName.value + ' ' + lastName.value);
        const total = computed(() => price.value * quantity.value);
        
        watch(keyword, (newVal) => {
          if (newVal) {
            history.value.push(newVal);
          }
        });
        
        watch(count, () => {
          watchCount.value++;
        });
        
        watchEffect(() => {
          logs.value = ['组件已创建'];
        });
        
        onMounted(() => {
          logs.value.push('onMounted: 组件已挂载');
        });
        
        onUpdated(() => {
          logs.value.push('onUpdated: 组件已更新');
        });
        
        const randomEmoji = () => {
          emoji.value = emojiList[Math.floor(Math.random() * emojiList.length)];
        };
        
        const showAlert = (msg) => {
          alert(msg);
        };
        
        return {
          message, count, inputValue, firstName, lastName, price, quantity,
          fullName, total, keyword, history, watchCount, show, type,
          fruits, users, emoji, randomEmoji, showAlert, stats, logs
        };
      }
    });
    
    app.mount('#app');
  </script>
</body>
</html>`;
}

function generateTailwindHTML(htmlCode: string, customCss: string, version: 'v3' | 'v4'): string {
  let themeConfig = '';
  let finalCss = '';

  if (version === 'v4') {
    const themeMatch = customCss.match(/@theme\s*\{([\s\S]*?)\}/);
    if (themeMatch) {
      const themeContent = themeMatch[1];
      const colors: Record<string, any> = {};
      const fontFamily: Record<string, string[]> = {};
      
      const lines = themeContent.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('/*')) continue;
        
        if (trimmed.startsWith('--')) {
          const colonIndex = trimmed.indexOf(':');
          if (colonIndex > 0) {
            const propName = trimmed.substring(0, colonIndex).trim();
            const propValue = trimmed.substring(colonIndex + 1).replace(';', '').trim();

            if (propName.startsWith('--color-')) {
              const name = propName.replace('--color-', '');
              const shadeMatch = name.match(/^(.+)-(\d+)$/);
              if (shadeMatch) {
                const [, baseName, shade] = shadeMatch;
                if (!colors[baseName]) colors[baseName] = {};
                colors[baseName][shade] = propValue;
              } else {
                colors[name] = propValue;
              }
            } else if (propName.startsWith('--font-')) {
              const name = propName.replace('--font-', '');
              fontFamily[name] = [propValue, 'sans-serif'];
            }
          }
        }
      }

      const configParts: string[] = [];
      if (Object.keys(colors).length > 0) configParts.push(`colors: ${JSON.stringify(colors)}`);
      if (Object.keys(fontFamily).length > 0) configParts.push(`fontFamily: ${JSON.stringify(fontFamily)}`);
      if (configParts.length > 0) themeConfig = configParts.join(',\n      ');
    }

    finalCss = customCss
      .replace(/@import\s+"tailwindcss";?\s*/g, '')
      .replace(/@theme\s*\{[\s\S]*?\}/g, '')
      .trim();
  } else {
    finalCss = customCss;
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      ${themeConfig ? `theme: { extend: { ${themeConfig} } }` : `theme: { extend: { colors: { primary: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' } } } }`}
    }
  </script>
  ${finalCss ? `<style>${finalCss}</style>` : ''}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); }
    .dark body { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.7); }
  </style>
</head>
<body>
  <div id="preview-content">${htmlCode}</div>
  <script>
    window.addEventListener('message', (event) => {
      if (event.data.type === 'update') document.body.innerHTML = event.data.html;
    });
    window.onerror = function(message, source, lineno, colno, error) {
      parent.postMessage({ type: 'error', message: message }, '*');
    };
    window.addEventListener('load', function() {
      parent.postMessage({ type: 'dimensions', width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }, '*');
    });
  </script>
</body>
</html>`;
}

export function Preview({ code, cssCode = '', tailwindVersion = 'v4', framework = 'tailwind' }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Update iframe content when code changes
  useEffect(() => {
    if (!iframeRef.current) return;

    setError(null);

    console.log('[Preview] framework:', framework, 'code length:', code.length);
    
    let html;
    if (framework === 'elementplus') {
      html = generateElementPlusHTML(code);
    } else if (framework === 'vue3') {
      html = generateVue3HTML(code);
    } else {
      html = generateTailwindHTML(code, cssCode, tailwindVersion);
    }
    
    console.log('[Preview] generated HTML length:', html.length, 'starts with:', html.substring(0, 100));
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const reader = new FileReader();
    reader.onload = () => {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = reader.result as string;
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    reader.readAsText(blob);
    URL.revokeObjectURL(url);
  }, [code, cssCode, tailwindVersion, framework]);

  // Listen for errors from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'error') {
        setError(event.data.message);
      } else if (event.data?.type === 'dimensions') {
        if (isResizing) {
          setDimensions({ width: event.data.width, height: event.data.height });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isResizing]);

  // Track resize state
  useEffect(() => {
    const handleResizeStart = () => { setIsResizing(true); setDimensions(null); };
    const handleResizeEnd = () => { setIsResizing(false); setTimeout(() => setDimensions(null), 1500); };

    const panelGroup = containerRef.current?.closest('.react-panel-group');
    if (panelGroup) {
      panelGroup.addEventListener('pointerdown', handleResizeStart);
      panelGroup.addEventListener('pointerup', handleResizeEnd);
    }

    return () => {
      if (panelGroup) {
        panelGroup.removeEventListener('pointerdown', handleResizeStart);
        panelGroup.removeEventListener('pointerup', handleResizeEnd);
      }
    };
  }, []);

  const refreshPreview = () => {
    if (!iframeRef.current) return;
    setIsLoading(true);
    let html;
    if (framework === 'elementplus') {
      html = generateElementPlusHTML(code);
    } else if (framework === 'vue3') {
      html = generateVue3HTML(code);
    } else {
      html = generateTailwindHTML(code, cssCode, tailwindVersion);
    }
    const blob = new Blob([html], { type: 'text/html' });
    const reader = new FileReader();
    reader.onload = () => {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = reader.result as string;
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    reader.readAsText(blob);
  };

  const openInNewTab = () => {
    let html;
    if (framework === 'elementplus') {
      html = generateElementPlusHTML(code);
    } else if (framework === 'vue3') {
      html = generateVue3HTML(code);
    } else {
      html = generateTailwindHTML(code, cssCode, tailwindVersion);
    }
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div ref={containerRef} className={`relative flex flex-col h-full bg-slate-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-sm text-slate-400">
            {framework === 'elementplus' ? 'ElementPlus 预览' : framework === 'vue3' ? 'Vue3 预览' : '预览'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={refreshPreview} className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white" title="刷新">
            <RefreshCw size={16} />
          </button>
          <button onClick={openInNewTab} className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white" title="新窗口打开">
            <ExternalLink size={16} />
          </button>
          <button onClick={toggleFullscreen} className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white" title={isFullscreen ? '退出全屏' : '全屏'}>
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10">
            <div className="flex flex-col items-center gap-3">
              <svg className="h-8 w-8 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-slate-400 text-sm">加载中...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute top-4 left-4 right-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm z-10">
            错误: {error}
          </div>
        )}

        <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" title="Preview" />

        {dimensions && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-slate-800/90 rounded text-xs text-slate-400 font-mono border border-slate-700">
            {dimensions.width} × {dimensions.height}
          </div>
        )}
      </div>
    </div>
  );
}
