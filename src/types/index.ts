/**
 * 课程数据类型定义
 */

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  module: string;
  moduleTitle: string;
  content: string;
  initialCode: string;
  solution: string;
  hints: string[];
  validation?: {
    type: 'class' | 'element' | 'custom';
    selector: string;
    expected: string;
    message: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Progress {
  lessonId: string;
  completed: boolean;
  code?: string;
}
