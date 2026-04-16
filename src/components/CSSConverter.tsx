import { useState, useMemo } from 'react';
import { X, Copy, ArrowRightLeft, Check } from 'lucide-react';

interface CSSConverterProps {
  code: string;
  onInsert?: (code: string) => void;
  onClose: () => void;
}

// Tailwind to CSS mapping
const tailwindToCssMap: Record<string, string> = {
  // Layout
  'block': 'display: block;',
  'inline-block': 'display: inline-block;',
  'inline': 'display: inline;',
  'flex': 'display: flex;',
  'inline-flex': 'display: inline-flex;',
  'grid': 'display: grid;',
  'inline-grid': 'display: inline-grid;',
  'hidden': 'display: none;',
  'fixed': 'position: fixed;',
  'absolute': 'position: absolute;',
  'relative': 'position: relative;',
  'sticky': 'position: sticky;',

  // Flexbox
  'flex-row': 'flex-direction: row;',
  'flex-col': 'flex-direction: column;',
  'flex-wrap': 'flex-wrap: wrap;',
  'flex-nowrap': 'flex-wrap: nowrap;',
  'items-center': 'align-items: center;',
  'items-start': 'align-items: flex-start;',
  'items-end': 'align-items: flex-end;',
  'justify-center': 'justify-content: center;',
  'justify-between': 'justify-content: space-between;',
  'justify-around': 'justify-content: space-around;',
  'justify-end': 'justify-content: flex-end;',
  'gap-1': 'gap: 0.25rem;',
  'gap-2': 'gap: 0.5rem;',
  'gap-3': 'gap: 0.75rem;',
  'gap-4': 'gap: 1rem;',
  'gap-6': 'gap: 1.5rem;',
  'gap-8': 'gap: 2rem;',

  // Spacing - Margin
  'm-0': 'margin: 0;',
  'm-1': 'margin: 0.25rem;',
  'm-2': 'margin: 0.5rem;',
  'm-4': 'margin: 1rem;',
  'm-6': 'margin: 1.5rem;',
  'm-8': 'margin: 2rem;',
  'mt-0': 'margin-top: 0;',
  'mt-1': 'margin-top: 0.25rem;',
  'mt-2': 'margin-top: 0.5rem;',
  'mt-4': 'margin-top: 1rem;',
  'mt-6': 'margin-top: 1.5rem;',
  'mt-8': 'margin-top: 2rem;',
  'mb-0': 'margin-bottom: 0;',
  'mb-1': 'margin-bottom: 0.25rem;',
  'mb-2': 'margin-bottom: 0.5rem;',
  'mb-4': 'margin-bottom: 1rem;',
  'mb-6': 'margin-bottom: 1.5rem;',
  'mb-8': 'margin-bottom: 2rem;',
  'ml-0': 'margin-left: 0;',
  'ml-1': 'margin-left: 0.25rem;',
  'ml-2': 'margin-left: 0.5rem;',
  'ml-4': 'margin-left: 1rem;',
  'mr-0': 'margin-right: 0;',
  'mr-1': 'margin-right: 0.25rem;',
  'mr-2': 'margin-right: 0.5rem;',
  'mr-4': 'margin-right: 1rem;',
  'mx-auto': 'margin-left: auto; margin-right: auto;',
  'my-0': 'margin-top: 0; margin-bottom: 0;',
  'my-4': 'margin-top: 1rem; margin-bottom: 1rem;',

  // Spacing - Padding
  'p-0': 'padding: 0;',
  'p-1': 'padding: 0.25rem;',
  'p-2': 'padding: 0.5rem;',
  'p-3': 'padding: 0.75rem;',
  'p-4': 'padding: 1rem;',
  'p-6': 'padding: 1.5rem;',
  'p-8': 'padding: 2rem;',
  'pt-0': 'padding-top: 0;',
  'pt-2': 'padding-top: 0.5rem;',
  'pt-4': 'padding-top: 1rem;',
  'pt-6': 'padding-top: 1.5rem;',
  'pb-0': 'padding-bottom: 0;',
  'pb-2': 'padding-bottom: 0.5rem;',
  'pb-4': 'padding-bottom: 1rem;',
  'pb-6': 'padding-bottom: 1.5rem;',
  'pl-0': 'padding-left: 0;',
  'pl-2': 'padding-left: 0.5rem;',
  'pl-4': 'padding-left: 1rem;',
  'pr-0': 'padding-right: 0;',
  'pr-2': 'padding-right: 0.5rem;',
  'pr-4': 'padding-right: 1rem;',
  'px-0': 'padding-left: 0; padding-right: 0;',
  'px-2': 'padding-left: 0.5rem; padding-right: 0.5rem;',
  'px-4': 'padding-left: 1rem; padding-right: 1rem;',
  'px-6': 'padding-left: 1.5rem; padding-right: 1.5rem;',
  'px-8': 'padding-left: 2rem; padding-right: 2rem;',
  'py-0': 'padding-top: 0; padding-bottom: 0;',
  'py-2': 'padding-top: 0.5rem; padding-bottom: 0.5rem;',
  'py-4': 'padding-top: 1rem; padding-bottom: 1rem;',
  'py-8': 'padding-top: 2rem; padding-bottom: 2rem;',

  // Width/Height
  'w-full': 'width: 100%;',
  'w-auto': 'width: auto;',
  'w-1': 'width: 0.25rem;',
  'w-2': 'width: 0.5rem;',
  'w-4': 'width: 1rem;',
  'w-8': 'width: 2rem;',
  'w-12': 'width: 3rem;',
  'w-16': 'width: 4rem;',
  'w-20': 'width: 5rem;',
  'w-24': 'width: 6rem;',
  'w-32': 'width: 8rem;',
  'w-48': 'width: 12rem;',
  'w-64': 'width: 16rem;',
  'h-full': 'height: 100%;',
  'h-auto': 'height: auto;',
  'h-screen': 'height: 100vh;',
  'h-1': 'height: 0.25rem;',
  'h-2': 'height: 0.5rem;',
  'h-4': 'height: 1rem;',
  'h-8': 'height: 2rem;',
  'h-12': 'height: 3rem;',
  'h-16': 'height: 4rem;',
  'min-h-screen': 'min-height: 100vh;',
  'min-h-full': 'min-height: 100%;',
  'max-w-full': 'max-width: 100%;',
  'max-w-xs': 'max-width: 20rem;',
  'max-w-sm': 'max-width: 24rem;',
  'max-w-md': 'max-width: 28rem;',
  'max-w-lg': 'max-width: 32rem;',
  'max-w-xl': 'max-width: 36rem;',
  'max-w-2xl': 'max-width: 42rem;',
  'max-w-3xl': 'max-width: 48rem;',
  'max-w-4xl': 'max-width: 56rem;',
  'max-w-5xl': 'max-width: 64rem;',
  'max-w-6xl': 'max-width: 72rem;',
  'max-w-7xl': 'max-width: 80rem;',

  // Typography
  'text-xs': 'font-size: 0.75rem; line-height: 1rem;',
  'text-sm': 'font-size: 0.875rem; line-height: 1.25rem;',
  'text-base': 'font-size: 1rem; line-height: 1.5rem;',
  'text-lg': 'font-size: 1.125rem; line-height: 1.75rem;',
  'text-xl': 'font-size: 1.25rem; line-height: 1.75rem;',
  'text-2xl': 'font-size: 1.5rem; line-height: 2rem;',
  'text-3xl': 'font-size: 1.875rem; line-height: 2.25rem;',
  'text-4xl': 'font-size: 2.25rem; line-height: 2.5rem;',
  'text-5xl': 'font-size: 3rem; line-height: 1;',
  'font-thin': 'font-weight: 100;',
  'font-light': 'font-weight: 300;',
  'font-normal': 'font-weight: 400;',
  'font-medium': 'font-weight: 500;',
  'font-semibold': 'font-weight: 600;',
  'font-bold': 'font-weight: 700;',
  'font-extrabold': 'font-weight: 800;',
  'italic': 'font-style: italic;',
  'not-italic': 'font-style: normal;',
  'text-left': 'text-align: left;',
  'text-center': 'text-align: center;',
  'text-right': 'text-align: right;',
  'text-justify': 'text-align: justify;',
  'uppercase': 'text-transform: uppercase;',
  'lowercase': 'text-transform: lowercase;',
  'capitalize': 'text-transform: capitalize;',
  'normal-case': 'text-transform: none;',
  'underline': 'text-decoration: underline;',
  'line-through': 'text-decoration: line-through;',
  'no-underline': 'text-decoration: none;',

  // Colors - Text
  'text-white': 'color: #ffffff;',
  'text-black': 'color: #000000;',
  'text-transparent': 'color: transparent;',
  'text-gray-50': 'color: #f9fafb;',
  'text-gray-100': 'color: #f3f4f6;',
  'text-gray-200': 'color: #e5e7eb;',
  'text-gray-300': 'color: #d1d5db;',
  'text-gray-400': 'color: #9ca3af;',
  'text-gray-500': 'color: #6b7280;',
  'text-gray-600': 'color: #4b5563;',
  'text-gray-700': 'color: #374151;',
  'text-gray-800': 'color: #1f2937;',
  'text-gray-900': 'color: #111827;',
  'text-red-500': 'color: #ef4444;',
  'text-red-600': 'color: #dc2626;',
  'text-yellow-500': 'color: #eab308;',
  'text-yellow-600': 'color: #ca8a04;',
  'text-green-500': 'color: #22c55e;',
  'text-green-600': 'color: #16a34a;',
  'text-blue-500': 'color: #3b82f6;',
  'text-blue-600': 'color: #2563eb;',
  'text-indigo-500': 'color: #6366f1;',
  'text-purple-500': 'color: #a855f7;',
  'text-pink-500': 'color: #ec4899;',

  // Colors - Background
  'bg-transparent': 'background-color: transparent;',
  'bg-white': 'background-color: #ffffff;',
  'bg-black': 'background-color: #000000;',
  'bg-gray-50': 'background-color: #f9fafb;',
  'bg-gray-100': 'background-color: #f3f4f6;',
  'bg-gray-200': 'background-color: #e5e7eb;',
  'bg-gray-300': 'background-color: #d1d5db;',
  'bg-gray-400': 'background-color: #9ca3af;',
  'bg-gray-500': 'background-color: #6b7280;',
  'bg-gray-600': 'background-color: #4b5563;',
  'bg-gray-700': 'background-color: #374151;',
  'bg-gray-800': 'background-color: #1f2937;',
  'bg-gray-900': 'background-color: #111827;',
  'bg-red-50': 'background-color: #fef2f2;',
  'bg-red-100': 'background-color: #fee2e2;',
  'bg-red-500': 'background-color: #ef4444;',
  'bg-red-600': 'background-color: #dc2626;',
  'bg-yellow-50': 'background-color: #fefce8;',
  'bg-yellow-100': 'background-color: #fef9c3;',
  'bg-yellow-500': 'background-color: #eab308;',
  'bg-green-50': 'background-color: #f0fdf4;',
  'bg-green-100': 'background-color: #dcfce7;',
  'bg-green-500': 'background-color: #22c55e;',
  'bg-green-600': 'background-color: #16a34a;',
  'bg-blue-50': 'background-color: #eff6ff;',
  'bg-blue-100': 'background-color: #dbeafe;',
  'bg-blue-200': 'background-color: #bfdbfe;',
  'bg-blue-300': 'background-color: #93c5fd;',
  'bg-blue-400': 'background-color: #60a5fa;',
  'bg-blue-500': 'background-color: #3b82f6;',
  'bg-blue-600': 'background-color: #2563eb;',
  'bg-blue-700': 'background-color: #1d4ed8;',
  'bg-indigo-50': 'background-color: #eef2ff;',
  'bg-indigo-100': 'background-color: #e0e7ff;',
  'bg-indigo-500': 'background-color: #6366f1;',
  'bg-indigo-600': 'background-color: #4f46e5;',
  'bg-purple-50': 'background-color: #faf5ff;',
  'bg-purple-100': 'background-color: #f3e8ff;',
  'bg-purple-500': 'background-color: #a855f7;',
  'bg-purple-600': 'background-color: #9333ea;',
  'bg-pink-50': 'background-color: #fdf2f8;',
  'bg-pink-100': 'background-color: #fce7f3;',
  'bg-pink-500': 'background-color: #ec4899;',
  'bg-pink-600': 'background-color: #db2777;',

  // Border
  'border': 'border-width: 1px; border-style: solid;',
  'border-0': 'border-width: 0;',
  'border-2': 'border-width: 2px;',
  'border-4': 'border-width: 4px;',
  'border-8': 'border-width: 8px;',
  'border-t': 'border-top-width: 1px; border-style: solid;',
  'border-b': 'border-bottom-width: 1px; border-style: solid;',
  'border-l': 'border-left-width: 1px; border-style: solid;',
  'border-r': 'border-right-width: 1px; border-style: solid;',
  'border-gray-200': 'border-color: #e5e7eb;',
  'border-gray-300': 'border-color: #d1d5db;',
  'border-gray-700': 'border-color: #374151;',
  'border-gray-800': 'border-color: #1f2937;',
  'border-white': 'border-color: #ffffff;',
  'border-red-500': 'border-color: #ef4444;',
  'border-blue-500': 'border-color: #3b82f6;',
  'border-green-500': 'border-color: #22c55e;',
  'border-transparent': 'border-color: transparent;',
  'rounded': 'border-radius: 0.25rem;',
  'rounded-sm': 'border-radius: 0.125rem;',
  'rounded-md': 'border-radius: 0.375rem;',
  'rounded-lg': 'border-radius: 0.5rem;',
  'rounded-xl': 'border-radius: 0.75rem;',
  'rounded-2xl': 'border-radius: 1rem;',
  'rounded-full': 'border-radius: 9999px;',
  'rounded-none': 'border-radius: 0;',
  'rounded-t': 'border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem;',
  'rounded-b': 'border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0.25rem;',
  'rounded-t-lg': 'border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;',
  'rounded-b-lg': 'border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem;',

  // Shadow
  'shadow': 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);',
  'shadow-sm': 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);',
  'shadow-md': 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
  'shadow-lg': 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
  'shadow-xl': 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);',
  'shadow-2xl': 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);',
  'shadow-none': 'box-shadow: none;',
  'shadow-inner': 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);',

  // Overflow
  'overflow-auto': 'overflow: auto;',
  'overflow-hidden': 'overflow: hidden;',
  'overflow-visible': 'overflow: visible;',
  'overflow-scroll': 'overflow: scroll;',
  'overflow-x-auto': 'overflow-x: auto;',
  'overflow-y-auto': 'overflow-y: auto;',

  // Position
  'top-0': 'top: 0;',
  'top-1': 'top: 0.25rem;',
  'top-2': 'top: 0.5rem;',
  'top-4': 'top: 1rem;',
  'bottom-0': 'bottom: 0;',
  'bottom-1': 'bottom: 0.25rem;',
  'bottom-2': 'bottom: 0.5rem;',
  'bottom-4': 'bottom: 1rem;',
  'left-0': 'left: 0;',
  'left-1': 'left: 0.25rem;',
  'left-2': 'left: 0.5rem;',
  'left-4': 'left: 1rem;',
  'right-0': 'right: 0;',
  'right-1': 'right: 0.25rem;',
  'right-2': 'right: 0.5rem;',
  'right-4': 'right: 1rem;',
  'inset-0': 'top: 0; right: 0; bottom: 0; left: 0;',

  // Z-index
  'z-0': 'z-index: 0;',
  'z-10': 'z-index: 10;',
  'z-20': 'z-index: 20;',
  'z-30': 'z-index: 30;',
  'z-40': 'z-index: 40;',
  'z-50': 'z-index: 50;',
  'z-auto': 'z-index: auto;',

  // Opacity
  'opacity-0': 'opacity: 0;',
  'opacity-25': 'opacity: 0.25;',
  'opacity-50': 'opacity: 0.5;',
  'opacity-75': 'opacity: 0.75;',
  'opacity-100': 'opacity: 1;',

  // Transitions
  'transition': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-none': 'transition: none;',
  'transition-all': 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-colors': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-opacity': 'transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-shadow': 'transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-transform': 'transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'duration-75': 'transition-duration: 75ms;',
  'duration-100': 'transition-duration: 100ms;',
  'duration-150': 'transition-duration: 150ms;',
  'duration-200': 'transition-duration: 200ms;',
  'duration-300': 'transition-duration: 300ms;',
  'duration-500': 'transition-duration: 500ms;',

  // Transform
  'transform': 'transform: translateX(var(--tw-translate-x, 0)) translateY(var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1));',
  'transform-none': 'transform: none;',
  'scale-0': 'transform: scale(0);',
  'scale-50': 'transform: scale(.5);',
  'scale-75': 'transform: scale(.75);',
  'scale-90': 'transform: scale(.9);',
  'scale-95': 'transform: scale(.95);',
  'scale-100': 'transform: scale(1);',
  'scale-105': 'transform: scale(1.05);',
  'scale-110': 'transform: scale(1.1);',
  'scale-125': 'transform: scale(1.25);',
  'scale-150': 'transform: scale(1.5);',
  '-scale-100': 'transform: scale(-1);',
  '-scale-105': 'transform: scale(-1.05);',
  'rotate-0': 'transform: rotate(0deg);',
  'rotate-1': 'transform: rotate(1deg);',
  'rotate-2': 'transform: rotate(2deg);',
  'rotate-3': 'transform: rotate(3deg);',
  'rotate-6': 'transform: rotate(6deg);',
  'rotate-12': 'transform: rotate(12deg);',
  'rotate-45': 'transform: rotate(45deg);',
  'rotate-90': 'transform: rotate(90deg);',
  'rotate-180': 'transform: rotate(180deg);',
  '-rotate-180': 'transform: rotate(-180deg);',
  'translate-x-0': 'transform: translateX(0);',
  'translate-x-1': 'transform: translateX(0.25rem);',
  'translate-x-2': 'transform: translateX(0.5rem);',
  'translate-x-4': 'transform: translateX(1rem);',
  'translate-x-8': 'transform: translateX(2rem);',
  '-translate-x-1': 'transform: translateX(-0.25rem);',
  '-translate-x-2': 'transform: translateX(-0.5rem);',
  '-translate-x-4': 'transform: translateX(-1rem);',
  'translate-y-0': 'transform: translateY(0);',
  'translate-y-1': 'transform: translateY(0.25rem);',
  'translate-y-2': 'transform: translateY(0.5rem);',
  'translate-y-4': 'transform: translateY(1rem);',
  '-translate-y-1': 'transform: translateY(-0.25rem);',
  '-translate-y-2': 'transform: translateY(-0.5rem);',
  '-translate-y-4': 'transform: translateY(-1rem);',

  // Cursor
  'cursor-auto': 'cursor: auto;',
  'cursor-default': 'cursor: default;',
  'cursor-pointer': 'cursor: pointer;',
  'cursor-wait': 'cursor: wait;',
  'cursor-text': 'cursor: text;',
  'cursor-move': 'cursor: move;',
  'cursor-not-allowed': 'cursor: not-allowed;',
  'cursor-none': 'cursor: none;',

  // Misc
  'pointer-events-none': 'pointer-events: none;',
  'pointer-events-auto': 'pointer-events: auto;',
  'select-none': 'user-select: none;',
  'select-text': 'user-select: text;',
  'select-all': 'user-select: all;',
  'select-auto': 'user-select: auto;',
  'resize-none': 'resize: none;',
  'resize': 'resize: both;',
  'resize-y': 'resize: vertical;',
  'resize-x': 'resize: horizontal;',
  'object-contain': 'object-fit: contain;',
  'object-cover': 'object-fit: cover;',
  'object-fill': 'object-fit: fill;',
  'object-none': 'object-fit: none;',
  'object-scale-down': 'object-fit: scale-down;',
  'blur': 'filter: blur(8px);',
  'blur-sm': 'filter: blur(4px);',
  'blur-md': 'filter: blur(12px);',
  'blur-lg': 'filter: blur(16px);',
  'blur-xl': 'filter: blur(24px);',
  'blur-2xl': 'filter: blur(40px);',
  'blur-3xl': 'filter: blur(64px);',
  'grayscale': 'filter: grayscale(100%);',
  'grayscale-0': 'filter: grayscale(0);',
  'grayscale-50': 'filter: grayscale(50%);',
  'invert': 'filter: invert(100%);',
  'invert-0': 'filter: invert(0);',
  'sepia': 'filter: sepia(100%);',
  'sepia-0': 'filter: sepia(0);',
};

// Extract classes from HTML code
function extractClassesFromHtml(htmlCode: string): string[] {
  const classRegex = /class="([^"]+)"/g;
  const classes: string[] = [];
  let match;

  while ((match = classRegex.exec(htmlCode)) !== null) {
    const classNames = match[1].split(/\s+/).filter(Boolean);
    classes.push(...classNames);
  }

  return [...new Set(classes)]; // Remove duplicates
}

export function CSSConverter({ code, onClose }: CSSConverterProps) {
  const [inputClasses, setInputClasses] = useState('');
  const [copied, setCopied] = useState(false);

  // Extract classes from current editor code
  const extractedClasses = useMemo(() => extractClassesFromHtml(code), [code]);

  // Parse input classes
  const parsedClasses = useMemo(() => {
    const input = inputClasses.trim();
    if (!input) return extractedClasses;
    return input.split(/[\s,]+/).filter(Boolean);
  }, [inputClasses, extractedClasses]);

  // Convert to CSS mapping
  const cssMappings = useMemo(() => {
    return parsedClasses.map(tailwindClass => {
      // Skip responsive prefixes and states
      if (tailwindClass.includes(':')) return null;
      if (tailwindClass.startsWith('hover-') || tailwindClass.startsWith('focus-') ||
          tailwindClass.startsWith('active-') || tailwindClass.startsWith('group-')) return null;
      if (tailwindClass.startsWith('[')) return null;

      return {
        tailwind: tailwindClass,
        css: tailwindToCssMap[tailwindClass] || '/* 未找到对应样式 */',
        found: !!tailwindToCssMap[tailwindClass]
      };
    }).filter(Boolean);
  }, [parsedClasses]);

  const handleCopy = async () => {
    const cssText = cssMappings
      .filter(m => m?.found)
      .map(m => `/* ${m?.tailwind} */\n${m?.css}`)
      .join('\n\n');
    await navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">CSS 转换器</h2>
              <p className="text-sm text-slate-400">Tailwind → CSS 学习对照</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input Section */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">
              输入 Tailwind 类名（用空格分隔）
            </label>
            <span className="text-xs text-slate-500">
              当前代码已自动提取 {extractedClasses.length} 个类名
            </span>
          </div>
          <textarea
            value={inputClasses}
            onChange={(e) => setInputClasses(e.target.value)}
            placeholder="例如: flex items-center justify-center bg-blue-500 text-white p-4 rounded-lg..."
            className="w-full h-20 px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {cssMappings.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>请在上方输入 Tailwind 类名</p>
                <p className="text-sm mt-2">或直接在编辑器中编写代码，会自动提取类名</p>
              </div>
            ) : (
              cssMappings.map((mapping, index) => mapping && (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg border ${
                    mapping.found
                      ? 'bg-slate-900/50 border-slate-700'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  {/* Tailwind Class */}
                  <div className="flex-shrink-0 w-48">
                    <span className="text-sm font-mono text-cyan-400">
                      {mapping.tailwind}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-slate-500">
                    <ArrowRightLeft size={16} />
                  </div>

                  {/* CSS Result */}
                  <div className="flex-1">
                    <pre className={`text-sm font-mono whitespace-pre-wrap ${
                      mapping.found ? 'text-slate-300' : 'text-red-400'
                    }`}>
                      {mapping.css}
                    </pre>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700">
          <div className="text-sm text-slate-400">
            共 {cssMappings.filter(m => m?.found).length} / {cssMappings.length} 个类名已转换
          </div>
          <button
            onClick={handleCopy}
            disabled={cssMappings.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? '已复制' : '复制 CSS'}
          </button>
        </div>
      </div>
    </div>
  );
}
