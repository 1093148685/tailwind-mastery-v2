import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Module, Lesson } from '../types';

interface SearchModalProps {
  modules: Module[];
  onSelectLesson: (lesson: Lesson) => void;
  onClose: () => void;
}

export function SearchModal({ modules, onSelectLesson, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allLessons = useMemo(() => {
    return modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title })));
  }, [modules]);

  const filteredLessons = useMemo(() => {
    if (!query.trim()) return allLessons.slice(0, 10);
    const q = query.toLowerCase();
    return allLessons.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.content.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, allLessons]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredLessons.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredLessons[selectedIndex]) {
      onSelectLesson(filteredLessons[selectedIndex]);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="搜索课程..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {filteredLessons.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-400">
              没有找到相关课程
            </div>
          ) : (
            filteredLessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => { onSelectLesson(lesson); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  index === selectedIndex ? 'bg-blue-600/30' : 'hover:bg-slate-700/50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{lesson.title}</div>
                  <div className="text-sm text-slate-400 truncate">{lesson.moduleTitle}</div>
                </div>
                {index === selectedIndex && (
                  <span className="text-xs text-slate-500">Enter 选择</span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-700 flex items-center gap-4 text-xs text-slate-500">
          <span>↑↓ 导航</span>
          <span>Enter 选择</span>
          <span>Esc 关闭</span>
        </div>
      </div>
    </div>
  );
}
