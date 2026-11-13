import React from 'react';
import { CartItem } from '../types/product';
import { X, Trash2, ShoppingBag, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-brand-card rounded-2xl border border-brand-border shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-white">ตะกร้าสินค้าจำลอง (Cart Simulation)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Simulation Disclaimer Banner */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p className="leading-relaxed">
              <strong>ระบบจำลองเพื่อการศึกษา:</strong> สินค้ารถยนต์ในตะกร้านี้เป็นการจำลองเพื่อการเรียนรู้ จะไม่มีการเรียกเก็บเงินจริงหรือส่งมอบสินค้าจริงใดๆ ทั้งสิ้น
            </p>
          </div>

          {isSimulatedOrdered ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-white">จำลองการจองคำสั่งซื้อสำเร็จ!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                ระบบได้บันทึกคำสั่งซื้อจำลองของคุณเรียบร้อยแล้ว ในการพัฒนาจริงส่วนนี้จะเชื่อมต่อกับ Gateway ชำระเงินหรือระบบ CRM จัดการสต๊อกรถยนต์
              </p>
              <button
                onClick={handleResetAfterOrder}
                className="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-950/40"
              >
                เสร็จสิ้นและปิดหน้าต่าง
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">ไม่มีรถยนต์ในตะกร้าจำลอง</p>
              <p className="text-xs text-slate-500 mt-1">เลือกเพิ่มรถยนต์จากหน้า Catalog เพื่อทดสอบระบบ</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-xl border border-brand-border"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.model}
                    className="w-16 h-14 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">
                      {item.product.brand} {item.product.model}
                    </h5>
                    <p className="text-[11px] text-slate-400">{item.product.year} • {item.product.drivetrain}</p>
                    <p className="text-xs font-bold text-rose-400 mt-0.5">
                      ฿{item.product.price.toLocaleString()} {item.product.currency}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
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
          <div className="p-5 border-t border-brand-border bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">มูลค่ารวมจำลอง:</span>
              <span className="text-lg font-extrabold text-white">
                ฿{totalPrice.toLocaleString()} THB
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClearCart}
                className="py-2.5 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 font-semibold"
              >
                ล้างตะกร้า
              </button>
              <button
                onClick={handleSimulateCheckout}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs text-white font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-rose-950/40"
              >
                <span>ทดสอบจำลองสั่งซื้อ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
