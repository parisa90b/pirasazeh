import React from 'react';
import { 
  Building2, 
  Layers, 
  Boxes, 
  Warehouse, 
  Factory, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { STRUCTURE_TYPES } from '../siteConfig';

export const ComparisonTable: React.FC = () => {
  const getIconForType = (id: string) => {
    switch (id) {
      case 'plate-girder':
        return <Building2 className="w-5 h-5" />;
      case 'truss-frame':
        return <Layers className="w-5 h-5" />;
      case 'precast-foundation':
        return <Boxes className="w-5 h-5" />;
      case 'multi-span':
        return <Warehouse className="w-5 h-5" />;
      case 'heavy-steel':
        return <Factory className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const scrollToQuoteForm = () => {
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="structures" className="py-16 lg:py-24 bg-[#F5EFEB] border-b border-[#E8DFD5]">
      {/* Anchor for backward compatibility with comparison links */}
      <div id="comparison" className="relative -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1 text-xs font-bold text-amber-900 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>سبد جامع محصولات و خدمات مهندسی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            معرفی انواع سازه‌های صنعتی و فونداسیون پیش‌ساخته
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
            آشنایی جامع با سیستم‌های سازه‌ای تیرورقی، سبک خرپایی، قوسی، استراکچرهای سنگین و فونداسیون‌های پیش‌ساخته بتنی
          </p>
        </div>

        {/* Structure Types Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRUCTURE_TYPES.map((item) => {
            const isFoundation = item.id === 'precast-foundation';
            return (
              <div 
                key={item.id}
                className={`bg-white rounded-3xl border text-right p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md ${
                  isFoundation 
                    ? 'border-amber-400/80 bg-gradient-to-b from-white to-[#FBF8F4] ring-1 ring-amber-300/40' 
                    : 'border-[#E0D5C7]'
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      isFoundation 
                        ? 'bg-amber-800 text-amber-50' 
                        : 'bg-[#F3ECE4] text-amber-900'
                    }`}>
                      {getIconForType(item.id)}
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isFoundation
                        ? 'bg-amber-100/70 border-amber-300 text-amber-900'
                        : 'bg-[#FAF8F5] border-[#E8DFD5] text-stone-700'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="mb-3.5 pb-3 border-b border-[#F0E8DF]">
                    <h3 className="text-base sm:text-lg font-black text-stone-900">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-stone-600 tracking-wide block mt-0.5" dir="ltr">
                      {item.subtitleEn}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Technical Specifications Grid */}
                  <div className="mb-5 space-y-2">
                    <span className="text-[11px] font-bold text-stone-900 block mb-1.5">
                      مشخصات فنی و استاندارد:
                    </span>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {item.specifications.map((spec, sIdx) => (
                        <div 
                          key={sIdx}
                          className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#FAF8F5] border border-[#ECE4DA]"
                        >
                          <span className="text-[11px] text-stone-600 font-medium">
                            {spec.label}:
                          </span>
                          <span className="text-[11px] font-bold text-stone-900 text-left">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-5 space-y-2">
                    <span className="text-[11px] font-bold text-stone-900 block mb-1.5">
                      ویژگی‌ها و مزایای برجسته:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="p-3 rounded-2xl bg-[#F8F5F0] border border-[#EBE1D5] mb-5">
                    <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-wider block mb-1">
                      کاربردهای بهینه:
                    </span>
                    <p className="text-[11px] text-stone-800 leading-relaxed font-medium">
                      {item.applications}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-3 border-t border-[#F0E8DF]">
                  <button
                    onClick={scrollToQuoteForm}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-amber-900 bg-[#F3ECE4] hover:bg-[#EBE2D7] border border-[#DECFC0] transition-colors"
                  >
                    <span>استعلام ساخت {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Highlight Note Banner for Prefabricated Foundation */}
        <div className="mt-10 bg-white rounded-3xl border border-[#DED3C4] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-amber-800 text-amber-50 flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-stone-900 mb-1">
                صرفه‌جویی چشمگیر در زمان پروژه با فونداسیون پیش‌ساخته بتنی
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                با به‌کارگیری فونداسیون‌های پیش‌ساخته بتن مسلح با عمل‌آوری بخار، مرحله پی‌ریزی و بولت‌گذاری سوله همزمان با ساخت اسکلت در کارخانه تکمیل شده و زمان کل پروژه تا ۴۰ درصد کاهش می‌یابد.
              </p>
            </div>
          </div>
          <button
            onClick={scrollToQuoteForm}
            className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 shadow-md transition-all"
          >
            <span>مشاوره فونداسیون و ابعاد سوله</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

