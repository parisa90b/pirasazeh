import React from 'react';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Factory,
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { CompanyConfig } from '../types';

interface HeroSectionProps {
  config: CompanyConfig;
  onOpenQuoteForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenQuoteForm,
}) => {
  return (
    <section className="relative bg-[#FBF9F5] border-b border-[#E8DFD5] overflow-hidden pt-8 pb-16 lg:py-24 bg-nude-grid">
      
      {/* Background radial warmth glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-200/30 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column: Hero Content & Value Props (7 Cols) */}
          <div className="lg:col-span-7 text-right space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1.5 text-xs font-bold text-amber-900 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>مرکز تخصصی ساخت سوله و استراکچرهای سنگین فلزی در سراسر کشور</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-[1.3] tracking-tight">
              طراحی، ساخت و اجرای انواع{' '}
              <span className="text-amber-800 underline decoration-amber-300 decoration-wavy decoration-2 underline-offset-8">
                سوله صنعتی
              </span>{' '}
              و استراکچر فلزی سنگین
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              بهینه‌سازی حداکثری وزن آهن‌آلات در نرم‌افزارهای Tekla و SAP2000، تولید با دستگاه‌های برش CNC و جوش اتوماتیک زیرپودری SAW، همراه با دفترچه محاسبات رسمی نظام مهندسی و ضمانت کتبی ۳ ساله.
            </p>

            {/* Key Advantages Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>محاسبات دقیق ابعاد دلخواه (طول، دهانه و ارتفاع)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>سندبلاست اتوماتیک SA 2.5 و رنگ اپوکسی صنعتی</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>اتصالات پیچ و مهره‌ای گرید 10.9 ضد زلزله</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>تامین مستقیم ورق فولاد مبارکه و اکسین اهواز</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenQuoteForm}
                className="px-6 py-3.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-900/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ثبت ابعاد و ارسال درخواست به طراح</span>
              </button>

              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>مشاوره در واتساپ</span>
              </a>

              <a
                href={`https://ble.ir/${config.baleId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>مشاوره در بله</span>
              </a>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E8DFD5] text-stone-800">
              <div className="p-3 bg-[#F3ECE4] rounded-xl border border-[#E0D5C7] text-center">
                <div className="text-lg sm:text-xl font-black text-amber-900 font-mono">+۱۵ سال</div>
                <div className="text-[11px] text-stone-600 font-medium">تجربه تخصصی ساخت</div>
              </div>
              <div className="p-3 bg-[#F3ECE4] rounded-xl border border-[#E0D5C7] text-center">
                <div className="text-lg sm:text-xl font-black text-amber-900 font-mono">+۲۵۰ پروژه</div>
                <div className="text-[11px] text-stone-600 font-medium">سوله و استراکچر موفق</div>
              </div>
              <div className="p-3 bg-[#F3ECE4] rounded-xl border border-[#E0D5C7] text-center">
                <div className="text-lg sm:text-xl font-black text-amber-900 font-mono">۳ سال</div>
                <div className="text-[11px] text-stone-600 font-medium">گارانتی کتبی ساختار</div>
              </div>
            </div>

          </div>

          {/* Left Column: Visual Highlight Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white p-6 sm:p-7 border border-[#E0D5C7] shadow-xl shadow-stone-900/5 space-y-5 text-right">
              
              <div className="flex items-center justify-between border-b border-[#F0E8DF] pb-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 block">مشاوره مستقیم فنی</span>
                  <h3 className="text-base font-extrabold text-stone-900">
                    استعلام سریع سوله و سازه فلزی
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center">
                  <Factory className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE3D8] space-y-1">
                  <strong className="text-stone-900 block font-bold">۱. ثبت ابعاد دلخواه شما:</strong>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    طول، عرض دهانه و ارتفاع سوله یا استراکچر را در فرم وارد نمایید.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE3D8] space-y-1">
                  <strong className="text-stone-900 block font-bold">۲. مدلسازی و محاسبات اولیه:</strong>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    مهندس محاسب بر اساس بار برف و باد شهر شما، وزن دقیق سازه را شبیه‌سازی می‌کند.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE3D8] space-y-1">
                  <strong className="text-stone-900 block font-bold">۳. ارسال پیش‌فاکتور و نقشه:</strong>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    برآورد قیمت قطعی، زمان‌بندی و نقشه جانمایی ظرف حداکثر ۲ ساعت به واتساپ/بله شما ارسال می‌شود.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteForm}
                  className="w-full py-3 rounded-xl bg-[#F3ECE4] hover:bg-[#EAE1D7] text-amber-900 font-extrabold text-xs border border-[#D8CEBF] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>ورود به فرم ثبت ابعاد و مشخصات سازه</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
