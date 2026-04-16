import { useState } from 'react';
import { Module, Lesson } from '../types';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Circle } from 'lucide-react';

interface LessonNavProps {
  modules: Module[];
  currentLessonId: string | null;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessons: Set<string>;
}

export function LessonNav({ modules, currentLessonId, onSelectLesson, completedLessons }: LessonNavProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.map(m => m.id))
  );

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

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2 text-white">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span className="font-semibold">课程目录</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          共 {modules.reduce((acc, m) => acc + m.lessons.length, 0)} 节课
        </p>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {modules.map(module => (
          <div key={module.id} className="border-b border-slate-800/50">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-slate-800/50 transition-colors"
            >
              {expandedModules.has(module.id) ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
              <span className="text-lg">{module.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {module.title}
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {module.lessons.length} 节课
                </div>
              </div>
            </button>

            {/* Lessons */}
            {expandedModules.has(module.id) && (
              <div className="pb-2">
                {module.lessons.map(lesson => {
                  const isActive = lesson.id === currentLessonId;
                  const isCompleted = completedLessons.has(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                        ${isActive
                          ? 'bg-blue-500/20 border-l-2 border-blue-500'
                          : 'hover:bg-slate-800/30 border-l-2 border-transparent'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm truncate ${isActive ? 'text-blue-400 font-medium' : 'text-slate-300'}`}>
                          {lesson.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>学习进度</span>
          <span>{completedLessons.size} / {modules.reduce((acc, m) => acc + m.lessons.length, 0)}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
            style={{
              width: `${(completedLessons.size / modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}
