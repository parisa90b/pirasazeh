import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Copy, 
  Check, 
  RotateCcw, 
  HelpCircle,
  Phone,
  Share2,
  MapPin,
  Sparkles
} from 'lucide-react';
import { CompanyConfig } from '../types';
import { COMPANY_INFO } from '../siteConfig';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onSave: (newConfig: CompanyConfig) => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<CompanyConfig>(config);
  const [activeTab, setActiveTab] = useState<'contact' | 'social' | 'addresses'>('contact');
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof CompanyConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('آیا مایلید تمام اطلاعات به تنظیمات اولیه بازگردانده شوند؟')) {
      setFormData(COMPANY_INFO);
      onSave(COMPANY_INFO);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    }
  };

  const generateConfigTsCode = () => {
    return `export const COMPANY_INFO: CompanyConfig = {
  companyName: '${formData.companyName}',
  brandTitle: '${formData.brandTitle}',
  tagline: '${formData.tagline}',
  
  // شماره‌های تماس
  phonePrimary: '${formData.phonePrimary}',
  phoneSecondary: '${formData.phoneSecondary}',
  phoneFactory: '${formData.phoneFactory}',
  phoneSales1: '${formData.phoneSales1}',
  phoneSales2: '${formData.phoneSales2}',

  // شبکه‌های اجتماعی و پیام‌رسان‌ها
  whatsappNumber: '${formData.whatsappNumber}',
  baleId: '${formData.baleId}',
  eitaaId: '${formData.eitaaId}',
  telegramId: '${formData.telegramId}',
  instagramId: '${formData.instagramId}',
  email: '${formData.email}',

  // آدرس‌ها
  officeAddress: '${formData.officeAddress}',
  factoryAddress: '${formData.factoryAddress}',
};`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateConfigTsCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#E0D5C7] rounded-3xl shadow-2xl overflow-hidden text-right my-8"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD5] bg-[#F5EFEB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-800 text-amber-50 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900">
                ویرایش آسان مشخصات و شماره‌های سایت
              </h3>
              <p className="text-[11px] text-stone-600">
                بدون نیاز به کدنویسی یا تایپ میان کاراکترهای انگلیسی
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-[#EBE2D7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Assistant Notice */}
        <div className="bg-amber-50/80 border-b border-amber-200/70 px-6 py-3 flex items-start gap-2.5 text-xs text-amber-950">
          <HelpCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>نکته راحت‌تر:</strong> هر تغییری در شماره‌ها، آدرس‌ها یا نام شرکت دارید می‌توانید در همین چت به فارسی به من بگویید تا بدون دردسر برای شما ثبت کنم!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8DFD5] bg-[#FAF8F5] px-6 pt-2">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>مشخصات و تلفن‌ها</span>
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'social'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>پیام‌رسان‌ها و شبکه‌ها</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'addresses'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>آدرس دفتر و کارخانه</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    نام کامل شرکت:
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    عنوان برند و نشان تجاری:
                  </label>
                  <input
                    type="text"
                    value={formData.brandTitle}
                    onChange={(e) => handleChange('brandTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  شعار و زمینه فعالیت:
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    شماره موبایل اصلی (پاسخگویی مستقیم):
                  </label>
                  <input
                    type="text"
                    value={formData.phonePrimary}
                    onChange={(e) => handleChange('phonePrimary', e.target.value)}
                    placeholder="09169881321"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    تلفن دفتر کیانپارس:
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSecondary}
                    onChange={(e) => handleChange('phoneSecondary', e.target.value)}
                    placeholder="09169881321"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    تلفن کارگاه شیبان:
                  </label>
                  <input
                    type="text"
                    value={formData.phoneFactory}
                    onChange={(e) => handleChange('phoneFactory', e.target.value)}
                    dir="ltr"
                    placeholder="09169881321"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    کارشناس برآورد (فروش ۱):
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSales1}
                    onChange={(e) => handleChange('phoneSales1', e.target.value)}
                    dir="ltr"
                    placeholder="09169881321"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    سرپرست نصب و اجرا (فروش ۲):
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSales2}
                    onChange={(e) => handleChange('phoneSales2', e.target.value)}
                    dir="ltr"
                    placeholder="09169881321"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  ایمیل شرکت:
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  dir="ltr"
                  placeholder="Solepirasazeh@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  شماره واتساپ (با کد ۹۸ و بدون صفر):
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="989169881321"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">
                  پیام‌های استعلام و دکمه چت در سایت به این شماره فرستاده می‌شوند.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  شناسه پیام‌رسان بله:
                </label>
                <input
                  type="text"
                  value={formData.baleId}
                  onChange={(e) => handleChange('baleId', e.target.value)}
                  placeholder="Solepirasazeh"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  شناسه کانال یا آیدی ایتا (Eitaa):
                </label>
                <input
                  type="text"
                  value={formData.eitaaId}
                  onChange={(e) => handleChange('eitaaId', e.target.value)}
                  placeholder="Solepirasazeh"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    شناسه تلگرام:
                  </label>
                  <input
                    type="text"
                    value={formData.telegramId}
                    onChange={(e) => handleChange('telegramId', e.target.value)}
                    placeholder="Solepirasazeh"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    شناسه اینستاگرام:
                  </label>
                  <input
                    type="text"
                    value={formData.instagramId}
                    onChange={(e) => handleChange('instagramId', e.target.value)}
                    placeholder="ariana.steel.structure"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none text-left"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  آدرس کارخانه ساخت و خط تولید:
                </label>
                <textarea
                  rows={2}
                  value={formData.factoryAddress}
                  onChange={(e) => handleChange('factoryAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  آدرس دفتر مرکزی و مهندسی:
                </label>
                <textarea
                  rows={2}
                  value={formData.officeAddress}
                  onChange={(e) => handleChange('officeAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9BA] bg-white text-stone-900 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 border-t border-[#E8DFD5] bg-[#F5EFEB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره و اعمال زنده در سایت</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-[#EAE1D6] border border-[#D5C9BA] transition-colors cursor-pointer"
              title="بازنشانی به مقادیر اولیه"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyCode}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 bg-[#EFE7DE] hover:bg-[#E5DCD1] border border-[#D5C9BA] transition-colors cursor-pointer"
              title="کپی کردن کد کامل جهت قراردادن در فایل siteConfig.ts"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span className="text-emerald-800">کد کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>کپی کد کامل TypeScript</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Saved Toast Notice */}
        {savedNotice && (
          <div className="bg-emerald-800 text-emerald-50 text-center py-2 px-4 text-xs font-bold">
            ✓ تغییرات با موفقیت ذخیره و روی تمام بخش‌های سایت اعمال شد!
          </div>
        )}

      </div>
    </div>
  );
};
