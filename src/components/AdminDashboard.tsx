import { useState, useEffect, useMemo } from 'react';
import { Module, Lesson } from '../types';
import {
  Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronRight,
  BookOpen, Settings, LogOut, ArrowLeft, AlertTriangle,
  Copy, Check, Search, Download, Upload, FileJson, BarChart3
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToApp: () => void;
  onCourseUpdate?: (modules: Module[]) => void;
}

const DEFAULT_LESSONS: Module[] = [
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
        content: '# 欢迎学习 Tailwind CSS\n\nTailwind CSS 是一个**Utility-First**（工具优先）的 CSS 框架。',
        initialCode: '<button class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">\n  点击我\n</button>',
        solution: '<button class="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all transform hover:scale-105">\n  开始学习\n</button>',
        hints: ['使用 bg-blue-500 设置背景色', '使用 text-white 设置文字颜色', '使用 px- py- 设置内边距']
      }
    ]
  }
];

export function AdminDashboard({ onLogout, onBackToApp, onCourseUpdate }: AdminDashboardProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Lesson>>({});
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null);
  const [newModule, setNewModule] = useState({ title: '', description: '', icon: '📖' });
  const [newLesson, setNewLesson] = useState({ title: '', moduleId: '' });
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ type: 'module' | 'lesson'; id: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModule, setFilterModule] = useState<string>('all');

  // Calculate statistics
  const stats = useMemo(() => {
    const totalModules = modules.length;
    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const totalCharacters = modules.reduce((acc, m) => 
      acc + m.lessons.reduce((a, l) => a + (l.content?.length || 0), 0), 0
    );
    return { totalModules, totalLessons, totalCharacters };
  }, [modules]);

  // Filter modules based on search
  const filteredModules = useMemo(() => {
    if (!searchQuery) return modules;
    const query = searchQuery.toLowerCase();
    return modules.map(module => ({
      ...module,
      lessons: module.lessons.filter(lesson => 
        lesson.title.toLowerCase().includes(query) ||
        lesson.content?.toLowerCase().includes(query)
      )
    })).filter(module => 
      module.title.toLowerCase().includes(query) || 
      module.lessons.length > 0
    );
  }, [modules, searchQuery]);

  // Load modules from localStorage or use default
  useEffect(() => {
    const saved = localStorage.getItem('tailwind-mastery-courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setModules(parsed);
        // Expand first module by default
        if (parsed.length > 0) {
          setExpandedModules(new Set([parsed[0].id]));
        }
      } catch (e) {
        console.error('Failed to load courses', e);
        setModules(DEFAULT_LESSONS);
      }
    } else {
      // Import default lessons
      import('../data/lessons').then((module) => {
        setModules(module.courseData);
        if (module.courseData.length > 0) {
          setExpandedModules(new Set([module.courseData[0].id]));
        }
      });
    }
  }, []);

  // Save modules to localStorage
  const saveToStorage = (newModules: Module[]) => {
    localStorage.setItem('tailwind-mastery-courses', JSON.stringify(newModules));
    setModules(newModules);
    // Notify parent component about the update
    if (onCourseUpdate) {
      onCourseUpdate(newModules);
    }
  };

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  // Edit lesson
  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setEditForm({ ...lesson });
    setIsEditing(true);
  };

  // Save lesson changes
  const handleSaveLesson = async () => {
    if (!editForm.id || !editForm.title) {
      showNotification('error', '请填写必填字段');
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newModules = modules.map(module => {
      if (module.id === editForm.module) {
        const lessons = module.lessons.map(lesson =>
          lesson.id === editForm.id ? { ...lesson, ...editForm } as Lesson : lesson
        );
        return { ...module, lessons };
      }
      return module;
    });

    saveToStorage(newModules);
    setSaving(false);
    setIsEditing(false);
    showNotification('success', '课程保存成功');
  };

  // Add new module
  const handleAddModule = async () => {
    if (!newModule.title) {
      showNotification('error', '请输入模块标题');
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const moduleId = `module-${Date.now()}`;
    const module: Module = {
      id: moduleId,
      title: newModule.title,
      description: newModule.description,
      icon: newModule.icon,
      lessons: []
    };

    const newModules = [...modules, module];
    saveToStorage(newModules);
    setSaving(false);
    setShowAddModule(false);
    setNewModule({ title: '', description: '', icon: '📖' });
    setExpandedModules(prev => new Set([...prev, moduleId]));
    showNotification('success', '模块添加成功');
  };

  // Add new lesson
  const handleAddLesson = async () => {
    if (!newLesson.title || !newLesson.moduleId) {
      showNotification('error', '请填写课程标题');
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const module = modules.find(m => m.id === newLesson.moduleId);
    if (!module) {
      showNotification('error', '找不到所属模块');
      setSaving(false);
      return;
    }

    const lessonId = `lesson-${Date.now()}`;
    const lesson: Lesson = {
      id: lessonId,
      title: newLesson.title,
      module: newLesson.moduleId,
      moduleTitle: module.title,
      content: `# ${newLesson.title}\n\n在这里添加课程内容...`,
      initialCode: '<div class="p-4">\n  <h1>新课程</h1>\n</div>',
      solution: '<div class="p-8">\n  <h1 class="text-3xl font-bold">参考答案</h1>\n</div>',
      hints: ['提示1', '提示2']
    };

    const newModules = modules.map(m => {
      if (m.id === newLesson.moduleId) {
        return { ...m, lessons: [...m.lessons, lesson] };
      }
      return m;
    });

    saveToStorage(newModules);
    setSaving(false);
    setShowAddLesson(null);
    setNewLesson({ title: '', moduleId: '' });
    showNotification('success', '课程添加成功');
  };

  // Delete module
  const handleDeleteModule = async (moduleId: string) => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newModules = modules.filter(m => m.id !== moduleId);
    saveToStorage(newModules);
    setSaving(false);
    setConfirmDelete(null);
    showNotification('success', '模块删除成功');
  };

  // Delete lesson
  const handleDeleteLesson = async (lessonId: string, moduleId: string) => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newModules = modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, lessons: module.lessons.filter(l => l.id !== lessonId) };
      }
      return module;
    });

    saveToStorage(newModules);
    setSaving(false);
    setConfirmDelete(null);
    if (selectedLesson?.id === lessonId) {
      setSelectedLesson(null);
      setIsEditing(false);
    }
    showNotification('success', '课程删除成功');
  };

  // Reset to default
  const handleResetToDefault = async () => {
    if (!confirm('确定要重置为默认课程吗？这将删除所有自定义课程。')) return;

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    localStorage.removeItem('tailwind-mastery-courses');
    import('../data/lessons').then((module) => {
      setModules(module.courseData);
      setSaving(false);
      showNotification('success', '已重置为默认课程');
    });
  };

  // Copy lesson content
  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    showNotification('success', '内容已复制到剪贴板');
  };

  // Export courses to JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(modules, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tailwind-mastery-courses-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('success', '课程已导出');
  };

  // Import courses from JSON file
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (!Array.isArray(imported)) {
          throw new Error('Invalid format');
        }
        saveToStorage(imported);
        showNotification('success', '课程导入成功');
      } catch (err) {
        showNotification('error', '导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToApp}
              className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              <span>返回</span>
            </button>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">课程管理后台</h1>
                <p className="text-sm text-slate-400">管理课程内容</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
              <Download size={18} />
              <span>导入</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Upload size={18} />
              <span>导出</span>
            </button>
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-2 px-4 py-2 text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
            >
              <AlertTriangle size={18} />
              <span>重置默认</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 p-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <FileJson className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalModules}</p>
              <p className="text-sm text-slate-400">课程模块</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
              <p className="text-sm text-slate-400">课程总数</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{Math.round(stats.totalCharacters / 1000)}K</p>
              <p className="text-sm text-slate-400">字符数量</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {modules.reduce((acc, m) => acc + m.lessons.filter(l => l.solution).length, 0)}
              </p>
              <p className="text-sm text-slate-400">含答案课程</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-6 pb-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索课程标题或内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="all">所有模块</option>
          {modules.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 ${
          notification.type === 'success'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {notification.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
          {notification.message}
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Module List */}
        <div className="w-80 bg-slate-800/50 border-r border-slate-700 h-[calc(100vh-73px)] overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">课程模块</h2>
            <button
              onClick={() => setShowAddModule(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm transition-colors"
            >
              <Plus size={16} />
              添加模块
            </button>
          </div>

          <div className="space-y-2">
            {filteredModules.map(module => (
              <div key={module.id} className="bg-slate-800 rounded-xl overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{module.icon}</span>
                    <div className="text-left">
                      <h3 className="font-medium text-white">{module.title}</h3>
                      <p className="text-xs text-slate-400">{module.lessons.length} 节课</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete({ type: 'module', id: module.id });
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    {expandedModules.has(module.id) ? (
                      <ChevronDown size={18} className="text-slate-400" />
                    ) : (
                      <ChevronRight size={18} className="text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Lessons List */}
                {expandedModules.has(module.id) && (
                  <div className="border-t border-slate-700 p-2 space-y-1">
                    {module.lessons.map(lesson => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'hover:bg-slate-700/50 text-slate-300'
                        }`}
                      >
                        <button
                          onClick={() => handleEditLesson(lesson)}
                          className="flex-1 flex items-center gap-2 text-left"
                        >
                          <BookOpen size={14} />
                          <span className="text-sm truncate">{lesson.title}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete({ type: 'lesson', id: lesson.id });
                          }}
                          className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}

                    {/* Add Lesson Button */}
                    <button
                      onClick={() => setShowAddLesson(module.id)}
                      className="w-full flex items-center justify-center gap-1 p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors text-sm"
                    >
                      <Plus size={14} />
                      添加课程
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Edit Form */}
        <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 73px)' }}>
          {isEditing && editForm.id ? (
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">编辑课程</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyContent(JSON.stringify(editForm, null, 2))}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                    复制
                  </button>
                  <button
                    onClick={handleSaveLesson}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <Save size={16} />
                    )}
                    保存
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      课程标题 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      课程 ID
                    </label>
                    <input
                      type="text"
                      value={editForm.id || ''}
                      disabled
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    课程内容 (Markdown)
                  </label>
                  <textarea
                    value={editForm.content || ''}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Initial Code */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    初始代码
                  </label>
                  <textarea
                    value={editForm.initialCode || ''}
                    onChange={(e) => setEditForm({ ...editForm, initialCode: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Solution */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    参考答案
                  </label>
                  <textarea
                    value={editForm.solution || ''}
                    onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Hints */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    提示 (每行一个)
                  </label>
                  <textarea
                    value={editForm.hints?.join('\n') || ''}
                    onChange={(e) => setEditForm({ ...editForm, hints: e.target.value.split('\n').filter(h => h.trim()) })}
                    rows={4}
                    placeholder="提示1&#10;提示2&#10;提示3"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">选择课程编辑</h3>
                <p className="text-slate-400">从左侧列表选择要编辑的课程</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">添加新模块</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">标题</label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  placeholder="例如：高级技巧"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">描述</label>
                <input
                  type="text"
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  placeholder="模块描述"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">图标</label>
                <input
                  type="text"
                  value={newModule.icon}
                  onChange={(e) => setNewModule({ ...newModule, icon: e.target.value })}
                  placeholder="📖"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModule(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddModule}
                disabled={saving}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? '添加中...' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">添加新课程</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">课程标题</label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="例如：Flexbox 入门"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">所属模块</label>
                <select
                  value={newLesson.moduleId}
                  onChange={(e) => setNewLesson({ ...newLesson, moduleId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">选择模块</option>
                  {modules.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddLesson(null)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddLesson}
                disabled={saving}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? '添加中...' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-xl font-bold">确认删除</h3>
            </div>
            <p className="text-slate-300 mb-6">
              {confirmDelete.type === 'module'
                ? '确定要删除这个模块吗？模块下的所有课程也将被删除。'
                : '确定要删除这门课程吗？此操作不可恢复。'}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (confirmDelete.type === 'module') {
                    handleDeleteModule(confirmDelete.id);
                  } else {
                    const module = modules.find(m => m.lessons.some(l => l.id === confirmDelete.id));
                    if (module) {
                      handleDeleteLesson(confirmDelete.id, module.id);
                    }
                  }
                }}
                disabled={saving}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? '删除中...' : '删除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
