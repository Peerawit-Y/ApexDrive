import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface FAQProps {
  onOpenChat: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenChat }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'รถรุ่นไหนมีแรงม้ามากที่สุดในรายการสินค้า?',
      a: 'Ferrari 296 GTB มีแรงม้ามากที่สุดในคลังสินค้าของเรา โดยให้กำลังรวมสูงสุดถึง 830 แรงม้า (HP) จากการทำงานร่วมกันระหว่างเครื่องยนต์ 3.0 ลิตร V6 Twin-Turbo และมอเตอร์ไฟฟ้า Plug-in Hybrid'
    },
    {
      q: 'รถรุ่นไหนมีอัตราเร่ง 0-100 กม./ชม. เร็วที่สุด?',
      a: 'Chevrolet Corvette Z06 (C8) ทำอัตราเร่ง 0-100 กม./ชม. ได้เร็วที่สุดที่ 2.6 วินาที ตามมาด้วย Nissan GT-R Nismo ที่ทำได้ใน 2.7 วินาที ด้วยความได้เปรียบของระบบขับเคลื่อน 4 ล้อ AWD'
    },
    {
      q: 'Porsche 911 Carrera กับ Nissan GT-R Nismo แตกต่างกันอย่างไร?',
      a: 'Porsche 911 Carrera (394 HP) เน้นความประณีต สมดุลการควบคุม วางเครื่องท้าย ขับหลัง RWD และเหมาะสำหรับการใช้งานในชีวิตประจำวัน ส่วน Nissan GT-R Nismo (600 HP) เน้นความแรงดิบ การยึดเกาะถนนในสนามแข่งด้วยระบบขับเคลื่อน 4 ล้อ AWD และเทอร์โบชาร์จเจอร์สเปกแข่ง GT3'
    },
    {
      q: 'ระบบขับเคลื่อน AWD และ RWD ส่งผลต่อการขับขี่อย่างไร?',
      a: 'RWD (ขับเคลื่อนล้อหลัง) มอบความรู้สึกสปอร์ตคล่องตัว หน้าเบา เลี้ยวคม และท้ายปัดได้ ส่วน AWD (ขับเคลื่อน 4 ล้อ) มอบแรงยึดเกาะสูงสุด ออกตัวได้รวดเร็วโดยล้อไม่ฟรีทิ้ง และปลอดภัยสูงบนสภาพถนนลื่น'
    },
    {
      q: 'รุ่นใดในรายการที่ใช้เครื่องยนต์ Naturally Aspirated (ไร้เทอร์โบ)?',
      a: 'มี 2 รุ่น ได้แก่ Lamborghini Huracán Tecnica (5.2L V10, 640 HP, รอบสูงสุด 8,500 RPM) และ Chevrolet Corvette Z06 (5.5L LT6 V8 Flat-Plane Crank, 670 HP, รอบสูงสุด 8,600 RPM)'
    },
    {
      q: 'รถรุ่นไหนเหมาะสำหรับผู้เริ่มต้น (Beginner) และขับใช้งานทุกวัน (Daily Driving)?',
      a: 'แนะนำ Porsche 911 Carrera (ทัศนวิสัยดี เบาะนั่งสบาย มีระบบยกหน้าข้ามลูกระนาด และมีที่นั่ง 2+2) หรือ BMW M4 Competition (ขับ 4 ล้อปลอดภัย ห้องโดยสารพรีเมียมสะดวกสบาย)'
    },
    {
      q: 'เว็บไซต์นี้สามารถสั่งซื้อหรือชำระเงินจริงได้หรือไม่?',
      a: 'ไม่สามารถสั่งซื้อจริงได้ เนื่องจาก ApexDrive เป็นเว็บไซต์จำลองเพื่อการศึกษา (Simulation Niche E-commerce) ตะกร้าสินค้าและขั้นตอนสั่งซื้อมีไว้เพื่อสาธิตและทดสอบฟังก์ชันทางวิศวกรรมซอฟต์แวร์เท่านั้น'
    },
    {
      q: 'RAG Chatbot อ้างอิงคำตอบจากที่ไหน?',
      a: 'Chatbot อ้างอิงข้อมูลโดยตรงจากเอกสารในโฟลเดอร์ knowledge-base/ ผ่านเทคโนโลยี Gemini File Search โดยระบบจะไม่สร้างตัวเลขหรือสเปกขึ้นมาเองหากไม่มีข้อมูลรองรับในคลังเอกสาร'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">คำถามที่พบบ่อย (FAQ)</h1>
        <p className="text-xs text-slate-400">
          รวบรวมคำถามยอดนิยมเกี่ยวกับสเปกรถยนต์ ระบบขับเคลื่อน และการทำงานของระบบ
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <span className="text-sm font-bold text-white leading-snug">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-brand-border/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Box for Chatbot */}
      <div className="p-6 bg-gradient-to-r from-rose-950/40 via-brand-card to-slate-900 rounded-2xl border border-rose-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>มีคำถามอื่นที่ไม่มีในนี้ใช่หรือไม่?</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            ลองสอบถาม RAG Chatbot อัจฉริยะของเราที่พร้อมค้นหาจากคลังเอกสารให้ทันที
          </p>
        </div>
        <button
          onClick={onOpenChat}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-950/40 shrink-0 transition-colors"
        >
          เปิดหน้าต่างถาม AI
        </button>
      </div>

    </div>
  );
};
