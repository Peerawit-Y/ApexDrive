import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '../../types/product';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { askChatbot } from '../../services/chatbotService';
import { Sparkles, X, RotateCcw, Settings2, ShieldCheck, Loader2 } from 'lucide-react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: 'สวัสดีครับ! ผมคือ **ApexDrive AI Specialist** ผู้ช่วยวิเคราะห์ข้อมูลรถสปอร์ตและซูเปอร์คาร์ ขับเคลื่อนด้วย Google Gemini พร้อมระบบค้นหา RAG จากคลังข้อมูลสเปกของเรา\n\nสามารถสอบถามเรื่องสเปก พละกำลัง ความแตกต่าง หรือขอคำแนะนำการเลือกรถได้เลยครับ!',
      sources: ['ApexDrive Verified Knowledge Base'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'รถรุ่นไหนแรงม้ามากที่สุด?',
    'เปรียบเทียบ Porsche 911 กับ GT-R',
    'AWD กับ RWD ต่างกันอย่างไร?',
    'รุ่นไหนเหมาะสำหรับมือใหม่?'
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessageType = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await askChatbot(text, apiEndpoint);
      const assistantMsg: ChatMessageType = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: response.text,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessageType = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini API กรุณาลองใหม่อีกครั้งครับ',
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        content: 'เริ่มการสนทนาใหม่แล้วครับ สอบถามข้อมูลรถยนต์สปอร์ตที่ท่านสนใจได้เลยครับ!',
        sources: ['ApexDrive Verified Knowledge Base'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-md bg-brand-card rounded-2xl border border-brand-border shadow-2xl flex flex-col overflow-hidden max-h-[82vh] h-[640px] animate-in slide-in-from-bottom-6 duration-300">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>ApexDrive AI Specialist</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </h4>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              <span>Gemini File Search RAG</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="ตั้งค่า API Endpoint"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="ล้างบทสนทนา"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="ปิดหน้าต่าง"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Bar (Expandable) */}
      {showSettings && (
        <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between font-semibold text-slate-300">
            <span>Secure Cloud API Endpoint (Optional)</span>
            <span className="text-[10px] text-emerald-400">RAG Ready</span>
          </div>
          <input
            type="url"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="เช่น https://your-cloud-run-api/chat"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500"
          />
          <p className="text-[10px] text-slate-400 leading-tight">
            *เมื่อเว้นว่าง ระบบจะทำงานในโหมด Offline Knowledge Base Matcher (ไม่เปิดเผย API Key ใน Frontend ตามเกณฑ์ความปลอดภัย)
          </p>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark/50">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/20 p-3 rounded-xl border border-rose-900/40 w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI กำลังค้นหาข้อมูลจาก Knowledge Base...</span>
          </div>
        )}
      </div>

      {/* Quick Question Chips */}
      <div className="px-3 py-2 bg-slate-900/90 border-t border-brand-border/60 overflow-x-auto whitespace-nowrap flex gap-1.5">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="inline-block px-2.5 py-1 rounded-full text-[11px] bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-white border border-slate-700/60 transition-colors shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-brand-card border-t border-brand-border">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

    </div>
  );
};
