import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../services/productService';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Categories: React.FC = () => {
  const { t } = useLanguage();
  const rwdCars = products.filter(p => p.drivetrain === 'RWD');
  const awdCars = products.filter(p => p.drivetrain === 'AWD');
  const hybridCars = products.filter(p => p.fuel_type.includes('Hybrid'));
  const electricCars = products.filter(p => p.fuel_type.includes('Electric') || p.fuel_type.includes('BEV'));
  const naCars = products.filter(p => p.engine.includes('Naturally Aspirated'));
  const turboCars = products.filter(p => p.engine.includes('Turbo'));

  const engineGroups = [
    {
      index: '01',
      eyebrow: 'NATURALLY ASPIRATED',
      title: t('เครื่องยนต์ดูดอากาศธรรมชาติ (NA)', 'Naturally Aspirated (NA)'),
      desc: t(
        'เสียงคำรามอันเป็นเอกลักษณ์ ลากรอบได้สูงและตอบสนองคันเร่งอย่างเป็นธรรมชาติไร้อาการรอรอบ',
        'Pure mechanical resonance, soaring redlines, and instantaneous linear throttle response without forced induction.'
      ),
      cars: naCars
    },
    {
      index: '02',
      eyebrow: 'FORCED INDUCTION',
      title: t('เทอร์โบคู่และเทอร์โบ 4 ลูก (Turbocharged)', 'Twin & Quad-Turbocharged'),
      desc: t(
        'ขุมพลังอัดอากาศแรงบิดมหาศาลตั้งแต่รอบต่ำ ตอบสนองอัตราเร่งฉับไวและท็อปสปีดระดับไฮเปอร์คาร์',
        'Relentless low-end torque, blistering mid-range surge, and hypercar-grade top velocities.'
      ),
      cars: turboCars
    },
    {
      index: '03',
      eyebrow: 'ELECTRIFIED PERFORMANCE',
      title: t('ปลั๊กอินไฮบริดสมรรถนะสูง (PHEV)', 'High-Performance Plug-in Hybrid (PHEV)'),
      desc: t(
        'การผสานเครื่องยนต์สันดาปเข้ากับมอเตอร์ไฟฟ้าเทคโนโลยีสนามแข่ง ให้พละกำลังรวมสูงสุดกว่า 1,000 แรงม้า',
        'Motorsport-derived electric motors paired with high-output combustion engines delivering over 1,000 HP.'
      ),
      cars: hybridCars
    },
    {
      index: '04',
      eyebrow: 'ZERO EMISSION',
      title: t('ยนตรกรรมพลังงานไฟฟ้า 100% (BEV)', 'Pure Electric Performance (BEV)'),
      desc: t(
        'แรงบิดเต็มกำลังตั้งแต่วินาทีแรกที่กดคันเร่ง ปราศจากมลพิษ พร้อมเทคโนโลยีห้องโดยสารแห่งอนาคต',
        'Instantaneous electric torque from zero RPM, whisper-quiet refinement, and next-generation cabin technology.'
      ),
      cars: electricCars
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Editorial Header */}
      <div className="space-y-3 pb-8 border-b border-white/[0.08]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
          ENGINEERING TAXONOMY
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
          {t('หมวดหมู่และระบบขับเคลื่อน', 'Categories & Drivetrain')}
        </h1>
        <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
          {t(
            'จำแนกตามปรัชญาวิศวกรรมเครื่องยนต์และระบบส่งกำลัง เพื่อค้นหายนตรกรรมที่สะท้อนบุคลิกการขับขี่ของคุณ',
            'Explore our collection by powertrain philosophy and drivetrain architecture to find the character that fits your driving style.'
          )}
        </p>
      </div>

      {/* Drivetrain Dynamics */}
      <section className="space-y-8">
        <div className="space-y-1.5">
          <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
            DRIVETRAIN DYNAMICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            {t('ระบบขับเคลื่อน', 'Drivetrain Architecture')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* RWD */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0C10] border border-white/[0.08] space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-400">
                  REAR-WHEEL DRIVE
                </span>
                <span className="text-xs text-neutral-500 font-light">
                  {t(`${rwdCars.length} รุ่น`, `${rwdCars.length} Models`)}
                </span>
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">
                {t('ขับเคลื่อนล้อหลัง (RWD)', 'Rear-Wheel Drive (RWD)')}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {t(
                  'สำหรับผู้หลงใหลการขับขี่สายเพียว ล้อหน้าทำหน้าที่บังคับทิศทางอย่างแม่นยำ ล้อหลังถ่ายทอดพละกำลังเต็มที่ มอบสัมผัสมอเตอร์สปอร์ตแท้จริง',
                  'Crafted for driving purists. Dedicated front-wheel steering precision paired with rear-axle power delivery for authentic motorsport balance.'
                )}
              </p>
            </div>

            <div className="divide-y divide-white/[0.06] border-t border-white/[0.08] pt-2">
              {rwdCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="py-4 flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs tracking-widest uppercase text-neutral-500 block">
                      {c.brand}
                    </span>
                    <span className="text-base font-light text-white group-hover:text-neutral-300 transition-colors">
                      {c.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-neutral-400 font-light">
                      {c.horsepower} HP
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AWD */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0C10] border border-white/[0.08] space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-400">
                  ALL-WHEEL DRIVE
                </span>
                <span className="text-xs text-neutral-500 font-light">
                  {t(`${awdCars.length} รุ่น`, `${awdCars.length} Models`)}
                </span>
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">
                {t('ขับเคลื่อน 4 ล้อ (AWD)', 'All-Wheel Drive (AWD)')}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {t(
                  'ยึดเกาะถนนระดับสูงสุดด้วยระบบกระจายแรงบิดอิสระ 4 ล้อ ออกตัวฉับไวระดับทำลายสถิติ มั่นใจในทุกสภาพผิวและทางโค้งความเร็วสูง',
                  'Maximum traction through intelligent four-wheel torque vectoring, delivering record-breaking launches and unwavering composure at speed.'
                )}
              </p>
            </div>

            <div className="divide-y divide-white/[0.06] border-t border-white/[0.08] pt-2">
              {awdCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="py-4 flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs tracking-widest uppercase text-neutral-500 block">
                      {c.brand}
                    </span>
                    <span className="text-base font-light text-white group-hover:text-neutral-300 transition-colors">
                      {c.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-neutral-400 font-light">
                      {t(`0–100 ใน ${c.acceleration_0_100_sec}s`, `0–100 in ${c.acceleration_0_100_sec}s`)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Engine Architecture */}
      <section className="space-y-8 pt-6 border-t border-white/[0.08]">
        <div className="space-y-1.5">
          <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
            POWERTRAIN PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            {t('ปรัชญาเครื่องยนต์', 'Powertrain Philosophy')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {engineGroups.map(group => (
            <div
              key={group.index}
              className="p-8 rounded-2xl bg-[#0B0C10] border border-white/[0.08] space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                  <span>{group.eyebrow}</span>
                  <span>{group.index}</span>
                </div>
                <h3 className="text-xl font-light text-white tracking-tight">
                  {group.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {group.desc}
                </p>
              </div>

              <div className="divide-y divide-white/[0.06] border-t border-white/[0.08] pt-2">
                {group.cars.map(c => (
                  <Link
                    key={c.id}
                    to={`/products/${c.id}`}
                    className="py-3.5 flex items-center justify-between group"
                  >
                    <span className="text-sm font-light text-neutral-200 group-hover:text-white transition-colors">
                      {c.brand} {c.model}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 font-light">
                        {c.horsepower} HP
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
