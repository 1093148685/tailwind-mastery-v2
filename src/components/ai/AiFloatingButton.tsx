import { MessageCircle } from 'lucide-react';

interface AiFloatingButtonProps {
  onClick: () => void;
}

export function AiFloatingButton({ onClick }: AiFloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group"
      title="AI 助手"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <span className="w-2 h-2 bg-white rounded-full"></span>
      </span>
    </button>
  );
}
