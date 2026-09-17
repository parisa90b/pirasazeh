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
  Sparkles,
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Table
} from 'lucide-react';
import { CompanyConfig, GoogleSheetsConfig, GoogleSheetsSyncResult } from '../types';
import { COMPANY_INFO, GOOGLE_SHEETS_TEMPLATE_GUIDE } from '../siteConfig';
import { extractSpreadsheetId } from '../services/googleSheetsService';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onSave: (newConfig: CompanyConfig) => void;
  sheetsConfig: GoogleSheetsConfig;
  onSaveSheetsConfig: (newSheetsConfig: GoogleSheetsConfig) => void;
  onSyncSheetsNow: () => Promise<GoogleSheetsSyncResult>;
  syncStatus?: GoogleSheetsSyncResult | null;
  isSyncing?: boolean;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  sheetsConfig,
  onSaveSheetsConfig,
  onSyncSheetsNow,
  syncStatus,
  isSyncing = false,
}) => {
  const [formData, setFormData] = useState<CompanyConfig>(config);
  const [sheetsData, setSheetsData] = useState<GoogleSheetsConfig>(sheetsConfig);
  const [activeTab, setActiveTab] = useState<'contact' | 'social' | 'addresses' | 'sheets'>('sheets');
  const [copied, setCopied] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [localSyncResult, setLocalSyncResult] = useState<GoogleSheetsSyncResult | null>(syncStatus || null);

  if (!isOpen) return null;

  const handleChange = (field: keyof CompanyConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSheetsChange = (field: keyof GoogleSheetsConfig, value: unknown) => {
    setSheetsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onSaveSheetsConfig(sheetsData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleTestAndSync = async () => {
    onSaveSheetsConfig(sheetsData);
    const res = await onSyncSheetsNow();
    setLocalSyncResult(res);
  };

  const handleCopyGuide = () => {
    const guideText = `${GOOGLE_SHEETS_TEMPLATE_GUIDE}

=== ساختار ستون‌های برگه گالری (Sheet: Gallery) ===
imageUrl\ttitle\tcategory\tlocation\tdimensions\taltText
https://.../photo1.jpg\tسوله صنعتی تیرورقی\tسوله صنعتی\tاهواز، خوزستان\tدهانه ۲۴ متر\tساخت سوله صنعتی در اهواز

=== ساختار ستون‌های برگه مقالات (Sheet: Articles) ===
title\tslug\tcategory\tsummary\treadTime\tdate\tauthor\timageUrl\ttags\tcontent
راهنمای محاسبه قیمت سوله\tshed-price-guide\tمدیریت هزینه\tبررسی کامل عوامل موثر بر قیمت سوله در خوزستان\t۶ دقیقه\t۱۴۰۴/۰۶/۱۵\tمهندسی پیراسازه\thttps://.../cover.jpg\tسوله, قیمت, اهواز\tمتن کامل مقاله اینجا قرار می‌گیرد...`;

    navigator.clipboard.writeText(guideText).then(() => {
      setCopiedGuide(true);
      setTimeout(() => setCopiedGuide(false), 3000);
    });
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
          <button
            onClick={() => setActiveTab('sheets')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'sheets'
                ? 'border-emerald-700 text-emerald-900 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="flex items-center gap-1.5">
              <span>اتصال به گوگل شیت</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-md font-semibold">CMS</span>
            </span>
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

          {activeTab === 'sheets' && (
            <div className="space-y-5">
              {/* Introduction Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-emerald-900">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>مدیریت عکس‌های گالری و مقالات سایت از طریق Google Sheets</span>
                </div>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  با این ویژگی بدون نیاز به مراجعه به هاست، cPanel یا دست زدن به کدها، هر زمان ردیف جدیدی در گوگل شیت خود ثبت کنید، تصاویر جدید در گالری و مقالات جدید در وبلاگ سایت به‌صورت زنده و خودکار نمایش داده می‌شوند!
                </p>
              </div>

              {/* Sheet URL or ID Field */}
              <div className="p-4 rounded-2xl bg-white border border-[#D5C9BA] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-800">
                    لینک یا شناسه (Spreadsheet ID) گوگل شیت شما:
                  </label>
                  {sheetsData.sheetIdOrUrl && (
                    <a
                      href={sheetsData.sheetIdOrUrl.startsWith('http') ? sheetsData.sheetIdOrUrl : `https://docs.google.com/spreadsheets/d/${extractSpreadsheetId(sheetsData.sheetIdOrUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900"
                    >
                      <span>باز کردن شیت در گوگل</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5.../edit یا شناسه شیت"
                    value={sheetsData.sheetIdOrUrl}
                    onChange={(e) => handleSheetsChange('sheetIdOrUrl', e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-[#D5C9BA] bg-[#FAF8F5] text-stone-900 text-xs font-mono focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                  <div className="absolute right-3 top-3 text-stone-400">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-stone-500">
                  می‌توانید کل لینک اشتراک‌گذاری گوگل شیت را از نوار آدرس مرورگر کپی کرده و در این کادر قرار دهید.
                </p>
              </div>

              {/* Tab Names Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#D5C9BA]">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    نام برگه (Tab) تصاویر گالری:
                  </label>
                  <input
                    type="text"
                    placeholder="Gallery یا گالری"
                    value={sheetsData.gallerySheetName}
                    onChange={(e) => handleSheetsChange('gallerySheetName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5C9BA] bg-[#FAF8F5] text-stone-900 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">پیش‌فرض: Gallery یا گالری</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    نام برگه (Tab) مقالات وبلاگ:
                  </label>
                  <input
                    type="text"
                    placeholder="Articles یا مقالات"
                    value={sheetsData.articlesSheetName}
                    onChange={(e) => handleSheetsChange('articlesSheetName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5C9BA] bg-[#FAF8F5] text-stone-900 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">پیش‌فرض: Articles یا مقالات</span>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-[#E8DFD5] flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sheetsData.autoSync}
                      onChange={(e) => handleSheetsChange('autoSync', e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-stone-300 cursor-pointer"
                    />
                    <span>همگام‌سازی خودکار در هر بار بارگذاری سایت (Auto-sync)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons: Test & Sync Now */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleTestAndSync}
                  disabled={isSyncing}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>در حال دریافت زنده از گوگل شیت...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>تست اتصال و همگام‌سازی فوری (Sync Now)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sync Result Alert */}
              {localSyncResult && (
                <div className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 border ${
                  localSyncResult.success 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}>
                  {localSyncResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 leading-relaxed">
                    <p className="font-bold mb-0.5">{localSyncResult.message}</p>
                    {localSyncResult.galleryCount !== undefined && (
                      <p className="text-[11px] opacity-85">
                        تعداد تصاویر دریافتی: {localSyncResult.galleryCount} | تعداد مقالات دریافتی: {localSyncResult.articlesCount}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step-by-Step Google Sheet Setup Guide */}
              <div className="p-4 rounded-2xl bg-[#F4EDE5] border border-[#D5C9BA] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-amber-800" />
                    <span>راهنمای ۳ گام راه‌اندازی شیت اختصاصی شما:</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyGuide}
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 cursor-pointer shadow-xs transition-colors"
                  >
                    {copiedGuide ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>کپی ستون‌های نمونه</span>
                      </>
                    )}
                  </button>
                </div>

                <ol className="text-xs text-stone-700 space-y-2 list-decimal list-inside leading-relaxed pr-1">
                  <li>
                    یک فایل اکسل جدید در <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-bold underline inline-flex items-center gap-0.5">Google Sheets (کلیک کنید)</a> ایجاد فرمایید.
                  </li>
                  <li>
                    دو برگه (Tab) در پایین ایجاد کنید: یکی با نام <strong>Gallery</strong> و دیگری <strong>Articles</strong> (همچنین می‌توانید به فارسی «گالری» و «مقالات» بگذارید).
                  </li>
                  <li>
                    از دکمه سبز <strong>Share</strong> در گوشه بالا-راست، دسترسی را روی <strong>Anyone with the link can view</strong> قرار دهید و لینک آن را در کادر بالا پیست کنید!
                  </li>
                </ol>

                {/* Column details */}
                <div className="pt-2 border-t border-[#E0D5C7] space-y-2 text-[11px]">
                  <div className="font-bold text-stone-800">اسامی سرستون‌های برگه گالری (Sheet 1):</div>
                  <div className="bg-white p-2 rounded-xl border border-stone-200 font-mono text-[10px] text-stone-800 overflow-x-auto select-all">
                    imageUrl , title , category , location , dimensions , altText
                  </div>

                  <div className="font-bold text-stone-800 pt-1">اسامی سرستون‌های برگه مقالات (Sheet 2):</div>
                  <div className="bg-white p-2 rounded-xl border border-stone-200 font-mono text-[10px] text-stone-800 overflow-x-auto select-all">
                    title , slug , category , summary , readTime , date , author , imageUrl , tags , content
                  </div>

                  <div className="text-[10px] text-stone-500 pt-1">
                    💡 <strong>نکته تصویر:</strong> ستون imageUrl می‌تواند لینک مستقیم، لینک تصاویر در هاست، یا حتی لینک فایل عکس در Google Drive باشد (سایت خودکار لینک گوگل درایو را به تصویر وب تبدیل می‌کند).
                  </div>
                </div>
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
