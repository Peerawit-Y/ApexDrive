import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, ArrowUp, RotateCcw, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { askConcierge } from '../services/conciergeService';
import { products } from '../services/productService';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  citations?: string[];
  recommendedIds?: string[];
}

export const ChatConcierge: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    t('รุ่นไหนแรงม้ามากที่สุด?', 'Which model has the most HP?'),
    t('เทียบ APEX X Hyper กับ APEX 10 Evo', 'Compare APEX X Hyper vs APEX 10 Evo'),
    t('แนะนำรถขับใช้งานทุกวัน งบไม่เกิน 3 ล้าน', 'Best daily car under ฿3M?'),
    t('มีรุ่นขับเคลื่อน 4 ล้อ (AWD) รุ่นไหนบ้าง?', 'Which models are AWD?')
  ];

  // Show subtle luxury greeting tooltip shortly after load
  useEffect(() => {
    if (greetingDismissed || isOpen) return;
    const timer = setTimeout(() => setShowGreeting(true), 1800);
    return () => clearTimeout(timer);
  }, [greetingDismissed, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowGreeting(false);
    setGreetingDismissed(true);
  };

  const handleSend = async (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askConcierge(text, lang);
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        citations: response.citations,
        recommendedIds: response.recommendedIds
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: t(
          'ขออภัยครับ เกิดข้อผิดพลาดขณะประมวลผล กรุณาลองใหม่อีกครั้ง',
          'Sorry, something went wrong processing that. Please try again.'
        )
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <>
      {/* =====================================================================
          LUXURY FLOATING LAUNCHER + PROACTIVE GREETING POPUP
          ===================================================================== */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
          
          {/* Subtle Floating Greeting Bubble */}
          {showGreeting && !greetingDismissed && (
            <div className="animate-luxury-popup relative max-w-[260px] bg-[#0C0E14]/95 backdrop-blur-2xl border border-white/[0.16] rounded-2xl rounded-br-sm px-4 py-3.5 shadow-2xl shadow-black/80">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setGreetingDismissed(true);
                  setShowGreeting(false);
                }}
                className="absolute top-2.5 right-2.5 text-neutral-500 hover:text-white transition-colors"
                aria-label="Dismiss greeting"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleOpen}
                className="text-left pr-4 space-y-1 block"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block">
                  APEXDRIVE CONCIERGE
                </span>
                <p className="text-xs text-neutral-200 font-light leading-relaxed">
                  {t(
                    'ให้ผมช่วยแนะนำรุ่นที่ใช่ หรือเทียบสเปกรถให้ไหมครับ?',
                    'May I assist you with specs or choosing a model?'
                  )}
                </p>
              </button>
            </div>
          )}

          {/* Luxury Crimson Circular Concierge Button */}
          <button
            type="button"
            onClick={handleOpen}
            title={t('แชทกับผู้ช่วยส่วนตัว AI', 'Chat with AI Concierge')}
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 hover:from-red-400 hover:via-red-600 hover:to-red-700 text-white border border-white/25 shadow-[0_12px_36px_-6px_rgba(220,38,38,0.75)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Open ApexDrive AI Concierge"
          >
            {/* Subtle Crimson Ambient Glow */}
            <span className="pointer-events-none absolute -inset-1.5 rounded-full bg-red-600/35 blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Crisp White Icon */}
            <Sparkles className="relative w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75] text-white drop-shadow" />

            {/* Online Status Dot */}
            <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#08090C]" />
          </button>

        </div>
      )}

      {/* =====================================================================
          ANIMATED LUXURY CONCIERGE POPUP WINDOW
          ===================================================================== */}
      {isOpen && (
        <div className="animate-luxury-popup origin-bottom-right fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[430px] h-[min(650px,calc(100vh-6rem))] bg-[#08090C]/95 backdrop-blur-2xl border border-white/[0.15] rounded-3xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
          
          {/* Top Metallic Hairline Accent */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/35 to-transparent" />

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 stroke-[1.75]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#08090C]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] tracking-[0.24em] uppercase text-neutral-500 block">
                  APEXDRIVE CONCIERGE
                </span>
                <h3 className="text-base font-light text-white tracking-tight">
                  {t('ผู้ช่วยผู้เชี่ยวชาญส่วนตัว', 'Private Specialist')}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-8 h-8 rounded-full border border-white/[0.1] text-neutral-500 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
                  title={t('เริ่มบทสนทนาใหม่', 'Reset conversation')}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
                aria-label="Close AI Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            
            {/* Welcome State */}
            {messages.length === 0 && (
              <div className="space-y-6 py-1">
                <div className="space-y-2">
                  <p className="text-xl font-light text-white tracking-tight">
                    {t('สวัสดีครับ มีอะไรให้ผมช่วยดูแลไหมครับ?', 'Good day. How may I assist you?')}
                  </p>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {t(
                      'สอบถามสเปกเครื่องยนต์ เปรียบเทียบสมรรถนะ หรือให้ช่วยคัดเลือกรถที่เหมาะกับสไตล์ของคุณได้ทันที',
                      'Ask about technical specifications, compare models head-to-head, or request a tailored vehicle recommendation.'
                    )}
                  </p>
                </div>

                {/* Curated Quick Prompts */}
                <div className="space-y-2.5">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-neutral-600 block">
                    {t('คำถามแนะนำ', 'SUGGESTED INQUIRIES')}
                  </span>
                  <div className="space-y-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="w-full text-left px-4 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/25 text-xs font-light text-neutral-300 hover:text-white transition-all flex items-center justify-between gap-3 group"
                      >
                        <span>{prompt}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Thread */}
            {messages.map(msg => {
              const recommendedCars = (msg.recommendedIds || [])
                .map(id => products.find(p => p.id === id))
                .filter((p): p is NonNullable<typeof p> => Boolean(p));

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2.5`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-white text-black font-normal rounded-br-sm'
                        : 'bg-white/[0.04] border border-white/[0.08] text-neutral-200 font-light rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Clickable Car Mini-Cards inside AI Reply */}
                  {recommendedCars.length > 0 && (
                    <div className="w-full max-w-[88%] space-y-1.5">
                      {recommendedCars.map(car => (
                        <Link
                          key={car.id}
                          to={`/products/${car.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/25 transition-all group"
                        >
                          <img
                            src={car.image}
                            alt={car.model}
                            className="w-14 h-10 rounded-xl object-cover shrink-0 bg-[#07080B]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-light text-white truncate">
                              {car.brand} {car.model}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-light">
                              {car.horsepower} HP · ฿{car.price.toLocaleString()}
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 mr-1" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Understated Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="max-w-[88%] text-[10px] text-neutral-600 font-light tracking-wide pl-1">
                      {t('อ้างอิง:', 'Source:')} {msg.citations.join(' · ')}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Minimalist Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.08] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            )}

          </div>

          {/* Input Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-white/[0.08] bg-white/[0.02]"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('พิมพ์คำถามเกี่ยวกับรถยนต์...', 'Ask about any model or specification...')}
                className="w-full pl-4 pr-12 py-3 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs sm:text-sm font-light text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 w-9 h-9 rounded-full bg-white text-black hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-white flex items-center justify-center transition-all"
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
};
