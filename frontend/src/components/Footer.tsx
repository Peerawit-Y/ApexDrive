import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#040507] border-t border-white/[0.08] mt-24 text-neutral-400">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-block">
              <span className="text-lg font-light tracking-[0.42em] uppercase text-white">
                APEXDRIVE
              </span>
            </Link>
            <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-md">
              {t(
                'โชว์รูมและคลังข้อมูลยนตรกรรมสมรรถนะสูงระดับไอคอน ถ่ายทอดสุนทรียศาสตร์แห่งความเร็วและข้อมูลจำเพาะทางวิศวกรรมอย่างเป็นทางการ',
                'An iconic performance automotive showroom and specification archive, celebrating the art of speed and official engineering telemetry.'
              )}
            </p>
          </div>

          {/* Navigation Column (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] tracking-[0.28em] uppercase text-neutral-500">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-neutral-400">
              <li><Link to="/" className="hover:text-white transition-colors">{t('หน้าแรก', 'Home')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">{t('คอลเลกชันยนตรกรรม', 'Models & Collection')}</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">{t('หมวดหมู่และระบบขับเคลื่อน', 'Categories & Drivetrain')}</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">{t('เปรียบเทียบสเปก', 'Compare Specifications')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('เกี่ยวกับโครงการ', 'About ApexDrive')}</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">{t('คำถามที่พบบ่อย', 'FAQ')}</Link></li>
            </ul>
          </div>

          {/* Legal / Simulation Note (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] tracking-[0.28em] uppercase text-neutral-500">
              NOTICE
            </h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              {t(
                'เว็บไซต์นี้เป็นโครงงานจำลองเพื่อการศึกษา (Educational Simulation Only) ข้อมูลจำเพาะทั้งหมดอ้างอิงจากเอกสารทางการของผู้ผลิต ไม่มีการทำธุรกรรมทางการเงินจริงหรือการจำหน่ายรถยนต์จริง',
                'This website is an educational simulation project. All technical specifications reference official manufacturer publications. No real financial transactions or vehicle sales occur on this platform.'
              )}
            </p>
            <div className="pt-2 text-xs text-neutral-400 font-light">
              APEX Sports Concierge &nbsp;·&nbsp; 02-199-8899 / 089-888-9900
            </div>
          </div>

        </div>

        {/* Bottom Copyright Hairline */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-[0.2em] uppercase text-neutral-600 gap-4">
          <p>© 2026 APEXDRIVE. ALL RIGHTS RESERVED.</p>
          <p>THAILAND OFFICIAL SHOWROOM</p>
        </div>
      </div>
    </footer>
  );
};
