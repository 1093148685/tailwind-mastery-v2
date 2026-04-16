import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Check, AlertCircle, Loader2, Trash2, ChevronDown } from 'lucide-react';

interface AiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    apiKey: string;
    baseUrl: string;
    model: string;
  };
  onSave: (config: { apiKey: string; baseUrl: string; model: string }) => void;
}

interface Model {
  id: string;
  name?: string;
}

export function AiSettingsModal({ isOpen, onClose, config, onSave }: AiSettingsModalProps) {
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [baseUrl, setBaseUrl] = useState(config.baseUrl);
  const [model, setModel] = useState(config.model);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  useEffect(() => {
    setApiKey(config.apiKey);
    setBaseUrl(config.baseUrl);
    setModel(config.model);
    setTestResult(null);
  }, [config, isOpen]);

  // Fetch models when API key or base URL changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!apiKey.trim() || !baseUrl.trim()) {
        setModels([]);
        return;
      }

      setLoadingModels(true);
      try {
        const response = await fetch(`${baseUrl.trim()}/models`, {
          headers: {
            'Authorization': `Bearer ${apiKey.trim()}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const modelList = data.data || data.models || [];
          setModels(modelList.map((m: any) => ({
            id: m.id,
            name: m.id
          })));
        } else {
          setModels([]);
        }
      } catch (error) {
        setModels([]);
      } finally {
        setLoadingModels(false);
      }
    };

    // Debounce fetch models
    const timer = setTimeout(fetchModels, 500);
    return () => clearTimeout(timer);
  }, [apiKey, baseUrl]);

  const handleTest = async () => {
    if (!apiKey.trim() || !baseUrl.trim()) {
      setTestResult({ success: false, message: '请填写 API Key 和 Base URL' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const response = await fetch(`${baseUrl.trim()}/models`, {
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`
        }
      });

      if (response.ok) {
        setTestResult({ success: true, message: '连接成功！已获取 ' + models.length + ' 个模型' });
      } else {
        const error = await response.json();
        setTestResult({ success: false, message: error.error?.message || '连接失败，请检查 API Key 和 Base URL' });
      }
    } catch (error) {
      setTestResult({ success: false, message: '网络错误，请检查 Base URL 是否正确' });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    onSave({
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim(),
      model: model.trim()
    });
    onClose();
  };

  const handleClear = () => {
    setApiKey('');
    setBaseUrl('https://api.openai.com/v1');
    setModel('gpt-4o-mini');
    setTestResult(null);
    setModels([]);
  };

  const handleSelectModel = (modelId: string) => {
    setModel(modelId);
    setShowModelDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                <circle cx="8" cy="14" r="2" />
                <circle cx="16" cy="14" r="2" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI 设置</h2>
              <p className="text-sm text-slate-400">配置你的 API Key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">API Key 仅保存在本地浏览器中，不会上传到服务器</p>
          </div>

          {/* Base URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Base URL
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.openai.com/v1"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-slate-500 mt-1">支持 OpenAI、Anthropic、兼容 OpenAI API 的服务</p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Model {loadingModels && <span className="text-slate-500">(获取中...)</span>}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => models.length > 0 && setShowModelDropdown(!showModelDropdown)}
                disabled={models.length === 0}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between disabled:opacity-50"
              >
                <span className={model ? 'text-white' : 'text-slate-500'}>
                  {model || '选择模型'}
                </span>
                {models.length > 0 && (
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Model Dropdown */}
              {showModelDropdown && models.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-slate-900 border border-slate-600 rounded-xl max-h-60 overflow-y-auto">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectModel(m.id)}
                      className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        m.id === model ? 'bg-purple-500/20 text-purple-400' : 'text-white'
                      }`}
                    >
                      {m.name || m.id}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {models.length > 0 && (
              <p className="text-xs text-green-400 mt-1">已获取 {models.length} 个可用模型</p>
            )}
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              testResult.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
            }`}>
              {testResult.success ? (
                <Check size={18} className="text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
              )}
              <span className={`text-sm ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
                {testResult.message}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
            清除
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTest}
              disabled={testing || !apiKey.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {testing ? <Loader2 size={18} className="animate-spin" /> : null}
              测试连接
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors"
            >
              <Check size={18} />
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
