import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react';
import { FAQS_DATA } from '../siteConfig';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F5EFEB] border-b border-[#E8DFD5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1 text-xs font-bold text-amber-900 mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            پرسش‌های متداول کارفرمایان و سازندگان
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            هر آنچه درباره قیمت‌گذاری، زمان‌بندی ساخت و ضوابط نظام مهندسی سوله باید بدانید
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E0D5C7] bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="text-sm font-bold text-stone-900">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-[#F3ECE4] flex items-center justify-center text-amber-900 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-700 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#F0E8DF] bg-[#FAF8F5]/50 text-right animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
