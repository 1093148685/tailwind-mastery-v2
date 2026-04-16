import { X, Command } from 'lucide-react';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

const shortcuts = [
  { keys: ['⌘', 'K'], description: '打开搜索' },
  { keys: ['⌘', 'S'], description: '保存当前代码' },
  { keys: ['⌘', 'Enter'], description: '运行代码' },
  { keys: ['⌘', 'B'], description: '切换侧边栏' },
  { keys: ['⌘', 'J'], description: '切换课程面板' },
  { keys: ['⌘', '\\'], description: '切换全屏预览' },
  { keys: ['Escape'], description: '关闭弹窗' },
  { keys: ['↑', '↓'], description: '导航搜索结果' },
  { keys: ['Enter'], description: '选择当前项' },
];

export function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2 text-white">
            <Command className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">快捷键</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-4">
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-300">{shortcut.description}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <kbd
                      key={i}
                      className="px-2 py-1 bg-slate-700 text-slate-200 text-xs font-mono rounded border border-slate-600"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-500">
          Mac 用户使用 ⌘，Windows 用户使用 Ctrl
        </div>
      </div>
    </div>
  );
}
