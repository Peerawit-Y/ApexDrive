import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/product';
import { User, Activity, CheckCircle2 } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 text-xs leading-relaxed ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
        isUser
          ? 'bg-neutral-800 text-slate-200'
          : 'bg-[#151924] text-rose-500 shadow-md'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 ${
        isUser
          ? 'bg-rose-600 text-white rounded-tr-none shadow-md'
          : 'bg-[#121622] text-slate-200 rounded-tl-none shadow-lg'
      }`}>
        
        {/* Content with markdown line break formatting */}
        <div className="whitespace-pre-line text-xs font-normal leading-relaxed">
          {message.content}
        </div>

        {/* Citations / Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="pt-2.5 mt-2.5 space-y-1.5 font-mono">
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>VERIFIED KNOWLEDGE CITATION:</span>
            </div>
            <ul className="space-y-1">
              {message.sources.map((src, idx) => (
                <li key={idx} className="text-[10px] text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg truncate">
                  {src}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`text-[9px] font-mono ${isUser ? 'text-rose-200' : 'text-slate-500'} text-right`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
