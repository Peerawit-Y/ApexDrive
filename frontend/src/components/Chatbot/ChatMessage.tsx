import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/product';
import { Bot, User, BookOpen } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 text-xs leading-relaxed ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
        isUser
          ? 'bg-slate-700 text-slate-200'
          : 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
        isUser
          ? 'bg-rose-600 text-white rounded-tr-none'
          : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-lg'
      }`}>
        
        {/* Content with markdown line break formatting */}
        <div className="whitespace-pre-line text-xs font-normal">
          {message.content}
        </div>

        {/* Citations / Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="pt-2 mt-2 border-t border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              <BookOpen className="w-3 h-3" />
              <span>แหล่งอ้างอิงจาก Knowledge Base:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5">
              {message.sources.map((src, idx) => (
                <li key={idx} className="text-[10px] text-slate-400 truncate">
                  {src}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`text-[9px] ${isUser ? 'text-rose-200' : 'text-slate-500'} text-right`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
