import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  Ruler, 
  Building2, 
  MapPin, 
  Phone, 
  User, 
  Layers, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';
import { CompanyConfig, QuoteRequest } from '../types';
import { 
  formatPersianNumber, 
  getWhatsAppLink, 
  getBaleLink 
} from '../utils/quoteMessenger';
import confetti from 'canvas-confetti';

interface CustomQuoteFormSectionProps {
  config: CompanyConfig;
  initialValues?: {
    span?: number;
    length?: number;
    height?: number;
    projectTitle?: string;
  };
}

export const CustomQuoteFormSection: React.FC<CustomQuoteFormSectionProps> = ({
  config,
  initialValues,
}) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    clientName: '',
    clientPhone: '',
    city: 'اهواز',
    structureType: 'سوله صنعتی تیرورقی',
    spanWidth: initialValues?.span || 24,
    hallLength: initialValues?.length || 60,
    wallHeight: initialValues?.height || 9,
    hasCrane: false,
    craneCapacityTons: 10,
    roofType: 'ساندویچ پانل ۵ سانت پلی‌اورتان',
    additionalNotes: initialValues?.projectTitle 
      ? `استعلام بر اساس پروژه شاخص: ${initialValues.projectTitle}` 
      : '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Update if initialValues change
  React.useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        spanWidth: initialValues.span || prev.spanWidth,
        hallLength: initialValues.length || prev.hallLength,
        wallHeight: initialValues.height || prev.wallHeight,
        additionalNotes: initialValues.projectTitle 
          ? `استعلام مشابه با ابعاد پروژه: ${initialValues.projectTitle}` 
          : prev.additionalNotes,
      }));
    }
  }, [initialValues]);

  const totalArea = formData.spanWidth * formData.hallLength;

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientPhone.trim()) {
      alert('لطفاً شماره تماس خود را جهت ارسال پیش‌فاکتور وارد فرمایید.');
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
    const link = getWhatsAppLink(config.whatsappNumber, formData);
    window.open(link, '_blank');
  };

  const handleSendToBale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientPhone.trim()) {
      alert('لطفاً شماره تماس خود را جهت ارسال پیش‌فاکتور وارد فرمایید.');
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
    const link = getBaleLink(config.baleId, formData);
    window.open(link, '_blank');
  };

  return (
    <section id="quote-form" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-900 shadow-xs">
            <GraduationCap className="w-4 h-4 text-blue-700" />
            <span>محاسبات تخصصی دفتر دکتر پیراسته (هیئت علمی دانشگاه چمران)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            ثبت ابعاد دلخواه و استعلام مستقیم قیمت به طراح
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            طول، دهانه، ارتفاع و شهر پروژه را مشخص کنید تا بر اساس بار برف و باد منطقه، پیش‌فاکتور و فایل سه‌بعدی ظرف ۲ ساعت ارسال گردد.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 text-right space-y-8">
          
          <form className="space-y-6">
            
            {/* Contact Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-700" />
                  <span>نام کارفرما یا شرکت:</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: مهندس حسینی"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-700" />
                  <span>شماره تماس (جهت ارسال پیش‌فاکتور):</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۶۹۸۸۱۳۲۱"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 text-center font-mono font-bold focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  <span>شهر محل احداث (بار برف/باد):</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: اهواز / تهران / مبارکه اصفهان / شیراز"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Structure Type Row */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                <span>نوع اسکلت و کاربری سازه:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'سوله صنعتی تیرورقی',
                  'سوله صنعتی سبک بهینه شده',
                  'پل ماشین‌رو و سازه سنگین',
                  'اسکلت فلزی ساختمانی'
                ].map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setFormData({ ...formData, structureType: st })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.structureType === st
                        ? 'bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-700/20'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Geometric Dimensions Sliders & Inputs */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-black text-slate-900">ابعاد هندسی سالن:</span>
                </div>
                <div className="text-xs text-slate-600">
                  مساحت کل سالن: <strong className="text-blue-700 font-mono text-sm">{formatPersianNumber(totalArea)}</strong> مترمربع
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Span Width */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">عرض دهانه سوله:</span>
                    <span className="font-mono font-bold text-blue-700">{formData.spanWidth} متر</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={formData.spanWidth}
                    onChange={(e) => setFormData({ ...formData, spanWidth: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>۱۰ متر</span>
                    <span>۵۰ متر</span>
                  </div>
                </div>

                {/* Length */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">طول سالن:</span>
                    <span className="font-mono font-bold text-blue-700">{formData.hallLength} متر</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="250"
                    step="6"
                    value={formData.hallLength}
                    onChange={(e) => setFormData({ ...formData, hallLength: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>۲۰ متر</span>
                    <span>۲۵۰ متر</span>
                  </div>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">ارتفاع مفید ستون:</span>
                    <span className="font-mono font-bold text-blue-700">{formData.wallHeight} متر</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={formData.wallHeight}
                    onChange={(e) => setFormData({ ...formData, wallHeight: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>۶ متر</span>
                    <span>۱۸ متر</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Crane & Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">آیا نیاز به جرثقیل سقفی دارید؟</span>
                  <input
                    type="checkbox"
                    checked={formData.hasCrane}
                    onChange={(e) => setFormData({ ...formData, hasCrane: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                {formData.hasCrane && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 block">ظرفیت باربرداری جرثقیل:</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {[3, 5, 10, 15, 20, 40].map((cap) => (
                        <button
                          type="button"
                          key={cap}
                          onClick={() => setFormData({ ...formData, craneCapacityTons: cap })}
                          className={`flex-1 min-w-[42px] py-1.5 text-xs font-mono font-bold rounded-lg border cursor-pointer ${
                            formData.craneCapacityTons === cap
                              ? 'bg-blue-700 text-white border-blue-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cap} تن
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-700" />
                  <span>نوع پوشش سقف پیشنهادی:</span>
                </label>
                <select
                  value={formData.roofType}
                  onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                >
                  <option value="ساندویچ پانل ۵ سانت پلی‌اورتان">ساندویچ پانل نسوز ۵ سانت پلی‌اورتان</option>
                  <option value="ساندویچ پانل ۱۰ سانت سردخانه‌ای">ساندویچ پانل ۱۰ سانت سردخانه‌ای</option>
                  <option value="ورق گالوانیزه رنگی با پشم شیشه و توری مرغی">ورق گالوانیزه با پشم شیشه و توری</option>
                  <option value="ورق ذوزنقه‌ای بدون عایق">ورق ذوزنقه‌ای بدون عایق</option>
                  <option value="هنوز تصمیم نگرفته‌ام (مشاوره شود)">هنوز تصمیم نگرفته‌ام (نیاز به مشاوره)</option>
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                توضیحات تکمیلی یا شرایط خاص زمین و شهرک صنعتی (اختیاری):
              </label>
              <textarea
                rows={2}
                placeholder="مثال: احداث در شهرک صنعتی مبارکه اصفهان، خاک سست یا نیاز به دو دهانه متصل..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full rounded-xl bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ارسال ابعاد به واتساپ مهندس طراح</span>
              </button>

              <button
                type="button"
                onClick={handleSendToBale}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ارسال ابعاد به پیام‌رسان بله</span>
              </button>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>اطلاعات سالن به پیام‌رسان ارسال شد. مهندس محاسب به زودی با شما تماس خواهد گرفت.</span>
              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
};
