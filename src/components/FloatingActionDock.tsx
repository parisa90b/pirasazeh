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
      <div className="bg-[#24211E]/95 backdrop-blur-md border border-stone-700 p-2 sm:p-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-2 text-white">
        
        {/* Call Button */}
        <a
          href={`tel:${config.phonePrimary}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">تماس مستقیم</span>
          <span className="sm:hidden font-mono">{config.phonePrimary}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${config.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span>واتساپ</span>
        </a>

        {/* Bale Button */}
        <a
          href={`https://ble.ir/${config.baleId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>بله</span>
        </a>

        {/* Quote Form Trigger Button */}
        <button
          onClick={onOpenQuoteForm}
          className="flex-1 py-2.5 px-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>استعلام قیمت</span>
        </button>

      </div>
    </aside>
  );
};
