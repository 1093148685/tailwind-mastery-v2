import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { LessonNav } from './components/LessonNav';
import { LessonContent } from './components/LessonContent';
import { SearchModal } from './components/SearchModal';
import { SnippetsLibrary } from './components/SnippetsLibrary';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { CheatSheet } from './components/CheatSheet';
import { CSSConverter } from './components/CSSConverter';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { AiChatDrawer } from './components/ai/AiChatDrawer';
import { AiFloatingButton } from './components/ai/AiFloatingButton';
import { Lesson, Module } from './types';
import { courseData as defaultCourseData } from './data/lessons';
import { Play, PanelLeftClose, PanelLeft, Layout, Code2, Search, BookMarked, Command, Save, Library, Keyboard, Settings, RotateCcw, ArrowRight, X, ArrowRightLeft, ToggleLeft, ToggleRight } from 'lucide-react';

// Default Tailwind v3 CSS template
const DEFAULT_CSS_V3 = `/* Tailwind v3 主题配置 */
@layer base {
  :root {
    --color-brand: #8b5cf6;
    --color-brand-light: #a78bfa;
  }
}

/* 自定义 CSS */
.custom-class {
  color: var(--color-brand);
}`;

// Default Tailwind v4 CSS template
const DEFAULT_CSS_V4 = `@import "tailwindcss";

@theme {
  /* 自定义主题变量 - 取消注释以下行查看效果 */
  /* --color-brand: #8b5cf6; */
  /* --color-brand-light: #a78bfa; */
  /* --font-display: 'Inter', sans-serif; */
}`;

function App() {
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [courseData, setCourseData] = useState<Module[]>(defaultCourseData);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [cssCode, setCssCode] = useState(DEFAULT_CSS_V4);
  const [userCode, setUserCode] = useState(''); // User's edited code (saved draft)
  const [previewCode, setPreviewCode] = useState(''); // Code to show in preview
  const [previewCss, setPreviewCss] = useState(DEFAULT_CSS_V4); // CSS to show in preview
  const [tailwindVersion, setTailwindVersion] = useState<'v3' | 'v4'>('v4'); // Tailwind version
  const [framework, setFramework] = useState<'tailwind' | 'elementplus' | 'vue3'>('tailwind'); // Framework mode
  const [showSolution, setShowSolution] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showSidebar, setShowSidebar] = useState(true);
  const [showLessonPanel, setShowLessonPanel] = useState(true);
  const [autoRun, setAutoRun] = useState(true);
  const [saveNotification, setSaveNotification] = useState(false);

  // Refs
  const previewCodeRef = useRef<string>('');

  // Modal states
  const [showSearch, setShowSearch] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showCSSConverter, setShowCSSConverter] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);

  // Check admin auth on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('tailwind-mastery-admin');
    if (adminAuth) {
      try {
        const parsed = JSON.parse(adminAuth);
        // Check if login is less than 24 hours old
        if (Date.now() - parsed.loginTime < 24 * 60 * 60 * 1000) {
          setIsAdmin(true);
        } else {
          localStorage.removeItem('tailwind-mastery-admin');
        }
      } catch (e) {
        localStorage.removeItem('tailwind-mastery-admin');
      }
    }
  }, []);

  // Load courses from localStorage or use default
  useEffect(() => {
    const saved = localStorage.getItem('tailwind-mastery-courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCourseData(parsed);
      } catch (e) {
        console.error('Failed to load courses', e);
      }
    }
  }, []);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tailwind-mastery-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedLessons(new Set(parsed.completed || []));
      } catch (e) {
        console.error('Failed to load progress', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('tailwind-mastery-progress', JSON.stringify({
      completed: [...completedLessons]
    }));
  }, [completedLessons]);

  // Load saved code from localStorage (per lesson)
  useEffect(() => {
    if (currentLesson) {
      const isElementPlus = currentLesson.module === 'elementplus';
      const savedCode = localStorage.getItem(`tailwind-draft-${currentLesson.id}`);
      const savedCss = localStorage.getItem(`tailwind-draft-css-${currentLesson.id}`);
      if (savedCode) {
        setUserCode(savedCode);
        setCode(savedCode);
        setPreviewCode(savedCode);
      } else {
        setUserCode('');
        setCode(currentLesson.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>');
        setPreviewCode(currentLesson.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>');
      }
      // Load CSS or use default based on framework
      if (savedCss) {
        setCssCode(savedCss);
        setPreviewCss(savedCss);
      } else if (isElementPlus) {
        setCssCode('');
        setPreviewCss('');
      } else {
        setCssCode(DEFAULT_CSS_V4);
        setPreviewCss(DEFAULT_CSS_V4);
      }
      setShowSolution(false);
    }
  }, [currentLesson]);

  // Detect framework based on current lesson's module
  useEffect(() => {
    if (!currentLesson) return;
    
    if (currentLesson.module === 'vue3') {
      setFramework('vue3');
      setCssCode('');
      if (autoRun) setPreviewCss('');
    } else if (currentLesson.module === 'elementplus' || currentLesson.module === 'elementplus-project') {
      setFramework('elementplus');
      setCssCode('');
      if (autoRun) setPreviewCss('');
    } else {
      setFramework('tailwind');
      const defaultCss = tailwindVersion === 'v3' ? DEFAULT_CSS_V3 : DEFAULT_CSS_V4;
      setCssCode(defaultCss);
      if (autoRun) setPreviewCss(defaultCss);
    }
  }, [currentLesson, autoRun, tailwindVersion]);

  // Auto run logic - update preview when code changes in auto mode
  useEffect(() => {
    if (autoRun) {
      // Auto mode: preview updates immediately
      setPreviewCode(code);
      setPreviewCss(cssCode);
      previewCodeRef.current = code;
    }
    // Manual mode: preview only updates when user clicks "运行"
  }, [code, cssCode, autoRun]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      } else if (modifier && e.key === 's') {
        e.preventDefault();
        handleSaveCode();
      } else if (modifier && e.key === 'b') {
        e.preventDefault();
        setShowSidebar(prev => !prev);
      } else if (modifier && e.key === 'j') {
        e.preventDefault();
        setShowLessonPanel(prev => !prev);
      } else if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setShowShortcuts(true);
      } else if (modifier && e.key === 'Enter') {
        e.preventDefault();
        // Manual mode: run preview
        if (!autoRun) {
          handleRunPreview();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, autoRun, currentLesson, userCode]);

  // Initialize with first lesson
  useEffect(() => {
    if (courseData.length > 0 && courseData[0].lessons.length > 0) {
      const firstLesson = courseData[0].lessons[0];
      setCurrentLesson(firstLesson);
    }
  }, []);

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setCurrentLesson(lesson);
    setShowSolution(false);
    
    // Auto switch framework based on lesson module
    if (lesson.module === 'elementplus' || lesson.module === 'elementplus-project') {
      setFramework('elementplus');
      setCssCode('');
      setPreviewCss('');
    } else if (lesson.module === 'vue3') {
      setFramework('vue3');
      setCssCode('');
      setPreviewCss('');
    } else {
      setFramework('tailwind');
      const defaultCss = tailwindVersion === 'v3' ? DEFAULT_CSS_V3 : DEFAULT_CSS_V4;
      setCssCode(defaultCss);
      setPreviewCss(defaultCss);
    }
  }, [tailwindVersion]);

  // Handle Tailwind version change
  const handleVersionChange = useCallback((version: 'v3' | 'v4') => {
    const newCss = version === 'v3' ? DEFAULT_CSS_V3 : DEFAULT_CSS_V4;
    setTailwindVersion(version);
    setCssCode(newCss);
    if (autoRun) {
      setPreviewCss(newCss);
    }
  }, [autoRun]);

  // Save code to localStorage (per lesson)
  const handleSaveCode = useCallback(() => {
    if (currentLesson && code) {
      localStorage.setItem(`tailwind-draft-${currentLesson.id}`, code);
      localStorage.setItem(`tailwind-draft-css-${currentLesson.id}`, cssCode);
      setUserCode(code);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 2000);
    }
  }, [code, cssCode, currentLesson]);

  // Reset to initial code
  const handleResetCode = useCallback(() => {
    if (currentLesson && confirm('确定要重置为初始代码吗？您编辑的内容将会丢失。')) {
      const defaultCss = tailwindVersion === 'v3' ? DEFAULT_CSS_V3 : DEFAULT_CSS_V4;
      setCode(currentLesson.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>');
      setCssCode(defaultCss);
      setUserCode('');
      localStorage.removeItem(`tailwind-draft-${currentLesson.id}`);
      localStorage.removeItem(`tailwind-draft-css-${currentLesson.id}`);
      if (autoRun) {
        setPreviewCode(currentLesson.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>');
        setPreviewCss(defaultCss);
      }
    }
  }, [currentLesson, autoRun, tailwindVersion]);

  // Run preview in manual mode
  const handleRunPreview = useCallback(() => {
    setPreviewCode(code);
    setPreviewCss(cssCode);
    previewCodeRef.current = code;
  }, [code, cssCode]);

  // Try code - restore user's saved draft or initial code
  const handleTryCode = useCallback(() => {
    if (currentLesson) {
      // If user has saved draft, restore it
      const savedDraft = localStorage.getItem(`tailwind-draft-${currentLesson.id}`);
      const savedCssDraft = localStorage.getItem(`tailwind-draft-css-${currentLesson.id}`);
      if (savedDraft) {
        setCode(savedDraft);
        if (autoRun) setPreviewCode(savedDraft);
      } else if (currentLesson.initialCode) {
        setCode(currentLesson.initialCode);
        if (autoRun) setPreviewCode(currentLesson.initialCode);
      }
      // Restore CSS draft
      if (savedCssDraft) {
        setCssCode(savedCssDraft);
        if (autoRun) setPreviewCss(savedCssDraft);
      }
    }
  }, [currentLesson, autoRun]);

  // Show/Hide solution
  const handleShowSolution = useCallback(() => {
    if (!showSolution) {
      // Show solution - save current user code first
      if (currentLesson?.solution) {
        setCode(currentLesson.solution);
        if (autoRun) setPreviewCode(currentLesson.solution);
      }
      setShowSolution(true);
    } else {
      // Hide solution - restore user's code
      setShowSolution(false);
      // Restore user code or initial code
      const savedDraft = localStorage.getItem(`tailwind-draft-${currentLesson?.id || ''}`);
      const savedCssDraft = localStorage.getItem(`tailwind-draft-css-${currentLesson?.id || ''}`);
      const restoreCode = savedDraft || currentLesson?.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>';
      setCode(restoreCode);
      if (savedCssDraft) {
        setCssCode(savedCssDraft);
        if (autoRun) setPreviewCss(savedCssDraft);
      }
      if (autoRun) setPreviewCode(restoreCode);
    }
  }, [showSolution, currentLesson, autoRun]);

  const markAsComplete = useCallback(() => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
    }
  }, [currentLesson]);

  const handleInsertCode = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 bg-slate-900 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Tailwind Mastery</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-sm"
            title="搜索课程 (⌘K)"
          >
            <Search size={14} />
            <span className="hidden sm:inline">搜索</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 bg-slate-700 rounded text-xs">⌘K</kbd>
          </button>

          {/* Snippets Button */}
          <button
            onClick={() => setShowSnippets(true)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="代码片段库"
          >
            <Library size={18} />
          </button>

          {/* Cheat Sheet Button */}
          <button
            onClick={() => setShowCheatSheet(true)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="快捷参考表"
          >
            <BookMarked size={18} />
          </button>

          {/* CSS Converter Button */}
          <button
            onClick={() => setShowCSSConverter(true)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="CSS 转换器"
          >
            <ArrowRightLeft size={18} />
          </button>

          {/* Shortcuts Button */}
          <button
            onClick={() => setShowShortcuts(true)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="快捷键 (? )"
          >
            <Keyboard size={18} />
          </button>

          {/* Manual Mode - Run Button */}
          {!autoRun && (
            <button
              onClick={handleRunPreview}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
              title="运行预览 (⌘+Enter)"
            >
              <ArrowRight size={14} />
              运行
            </button>
          )}

          {/* Auto Run Toggle */}
          <button
            onClick={() => setAutoRun(!autoRun)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              autoRun
                ? 'bg-green-500/20 text-green-400'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            <Play size={14} className={autoRun ? 'fill-current' : ''} />
            {autoRun ? '自动' : '手动'}
          </button>

          {/* Framework Selector */}
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-700 rounded-lg">
            <button
              onClick={() => { 
                const newCss = tailwindVersion === 'v3' ? DEFAULT_CSS_V3 : DEFAULT_CSS_V4;
                setFramework('tailwind'); 
                setCssCode(newCss);
                const twCode = '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>';
                setCode(twCode);
                setPreviewCode(twCode);
                setPreviewCss(newCss);
                setAutoRun(true);
              }}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                framework === 'tailwind'
                  ? 'bg-cyan-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tailwind CSS"
            >
              Tailwind
            </button>
            <button
              onClick={() => { 
                console.log('[App] Switching to Vue3');
                setFramework('vue3'); 
                setCssCode('');
                const vueCode = `<div>
  <h1 style="color: #42b883;">Vue3 组合式 API</h1>
  <p>计数: <strong>{{ count }}</strong></p>
  <button @click="count++">+ 增加</button>
  <button @click="count--">- 减少</button>
</div>`;
                setCode(vueCode);
                setPreviewCode(vueCode);
                setPreviewCss('');
                setAutoRun(true);
              }}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                framework === 'vue3'
                  ? 'bg-green-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vue3"
            >
              Vue3
            </button>
            <button
              onClick={() => { 
                console.log('[App] Switching to ElementPlus');
                setFramework('elementplus'); 
                setCssCode('');
                const epCode = `<div id="app">
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
</div>`;
                setCode(epCode);
                setPreviewCode(epCode);
                setPreviewCss('');
                setAutoRun(true);
              }}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                framework === 'elementplus'
                  ? 'bg-green-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="ElementPlus"
            >
              Element+
            </button>
          </div>

          {/* Tailwind Version Selector */}
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-700 rounded-lg">
            <button
              onClick={() => handleVersionChange('v3')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                tailwindVersion === 'v3'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tailwind CSS v3"
            >
              v3
            </button>
            <button
              onClick={() => handleVersionChange('v4')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                tailwindVersion === 'v4'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tailwind CSS v4"
            >
              v4
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveCode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
            title="保存代码 (⌘S)"
          >
            <Save size={14} />
            保存
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetCode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
            title="重置为初始代码"
          >
            <RotateCcw size={14} />
            重置
          </button>

          {/* Toggle Lesson Panel */}
          <button
            onClick={() => setShowLessonPanel(!showLessonPanel)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={showLessonPanel ? '隐藏课程' : '显示课程'}
          >
            {showLessonPanel ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
          </button>

          {/* Toggle Sidebar */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={showSidebar ? '隐藏目录' : '显示目录'}
          >
            <Layout size={18} />
          </button>

          {/* Admin Button */}
          <button
            onClick={() => setShowAdminLogin(true)}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="管理后台"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - controlled by showSidebar */}
        <div className={`w-64 lg:w-72 flex-shrink-0 border-r border-slate-800 ${showSidebar ? '' : 'hidden'}`}>
          <LessonNav
            modules={courseData}
            currentLessonId={currentLesson?.id || null}
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <PanelGroup direction="horizontal" className="flex-1">
            {/* Lesson Panel - controlled by showLessonPanel */}
            <Panel defaultSize={30} minSize={20} maxSize={50} className={showLessonPanel ? '' : 'hidden'}>
              {currentLesson && (
                <LessonContent
                  lesson={currentLesson}
                  onTryCode={handleTryCode}
                  onShowSolution={handleShowSolution}
                  showSolution={showSolution}
                />
              )}
            </Panel>

            {showLessonPanel && <PanelResizeHandle className="w-1 bg-slate-800 hover:bg-blue-500 transition-colors cursor-col-resize" />}

            {/* Code + Preview Panel */}
            <Panel defaultSize={70} minSize={30}>
              <PanelGroup direction="horizontal" className="flex-1">
                {/* Code Editor */}
                <Panel defaultSize={50} minSize={20}>
                  <div className="h-full flex flex-col">
                    <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                      <span className="text-sm text-slate-400 flex items-center gap-2">
                        <Code2 size={14} />
                        {framework === 'elementplus' ? 'ElementPlus 代码' : framework === 'vue3' ? 'Vue3 代码' : '编辑代码'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowSnippets(true)}
                          className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                        >
                          片段
                        </button>
                        <button
                          onClick={markAsComplete}
                          className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                        >
                          完成
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <CodeEditor
                        htmlCode={code}
                        cssCode={cssCode}
                        onHtmlChange={setCode}
                        onCssChange={setCssCode}
                        framework={framework}
                      />
                    </div>
                  </div>
                </Panel>

                <PanelResizeHandle className="w-1 bg-slate-800 hover:bg-blue-500 transition-colors cursor-col-resize" />

                {/* Preview */}
                <Panel defaultSize={50} minSize={20}>
                  <Preview code={previewCode} cssCode={previewCss} tailwindVersion={tailwindVersion} framework={framework} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>

      {/* Save Notification */}
      {saveNotification && (
        <div className="fixed bottom-4 right-4 px-4 py-2 bg-green-500/90 text-white rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Save size={16} />
          已保存
        </div>
      )}

      {/* Modals */}
      {showSearch && (
        <SearchModal
          modules={courseData}
          onSelectLesson={handleSelectLesson}
          onClose={() => setShowSearch(false)}
        />
      )}

      {showSnippets && (
        <SnippetsLibrary
          onInsert={handleInsertCode}
          onClose={() => setShowSnippets(false)}
        />
      )}

      {showShortcuts && (
        <KeyboardShortcuts
          onClose={() => setShowShortcuts(false)}
        />
      )}

      {showCheatSheet && (
        <CheatSheet
          onClose={() => setShowCheatSheet(false)}
          onInsert={handleInsertCode}
        />
      )}

      {showCSSConverter && (
        <CSSConverter
          code={code}
          onClose={() => setShowCSSConverter(false)}
        />
      )}

      {/* AI Floating Button */}
      <AiFloatingButton onClick={() => setShowAiChat(true)} />

      {/* AI Chat Drawer */}
      <AiChatDrawer
        isOpen={showAiChat}
        onClose={() => setShowAiChat(false)}
        currentCode={`<!-- HTML -->\n${code}\n\n/* CSS */\n${cssCode}`}
        currentLessonTitle={currentLesson?.title}
      />

      {/* Admin Login Modal */}
      {showAdminLogin && !isAdmin && (
        <AdminLogin onLogin={(success) => {
          if (success) {
            setIsAdmin(true);
          }
          setShowAdminLogin(false);
        }} />
      )}

      {/* Admin Dashboard */}
      {isAdmin && (
        <AdminDashboard
          onLogout={() => {
            setIsAdmin(false);
            localStorage.removeItem('tailwind-mastery-admin');
          }}
          onBackToApp={() => {
            // Reload courses when going back to app
            const saved = localStorage.getItem('tailwind-mastery-courses');
            if (saved) {
              try {
                const parsed = JSON.parse(saved);
                setCourseData(parsed);
                // Update current lesson if it exists
                if (currentLesson) {
                  for (const module of parsed) {
                    const lesson = module.lessons.find((l: Lesson) => l.id === currentLesson.id);
                    if (lesson) {
                      setCurrentLesson(lesson);
                      setCode(lesson.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>');
                      break;
                    }
                  }
                }
              } catch (e) {
                console.error('Failed to reload courses', e);
              }
            }
            setIsAdmin(false);
          }}
          onCourseUpdate={(modules) => {
            setCourseData(modules);
            // Update current lesson if it was modified
            if (currentLesson) {
              for (const module of modules) {
                const lesson = module.lessons.find((l: Lesson) => l.id === currentLesson.id);
                if (lesson) {
                  setCurrentLesson(lesson);
                  setCode(lesson.initialCode || '<div class="text-3xl font-bold text-blue-600">\n  Hello Tailwind!\n</div>');
                  break;
                }
              }
            }
          }}
        />
      )}

      {/* Footer */}
      <footer className="h-10 flex items-center justify-center bg-slate-900 border-t border-slate-800 flex-shrink-0">
        <span className="text-xs text-slate-500">
          桂ICP备2025052831号-2
        </span>
      </footer>
    </div>
  );
}

export default App;
