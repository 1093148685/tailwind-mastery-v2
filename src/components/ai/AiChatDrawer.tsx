import { useState, useRef, useEffect } from 'react';
import { X, Settings, Send, Trash2, Loader2, Sparkles, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AiSettingsModal } from './AiSettingsModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentCode?: string;
  currentLessonTitle?: string;
}

export function AiChatDrawer({ isOpen, onClose, currentCode, currentLessonTitle }: AiChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load config from localStorage
  const [config, setConfig] = useState({
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini'
  });

  // Load config on mount
  useEffect(() => {
    const saved = localStorage.getItem('tailwind-mastery-ai-config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load AI config', e);
      }
    }

    // Load chat history
    const savedHistory = localStorage.getItem('tailwind-mastery-ai-history');
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  // Save config when changed
  const handleSaveConfig = (newConfig: { apiKey: string; baseUrl: string; model: string }) => {
    setConfig(newConfig);
    localStorage.setItem('tailwind-mastery-ai-config', JSON.stringify(newConfig));
  };

  // Save messages to localStorage (only save completed messages)
  useEffect(() => {
    const completedMessages = messages.filter(m => m.role === 'user' || (m.role === 'assistant' && !m.content.includes('[流式输出中]')));
    if (completedMessages.length > 0) {
      localStorage.setItem('tailwind-mastery-ai-history', JSON.stringify(completedMessages));
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Clear history
  const handleClearHistory = () => {
    if (confirm('确定要清空聊天记录吗？')) {
      setMessages([]);
      localStorage.removeItem('tailwind-mastery-ai-history');
    }
  };

  // Send message with streaming
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!config.apiKey) {
      setShowSettings(true);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Add placeholder for streaming response
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    // Build system prompt with context
    let systemPrompt = `你是一个专业的 Tailwind CSS 导师助手。请用简洁的中文回答用户关于 Tailwind CSS 的问题。如果用户发送代码，请解释代码中使用的 Tailwind 类名含义。`;

    if (currentLessonTitle) {
      systemPrompt += `\n\n当前学习的课程是：${currentLessonTitle}`;
    }

    if (currentCode) {
      systemPrompt += `\n\n用户当前的代码：\n${currentCode}`;
    }

    try {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          stream: true
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API 请求失败');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || '';
                if (content) {
                  assistantMessage += content;
                  // Update the last message with streaming content
                  setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      role: 'assistant',
                      content: assistantMessage
                    };
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (error: any) {
      // Update the last message with error
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: `错误: ${error.message || '请检查 API Key 和网络连接'}`
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Custom code block component for Markdown
  const CodeBlock = ({ children, className }: { children: string; className?: string }) => {
    const language = className?.replace('language-', '') || '';
    return (
      <div className="my-3 rounded-lg overflow-hidden">
        {language && (
          <div className="px-3 py-1 bg-slate-700 text-xs text-slate-400 border-b border-slate-600">
            {language}
          </div>
        )}
        <pre className="p-3 bg-slate-900 overflow-x-auto">
          <code className="text-sm text-cyan-300 font-mono">{children}</code>
        </pre>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-800 shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI 助手</h2>
              <p className="text-sm text-slate-400">{config.model}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="清空聊天记录"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="设置"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Context Badge */}
        {currentLessonTitle && (
          <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-700 flex items-center gap-2">
            <BookOpen size={14} className="text-slate-500" />
            <span className="text-xs text-slate-400">当前课程: {currentLessonTitle}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">你好！我是 AI 助手</h3>
              <p className="text-sm text-slate-400 mb-4">
                可以帮助你解答 Tailwind CSS 相关问题
              </p>
              <div className="text-left text-sm text-slate-500 space-y-2 bg-slate-900/50 p-4 rounded-lg">
                <p className="font-medium text-slate-400">例如：</p>
                <ul className="space-y-1">
                  <li>• 如何居中一个 div？</li>
                  <li>• flex 和 grid 有什么区别？</li>
                  <li>• 这个类名是什么意思？</li>
                </ul>
              </div>
              {!config.apiKey && (
                <button
                  onClick={() => setShowSettings(true)}
                  className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors"
                >
                  先去设置 API Key
                </button>
              )}
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  ) : (
                    <div className="text-sm">
                      <ReactMarkdown
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !match && !className;
                            return isInline ? (
                              <code className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300 font-mono text-xs" {...props}>
                                {children}
                              </code>
                            ) : (
                              <CodeBlock className={className}>
                                {String(children).replace(/\n$/, '')}
                              </CodeBlock>
                            );
                          },
                          p({ children, ...props }) {
                            return <p className="mb-2 last:mb-0" {...props}>{children}</p>;
                          },
                          ul({ children, ...props }) {
                            return <ul className="list-disc list-inside mb-2 space-y-1" {...props}>{children}</ul>;
                          },
                          ol({ children, ...props }) {
                            return <ol className="list-decimal list-inside mb-2 space-y-1" {...props}>{children}</ol>;
                          },
                          li({ children, ...props }) {
                            return <li {...props}>{children}</li>;
                          },
                          h1({ children, ...props }) {
                            return <h1 className="text-xl font-bold mb-2" {...props}>{children}</h1>;
                          },
                          h2({ children, ...props }) {
                            return <h2 className="text-lg font-bold mb-2" {...props}>{children}</h2>;
                          },
                          h3({ children, ...props }) {
                            return <h3 className="text-base font-bold mb-1" {...props}>{children}</h3>;
                          },
                          strong({ children, ...props }) {
                            return <strong className="font-semibold text-white" {...props}>{children}</strong>;
                          },
                          a({ children, href, ...props }) {
                            return <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                          },
                        }}
                      >
                        {message.content || '...'}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="bg-slate-700 p-3 rounded-2xl">
                <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={config.apiKey ? '输入问题...' : '请先设置 API Key'}
              disabled={!config.apiKey}
              rows={1}
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !config.apiKey}
              className="p-3 bg-purple-500 hover:bg-purple-400 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>

      {/* Settings Modal */}
      <AiSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </>
  );
}
