import { useMemo } from 'react';
import { Lesson } from '../types';
import { FileText, Lightbulb, Code, ArrowRight } from 'lucide-react';

interface LessonContentProps {
  lesson: Lesson;
  onTryCode: () => void;
  onShowSolution: () => void;
  showSolution: boolean;
}

export function LessonContent({ lesson, onTryCode, onShowSolution, showSolution }: LessonContentProps) {
  // Simple markdown to HTML converter
  const htmlContent = useMemo(() => {
    let content = lesson.content;

    // Headers
    content = content.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-6 mb-3">$1</h3>');
    content = content.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mt-8 mb-4">$1</h2>');
    content = content.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-6">$1</h1>');

    // Code blocks
    content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-slate-800 rounded-lg p-4 overflow-x-auto my-4 border border-slate-700"><code class="text-sm font-mono text-slate-200">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    content = content.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-800 text-blue-300 rounded text-sm font-mono">$1</code>');

    // Bold
    content = content.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

    // Italic
    content = content.replace(/\*([^*]+)\*/g, '<em class="text-slate-300">$1</em>');

    // Lists
    content = content.replace(/^\- (.*$)/gim, '<li class="ml-4 text-slate-300 my-1">$1</li>');
    content = content.replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 text-slate-300 my-1 list-decimal">$2</li>');

    // Paragraphs
    content = content.replace(/\n\n/g, '</p><p class="text-slate-300 leading-relaxed my-4">');

    return `<p class="text-slate-300 leading-relaxed my-4">${content}</p>`;
  }, [lesson.content]);

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <span>{lesson.moduleTitle}</span>
          <ArrowRight size={14} />
          <span>当前课程</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Hints */}
        {lesson.hints && lesson.hints.length > 0 && (
          <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <Lightbulb size={18} />
              <span className="font-medium">提示</span>
            </div>
            <ul className="space-y-2">
              {lesson.hints.map((hint, index) => (
                <li key={index} className="text-sm text-amber-200">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex gap-3">
          <button
            onClick={onTryCode}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Code size={18} />
            开始练习
          </button>
          {lesson.solution && (
            <button
              onClick={onShowSolution}
              className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              {showSolution ? '隐藏答案' : '查看答案'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
