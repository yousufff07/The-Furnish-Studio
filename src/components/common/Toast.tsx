import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#964627] flex-shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#CCA37E] flex-shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-[#8D9399] flex-shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'border-l-[#964627]';
      case 'warning': return 'border-l-[#CCA37E]';
      case 'error': return 'border-l-red-600';
      default: return 'border-l-[#8D9399]';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm w-full">
      <div className={`bg-[#F8ECE1] border border-[#EBD8C6] border-l-4 ${getBorderColor()} shadow-2xl rounded-xl p-4 flex items-start gap-3`}>
        {getIcon()}
        <div className="flex-1 pr-2">
          {toast.title && <h4 className="font-serif font-semibold text-[#1E1A17] text-sm">{toast.title}</h4>}
          <p className="text-xs text-[#1E1A17]/80 leading-relaxed font-sans">{toast.message}</p>
        </div>
        <button 
          onClick={hideToast}
          className="text-[#1E1A17]/40 hover:text-[#1E1A17] transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
