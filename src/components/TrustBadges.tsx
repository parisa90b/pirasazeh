import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Flame, 
  Scale 
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'گارانتی کتبی ۳ ساله',
      subtitle: 'تعهد رسمی و ضمانت پایداری سازه',
      desc: 'ارائه ضمانت‌نامه حقوقی و بیمه مسئولیت مدنی کیفیت متریال و اتصالات'
    },
    {
      icon: Award,
      title: 'تاییدیه نظام مهندسی',
      subtitle: 'طراحی طبق مبحث ۶ و ۱۰ مقررات ملی',
      desc: 'ارائه دفترچه محاسبات کامل ممهور به مهر مهندس محاسب پایه ۱ نظام مهندسی'
    },
    {
      icon: Flame,
      title: 'تست‌های غیرمخرب جوش (NDT)',
      subtitle: 'تست التراسونیک (UT) و ذرات مغناطیسی (MT)',
      desc: 'کنترل ۱۰۰ درصدی کلیه خطوط جوشکاری اتوماتیک زیرپودری و دستی'
    },
    {
      icon: Scale,
      title: 'بهینه‌سازی ۲۰٪ وزن آهن‌آلات',
      subtitle: 'مدلسازی پیشرفته در Tekla Structures',
      desc: 'کاهش چشمگیر تناژ مصرفی بدون افت صلبیت و مقاومت جانبی سازه'
    },
  ];

  return (
    <section className="py-10 bg-[#F5EFEB] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E0D5C7] shadow-sm hover:shadow-md transition-all text-right flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE4] text-amber-800 flex items-center justify-center shrink-0 mt-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black text-stone-900">{b.title}</h3>
                  <p className="text-[11px] font-bold text-amber-800">{b.subtitle}</p>
                  <p className="text-[10px] text-stone-500 leading-normal">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
