import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Building, 
  Factory, 
  Instagram 
} from 'lucide-react';
import { CompanyConfig } from '../types';

interface ContactSectionProps {
  config: CompanyConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FBF9F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1 text-xs font-bold text-amber-900 mb-3 shadow-sm">
            <Phone className="w-3.5 h-3.5 text-amber-700" />
            <span>ارتباط مستقیم و بازدید حضوری</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            تماس با کارشناسان و هماهنگی بازدید از خط تولید کارخانه
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            پاسخگویی همه‌روزه مهندسان محاسب جهت مشاوره تخصصی، بررسی نقشه‌ها و برآورد هزینه
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Phone Numbers & Direct Messenger Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 text-right">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Primary Mobile (Structural Engineer) */}
              <div className="p-5 rounded-3xl bg-white border border-[#E0D5C7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    پاسخگویی مستقیم
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">مشاوره مستقیم با مهندس محاسب:</span>
                  <a
                    href={`tel:${config.phonePrimary}`}
                    className="text-lg font-black text-stone-900 font-mono hover:text-amber-800 transition-colors block mt-1"
                  >
                    {config.phonePrimary}
                  </a>
                </div>
              </div>

              {/* Office Landline */}
              <div className="p-5 rounded-3xl bg-white border border-[#E0D5C7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 bg-[#F3ECE4] px-2 py-0.5 rounded-full">
                    دفتر کیانپارس اهواز
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">تلفن دفتر اداری و مهندسی:</span>
                  <a
                    href={`tel:${config.phoneSecondary}`}
                    className="text-lg font-black text-stone-900 font-mono hover:text-amber-800 transition-colors block mt-1"
                  >
                    {config.phoneSecondary}
                  </a>
                </div>
              </div>

              {/* Factory Landline */}
              <div className="p-5 rounded-3xl bg-white border border-[#E0D5C7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center">
                    <Factory className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 bg-[#F3ECE4] px-2 py-0.5 rounded-full">
                    کارگاه شیبان اهواز
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">هماهنگی ساخت و بازدید:</span>
                  <a
                    href={`tel:${config.phoneFactory}`}
                    className="text-lg font-black text-stone-900 font-mono hover:text-amber-800 transition-colors block mt-1"
                  >
                    {config.phoneFactory}
                  </a>
                </div>
              </div>

              {/* Sales & Site Erection */}
              <div className="p-5 rounded-3xl bg-white border border-[#E0D5C7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 bg-[#F3ECE4] px-2 py-0.5 rounded-full">
                    برآورد و استعلام قیمت
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">هماهنگی ساخت و نصب:</span>
                  <a
                    href={`tel:${config.phoneSales1}`}
                    className="text-lg font-black text-stone-900 font-mono hover:text-amber-800 transition-colors block mt-1"
                  >
                    {config.phoneSales1}
                  </a>
                </div>
              </div>

            </div>

            {/* Social & Messenger Grid */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E0D5C7] space-y-4">
              <div className="text-xs font-black text-stone-900">
                پیام‌رسان‌ها و شبکه‌های اجتماعی سوله پیراسازه:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white border border-[#E0D5C7] hover:border-emerald-600 hover:shadow-sm text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-stone-800">واتساپ</span>
                  <span className="text-[10px] text-stone-500">ارسال نقشه و پیام</span>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/${config.telegramId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white border border-[#E0D5C7] hover:border-sky-600 hover:shadow-sm text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <Send className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-stone-800">تلگرام</span>
                  <span className="text-[10px] text-stone-500">@{config.telegramId}</span>
                </a>

                {/* Eitaa */}
                <a
                  href={`https://eitaa.com/${config.eitaaId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white border border-[#E0D5C7] hover:border-orange-600 hover:shadow-sm text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <MessageSquare className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-stone-800">ایتا</span>
                  <span className="text-[10px] text-stone-500">@{config.eitaaId}</span>
                </a>

                {/* Bale */}
                <a
                  href={`https://ble.ir/${config.baleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white border border-[#E0D5C7] hover:border-teal-700 hover:shadow-sm text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <Send className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-stone-800">بله</span>
                  <span className="text-[10px] text-stone-500">@{config.baleId}</span>
                </a>

                {/* Instagram */}
                <a
                  href={`https://instagram.com/${config.instagramId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white border border-[#E0D5C7] hover:border-pink-600 hover:shadow-sm text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <Instagram className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-stone-800">اینستاگرام</span>
                  <span className="text-[10px] text-stone-500">@{config.instagramId}</span>
                </a>

              </div>
            </div>

          </div>

          {/* Addresses Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-right">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E0D5C7] shadow-md space-y-6">
              
              <div className="flex items-center gap-2 border-b border-[#F0E8DF] pb-4">
                <div className="w-9 h-9 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">نشانی دفتر مرکزی و کارخانه</h3>
                  <span className="text-[11px] text-stone-500">امکان بازدید حضوری با هماهنگی قبلی</span>
                </div>
              </div>

              {/* Office */}
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-700" />
                  <span>دفتر مهندسی و مدیریت فروش:</span>
                </span>
                <p className="text-stone-700 leading-relaxed pr-5">
                  {config.officeAddress}
                </p>
              </div>

              {/* Factory */}
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-amber-700" />
                  <span>کارخانه و خطوط ساخت و سندبلاست:</span>
                </span>
                <p className="text-stone-700 leading-relaxed pr-5">
                  {config.factoryAddress}
                </p>
              </div>

              {/* Hours */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D8] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-800">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>ساعات کاری و پذیرش مراجعین:</span>
                </div>
                <p className="text-[11px] text-stone-600 pr-5">
                  شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۳۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۳:۰۰
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${config.phonePrimary}`}
                  className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>هماهنگی بازدید حضوری از خط تولید</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
