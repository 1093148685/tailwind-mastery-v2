import { useState } from 'react';
import { BookMarked, X, Copy, Check } from 'lucide-react';

interface CheatSheetProps {
  onClose: () => void;
  onInsert: (code: string) => void;
}

const cheatSheetData = [
  {
    category: '间距',
    items: [
      { class: 'm-4', desc: '外边距 all' },
      { class: 'mt-4', desc: '上边距 top' },
      { class: 'mb-4', desc: '下边距 bottom' },
      { class: 'ml-4', desc: '左边距 left' },
      { class: 'mr-4', desc: '右边距 right' },
      { class: 'mx-4', desc: '水平边距 x' },
      { class: 'my-4', desc: '垂直边距 y' },
      { class: 'p-4', desc: '内边距 all' },
      { class: 'gap-4', desc: '间距' },
    ]
  },
  {
    category: 'Flexbox',
    items: [
      { class: 'flex', desc: '弹性容器' },
      { class: 'flex-col', desc: '垂直排列' },
      { class: 'flex-row', desc: '水平排列' },
      { class: 'items-center', desc: '垂直居中' },
      { class: 'justify-center', desc: '水平居中' },
      { class: 'justify-between', desc: '两端对齐' },
      { class: 'flex-wrap', desc: '换行' },
      { class: 'flex-1', desc: '自动填充' },
    ]
  },
  {
    category: 'Grid',
    items: [
      { class: 'grid', desc: '网格容器' },
      { class: 'grid-cols-3', desc: '3列网格' },
      { class: 'grid-cols-4', desc: '4列网格' },
      { class: 'col-span-2', desc: '跨2列' },
      { class: 'row-span-2', desc: '跨2行' },
    ]
  },
  {
    category: '颜色',
    items: [
      { class: 'text-red-500', desc: '红色文字' },
      { class: 'bg-blue-500', desc: '蓝色背景' },
      { class: 'border-green-500', desc: '绿色边框' },
      { class: 'text-white', desc: '白色文字' },
      { class: 'bg-black', desc: '黑色背景' },
      { class: 'text-gray-500', desc: '灰色文字' },
    ]
  },
  {
    category: '字体',
    items: [
      { class: 'text-xs', desc: '超小' },
      { class: 'text-sm', desc: '小' },
      { class: 'text-base', desc: '默认' },
      { class: 'text-lg', desc: '大' },
      { class: 'text-xl', desc: '特大' },
      { class: 'text-2xl', desc: '2倍大' },
      { class: 'text-3xl', desc: '3倍大' },
      { class: 'font-bold', desc: '粗体' },
      { class: 'font-medium', desc: '中等' },
      { class: 'italic', desc: '斜体' },
    ]
  },
  {
    category: '圆角',
    items: [
      { class: 'rounded', desc: '小圆角' },
      { class: 'rounded-md', desc: '中等圆角' },
      { class: 'rounded-lg', desc: '大圆角' },
      { class: 'rounded-full', desc: '圆形' },
      { class: 'rounded-t-lg', desc: '上圆角' },
    ]
  },
  {
    category: '阴影',
    items: [
      { class: 'shadow-sm', desc: '小阴影' },
      { class: 'shadow', desc: '默认阴影' },
      { class: 'shadow-md', desc: '中阴影' },
      { class: 'shadow-lg', desc: '大阴影' },
      { class: 'shadow-xl', desc: '超大阴影' },
    ]
  },
  {
    category: '动画',
    items: [
      { class: 'transition', desc: '过渡效果' },
      { class: 'duration-300', desc: '300ms过渡' },
      { class: 'hover:scale-105', desc: '悬浮放大' },
      { class: 'hover:bg-blue-600', desc: '悬浮变色' },
      { class: 'animate-spin', desc: '旋转动画' },
      { class: 'animate-pulse', desc: '脉冲动画' },
    ]
  },
  {
    category: '响应式',
    items: [
      { class: 'sm:text-sm', desc: '小屏字体' },
      { class: 'md:flex', desc: '中屏显示' },
      { class: 'lg:grid-cols-4', desc: '大屏4列' },
      { class: 'xl:hidden', desc: '超大屏隐藏' },
    ]
  }
];

export function CheatSheet({ onClose, onInsert }: CheatSheetProps) {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);

  const copyClass = (cls: string) => {
    navigator.clipboard.writeText(cls);
    setCopiedClass(cls);
    setTimeout(() => setCopiedClass(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-4xl max-h-[85vh] bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2 text-white">
            <BookMarked className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Tailwind CSS 速查表</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {cheatSheetData.map(section => (
              <div key={section.category} className="bg-slate-700/30 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">{section.category}</h3>
                <div className="space-y-1">
                  {section.items.map(item => (
                    <div
                      key={item.class}
                      className="flex items-center justify-between group cursor-pointer hover:bg-slate-700/50 rounded px-2 py-1 -mx-2"
                      onClick={() => copyClass(item.class)}
                    >
                      <code className="text-xs text-green-400 font-mono">{item.class}</code>
                      <span className="text-xs text-slate-400">{item.desc}</span>
                      {copiedClass === item.class ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-500">
          点击任意类名即可复制
        </div>
      </div>
    </div>
  );
}
