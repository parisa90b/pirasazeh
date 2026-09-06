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
  Sparkles 
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
    <section id="quote-form" className="py-16 lg:py-24 bg-[#F5EFEB] border-b border-[#E8DFD5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1 text-xs font-bold text-amber-900 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>محاسبه اختصاصی مهندس طراح بر اساس شهر شما</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            ثبت ابعاد دلخواه و ارسال مستقیم به طراح
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            طول، دهانه و ارتفاع مدنظر خود را مشخص کنید تا پس از بررسی بار برف و باد، پیش‌فاکتور و نقشه جانمایی ظرف ۲ ساعت در پیام‌رسان برای شما ارسال گردد.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-[#E0D5C7] shadow-xl p-6 sm:p-10 text-right space-y-8">
          
          <form className="space-y-6">
            
            {/* Contact Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>نام کارفرما یا شرکت:</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: مهندس حسینی"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E0D5C7] px-3.5 py-2.5 text-xs text-stone-900 focus:border-amber-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  <span>شماره تماس (الزامی):</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E0D5C7] px-3.5 py-2.5 text-xs text-stone-900 text-center font-mono font-bold focus:border-amber-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>شهر محل احداث (برای بار برف/باد):</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: قزوین / اصفهان / ساوه"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E0D5C7] px-3.5 py-2.5 text-xs text-stone-900 focus:border-amber-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Structure Type Row */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>نوع اسکلت و کاربری سازه:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'سوله صنعتی تیرورقی',
                  'سوله سبک خرپایی',
                  'پل ماشین‌رو و سازه سنگین',
                  'استراکچر فلزی ساختمانی'
                ].map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setFormData({ ...formData, structureType: st })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.structureType === st
                        ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                        : 'bg-[#FAF8F5] text-stone-700 border-[#E0D5C7] hover:bg-[#F3ECE4]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Geometric Dimensions Sliders & Inputs */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EBE3D8] space-y-5">
              <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-black text-stone-900">ابعاد هندسی سالن:</span>
                </div>
                <div className="text-xs text-stone-600">
                  مساحت کل: <strong className="text-amber-900 font-mono text-sm">{formatPersianNumber(totalArea)}</strong> مترمربع
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Span Width */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-stone-700">عرض دهانه سوله:</span>
                    <span className="font-mono font-bold text-amber-800">{formData.spanWidth} متر</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={formData.spanWidth}
                    onChange={(e) => setFormData({ ...formData, spanWidth: Number(e.target.value) })}
                    className="w-full accent-amber-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>۱۰ متر</span>
                    <span>۵۰ متر</span>
                  </div>
                </div>

                {/* Length */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-stone-700">طول سالن:</span>
                    <span className="font-mono font-bold text-amber-800">{formData.hallLength} متر</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="250"
                    step="6"
                    value={formData.hallLength}
                    onChange={(e) => setFormData({ ...formData, hallLength: Number(e.target.value) })}
                    className="w-full accent-amber-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>۲۰ متر</span>
                    <span>۲۵۰ متر</span>
                  </div>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-stone-700">ارتفاع مفید ستون:</span>
                    <span className="font-mono font-bold text-amber-800">{formData.wallHeight} متر</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={formData.wallHeight}
                    onChange={(e) => setFormData({ ...formData, wallHeight: Number(e.target.value) })}
                    className="w-full accent-amber-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>۶ متر</span>
                    <span>۱۸ متر</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Crane & Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE3D8] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">آیا نیاز به جرثقیل سقفی دارید؟</span>
                  <input
                    type="checkbox"
                    checked={formData.hasCrane}
                    onChange={(e) => setFormData({ ...formData, hasCrane: e.target.checked })}
                    className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
                  />
                </div>

                {formData.hasCrane && (
                  <div className="pt-2 border-t border-[#E8DFD5] space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-600 block">ظرفیت باربرداری جرثقیل:</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {[3, 5, 10, 15, 20, 40].map((cap) => (
                        <button
                          type="button"
                          key={cap}
                          onClick={() => setFormData({ ...formData, craneCapacityTons: cap })}
                          className={`flex-1 min-w-[42px] py-1.5 text-xs font-mono font-bold rounded-lg border cursor-pointer ${
                            formData.craneCapacityTons === cap
                              ? 'bg-amber-700 text-white border-amber-700'
                              : 'bg-white text-stone-700 border-[#E0D5C7]'
                          }`}
                        >
                          {cap} تن
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE3D8] space-y-2">
                <label className="text-xs font-bold text-stone-800 block flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  <span>نوع پوشش سقف پیشنهادی:</span>
                </label>
                <select
                  value={formData.roofType}
                  onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                  className="w-full rounded-xl bg-white border border-[#E0D5C7] px-3 py-2 text-xs text-stone-800 focus:border-amber-700 focus:outline-none"
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
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                توضیحات تکمیلی یا شرایط خاص زمین (اختیاری):
              </label>
              <textarea
                rows={2}
                placeholder="مثال: زمین دارای خاک سست است، نیاز به دو درب تریلی‌رو داریم..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full rounded-xl bg-[#FAF8F5] border border-[#E0D5C7] px-3.5 py-2.5 text-xs text-stone-900 focus:border-amber-700 focus:outline-none"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ارسال خودکار ابعاد به واتساپ مهندس طراح</span>
              </button>

              <button
                type="button"
                onClick={handleSendToBale}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ارسال خودکار ابعاد به پیام‌رسان بله</span>
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
