import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Building, 
  Factory, 
  Instagram,
  GraduationCap
} from 'lucide-react';
import { CompanyConfig } from '../types';
import { SheybanMap } from './SheybanMap';

interface ContactSectionProps {
  config: CompanyConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold text-blue-900 shadow-xs">
            <Phone className="w-3.5 h-3.5 text-blue-700" />
            <span>ارتباط مستقیم و بازدید حضوری از کارگاه</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            تماس با کارشناسان و هماهنگی بازدید از کارگاه شیبان
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            پاسخگویی مستقیم مهندسان محاسب تحت نظارت دکتر علی‌اکبر پیراسته جهت مشاوره تخصصی، بررسی نقشه‌ها و برآورد هزینه
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Phone Numbers & Direct Messenger Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 text-right">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Primary Mobile (Structural Engineer & Dr. Pirasteh Supervisory Office) */}
              <div className="p-5 rounded-3xl bg-white border border-blue-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-100/70 border border-blue-200 px-2 py-0.5 rounded-full">
                    خط اول تماس مستقیم
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">مشاوره مستقیم مهندس محاسب:</span>
                  <a
                    href={`tel:${config.phonePrimary}`}
                    className="text-lg font-black text-blue-900 font-mono hover:text-blue-700 transition-colors block mt-1"
                  >
                    {config.phonePrimary}
                  </a>
                </div>
              </div>

              {/* Office Landline */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    دفتر کیانپارس اهواز
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">تلفن دفتر اداری و مهندسی:</span>
                  <a
                    href={`tel:${config.phoneSecondary}`}
                    className="text-lg font-black text-slate-900 font-mono hover:text-blue-700 transition-colors block mt-1"
                  >
                    {config.phoneSecondary}
                  </a>
                </div>
              </div>

              {/* Factory Landline */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Factory className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    کارگاه شیبان اهواز
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">هماهنگی ساخت و بازدید:</span>
                  <a
                    href={`tel:${config.phoneFactory}`}
                    className="text-lg font-black text-slate-900 font-mono hover:text-blue-700 transition-colors block mt-1"
                  >
                    {config.phoneFactory}
                  </a>
                </div>
              </div>

              {/* Sales & Site Erection */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    برآورد و استعلام قیمت
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">هماهنگی ساخت و نصب سراسر کشور:</span>
                  <a
                    href={`tel:${config.phoneSales1}`}
                    className="text-lg font-black text-slate-900 font-mono hover:text-blue-700 transition-colors block mt-1"
                  >
                    {config.phoneSales1}
                  </a>
                </div>
              </div>

            </div>

            {/* Social & Messenger Grid */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="text-xs font-black text-slate-900">
                پیام‌رسان‌ها و ارتباط آنلاین سوله پیراسازه نوین:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-600 hover:shadow-xs text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">واتساپ</span>
                  <span className="text-[10px] text-slate-500">ارسال فوری ابعاد</span>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/${config.telegramId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-600 hover:shadow-xs text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <Send className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">تلگرام</span>
                  <span className="text-[10px] text-slate-500">@{config.telegramId}</span>
                </a>

                {/* Eitaa */}
                <a
                  href={`https://eitaa.com/${config.eitaaId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-600 hover:shadow-xs text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <MessageSquare className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">ایتا</span>
                  <span className="text-[10px] text-slate-500">@{config.eitaaId}</span>
                </a>

                {/* Bale */}
                <a
                  href={`https://ble.ir/${config.baleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-700 hover:shadow-xs text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <Send className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">بله</span>
                  <span className="text-[10px] text-slate-500">@{config.baleId}</span>
                </a>

                {/* Instagram */}
                <a
                  href={`https://instagram.com/${config.instagramId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-600 hover:shadow-xs text-center transition-all flex flex-col items-center gap-1.5 group"
                >
                  <Instagram className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">اینستاگرام</span>
                  <span className="text-[10px] text-slate-500">@{config.instagramId}</span>
                </a>

              </div>
            </div>

          </div>

          {/* Addresses Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-right">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">نشانی دفتر مرکزی و کارخانه</h3>
                  <span className="text-[11px] text-slate-500">امکان بازدید حضوری با هماهنگی قبلی</span>
                </div>
              </div>

              {/* Office */}
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-blue-900 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-700" />
                  <span>دفتر مهندسی و مدیریت فروش:</span>
                </span>
                <p className="text-slate-700 leading-relaxed pr-5">
                  {config.officeAddress}
                </p>
              </div>

              {/* Factory */}
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-blue-900 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-blue-700" />
                  <span>کارخانه و خطوط ساخت و سندبلاست:</span>
                </span>
                <p className="text-slate-700 leading-relaxed pr-5">
                  {config.factoryAddress}
                </p>
              </div>

              {/* Academic Supervisory Note */}
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700 shrink-0" />
                <span>تحت نظارت عالیه دکتر پیراسته (عضو هیئت علمی دانشگاه چمران)</span>
              </div>

              {/* Hours */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  <span>ساعات کاری و پذیرش مراجعین:</span>
                </div>
                <p className="text-[11px] text-slate-600 pr-5">
                  شنبه تا چهارشنبه: ۸:۰۰ الی ۱۸:۰۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۴:۰۰
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${config.phonePrimary}`}
                  className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>هماهنگی بازدید حضوری از کارگاه شیبان</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Interactive Graphic Map for Sheyban Workshop & Local Transit */}
        <SheybanMap workshopPhone={config.phoneFactory || config.phonePrimary} />

      </div>
    </section>
  );
};
