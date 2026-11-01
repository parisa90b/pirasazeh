import React from 'react';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  GraduationCap,
  ArrowDown,
  PhoneCall,
  MapPin,
  Award
} from 'lucide-react';
import { CompanyConfig } from '../types';
import { Logo } from './Logo';

interface HeroSectionProps {
  config: CompanyConfig;
  onOpenQuoteForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenQuoteForm,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-[#F8FAFC] via-[#EFF6FF]/40 to-[#F8FAFC] border-b border-slate-200 overflow-hidden pt-8 pb-16 lg:py-24 bg-navy-grid">
      
      {/* Background radial blue glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-400/15 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column: Hero Content & Value Props (7 Cols) */}
          <div className="lg:col-span-7 text-right space-y-6">
            
            {/* Dr. Pirasteh Academic Leadership Trust Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-blue-200 bg-white/90 backdrop-blur-xs px-4 py-1.5 text-xs font-bold text-blue-900 shadow-xs">
              <span className="flex items-center gap-1.5 text-blue-700">
                <GraduationCap className="w-4 h-4" />
                <strong>مدیریت: دکتر پیراسته</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">عضو هیئت علمی دانشگاه شهید چمران اهواز</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.3] tracking-tight">
              سوله سازی پیراسازه نوین؛ طراحی و ساخت انواع{' '}
              <span className="text-blue-700 underline decoration-blue-300 decoration-wavy decoration-2 underline-offset-8">
                سوله صنعتی
              </span>{' '}
              ، پل ماشین‌رو و استراکچر در سراسر ایران
            </h1>

            {/* Direct Line 1 Phone Highlight (Matches Google Search result requirement) */}
            <div className="p-3.5 rounded-2xl bg-blue-50/90 border border-blue-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">پاسخگویی مستقیم و مشاوره فنی مهندس محاسب:</span>
                  <a href={`tel:${config.phonePrimary}`} className="text-base sm:text-lg font-black font-mono text-blue-950 hover:text-blue-700 transition-colors">
                    {config.phonePrimary}
                  </a>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-800">
                پاسخگویی سریع ۲۴ ساعته
              </span>
            </div>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              شرکت مهندسی سوله پیراسازه نوین با کارخانه و کارگاه تخصصی ساخت در شیبان اهواز، تحت نظارت عالیه دکتر پیراسته (عضو هیئت علمی دانشگاه چمران)، تامین مستقیم فولاد از کارخانجات اکسین و کاویان، بهینه‌سازی محاسباتی در نرم‌افزارهای تکلا و سپ، جوش اتوماتیک زیرپودری و گارانتی کتبی ۳ ساله در خدمت پروژه‌های سراسر کشور می‌باشد.
            </p>

            {/* Key Advantages Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>محاسبات بهینه و کاهش ۲۰٪ وزن آهن با حفظ صلبیت</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>سندبلاست اتوماتیک SA 2.5 و رنگ‌آمیزی اپوکسی ۳ لایه</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>اتصالات پیچ و مهره‌ای گرید 10.9 ضد لرزه طبق آیین‌نامه ۲۸۰۰</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ارسال تریلی و تیم‌های نصاب مجهز به کلیه ۳۱ استان ایران</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenQuoteForm}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ثبت ابعاد و ارسال درخواست به طراح</span>
              </button>

              <a
                href="#iran-coverage"
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>پوشش تمام شهرهای ایران</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>واتساپ</span>
              </a>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 text-slate-800">
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-lg sm:text-xl font-black text-blue-700 font-mono">+۱۵ سال</div>
                <div className="text-[11px] text-slate-500 font-medium">سابقه علمی و اجرایی</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-lg sm:text-xl font-black text-blue-700 font-mono">+۲۵۰ پروژه</div>
                <div className="text-[11px] text-slate-500 font-medium">سوله و استراکچر موفق</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-lg sm:text-xl font-black text-blue-700 font-mono">۳۱ استان</div>
                <div className="text-[11px] text-slate-500 font-medium">پوشش سراسری ایران</div>
              </div>
            </div>

          </div>

          {/* Left Column: Visual Highlight Card with Logo & Steps (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white p-6 sm:p-7 border border-slate-200 shadow-xl shadow-slate-900/5 space-y-5 text-right">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
                    <Award className="w-3.5 h-3.5" />
                    <span>دفتر محاسبات سازه دکتر پیراسته</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    استعلام سریع سوله و اسکلت فلزی
                  </h3>
                </div>
                <Logo size="md" />
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">۱. ثبت ابعاد و مشخصات زمین:</strong>
                    <span className="text-[10px] font-mono font-bold text-blue-700">مرحله ۱</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    طول سالن، عرض دهانه بدون ستون، ارتفاع تاج و شهر محل پروژه را وارد کنید.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">۲. مدلسازی و بهینه‌سازی در تکلا:</strong>
                    <span className="text-[10px] font-mono font-bold text-blue-700">مرحله ۲</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    محاسبه دقیق بار باد و برف متناسب با شهر شما و برآورد حداقل تناژ مصرفی آهن.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">۳. صدور پیش‌فاکتور و نقشه جانمایی:</strong>
                    <span className="text-[10px] font-mono font-bold text-blue-700">مرحله ۳</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    برآورد شفاف قیمت، زمان‌بندی ساخت و فایل سه‌بعدی ظرف ۲ ساعت برای شما ارسال می‌شود.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteForm}
                  className="w-full py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-extrabold text-xs border border-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>ورود به فرم آنلاین محاسبه و ارسال ابعاد</span>
                  <ArrowDown className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-slate-500">
                  تلفن مستقیم استعلام فوری: <strong className="font-mono text-slate-900">{config.phonePrimary}</strong>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
