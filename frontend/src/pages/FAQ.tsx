import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, PhoneCall } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'รถรุ่นไหนมีแรงม้ามากที่สุดในรายการสินค้า?',
      a: 'Bugatti Chiron มีแรงม้ามากที่สุดในคลังสินค้าของเรา โดยให้กำลังสูงสุดถึง 1,500 แรงม้า (HP) จากเครื่องยนต์ 8.0 ลิตร W16 4 เทอร์โบ ตามมาด้วย Lamborghini Revuelto ที่มีกำลังรวม 1,015 แรงม้า จากเครื่องยนต์ V12 6.5 ลิตร ผสานมอเตอร์ไฟฟ้า 3 ตัว'
    },
    {
      q: 'รถรุ่นไหนมีอัตราเร่ง 0-100 กม./ชม. เร็วที่สุด?',
      a: 'Bugatti Chiron ทำอัตราเร่ง 0-100 กม./ชม. ได้เร็วที่สุดในเวลา 2.4 วินาที ตามมาด้วย Lamborghini Revuelto ที่ 2.5 วินาที และ APEX 35 GT ที่ทำได้ใน 2.7 วินาที ด้วยความได้เปรียบของระบบขับเคลื่อน 4 ล้อ AWD'
    },
    {
      q: 'Bugatti Chiron กับ Lamborghini Revuelto แตกต่างกันอย่างไร?',
      a: 'Bugatti Chiron (1,500 HP) เป็นไฮเปอร์คาร์เครื่องยนต์สันดาปล้วน W16 4 เทอร์โบ เน้นความเร็วสูงสุดระดับ 420 กม./ชม. และความประณีตแบบ Grand Tourer ส่วน Lamborghini Revuelto (1,015 HP) เป็นซูเปอร์คาร์ปลั๊กอินไฮบริด V12 ดูดอากาศธรรมชาติรอบจัดผสานมอเตอร์ไฟฟ้า 3 ตัว เน้นความคล่องตัวในสนามแข่งด้วยระบบ e-4WD Torque Vectoring'
    },
    {
      q: 'ระบบขับเคลื่อน AWD และ RWD ส่งผลต่อการขับขี่อย่างไร?',
      a: 'RWD (ขับเคลื่อนล้อหลัง) เช่น Toyota GR 86, APEX 4 Coupe และ Deepal S07 มอบความรู้สึกสปอร์ตคล่องตัว หน้าเบา เลี้ยวคม และควบคุมอาการท้ายรถได้สนุก ส่วน AWD (ขับเคลื่อน 4 ล้อ) เช่น Bugatti Chiron, Lamborghini Revuelto, AMG GT 63 S, BMW M8 และ BYD Seal มอบแรงยึดเกาะสูงสุด ออกตัวได้รวดเร็วโดยล้อไม่ฟรีทิ้ง และปลอดภัยสูงบนสภาพถนนลื่น'
    },
    {
      q: 'รุ่นใดในรายการที่ใช้เครื่องยนต์ Naturally Aspirated (ไร้เทอร์โบ)?',
      a: 'มี 2 รุ่น ได้แก่ Lamborghini Revuelto (เครื่องยนต์หลัก 6.5L V12 NA ผสานระบบไฮบริด ลากรอบสูงสุด 9,500 RPM) และ Toyota GR 86 (2.4L Boxer 4 สูบนอน NA ล้วน 237 แรงม้า)'
    },
    {
      q: 'รถรุ่นไหนเหมาะสำหรับผู้เริ่มต้น (Beginner) และขับใช้งานทุกวัน (Daily Driving)?',
      a: 'สำหรับการใช้งานในชีวิตประจำวันที่คุ้มค่าและขับง่าย แนะนำ BYD Seal Performance AWD (ไฟฟ้าล้วน 530 แรงม้า 5 ที่นั่ง), Deepal S07 Performance (SUV ไฟฟ้ากว้างขวาง) หรือ Toyota GR 86 สำหรับผู้ที่อยากเริ่มต้นสัมผัสฟีลลิ่งรถสปอร์ตขับหลังแท้ๆ ในงบไม่เกิน 3 ล้านบาท'
    },
    {
      q: 'ขั้นตอนการติดต่อและสั่งจองรถยนต์ทำอย่างไร?',
      a: 'สามารถติดต่อฝ่ายขาย ApexDrive Concierge ผ่านเบอร์โทรศัพท์ 02-888-APEX เพื่อสอบถามสถานะรถ นัดหมายเข้าชมรถคันจริง และเริ่มกระบวนการจัดสรรโควตารถยนต์อย่างเป็นทางการ'
    },
    {
      q: 'ฐานข้อมูลและข้อมูลจำเพาะทางวิศวกรรมอ้างอิงจากที่ไหน?',
      a: 'ข้อมูลสเปก อัตราเร่ง แรงม้า และแรงบิดทั้งหมด อ้างอิงโดยตรงจากคู่มือและเอกสารทางการของผู้ผลิต (Official Manufacturer Technical Specifications) เพื่อความถูกต้องและเป็นมาตรฐานสากล'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-rose-400 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>KNOWLEDGE BASE & FAQ ARCHIVE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">คำถามที่พบบ่อย (FAQ)</h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          รวบรวมข้อสงสัยเชิงวิศวกรรมยานยนต์ สเปกเครื่องยนต์ และการเปรียบเทียบสมรรถนะ
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#0E121B]/90 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors"
              >
                <span className="text-sm font-bold text-white leading-snug">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed pt-2 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Box for Contact */}
      <div className="p-6 bg-[#0E121B]/90 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5 font-mono">
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span>ต้องการข้อมูลเพิ่มเติมหรือนัดหมายเข้าชมรถ?</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            ติดต่อทีมงาน ApexDrive Concierge ได้โดยตรงที่ 02-888-APEX (02-888-2739) เวลา 09:00 - 18:00 น.
          </p>
        </div>
        <a
          href="tel:028882739"
          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/40 shrink-0 transition-colors hover:scale-105 active:scale-95"
        >
          โทรติดต่อฝ่ายขาย
        </a>
      </div>

    </div>
  );
};
