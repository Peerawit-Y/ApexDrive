import React from 'react';
import { Product } from '../types/product';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../data/productsEn';

interface CompareTableProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CompareTable: React.FC<CompareTableProps> = ({
  products: rawProducts,
  onRemove,
  onClear
}) => {
  const { lang, t } = useLanguage();
  const products = rawProducts.map(p => getLocalizedProduct(p, lang));

  if (products.length === 0) {
    return (
      <div className="py-24 px-6 rounded-2xl border border-white/[0.08] bg-[#0B0C10] text-center max-w-2xl mx-auto space-y-5">
        <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
          COMPARISON MATRIX
        </p>
        <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          {t('ยังไม่มีรถยนต์ในตารางเปรียบเทียบ', 'No Vehicles Selected for Comparison')}
        </h3>
        <p className="text-sm text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
          {t(
            'เลือกกดไอคอนเปรียบเทียบจากหน้ารายการรถยนต์เพื่อนำยนตรกรรมที่ท่านสนใจมาเทียบสเปกเคียงข้างกันได้สูงสุด 4 คัน',
            'Select the compare icon on any vehicle in the showroom to evaluate up to 4 models side by side.'
          )}
        </p>
        <div className="pt-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.15em] uppercase transition-all"
          >
            <span>{t('เลือกชมยนตรกรรมในโชว์รูม', 'Explore the Collection')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const maxHp = Math.max(...products.map(p => p.horsepower));
  const minAcc = Math.min(...products.map(p => p.acceleration_0_100_sec));
  const maxTopSpeed = Math.max(...products.map(p => p.top_speed_kmh));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-xs tracking-wider text-neutral-500">
        <span>
          {t('กำลังเปรียบเทียบ', 'Comparing')} <strong className="text-white font-medium">{products.length}</strong> / 4 {t('รุ่น', 'Models')}
        </span>
        <button
          onClick={onClear}
          className="text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
        >
          {t('ล้างรายการทั้งหมด', 'Clear All')}
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.1]">
              <th className="py-6 pr-6 text-left text-[11px] tracking-[0.22em] uppercase text-neutral-500 font-normal w-52 align-bottom">
                {t('ข้อมูลจำเพาะ', 'Specification')}
              </th>
              {products.map(p => (
                <th key={p.id} className="p-4 min-w-[240px] text-left align-top font-normal">
                  <div className="relative space-y-4">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-[#07080B]">
                      <img
                        src={p.image}
                        alt={p.model}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => onRemove(p.id)}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md hover:bg-white text-neutral-300 hover:text-black flex items-center justify-center transition-colors"
                        title={t('นำออก', 'Remove')}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                        {p.brand}
                      </div>
                      <div className="text-lg font-light text-white tracking-tight">
                        {p.model}
                      </div>
                      <div className="text-sm font-light text-neutral-300 pt-0.5">
                        ฿{p.price.toLocaleString()} <span className="text-[10px] text-neutral-500">THB</span>
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.08] text-sm font-light">
            
            {/* Horsepower */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('พละกำลัง (Horsepower)', 'Horsepower')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4">
                  <span className={p.horsepower === maxHp ? 'text-white font-medium' : 'text-neutral-300'}>
                    {p.horsepower.toLocaleString()} HP
                  </span>
                  {p.horsepower === maxHp && products.length > 1 && (
                    <span className="ml-2.5 text-[10px] tracking-[0.18em] uppercase text-amber-200/90 border border-amber-200/30 px-2 py-0.5 rounded-full">
                      {t('สูงสุด', 'Peak')}
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Acceleration */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('อัตราเร่ง 0–100 กม./ชม.', '0–100 km/h')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4">
                  <span className={p.acceleration_0_100_sec === minAcc ? 'text-white font-medium' : 'text-neutral-300'}>
                    {t(`${p.acceleration_0_100_sec} วินาที`, `${p.acceleration_0_100_sec} s`)}
                  </span>
                  {p.acceleration_0_100_sec === minAcc && products.length > 1 && (
                    <span className="ml-2.5 text-[10px] tracking-[0.18em] uppercase text-amber-200/90 border border-amber-200/30 px-2 py-0.5 rounded-full">
                      {t('เร็วที่สุด', 'Fastest')}
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Top Speed */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('ความเร็วสูงสุด', 'Top Speed')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4">
                  <span className={p.top_speed_kmh === maxTopSpeed ? 'text-white font-medium' : 'text-neutral-300'}>
                    {t(`${p.top_speed_kmh} กม./ชม.`, `${p.top_speed_kmh} km/h`)}
                  </span>
                  {p.top_speed_kmh === maxTopSpeed && products.length > 1 && (
                    <span className="ml-2.5 text-[10px] tracking-[0.18em] uppercase text-amber-200/90 border border-amber-200/30 px-2 py-0.5 rounded-full">
                      {t('สูงสุด', 'V-Max')}
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Torque */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('แรงบิดสูงสุด (Torque)', 'Max Torque')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-neutral-300">
                  {p.torque_nm.toLocaleString()} Nm
                </td>
              ))}
            </tr>

            {/* Engine */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('เครื่องยนต์', 'Engine')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-neutral-300">
                  {p.engine}
                </td>
              ))}
            </tr>

            {/* Drivetrain */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('ระบบขับเคลื่อน', 'Drivetrain')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-white">
                  {p.drivetrain}
                </td>
              ))}
            </tr>

            {/* Transmission */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('ระบบส่งกำลัง', 'Transmission')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-neutral-300">
                  {p.transmission}
                </td>
              ))}
            </tr>

            {/* Seats */}
            <tr>
              <td className="py-5 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('ห้องโดยสาร', 'Seating')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-neutral-300">
                  {t(`${p.seats} ที่นั่ง`, `${p.seats} Seats`)}
                </td>
              ))}
            </tr>

            {/* Detail Link Row */}
            <tr>
              <td className="py-6 pr-6 text-xs tracking-wider uppercase text-neutral-500">
                {t('รายละเอียดเพิ่มเติม', 'Details')}
              </td>
              {products.map(p => (
                <td key={p.id} className="p-4">
                  <Link
                    to={`/products/${p.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-white/15 hover:bg-white hover:text-black text-white text-xs tracking-[0.15em] uppercase transition-all"
                  >
                    <span>{t('สำรวจรุ่นนี้', 'Discover')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};
