import React from 'react';
import { CartItem } from '../types/product';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  items,
  onClose,
  onRemoveItem,
  onClearCart,
}) => {
  const [isSimulatedOrdered, setIsSimulatedOrdered] = React.useState(false);

  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSimulateCheckout = () => {
    setIsSimulatedOrdered(true);
  };

  const handleResetAfterOrder = () => {
    setIsSimulatedOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0E121B] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                VEHICLE RESERVATION & CART
              </h3>
              <p className="text-[10px] font-mono text-slate-400">รายการรถยนต์ที่ท่านเลือกบันทึก</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">

          {isSimulatedOrdered ? (
            <div className="py-8 text-center space-y-4 font-mono">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">ส่งข้อมูลการจองรถยนต์สำเร็จ!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                เจ้าหน้าที่ ApexDrive Concierge จะติดต่อกลับภายใน 24 ชั่วโมงเพื่อยืนยันนัดหมายและข้อเสนอพิเศษ
              </p>
              <button
                onClick={handleResetAfterOrder}
                className="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/40"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-mono">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">ไม่มีรถยนต์ในรายการ</p>
              <p className="text-xs text-slate-500 mt-1">เลือกเพิ่มรถยนต์จากหน้าโชว์รูมได้ทันที</p>
            </div>
          ) : (
            <div className="space-y-3 font-mono">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3.5 bg-white/[0.03] rounded-2xl"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.model}
                    className="w-16 h-14 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">
                      {item.product.brand} {item.product.model}
                    </h5>
                    <p className="text-[10px] text-slate-400">MY{item.product.year} • {item.product.drivetrain} • {item.product.horsepower} HP</p>
                    <p className="text-xs font-bold text-rose-400 mt-0.5">
                      ฿{item.product.price.toLocaleString()} THB
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-white/[0.08] rounded-lg transition-colors"
                    title="ลบรายการ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!isSimulatedOrdered && items.length > 0 && (
          <div className="p-6 bg-black/30 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">TOTAL ESTIMATED VALUE:</span>
              <span className="text-base font-extrabold text-white">
                ฿{totalPrice.toLocaleString()} THB
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClearCart}
                className="py-3 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-300 font-semibold uppercase tracking-wider"
              >
                ล้างรายการ
              </button>
              <button
                onClick={handleSimulateCheckout}
                className="py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs text-white font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-rose-950/40"
              >
                <span>ดำเนินการจองรถยนต์</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
