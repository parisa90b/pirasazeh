import React from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  Send
} from 'lucide-react';
import { CompanyConfig } from '../types';

interface FloatingActionDockProps {
  config: CompanyConfig;
  onOpenQuoteForm: () => void;
}

export const FloatingActionDock: React.FC<FloatingActionDockProps> = ({
  config,
  onOpenQuoteForm,
}) => {
  return (
    <aside aria-label="راه‌های ارتباط سریع" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-lg mx-auto sm:mx-0">
      <div className="bg-[#0B192C]/95 backdrop-blur-md border border-slate-700/80 p-2 sm:p-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-2 text-white">
        
        {/* Call Button (Line 1 Priority) */}
        <a
          href={`tel:${config.phonePrimary}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-600/30"
          title="تماس مستقیم با دکتر پیراسته و مهندس محاسب"
        >
          <PhoneCall className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
          <span className="hidden sm:inline">تماس مستقیم</span>
          <span className="sm:hidden font-mono">{config.phonePrimary}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${config.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span>واتساپ</span>
        </a>

        {/* Bale Button */}
        <a
          href={`https://ble.ir/${config.baleId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>بله</span>
        </a>

        {/* Quote Form Trigger Button */}
        <button
          onClick={onOpenQuoteForm}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>استعلام قیمت</span>
        </button>

      </div>
    </aside>
  );
};
