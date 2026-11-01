import React, { useState } from 'react';
import { 
  PhoneCall, 
  Menu, 
  X, 
  Send,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { CompanyConfig } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  config: CompanyConfig;
  onOpenQuoteForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenQuoteForm,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand with Blue Mark & Dr. Pirasteh Academic Credential */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group text-right">
              <Logo size="md" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                    {config.companyName}
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-800">
                    <GraduationCap className="w-3 h-3 text-blue-700" />
                    <span>هیئت علمی دانشگاه چمران</span>
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-blue-800 hidden sm:block">
                  مدیریت دکتر علی‌اکبر پیراسته (عضو هیئت علمی دانشگاه چمران)
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-700">
            <a href="#projects" className="hover:text-blue-700 transition-colors py-1">
              نمونه‌کارها
            </a>
            <a href="#iran-coverage" className="hover:text-blue-700 text-blue-800 font-extrabold transition-colors py-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>پوشش سراسر ایران</span>
            </a>
            <a href="#quote-form" className="hover:text-blue-700 transition-colors py-1">
              استعلام قیمت به طراح
            </a>
            <a href="#process" className="hover:text-blue-700 transition-colors py-1">
              مراحل ساخت و نصب
            </a>
            <a href="#structures" className="hover:text-blue-700 transition-colors py-1">
              انواع سازه صنعتی
            </a>
            <a href="#steel-prices" className="hover:text-blue-700 transition-colors py-1">
              محاسبه وزن و قیمت آهن
            </a>
            <a href="#blog" className="hover:text-blue-700 transition-colors py-1">
              مقالات
            </a>
            <a href="#contact" className="hover:text-blue-700 transition-colors py-1">
              تماس و نقشه کارگاه
            </a>
          </nav>

          {/* Direct Actions (Call & Quote Button) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${config.phonePrimary}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-xs"
              title="تماس فوری و مستقیم"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="font-mono text-sm tracking-wide">{config.phonePrimary}</span>
            </a>

            <button
              onClick={onOpenQuoteForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ارسال ابعاد به طراح</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 text-right shadow-lg">
          <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-2 text-xs font-bold text-blue-900">
            <GraduationCap className="w-4 h-4 text-blue-700 shrink-0" />
            <span>با مدیریت دکتر پیراسته (عضو هیئت علمی دانشگاه شهید چمران اهواز)</span>
          </div>

          <nav className="flex flex-col space-y-2 text-xs font-bold text-slate-700">
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              نمونه‌کارها و پروژه‌ها
            </a>
            <a 
              href="#iran-coverage" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-700 font-extrabold flex items-center justify-between"
            >
              <span>پوشش تمام شهرهای ایران</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">۳۱ استان</span>
            </a>
            <a 
              href="#quote-form" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              استعلام قیمت و ارسال مشخصات
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              مراحل ساخت و نصب کارگاهی
            </a>
            <a 
              href="#structures" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              انواع سازه و فونداسیون پیش‌ساخته
            </a>
            <a 
              href="#steel-prices" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-blue-900 font-bold"
            >
              قیمت روز آهن و محاسبه‌گر وزن سوله
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              مقالات و استانداردهای مهندسی
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              تماس و موقعیت کارگاه شیبان
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={`tel:${config.phonePrimary}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-blue-950 bg-blue-50 border border-blue-200 shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-blue-700" />
              <span>تماس مستقیم: <strong className="font-mono text-sm">{config.phonePrimary}</strong></span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteForm();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>ارسال ابعاد به طراح</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
