import React, { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  Menu, 
  X, 
  Send
} from 'lucide-react';
import { CompanyConfig } from '../types';

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
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group text-right">
              <div className="w-11 h-11 rounded-2xl bg-amber-800 text-amber-50 flex items-center justify-center shadow-md shadow-amber-900/10 group-hover:bg-amber-900 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                  {config.companyName}
                </span>
                <span className="text-[11px] font-medium text-stone-600 hidden sm:block">
                  {config.brandTitle}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-700">
            <a href="#projects" className="hover:text-amber-800 transition-colors py-1">
              نمونه‌کارها و ابعاد
            </a>
            <a href="#quote-form" className="hover:text-amber-800 transition-colors py-1">
              استعلام قیمت به طراح
            </a>
            <a href="#process" className="hover:text-amber-800 transition-colors py-1">
              مراحل ساخت و نصب
            </a>
            <a href="#structures" className="hover:text-amber-800 transition-colors py-1">
              انواع سازه و فونداسیون
            </a>
            <a href="#blog" className="hover:text-amber-800 transition-colors py-1">
              مقالات و استانداردها
            </a>
            <a href="#contact" className="hover:text-amber-800 transition-colors py-1">
              تماس و آدرس کارخانه
            </a>
          </nav>

          {/* Direct Actions (Call & Quote Button) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${config.phonePrimary}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold text-stone-800 bg-[#F3ECE4] hover:bg-[#EAE1D7] border border-[#E0D5C7] transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
              <span className="font-mono">{config.phonePrimary}</span>
            </a>

            <button
              onClick={onOpenQuoteForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-amber-700 hover:bg-amber-800 shadow-sm shadow-amber-900/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ارسال ابعاد به طراح</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 bg-[#F3ECE4] hover:bg-[#EAE1D7] border border-[#E0D5C7]"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD5] bg-[#FBF9F5] px-4 py-4 space-y-3 text-right">
          <nav className="flex flex-col space-y-2.5 text-xs font-bold text-stone-700">
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F3ECE4] transition-colors"
            >
              نمونه‌کارها و ابعاد
            </a>
            <a 
              href="#quote-form" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F3ECE4] transition-colors"
            >
              استعلام قیمت به طراح
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F3ECE4] transition-colors"
            >
              مراحل ساخت و نصب
            </a>
            <a 
              href="#structures" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F3ECE4] transition-colors"
            >
              انواع سازه و فونداسیون پیش‌ساخته
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F3ECE4] transition-colors"
            >
              مقالات و استانداردها
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F3ECE4] transition-colors"
            >
              تماس و آدرس کارخانه
            </a>
          </nav>

          <div className="pt-3 border-t border-[#E8DFD5] flex flex-col gap-2">
            <a
              href={`tel:${config.phonePrimary}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-stone-800 bg-[#F3ECE4] border border-[#E0D5C7]"
            >
              <PhoneCall className="w-4 h-4 text-amber-800" />
              <span>تماس مستقیم: {config.phonePrimary}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteForm();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-sm"
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
