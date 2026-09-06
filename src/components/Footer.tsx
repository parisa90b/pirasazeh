import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowUp, 
  MessageSquare, 
  Send
} from 'lucide-react';
import { CompanyConfig } from '../types';

interface FooterProps {
  config: CompanyConfig;
  onSecretAdminOpen?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onSecretAdminOpen }) => {
  const [clickCount, setClickCount] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Discreet trigger: clicking copyright 3 times opens admin panel
  const handleCopyrightClick = () => {
    if (!onSecretAdminOpen) return;
    const nextCount = clickCount + 1;
    if (nextCount >= 3) {
      onSecretAdminOpen();
      setClickCount(0);
    } else {
      setClickCount(nextCount);
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <footer className="bg-[#24211E] text-stone-300 border-t border-stone-800 pt-16 pb-28 sm:pb-16 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Description (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-700 text-white flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-white block">
                  {config.companyName}
                </span>
                <span className="text-[11px] text-stone-400">
                  {config.brandTitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              {config.companyName} با سال‌ها تجربه و تکیه بر دانش فنی مهندسان مجرب، مجهز به خطوط برش، جوش اتوماتیک و سندبلاست، پیشرو در طراحی و ساخت انواع سوله و سازه‌های فولادی صنعتی، کارگاهی و ساختمانی در اهواز، استان خوزستان و سراسر کشور است.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-[11px] text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>ضمانت کتبی ۳ ساله</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-[11px] text-emerald-300">
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
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">
                  نمونه‌کارها و ابعاد سالن‌ها
                </a>
              </li>
              <li>
                <a href="#quote-form" className="hover:text-amber-400 transition-colors">
                  استعلام قیمت و ارسال ابعاد به طراح
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-amber-400 transition-colors">
                  مراحل ساخت و مونتاژ کارخانه‌ای
                </a>
              </li>
              <li>
                <a href="#structures" className="hover:text-amber-400 transition-colors">
                  انواع سازه‌های صنعتی و فونداسیون پیش‌ساخته
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-amber-400 transition-colors">
                  مقالات و استانداردهای طراحی سوله
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  پرسش‌های متداول کارفرمایان
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              دفتر مرکزی و خط تولید
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{config.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>مشاوره مهندس محاسب: </span>
                <strong className="text-white font-mono">{config.phonePrimary}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>تلفن دفتر فروش: </span>
                <strong className="text-white font-mono">{config.phoneSecondary}</strong>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-300 border border-emerald-600/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>واتساپ</span>
              </a>
              <a
                href={`https://ble.ir/${config.baleId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-teal-800/30 hover:bg-teal-800/50 text-teal-300 border border-teal-600/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>پیام‌رسان بله</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div 
            onClick={handleCopyrightClick}
            className="cursor-default select-none transition-colors hover:text-stone-400"
            title=""
          >
            © کلیه حقوق مادی و معنوی متعلق به {config.companyName} می‌باشد. طراحی مهندسی طبق آخرین ضوابط مبحث ۶ و ۱۰ مقررات ملی ساختمان.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors flex items-center gap-1.5"
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
