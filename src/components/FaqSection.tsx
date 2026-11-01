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
    <section id="faq" itemScope itemType="https://schema.org/FAQPage" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold text-blue-900 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            پرسش‌های متداول کارفرمایان و سازندگان
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            پاسخ‌های شفاف و مهندسی به متداول‌ترین سوالات درباره مشخصات فنی، زمان‌بندی ساخت و ضوابط نظام مهندسی سوله
          </p>
        </div>

        {/* Accordion List with Schema.org Question & Answer */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <span itemProp="name" className="text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-800 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-700 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer" 
                    className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 mt-2"
                  >
                    <p itemProp="text">
                      {faq.a}
                    </p>
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
