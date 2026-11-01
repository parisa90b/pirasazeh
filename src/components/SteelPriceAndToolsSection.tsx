import React, { useState, useId } from 'react';
import { 
  TrendingUp, 
  ExternalLink, 
  Calculator, 
  ShieldCheck, 
  FileSpreadsheet, 
  Send, 
  Building, 
  CheckCircle2,
  Info,
  GraduationCap
} from 'lucide-react';
import { CompanyConfig } from '../types';

interface SteelPriceAndToolsSectionProps {
  config: CompanyConfig;
}

// مراجع رسمی و معتبر قیمت روز آهن‌آلات و فولاد ایران
const STEEL_PRICE_REFERENCES = [
  {
    name: 'فولاد اکسین خوزستان (اهواز)',
    badge: 'مرجع ورق‌های عریض سوله',
    description: 'بزرگترین مجتمع نورد ورق‌های ضخیم و عریض صنعتی ST37 و ST52 در جنوب کشور با عرض تا ۴.۵ متر.',
    scope: 'ورق‌های سیاه ۲ الی ۴۰ میل و آلیاژی',
    url: 'https://oxincosteel.com/',
    tag: 'کارخانه اهواز'
  },
  {
    name: 'فولاد کاویان اهواز',
    badge: 'تأمین ورق ستون و تیرورق',
    description: 'تولیدکننده معتبر ورق‌های ساختمانی و صنعتی با استاندارد جوش‌پذیری بالا در کیلومتر ۹ جاده اهواز - خرمشهر.',
    scope: 'ورق‌های برشی و ضخیم ۸ تا ۴۰ میلی‌متر',
    url: 'https://kaviansteel.ir/',
    tag: 'کارخانه اهواز'
  },
  {
    name: 'فولاد مبارکه اصفهان (MCSC)',
    badge: 'بزرگترین تولیدکننده کلاف و ورق فولادی',
    description: 'بزرگترین مجتمع فولادسازی کشور و خاورمیانه، تولیدکننده کلاف و ورق‌های گرم نوردیده و ورق‌های گالوانیزه سقف.',
    scope: 'ورق‌های نورد گرم، کلاف سیاه و گالوانیزه',
    url: 'https://msc.ir/',
    tag: 'کارخانه مادر'
  },
  {
    name: 'ذوب آهن اصفهان',
    badge: 'تیرآهن و هاش ساختمانی',
    description: 'مرجع اصلی تولید تیرآهن‌های بال‌پهن (IPB / HEB) و تیرآهن سنگین IPE برای سازه‌ها و پل‌های ماشین‌رو.',
    scope: 'تیرآهن IPE سایز ۱۴ تا ۳۰ و هاش',
    url: 'https://esfahansteel.ir/',
    tag: 'کارخانه مادر'
  },
  {
    name: 'آهن آنلاین (AhanOnline)',
    badge: 'استعلام لحظه‌ای بازار',
    description: 'نمایش آنلاین نرخ روزانه انواع تیرآهن، ورق سیاه مبارکه و اکسین، میلگرد، نبشی و ناودانی در بازار آهن ایران.',
    scope: 'تیرآهن IPE، ورق سیاه، پروفیل قوطی',
    url: 'https://ahanonline.com/',
    tag: 'مرجع بازار'
  },
  {
    name: 'مرکز آهن (MarkazAhan)',
    badge: 'نرخ مقاطع و پروفیل Z',
    description: 'مرجع اعلام قیمت روزانه قوطی، پروفیل‌های پرلین Z و C مخصوص لاپه‌های سقف و اتصالات سوله.',
    scope: 'پروفیل زد، لوله‌های صنعتی، ورق گالوانیزه',
    url: 'https://markazahan.com/',
    tag: 'مرجع بازار'
  },
  {
    name: 'بورس کالای ایران (IME)',
    badge: 'نرخ پایه فولاد کشور',
    description: 'سامانه رسمی کشف قیمت شمش، بیلت و ورق‌های فولادی در تالار صنعتی و حراج باز.',
    scope: 'نرخ پایه شمش، اسلب و مقاطع فولادی',
    url: 'https://ime.co.ir/',
    tag: 'رسمی بورس'
  }
];

export const SteelPriceAndToolsSection: React.FC<SteelPriceAndToolsSectionProps> = ({ config }) => {
  const lengthInputId = useId();
  const widthInputId = useId();
  const heightInputId = useId();
  const shedTypeSelectId = useId();

  // ماشین‌حساب تخمین سرانگشتی وزن و متریال سوله
  const [shedLength, setShedLength] = useState<number>(40);
  const [shedWidth, setShedWidth] = useState<number>(20);
  const [shedHeight, setShedHeight] = useState<number>(6);
  const [shedType, setShedType] = useState<'truss' | 'plate_girder' | 'heavy_crane'>('plate_girder');

  // مساحت سالن
  const totalArea = Math.max(1, shedLength * shedWidth);

  // ضرایب میانگین وزن آهن بر مترمربع (بر اساس تجربیات اقلیم و بار باد خوزستان و کشور)
  const weightCoefficients = {
    truss: { avgKg: 28, minKg: 24, maxKg: 34, label: 'سوله صنعتی سبک بهینه شده (دهانه عریض اقتصادی)' },
    plate_girder: { avgKg: 46, minKg: 38, maxKg: 54, label: 'سوله صنعتی تیرورقی استاندارد (با جرثقیل تا ۱۰ تن)' },
    heavy_crane: { avgKg: 68, minKg: 58, maxKg: 80, label: 'سوله سنگین صنعتی با جرثقیل بالای ۲۰ تن یا دوپل' }
  };

  const currentTypeConfig = weightCoefficients[shedType];
  const estimatedTotalWeightTon = Math.round((totalArea * currentTypeConfig.avgKg) / 1000);
  const estimatedMinWeightTon = Math.round((totalArea * currentTypeConfig.minKg) / 1000);
  const estimatedMaxWeightTon = Math.round((totalArea * currentTypeConfig.maxKg) / 1000);

  // تخمین تقریبی مساحت سقف و دیوار
  const estimatedRoofArea = Math.round(totalArea * 1.12);
  const estimatedWallArea = Math.round((2 * (shedLength + shedWidth) * shedHeight));
  const estimatedTotalCoverArea = estimatedRoofArea + estimatedWallArea;

  // تعداد تقریبی قاب‌ها (فاصله استاندارد ۶ متر بین دهانه‌ها)
  const numberOfFrames = Math.floor(shedLength / 6) + 1;
  const numberOfColumns = numberOfFrames * 2;

  // پیام آماده برای مهندس محاسب در واتساپ
  const messageText = `سلام و احترام.
من از ماشین‌حساب سایت سوله پیراسازه نوین برای استعلام مشخصات سوله استفاده کردم:
- مساحت سالن: ${totalArea} مترمربع (${shedLength} × ${shedWidth} متر)
- ارتفاع ستون: ${shedHeight} متر
- نوع سازه: ${currentTypeConfig.label}
- وزن تخمینی آهن: حدود ${estimatedTotalWeightTon} تن
لطفاً برای مدلسازی دقیق‌تر در تکلا و ارسال پیش‌فاکتور راهنمایی بفرمایید.`;

  const encodedMessage = encodeURIComponent(messageText);

  return (
    <section id="steel-prices" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 relative text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold shadow-xs">
            <TrendingUp className="w-4 h-4 text-blue-700" />
            <span>رصد آنلاین بازار آهن و ابزار مهندسی سوله</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            استعلام آنلاین قیمت روز آهن‌آلات و محاسبه‌گر وزن سوله
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            دسترسی مستقیم به مراجع رسمی نرخ ورق اکسین و کاویان، فولاد مبارکه اصفهان، تیرآهن و پروفیل + ابزار مهندسی برآورد سرانگشتی وزن سوله تحت نظارت علمی دکتر پیراسته
          </p>
        </div>

        {/* 1. مراجع رسمی استعلام قیمت روز آهن‌آلات */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-700" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                مراجع رسمی و کارخانجات تأمین‌کننده آهن‌آلات صنعتی
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
              به‌روزرسانی روزانه بازار
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEEL_PRICE_REFERENCES.map((ref) => (
              <a
                key={ref.name}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200 hover:border-blue-600 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {ref.tag}
                    </span>
                    <span className="text-[11px] font-medium text-blue-700 flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                      <span>مشاهده نرخ آنلاین</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">
                    {ref.name}
                  </h4>
                  <div className="text-[11px] font-semibold text-blue-700 mb-2">
                    {ref.badge}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {ref.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate">مقاطع: {ref.scope}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-2.5 text-xs text-slate-700">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <p>
              <strong>مزیت کارخانه اختصاصی در شیبان اهواز:</strong> شرکت سوله پیراسازه نوین ورق‌های ضخیم صنعتی را مستقیماً از کارخانجات فولاد اکسین و کاویان اهواز با باسکول رسمی بارگیری می‌کند؛ به همین جهت واسطه‌گری انبارداران حذف و تناژ خالص فولاد با گواهینامه معتبر متالورژی تحویل می‌گردد.
            </p>
          </div>
        </div>

        {/* 2. ابزار هوشمند و تعاملی محاسبه‌گر سرانگشتی وزن و متریال سوله */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  محاسبه‌گر آنلاین وزن و مصالح اسکلت سوله
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  برآورد مهندسی و لحظه‌ای وزن فولاد مصرفی، متراژ پوشش و تعداد ستون‌ها
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>مطابق مبحث ۶ و ۱۰ مقررات ملی ساختمان</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ورودی‌ها */}
            <div className="lg:col-span-5 space-y-5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                ۱. ابعاد هندسی و نوع سازه مورد نظر
              </h4>

              {/* نوع سازه */}
              <div>
                <label htmlFor={shedTypeSelectId} className="block text-xs font-bold text-slate-800 mb-2">
                  نوع سازه و سیستم باربری:
                </label>
                <select
                  id={shedTypeSelectId}
                  value={shedType}
                  onChange={(e) => setShedType(e.target.value as any)}
                  className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                >
                  <option value="plate_girder">سوله صنعتی تیرورقی استاندارد (توصیه شده - با جرثقیل)</option>
                  <option value="truss">سوله صنعتی سبک بهینه شده (دهانه عریض اقتصادی)</option>
                  <option value="heavy_crane">سوله سنگین صنعتی با جرثقیل دوپل سنگین (بالای ۲۰ تن)</option>
                </select>
              </div>

              {/* اسلایدر طول */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                  <label htmlFor={lengthInputId}>طول سالن (متر):</label>
                  <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 font-bold">
                    {shedLength} متر
                  </span>
                </div>
                <input
                  id={lengthInputId}
                  type="range"
                  min={12}
                  max={120}
                  step={6}
                  value={shedLength}
                  onChange={(e) => setShedLength(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>۱۲ متر</span>
                  <span>فاصله قاب‌ها: ۶ متر</span>
                  <span>۱۲۰ متر</span>
                </div>
              </div>

              {/* اسلایدر عرض دهانه */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                  <label htmlFor={widthInputId}>عرض دهانه سوله (متر):</label>
                  <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 font-bold">
                    {shedWidth} متر
                  </span>
                </div>
                <input
                  id={widthInputId}
                  type="range"
                  min={10}
                  max={45}
                  step={1}
                  value={shedWidth}
                  onChange={(e) => setShedWidth(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>۱۰ متر (دهانه کوچک)</span>
                  <span>۲۴ متر (متداول)</span>
                  <span>۴۵ متر (عریض)</span>
                </div>
              </div>

              {/* ارتفاع ستون */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                  <label htmlFor={heightInputId}>ارتفاع مفید ستون (متر):</label>
                  <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 font-bold">
                    {shedHeight} متر
                  </span>
                </div>
                <input
                  id={heightInputId}
                  type="range"
                  min={4}
                  max={14}
                  step={0.5}
                  value={shedHeight}
                  onChange={(e) => setShedHeight(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>۴ متر</span>
                  <span>۶ الی ۸ متر (استاندارد)</span>
                  <span>۱۴ متر</span>
                </div>
              </div>
            </div>

            {/* نتایج زنده محاسبات */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  ۲. نتایج تخمین سرانگشتی متریال و وزن سازه
                </h4>

                {/* کارت‌های نتایج عددی */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-right shadow-xs">
                    <span className="text-[11px] text-slate-500 block mb-1">مساحت زیربنا</span>
                    <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                      {totalArea.toLocaleString('fa-IR')}
                      <span className="text-xs font-normal text-slate-600 mr-1">m²</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 text-right shadow-xs">
                    <span className="text-[11px] text-blue-800 block mb-1 font-medium">وزن کل فولاد اسکلت</span>
                    <div className="text-lg sm:text-xl font-black text-blue-900 font-mono">
                      {estimatedTotalWeightTon.toLocaleString('fa-IR')}
                      <span className="text-xs font-bold mr-1">تن آهن</span>
                    </div>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      (بازه {estimatedMinWeightTon} تا {estimatedMaxWeightTon} تن)
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-right col-span-2 sm:col-span-1 shadow-xs">
                    <span className="text-[11px] text-slate-500 block mb-1">میانگین وزن آهن / متر</span>
                    <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                      {currentTypeConfig.avgKg}
                      <span className="text-xs font-normal text-slate-600 mr-1">kg/m²</span>
                    </div>
                  </div>
                </div>

                {/* چک‌لیست مصالح برآورد شده */}
                <div className="space-y-2 text-xs text-slate-700 mb-6 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>تعداد قاب‌های باربر اصلی و ستون‌ها:</span>
                    </span>
                    <strong className="font-mono text-slate-900">
                      {numberOfFrames} قاب ({numberOfColumns} ستون)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>تخمین متراژ پوشش ساندویچ پانل (سقف + دیوار):</span>
                    </span>
                    <strong className="font-mono text-slate-900">
                      حدود {estimatedTotalCoverArea.toLocaleString('fa-IR')} مترمربع
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>استاندارد آماده‌سازی سطح در کارگاه شیبان:</span>
                    </span>
                    <span className="font-bold text-blue-800">
                      سندبلاست اتوماتیک SA 2.5 + رنگ اپوکسی
                    </span>
                  </div>
                </div>
              </div>

              {/* دکمه‌های اقدام سریع */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال ابعاد به مهندس محاسب در واتساپ</span>
                </a>
                <a
                  href={`https://ble.ir/${config.baleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>ارسال در بله</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. راهنمای تبادل لینک و استناد مهندسی */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-700 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-1">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                  ویژه مهندسان مشاور، طراحان و دفاتر فنی سراسر کشور
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                جهت استعلام ضوابط بار باد و برف مبحث ۶ برای شهر خود، درخواست شاپ دراوینگ تکلا (Tekla) یا همکاری در طراحی محاسباتی تحت نظارت دکتر پیراسته، با دفتر فنی تماس بگیرید.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={`tel:${config.phonePrimary}`}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>تماس مستقیم مهندس محاسب:</span>
              <span className="font-mono text-blue-300">{config.phonePrimary}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
