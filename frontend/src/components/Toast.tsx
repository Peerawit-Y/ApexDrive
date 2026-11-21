import React from 'react';
import { X } from 'lucide-react';

export interface ToastMessage {
  id: number;
  text: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div className="fixed top-24 right-5 sm:right-8 z-50 pointer-events-auto">
      <div className="bg-[#0B0C10]/95 backdrop-blur-xl border border-white/[0.18] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-black/80 flex items-center gap-4 text-xs font-light tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
        <span>{toast.text}</span>
        <button
          type="button"
          onClick={onDismiss}
          className="text-neutral-500 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
