import { useState } from 'react';
import { Code, X, Copy, Check } from 'lucide-react';

interface Snippet {
  id: string;
  title: string;
  category: string;
  code: string;
}

const snippets: Snippet[] = [
  {
    id: 'button-primary',
    title: '主要按钮',
    category: '按钮',
    code: '<button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">\n  按钮\n</button>'
  },
  {
    id: 'button-secondary',
    title: '次要按钮',
    category: '按钮',
    code: '<button class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">\n  按钮\n</button>'
  },
  {
    id: 'button-outline',
    title: '边框按钮',
    category: '按钮',
    code: '<button class="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-lg transition-colors">\n  按钮\n</button>'
  },
  {
    id: 'card-basic',
    title: '基础卡片',
    category: '卡片',
    code: '<div class="bg-white rounded-lg shadow-md p-6">\n  <h3 class="text-lg font-semibold text-gray-800">标题</h3>\n  <p class="mt-2 text-gray-600">卡片内容</p>\n</div>'
  },
  {
    id: 'card-dark',
    title: '深色卡片',
    category: '卡片',
    code: '<div class="bg-slate-800 rounded-lg p-6">\n  <h3 class="text-lg font-semibold text-white">标题</h3>\n  <p class="mt-2 text-slate-300">卡片内容</p>\n</div>'
  },
  {
    id: 'input-basic',
    title: '输入框',
    category: '表单',
    code: '<input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="输入内容..." />'
  },
  {
    id: 'flex-center',
    title: 'Flex 居中',
    category: '布局',
    code: '<div class="flex items-center justify-center h-64 bg-gray-100">\n  <div>居中内容</div>\n</div>'
  },
  {
    id: 'flex-between',
    title: 'Flex 两端对齐',
    category: '布局',
    code: '<div class="flex items-center justify-between">\n  <div>左侧</div>\n  <div>右侧</div>\n</div>'
  },
  {
    id: 'grid-basic',
    title: '基础网格',
    category: '布局',
    code: '<div class="grid grid-cols-3 gap-4">\n  <div class="bg-blue-500 h-24 rounded">1</div>\n  <div class="bg-blue-500 h-24 rounded">2</div>\n  <div class="bg-blue-500 h-24 rounded">3</div>\n</div>'
  },
  {
    id: 'badge',
    title: '标签徽章',
    category: '组件',
    code: '<span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">标签</span>'
  },
  {
    id: 'alert',
    title: '警告框',
    category: '组件',
    code: '<div class="p-4 bg-amber-100 border border-amber-400 text-amber-700 rounded-lg">\n  这是一个警告提示\n</div>'
  },
  {
    id: 'avatar',
    title: '头像',
    category: '组件',
    code: '<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" class="w-12 h-12 rounded-full border-2 border-white shadow" />'
  },
  {
    id: 'navbar',
    title: '导航栏',
    category: '布局',
    code: '<nav class="flex items-center justify-between px-6 py-4 bg-white shadow">\n  <div class="text-xl font-bold text-gray-800">Logo</div>\n  <div class="flex gap-4">\n    <a href="#" class="text-gray-600 hover:text-blue-600">首页</a>\n    <a href="#" class="text-gray-600 hover:text-blue-600">关于</a>\n  </div>\n</nav>'
  },
  {
    id: 'hero',
    title: 'Hero 区域',
    category: '布局',
    code: '<div class="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600">\n  <h1 class="text-4xl font-bold text-white">欢迎来到</h1>\n  <p class="mt-4 text-xl text-blue-100">构建美好的网络体验</p>\n  <button class="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50">开始使用</button>\n</div>'
  },
  {
    id: 'text-gradient',
    title: '渐变文字',
    category: '特效',
    code: '<h1 class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">\n  渐变文字效果\n</h1>'
  },
  {
    id: 'shadow-hover',
    title: '悬浮阴影',
    category: '特效',
    code: '<div class="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">\n  悬浮查看阴影效果\n</div>'
  }
];

interface SnippetsLibraryProps {
  onInsert: (code: string) => void;
  onClose: () => void;
}

export function SnippetsLibrary({ onInsert, onClose }: SnippetsLibraryProps) {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [...new Set(snippets.map(s => s.category))];

  const filteredSnippets = search
    ? snippets.filter(s => s.title.includes(search) || s.category.includes(search))
    : snippets;

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-3xl max-h-[80vh] bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2 text-white">
            <Code className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">代码片段库</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-700">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索代码片段..."
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {categories.map(category => {
            const categorySnippets = filteredSnippets.filter(s => s.category === category);
            if (categorySnippets.length === 0) return null;
            return (
              <div key={category} className="mb-4">
                <h3 className="text-sm font-medium text-slate-400 mb-2">{category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categorySnippets.map(snippet => (
                    <div
                      key={snippet.id}
                      className="group bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 cursor-pointer transition-colors"
                      onClick={() => { onInsert(snippet.code); onClose(); }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{snippet.title}</span>
                        <button
                          onClick={e => { e.stopPropagation(); copyToClipboard(snippet.code, snippet.id); }}
                          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-slate-600 rounded transition-all"
                        >
                          {copiedId === snippet.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                      <code className="text-xs text-slate-500 block truncate">{snippet.code.split('\n')[0]}</code>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { snippets };
