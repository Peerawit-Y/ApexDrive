import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ถามสเปก เช่น 0-100 เร็วสุด, ม้าของ 296 GTB, หรือ RWD vs AWD..."
        disabled={isLoading}
        className="flex-1 bg-black/50 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-50 transition-colors"
      />
      <button
        type="submit"
        disabled={!text.trim() || isLoading}
        className="p-3 bg-rose-600 hover:bg-rose-500 disabled:bg-white/[0.04] disabled:text-slate-600 text-white rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      </button>
    </form>
  );
};
