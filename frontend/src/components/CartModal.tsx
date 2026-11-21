import React, { useState } from 'react';
import { CartItem } from '../types/product';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CartModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type ModalStep = 'list' | 'form' | 'confirmed';

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  items,
  onClose,
  onRemoveItem,
  onClearCart,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<ModalStep>('list');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('list');
      setFullName('');
      setPhone('');
      setPreferredDate('');
      onClearCart();
    } else if (step === 'form') {
      setStep('list');
    }
    onClose();
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setRefCode(`APX-2026-${randomCode}`);
    setStep('confirmed');
  };

  const handleFinish = () => {
    setStep('list');
    setFullName('');
    setPhone('');
    setPreferredDate('');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0B0C10] border border-white/[0.1] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 sm:p-7 flex items-center justify-between border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 block">
              {step === 'form' ? 'PRIVATE VIEWING' : 'VEHICLE RESERVATION'}
            </span>
            <h3 className="text-xl font-light text-white tracking-tight">
              {step === 'form'
                ? t('นัดหมายเข้าชมรถแบบส่วนตัว', 'Schedule a Private Viewing')
                : step === 'confirmed'
                  ? t('ยืนยันการนัดหมายสำเร็จ', 'Reservation Confirmed')
                  : t('รายการรถยนต์ที่เลือก', 'Selected Vehicles')}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full border border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1">
          {step === 'confirmed' ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-14 h-14 border border-white/25 text-white rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-neutral-500">
                  REFERENCE &nbsp;·&nbsp; {refCode}
                </p>
                <h4 className="text-2xl font-light text-white tracking-tight">
                  {t(`ขอบคุณคุณ ${fullName || 'ลูกค้า'}`, `Thank You, ${fullName || 'Guest'}`)}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  {t(
                    'เจ้าหน้าที่ ApexDrive Private Concierge จะติดต่อกลับภายใน 24 ชั่วโมงเพื่อยืนยันรอบนัดหมายและข้อเสนอพิเศษ',
                    'An ApexDrive Private Concierge specialist will contact you within 24 hours to confirm your private viewing and allocation.'
                  )}
                </p>
              </div>

              {(phone || preferredDate) && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-light text-neutral-300 space-y-1.5 max-w-xs mx-auto">
                  {phone && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t('เบอร์ติดต่อ', 'Contact')}</span>
                      <span>{phone}</span>
                    </div>
                  )}
                  {preferredDate && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t('วันที่นัดหมาย', 'Preferred Date')}</span>
                      <span>{preferredDate}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="px-8 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.15em] uppercase transition-colors"
                >
                  {t('ปิดหน้าต่าง', 'Done')}
                </button>
              </div>
            </div>
          ) : step === 'form' ? (
            <form id="reservation-form" onSubmit={handleSubmitReservation} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                  {t('ชื่อ–นามสกุล *', 'Full Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('กรอกชื่อและนามสกุลของท่าน', 'Enter your full name')}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm font-light text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                  {t('เบอร์โทรศัพท์ติดต่อ *', 'Phone Number *')}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm font-light text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                  {t('วันที่สะดวกเข้าชมโชว์รูม', 'Preferred Viewing Date')}
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm font-light text-white focus:outline-none focus:border-white/40 transition-colors [color-scheme:dark]"
                />
              </div>

              <div className="pt-2 text-[11px] text-neutral-500 font-light leading-relaxed">
                {t(
                  '* ระบบจำลองเพื่อการศึกษาเท่านั้น ไม่มีการบันทึกข้อมูลส่วนบุคคลหรือการเรียกเก็บเงินจริง',
                  '* Educational simulation only. No personal data is stored on external servers and no payment is processed.'
                )}
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <ShoppingBag className="w-8 h-8 mx-auto text-neutral-600 stroke-[1.5]" />
              <p className="text-base font-light text-neutral-300">
                {t('ยังไม่มีรถยนต์ในรายการ', 'Your Reservation List is Empty')}
              </p>
              <p className="text-xs text-neutral-500 font-light">
                {t('เลือกเพิ่มยนตรกรรมที่สนใจจากหน้าโชว์รูมได้ทันที', 'Select any vehicle from the showroom to begin a reservation.')}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.08]">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.model}
                    className="w-20 h-14 object-cover rounded-xl shrink-0 bg-[#07080B]"
                  />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block">
                      {item.product.brand}
                    </span>
                    <h5 className="text-sm font-light text-white truncate">
                      {item.product.model}
                    </h5>
                    <p className="text-xs font-light text-neutral-300">
                      ฿{item.product.price.toLocaleString()} THB
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-neutral-500 hover:text-white transition-colors"
                    title={t('ลบรายการ', 'Remove')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {step === 'list' && items.length > 0 && (
          <div className="p-6 sm:p-7 border-t border-white/[0.08] space-y-5 bg-white/[0.02]">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-500">
                {t('มูลค่ารวมโดยประมาณ', 'Estimated Total')}
              </span>
              <span className="text-xl font-light text-white tracking-tight">
                ฿{totalPrice.toLocaleString()} <span className="text-xs text-neutral-500">THB</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClearCart}
                className="py-3.5 px-4 rounded-full border border-white/15 hover:border-white/40 text-xs text-neutral-300 hover:text-white tracking-[0.15em] uppercase transition-all"
              >
                {t('ล้างรายการ', 'Clear')}
              </button>
              <button
                onClick={() => setStep('form')}
                className="py-3.5 px-4 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all"
              >
                <span>{t('นัดหมายเข้าชม', 'Book Viewing')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 'form' && (
          <div className="p-6 sm:p-7 border-t border-white/[0.08] grid grid-cols-2 gap-3 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => setStep('list')}
              className="py-3.5 px-4 rounded-full border border-white/15 hover:border-white/40 text-xs text-neutral-300 hover:text-white tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('ย้อนกลับ', 'Back')}</span>
            </button>
            <button
              type="submit"
              form="reservation-form"
              className="py-3.5 px-4 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all"
            >
              <span>{t('ยืนยันการจอง', 'Confirm')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
