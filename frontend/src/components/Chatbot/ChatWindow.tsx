import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '../../types/product';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { askChatbot } from '../../services/chatbotService';
import { X, RotateCcw, Settings2, ShieldCheck, Loader2, Gauge } from 'lucide-react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: 'สวัสดีครับ ยินดีต้อนรับสู่ **Apex Co-Pilot Telemetry**\n\nผมพร้อมให้คำปรึกษาเชิงวิเคราะห์สเปก พละกำลังเครื่องยนต์ อัตราเร่ง ระบบขับเคลื่อน (RWD/AWD) หรือการเปรียบเทียบซูเปอร์คาร์ในโชว์รูมของเรา โดยอ้างอิงจากฐานข้อมูลวิศวกรรมที่ผ่านการตรวจสอบจริง\n\nท่านสนใจวิเคราะห์รถรุ่นใดเป็นพิเศษไหมครับ?',
      sources: ['ApexDrive Technical Knowledge Base MY2024-2025'],
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
        content: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ Telemetry กรุณาลองใหม่อีกครั้งครับ',
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
        content: 'รีเซ็ตระบบ Telemetry เรียบร้อยแล้วครับ สอบถามข้อมูลรถยนต์สปอร์ตที่ท่านสนใจได้เลยครับ!',
        sources: ['ApexDrive Technical Knowledge Base MY2024-2025'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-md bg-[#0D1017] rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[82vh] h-[640px] animate-in slide-in-from-bottom-6 duration-300">
      
      {/* Pit-Wall Header */}
      <div className="p-4 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black/50 flex items-center justify-center">
            <Gauge className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-mono font-bold text-white tracking-wider">
                APEX CO-PILOT
              </h4>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              <span>TELEMETRY RAG // VERIFIED</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="ตั้งค่า API Endpoint"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="ล้างบทสนทนา"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="ปิดหน้าต่าง"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Bar (Expandable) */}
      {showSettings && (
        <div className="p-3 bg-black/90 text-xs space-y-2 font-mono">
          <div className="flex items-center justify-between font-semibold text-slate-300">
            <span>Secure Cloud API Endpoint</span>
            <span className="text-[10px] text-emerald-400">RAG Ready</span>
          </div>
          <input
            type="url"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="เช่น https://your-cloud-run-api/chat"
            className="w-full bg-[#12151E] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
          <p className="text-[10px] text-slate-400 leading-tight">
            *เมื่อเว้นว่าง ระบบจะทำงานในโหมด Offline Knowledge Base Matcher (ปลอดภัยและไม่เปิดเผย API Key ใน Frontend)
          </p>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#08090C]">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs font-mono text-rose-300 bg-rose-950/25 p-3 rounded-xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
            <span>กำลังสแกนฐานข้อมูลวิศวกรรมยานยนต์...</span>
          </div>
        )}
      </div>

      {/* Quick Question Chips */}
      <div className="px-3 py-2.5 bg-black/40 overflow-x-auto whitespace-nowrap flex gap-1.5">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="inline-block px-3 py-1.5 rounded-lg text-[11px] font-mono bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/30">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

    </div>
  );
};
