import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Flame, 
  GraduationCap 
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: GraduationCap,
      title: 'مدیریت دکتر پیراسته',
      subtitle: 'عضو هیئت علمی دانشگاه شهید چمران',
      desc: 'نظارت عالیه محاسبات سازه، مدلسازی بهینه در تکلا و کنترل کیفیت ساخت کارگاهی'
    },
    {
      icon: ShieldCheck,
      title: 'گارانتی کتبی ۳ ساله',
      subtitle: 'تعهد رسمی و ضمانت پایداری سازه',
      desc: 'ارائه ضمانت‌نامه حقوقی و بیمه مسئولیت مدنی کیفیت متریال و اتصالات پیچ و مهره‌ای'
    },
    {
      icon: Award,
      title: 'تاییدیه نظام مهندسی سراسر کشور',
      subtitle: 'طراحی طبق مبحث ۶ و ۱۰ مقررات ملی',
      desc: 'ارائه دفترچه محاسبات کامل ممهور به مهر مهندس محاسب پایه ۱ نظام مهندسی'
    },
    {
      icon: Flame,
      title: 'تست‌های غیرمخرب جوش (NDT)',
      subtitle: 'تست التراسونیک (UT) و ذرات مغناطیسی (MT)',
      desc: 'کنترل ۱۰۰ درصدی کلیه خطوط جوشکاری اتوماتیک زیرپودری و سندبلاست SA 2.5'
    },
  ];

  return (
    <section className="py-10 bg-[#F1F5F9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all text-right flex items-start gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-700 flex items-center justify-center shrink-0 mt-1 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black text-slate-900">{b.title}</h3>
                  <p className="text-[11px] font-bold text-blue-700">{b.subtitle}</p>
                  <p className="text-[10px] text-slate-500 leading-normal">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
