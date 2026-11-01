import React from 'react';
import { 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowUp, 
  MessageSquare, 
  Send,
  GraduationCap
} from 'lucide-react';
import { CompanyConfig } from '../types';
import { Logo } from './Logo';
import { IRAN_PROVINCES_DATA } from '../siteConfig';

interface FooterProps {
  config: CompanyConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800 pt-16 pb-28 sm:pb-16 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Description (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" whiteTheme />
              <div>
                <span className="text-base sm:text-lg font-black text-white block">
                  {config.companyName}
                </span>
                <span className="text-[11px] text-blue-300 font-semibold">
                  با مدیریت دکتر علی‌اکبر پیراسته (عضو هیئت علمی دانشگاه شهید چمران)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              شرکت مهندسی {config.companyName} با سال‌ها پیشینه علمی و اجرایی تحت مدیریت دکتر علی‌اکبر پیراسته، مجهز به کارخانه ساخت و خطوط سندبلاست اتوماتیک SA 2.5 در شیبان اهواز، پیشرو در طراحی بهینه و احداث انواع سوله صنعتی تیرورقی، سوله سبک بهینه شده، پل‌های ماشین‌رو و جرثقیل سقفی در ۳۱ استان ایران است.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-blue-300">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                <span>هیئت علمی دانشگاه چمران</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ضمانت کتبی ۳ ساله</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-emerald-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>تاییدیه نظام مهندسی</span>
              </span>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  نمونه‌کارها و ابعاد سالن‌ها
                </a>
              </li>
              <li>
                <a href="#iran-coverage" className="hover:text-blue-400 transition-colors text-blue-300 font-bold">
                  پوشش سوله در تمام استان‌های ایران
                </a>
              </li>
              <li>
                <a href="#quote-form" className="hover:text-blue-400 transition-colors">
                  استعلام قیمت و ارسال ابعاد به طراح
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-blue-400 transition-colors">
                  مراحل ساخت و مونتاژ کارخانه‌ای
                </a>
              </li>
              <li>
                <a href="#structures" className="hover:text-blue-400 transition-colors">
                  انواع سازه‌های صنعتی و فونداسیون پیش‌ساخته
                </a>
              </li>
              <li>
                <a href="#steel-prices" className="hover:text-blue-400 transition-colors">
                  رصد قیمت روز آهن و محاسبه‌گر وزن سوله
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  مسیریابی گوگل مپ و آدرس کارگاه
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              دفتر مرکزی و خط تولید
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{config.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>تماس مستقیم مهندس محاسب: </span>
                <strong className="text-white font-mono text-sm">{config.phonePrimary}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>کارگاه ساخت و مونتاژ شیبان: </span>
                <strong className="text-white font-mono">{config.phoneFactory}</strong>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>واتساپ</span>
              </a>
              <a
                href={`https://ble.ir/${config.baleId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-teal-800/40 hover:bg-teal-800/60 text-teal-300 border border-teal-600/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>پیام‌رسان بله</span>
              </a>
              <a
                href={`tel:${config.phonePrimary}`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>تماس فوری</span>
              </a>
            </div>
          </div>

        </div>

        {/* Nationwide SEO City Cloud (پوشش سئو تمام ۳۱ استان و شهرهای صنعتی ایران) */}
        <div className="py-8 border-b border-slate-800/80">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-slate-300">
              سوله سازی و اجرای اسکلت فلزی پیراسازه نوین در ۳۱ استان ایران:
            </span>
            <span className="text-[10px] text-blue-400 font-mono">سراسر کشور</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
            {IRAN_PROVINCES_DATA.map((prov) => (
              <a
                key={prov.id}
                href="#iran-coverage"
                className="px-2 py-0.5 rounded-md bg-slate-900/80 hover:bg-blue-900/60 hover:text-white border border-slate-800 transition-colors"
              >
                سوله سازی {prov.name} ({prov.capital})
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="select-none text-slate-400">
            © کلیه حقوق برای {config.companyName} با مدیریت دکتر پیراسته (هیئت علمی دانشگاه شهید چمران اهواز) محفوظ است.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="بازگشت به بالای صفحه"
            >
              <span>بازگشت به بالا</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
