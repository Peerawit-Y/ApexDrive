import React, { useState } from 'react';
import { Plus, Minus, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: t('รถรุ่นไหนมีแรงม้ามากที่สุดและเร็วที่สุดในค่าย APEX Sports?', 'Which APEX Sports model has the highest horsepower and fastest acceleration?'),
      a: t(
        'APEX X Hyper เป็นรุ่นเรือธงที่มีพละกำลังสูงสุดถึง 980 แรงม้า แรงบิด 1,000 นิวตันเมตร จากเครื่องยนต์ 6.5L V12 เทอร์โบคู่ ขับเคลื่อน 4 ล้อ ทำอัตราเร่ง 0-100 กม./ชม. ใน 2.5 วินาที ตามมาด้วย APEX SUV RS (680 แรงม้า) และ APEX 10 Evo (670 แรงม้า)',
        'The APEX X Hyper leads the lineup with 980 HP and 1,000 Nm from its hand-built 6.5L twin-turbo V12, sprinting 0–100 km/h in 2.5 seconds, followed by the APEX SUV RS (680 HP) and APEX 10 Evo (670 HP).'
      )
    },
    {
      q: t('รุ่นใดที่ใช้เครื่องยนต์ Naturally Aspirated (ไร้เทอร์โบ)?', 'Which models feature a Naturally Aspirated engine?'),
      a: t(
        'มี 3 รุ่น ได้แก่ APEX 10 Evo (5.2L V10 NA ลากรอบ 8,700 RPM / 670 แรงม้า), APEX GT3 Track (4.0L Flat-6 NA ลากรอบ 9,000 RPM / 540 แรงม้า) และ APEX 86 Spirit (2.4L Flat-4 Boxer NA / 255 แรงม้า)',
        'Three models feature naturally aspirated engines: the APEX 10 Evo (5.2L NA V10, 8,700 RPM, 670 HP), the APEX GT3 Track (4.0L NA Flat-6, 9,000 RPM, 540 HP), and the APEX 86 Spirit (2.4L NA Flat-4 Boxer, 255 HP).'
      )
    },
    {
      q: t('ระบบขับเคลื่อน AWD และ RWD มีรุ่นไหนบ้าง?', 'Which models are AWD vs. RWD?'),
      a: t(
        'รุ่นขับเคลื่อน 4 ล้อ (AWD) มี 4 รุ่น ได้แก่ APEX 35 GT, APEX 5 Touring, APEX SUV RS และ APEX X Hyper ส่วนรุ่นขับเคลื่อนล้อหลัง (RWD) มี 6 รุ่น ได้แก่ APEX 86 Spirit, APEX 2 Clubsport, APEX 4 Coupe, APEX 8 Vantage, APEX GT3 Track และ APEX 10 Evo',
        'Four models feature All-Wheel Drive (AWD): APEX 35 GT, APEX 5 Touring, APEX SUV RS, and APEX X Hyper. Six models are pure Rear-Wheel Drive (RWD): APEX 86 Spirit, APEX 2 Clubsport, APEX 4 Coupe, APEX 8 Vantage, APEX GT3 Track, and APEX 10 Evo.'
      )
    },
    {
      q: t('รถรุ่นไหนเหมาะสำหรับผู้เริ่มต้น หรือใช้งานแบบครอบครัว 5 ที่นั่ง?', 'Which models are best for beginners or 5-seat family usability?'),
      a: t(
        'สำหรับผู้เริ่มต้นสายสปอร์ตขับหลัง แนะนำ APEX 86 Spirit (2,990,000 บาท) น้ำหนักเบา 1,260 กก. ดูแลง่าย ส่วนผู้ที่ต้องการ 5 ที่นั่งและพื้นที่สัมภาระขนาดใหญ่ แนะนำ APEX 5 Touring (แวกอน 650 แรงม้า) หรือ APEX SUV RS (เอสยูวี 680 แรงม้า)',
        'For drivers starting out in RWD sports cars, we recommend the lightweight APEX 86 Spirit (2,990,000 THB). For 5-seat family versatility and cargo space, choose the APEX 5 Touring (650 HP wagon) or APEX SUV RS (680 HP super SUV).'
      )
    },
    {
      q: t('เงื่อนไขการจอง สินเชื่อ และรับเทิร์นรถเก่าเป็นอย่างไร?', 'What are the reservation, financing, and trade-in policies?'),
      a: t(
        'วางเงินจอง 50,000 บาทต่อคัน (คืนเต็มจำนวนหากไฟแนนซ์ไม่ผ่าน) รับรถภายใน 30 วัน จัดไฟแนนซ์สูงสุด 75% (ดาวน์ขั้นต่ำ 25%) ดอกเบี้ย 2.09% - 2.79% ต่อปี (48-72 งวด) และโชว์รูมไม่มีบริการรับเทิร์นรถเก่าทุกกรณี',
        'Reservation deposit is 50,000 THB per vehicle (fully refundable if financing is not approved) with delivery within 30 days. Financing covers up to 75% (25% minimum down payment) at 2.09%–2.79% p.a. (48–72 months). Trade-ins are not accepted.'
      )
    },
    {
      q: t('เงื่อนไขการทดลองขับ (Test-drive) และการรับประกันคุณภาพเป็นอย่างไร?', 'What are the test-drive and warranty terms?'),
      a: t(
        'เปิดทดลองขับทุกวัน 09:00 - 18:00 น. ณ โชว์รูม APEX Sports (สาขาบางคูวัด) ผู้ขับต้องอายุ 23 ปีขึ้นไป มีใบขับขี่ นัดล่วงหน้าอย่างน้อย 1 วัน ทุกรุ่นรับประกันคุณภาพ 4 ปี หรือ 120,000 กม. และเช็คระยะทุก 10,000 กม. หรือ 6 เดือน (ระยะ 1,000 กม. แรกฟรี)',
        'Test drives are available daily from 09:00–18:00 at APEX Sports Bang Khu Wat showroom for licensed drivers aged 23+ (1-day advance booking required). All models carry a 4-year / 120,000 km warranty with maintenance every 10,000 km or 6 months (first 1,000 km check free).'
      )
    },
    {
      q: t('รถทุกคันของ APEX Sports เติมน้ำมันอะไรได้บ้าง?', 'What fuel grade do APEX Sports vehicles require?'),
      a: t(
        'ทุกรุ่นรองรับน้ำมันเบนซินไร้สารตะกั่ว ค่าออกเทน 95 ขึ้นไป แนะนำเบนซิน 95 หรือแก๊สโซฮอล์ 95 เกรดพรีเมียม (และเบนซินออกเทน 98-100 สำหรับรุ่นสนามแข่ง เช่น APEX GT3 Track และ APEX X Hyper)',
        'All models require unleaded petrol with at least 95 RON octane (premium 95 petrol/gasohol recommended; 98–100 RON recommended for track-focused models such as APEX GT3 Track and APEX X Hyper).'
      )
    },
    {
      q: t('ติดต่อโชว์รูม APEX Sports ได้ทางช่องทางไหนบ้าง?', 'How can I contact the APEX Sports showroom?'),
      a: t(
        'ติดต่อโชว์รูม APEX Sports (สาขาบางคูวัด ถ.ราชพฤกษ์-ปทุมธานี ทางหลวง 345 จ.ปทุมธานี) โทร 02-XXX-XXXX / สายด่วนฝ่ายขาย 089-XXX-XXXX หรือ LINE Official: @apexsports.th เปิดบริการทุกวัน 09:00 - 18:00 น.',
        'Contact APEX Sports Showroom (Bang Khu Wat, Highway 345, Pathum Thani) at 02-XXX-XXXX / Sales Hotline 089-XXX-XXXX or LINE Official: @apexsports.th, daily 09:00–18:00.'
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-16">
      
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-white/[0.08]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
          FREQUENTLY ASKED QUESTIONS
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
          {t('คำถามที่พบบ่อย', 'Frequently Asked Questions')}
        </h1>
        <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
          {t(
            'คำตอบเชิงวิศวกรรมยานยนต์ สเปกเครื่องยนต์ การเปรียบเทียบสมรรถนะ และบริการดูแลลูกค้าระดับพรีเมียม',
            'Engineering insights, powertrain comparisons, and private concierge guidance.'
          )}
        </p>
      </div>

      {/* Minimalist Hairline Accordion */}
      <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full py-6 text-left flex items-center justify-between gap-6 group"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-xs text-neutral-600 font-light tracking-widest shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-base sm:text-lg font-light text-white group-hover:text-neutral-300 transition-colors">
                    {faq.q}
                  </span>
                </div>
                <span className="text-neutral-500 group-hover:text-white transition-colors shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="pb-7 pl-10 pr-6 text-sm text-neutral-400 font-light leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Concierge Contact Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0C10] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 block">
            PRIVATE CONCIERGE
          </span>
          <h4 className="text-xl font-light text-white tracking-tight">
            {t('ต้องการข้อมูลเพิ่มเติมหรือนัดหมายเข้าชมรถ?', 'Require Further Assistance or a Private Viewing?')}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            {t(
              'ติดต่อทีมงาน APEX Sports Concierge ได้โดยตรงที่ 02-XXX-XXXX / 089-XXX-XXXX หรือ LINE: @apexsports.th ทุกวัน 09:00 – 18:00 น.',
              'Contact APEX Sports Concierge at 02-XXX-XXXX / 089-XXX-XXXX or LINE: @apexsports.th, daily 09:00 – 18:00.'
            )}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black text-xs font-medium tracking-[0.15em] uppercase shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>02-XXX-XXXX</span>
        </span>
      </div>

    </div>
  );
};
