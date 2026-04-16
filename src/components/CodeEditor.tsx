import { useRef, useCallback, useState, useEffect } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { Split, Code2 } from 'lucide-react';

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  framework?: 'tailwind' | 'elementplus' | 'vue3';
}

// Default Tailwind v4 CSS template
const DEFAULT_CSS = `@import "tailwindcss";

@theme {
  /* 自定义主题变量 */
  /* 例如:
  --color-primary: #3b82f6;
  --font-sans: 'Inter', sans-serif;
  */
}
`;

export function CodeEditor({
  htmlCode,
  cssCode,
  onHtmlChange,
  onCssChange,
  readOnly = false,
  framework = 'tailwind'
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'split'>('split');
  const [splitDirection, setSplitDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const htmlEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const cssEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  // Get editor language and label based on framework
  const getEditorLanguage = () => {
    if (framework === 'vue3') return 'html';
    if (framework === 'elementplus') return 'html';
    return 'html';
  };

  const getTabLabel = () => {
    if (framework === 'vue3') return 'Vue';
    if (framework === 'elementplus') return 'Vue';
    return 'HTML';
  };

  const showCssTab = framework === 'tailwind';

  // Tailwind CSS classes for autocompletion
  const tailwindClasses = [
    'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden',
    'static', 'relative', 'absolute', 'fixed', 'sticky',
    'inset-0', 'top-0', 'bottom-0', 'left-0', 'right-0',
    'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap',
    'justify-start', 'justify-center', 'justify-between', 'justify-around',
    'items-start', 'items-center', 'items-end',
    'gap-1', 'gap-2', 'gap-4', 'gap-6', 'gap-8',
    'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8',
    'm-0', 'm-1', 'm-2', 'm-4', 'm-auto',
    'mt-0', 'mt-2', 'mt-4', 'mb-2', 'mb-4', 'ml-0', 'ml-2', 'mr-0', 'mr-2',
    'w-full', 'w-auto', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-2/4', 'w-3/4',
    'h-full', 'h-auto', 'h-screen',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
    'font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
    'text-left', 'text-center', 'text-right',
    'uppercase', 'lowercase', 'capitalize',
    'underline', 'line-through', 'no-underline',
    'bg-white', 'bg-black', 'bg-transparent', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300',
    'bg-red-50', 'bg-red-100', 'bg-red-500', 'bg-red-600',
    'bg-blue-50', 'bg-blue-100', 'bg-blue-500', 'bg-blue-600',
    'bg-green-50', 'bg-green-100', 'bg-green-500', 'bg-green-600',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-500',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-500',
    'bg-pink-50', 'bg-pink-100', 'bg-pink-500',
    'text-white', 'text-black', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400',
    'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'text-red-500', 'text-red-600', 'text-blue-500', 'text-blue-600',
    'text-green-500', 'text-green-600', 'text-yellow-500',
    'border', 'border-0', 'border-2', 'border-4',
    'border-white', 'border-black', 'border-gray-200', 'border-gray-300',
    'border-red-500', 'border-blue-500', 'border-green-500',
    'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full',
    'shadow', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-none',
    'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100',
    'hover:bg-', 'hover:text-', 'hover:opacity-', 'hover:shadow-',
    'focus:outline-none', 'focus:ring-', 'focus:ring-offset-',
    'transition', 'transition-all', 'transition-colors', 'transition-opacity',
    'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300',
    'animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce',
    'cursor-pointer', 'cursor-default', 'cursor-not-allowed',
    'overflow-hidden', 'overflow-auto', 'overflow-scroll',
    'whitespace-nowrap', 'whitespace-pre',
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'col-span-1', 'col-span-2', 'col-span-3',
    'dark:bg-', 'dark:text-', 'dark:border-',
  ];

  const handleHtmlEditorMount: OnMount = useCallback((editor, monaco) => {
    htmlEditorRef.current = editor;

    // Configure editor
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      renderLineHighlight: 'line',
      tabSize: 2,
      automaticLayout: true,
      wordWrap: 'on',
      padding: { top: 16, bottom: 16 },
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
    });

    // Define theme
    monaco.editor.defineTheme('tailwind-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280' },
        { token: 'keyword', foreground: 'c084fc' },
        { token: 'string', foreground: '86efac' },
        { token: 'number', foreground: 'fcd34d' },
        { token: 'tag', foreground: 'f87171' },
        { token: 'attribute.name', foreground: '60a5fa' },
        { token: 'attribute.value', foreground: '86efac' },
      ],
      colors: {
        'editor.background': '#1e1e2e',
        'editor.foreground': '#cdd6f4',
        'editor.lineHighlightBackground': '#313244',
        'editor.selectionBackground': '#45475a',
      },
    });
    monaco.editor.setTheme('tailwind-dark');

    // Tailwind CSS autocompletion for HTML
    monaco.languages.registerCompletionItemProvider('html', {
      triggerCharacters: ['"', ' '],
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const classMatch = textUntilPosition.match(/class=["'][^"']*$/);
        const lastWordMatch = textUntilPosition.match(/(\S+)$/);

        if (!classMatch && !lastWordMatch) {
          return { suggestions: [] };
        }

        const word = model.getWordUntilPosition(position);
        const filterText = classMatch ? '' : (lastWordMatch ? lastWordMatch[1] : '');

        const suggestions = tailwindClasses
          .filter(cls => filterText === '' || cls.toLowerCase().includes(filterText.toLowerCase()))
          .slice(0, 30)
          .map((cls) => ({
            label: cls,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: cls,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
            detail: 'Tailwind CSS',
          }));

        return { suggestions };
      },
    });

    // HTML tag auto-close
    editor.onKeyDown((e) => {
      if (e.keyCode === monaco.KeyCode.Enter) {
        const model = editor.getModel();
        const position = editor.getPosition();
        if (!model || !position) return;

        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const tagMatch = textUntilPosition.match(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\s*$/);

        if (tagMatch) {
          e.preventDefault();
          const isClosingTag = tagMatch[1] === '/';
          const tagName = tagMatch[2];

          if (isClosingTag) {
            editor.executeEdits('auto-close-tag', [{
              range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
              text: '>',
            }]);
          } else {
            editor.executeEdits('auto-close-tag', [{
              range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
              text: `></${tagName}>`,
            }]);
            editor.setPosition({ lineNumber: position.lineNumber, column: position.column + tagName.length + 2 });
          }
        }
      }
    });

    editor.focus();
  }, []);

  const handleCssEditorMount: OnMount = useCallback((editor, monaco) => {
    cssEditorRef.current = editor;

    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      renderLineHighlight: 'line',
      tabSize: 2,
      automaticLayout: true,
      wordWrap: 'on',
      padding: { top: 16, bottom: 16 },
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
    });

    monaco.editor.setTheme('tailwind-dark');

    editor.focus();
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#1e1e2e]">
      {/* Tab Bar */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-800 border-b border-slate-700 overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('html')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'html'
                ? 'bg-blue-500/20 text-blue-400 font-medium'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {getTabLabel()}
          </button>
          {showCssTab && (
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'css'
                  ? 'bg-blue-500/20 text-blue-400 font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              CSS
            </button>
          )}
          <button
            onClick={() => setActiveTab('split')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'split'
                ? 'bg-blue-500/20 text-blue-400 font-medium'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Split size={14} />
            Split
          </button>
        </div>

        {/* Split direction toggle (only show in split mode) */}
        {activeTab === 'split' && (
          <button
            onClick={() => setSplitDirection(prev => prev === 'horizontal' ? 'vertical' : 'horizontal')}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title={splitDirection === 'horizontal' ? '切换为上下布局' : '切换为左右布局'}
          >
            <Code2 size={16} />
          </button>
        )}
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* HTML/Vue Editor */}
        {(activeTab === 'html' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? (splitDirection === 'horizontal' ? 'w-1/2' : 'h-1/2') : 'flex-1'} overflow-hidden ${activeTab === 'split' ? (splitDirection === 'horizontal' ? 'border-r' : 'border-b') : ''} border-slate-700`}>
            {activeTab === 'split' && splitDirection === 'horizontal' && (
              <div className="px-3 py-1 bg-slate-800/50 border-b border-slate-700">
                <span className="text-xs text-slate-500">{getTabLabel()}</span>
              </div>
            )}
            {activeTab === 'split' && splitDirection === 'vertical' && (
              <div className="px-3 py-1 bg-slate-800/50 border-r border-slate-700">
                <span className="text-xs text-slate-500">{getTabLabel()}</span>
              </div>
            )}
            <div className="h-full overflow-hidden">
              <Editor
                height="100%"
                language="html"
                value={htmlCode}
                onChange={(value) => onHtmlChange(value || '')}
                onMount={handleHtmlEditorMount}
                loading={
                  <div className="flex h-full items-center justify-center text-slate-400">
                    加载中...
                  </div>
                }
                options={{
                  readOnly,
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  tabSize: 2,
                  automaticLayout: true,
                  wordWrap: 'on',
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>
        )}

        {/* Divider */}
        {activeTab === 'split' && (
          <div className="w-1 bg-slate-700 hover:bg-blue-500 cursor-col-resize transition-colors flex-shrink-0" />
        )}

        {/* CSS Editor */}
        {(activeTab === 'css' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? (splitDirection === 'horizontal' ? 'w-1/2' : 'h-1/2') : 'flex-1'} overflow-hidden`}>
            {activeTab === 'split' && splitDirection === 'horizontal' && (
              <div className="px-3 py-1 bg-slate-800/50 border-b border-slate-700">
                <span className="text-xs text-slate-500">CSS</span>
              </div>
            )}
            {activeTab === 'split' && splitDirection === 'vertical' && (
              <div className="px-3 py-1 bg-slate-800/50 border-t border-slate-700">
                <span className="text-xs text-slate-500">CSS</span>
              </div>
            )}
            <div className="h-full overflow-hidden">
              <Editor
                height="100%"
                language="css"
                value={cssCode}
                onChange={(value) => onCssChange(value || DEFAULT_CSS)}
                onMount={handleCssEditorMount}
                loading={
                  <div className="flex h-full items-center justify-center text-slate-400">
                    加载中...
                  </div>
                }
                options={{
                  readOnly,
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  tabSize: 2,
                  automaticLayout: true,
                  wordWrap: 'on',
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
