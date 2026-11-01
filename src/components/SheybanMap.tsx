import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  Truck, 
  Building2, 
  Factory, 
  Phone, 
  Route, 
  ZoomIn, 
  ZoomOut, 
  Compass,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface SheybanMapProps {
  workshopPhone: string;
}

export const SheybanMap: React.FC<SheybanMapProps> = ({ workshopPhone }) => {
  const [activeLocation, setActiveLocation] = useState<'sheyban' | 'kianpars'>('sheyban');
  const [activeTab, setActiveTab] = useState<'map' | 'transit'>('map');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Sheyban Workshop Coordinates
  const sheybanLat = 31.4085;
  const sheybanLng = 48.7750;
  const coordinatesString = `${sheybanLat}, ${sheybanLng}`;

  // Direct Navigation URLs
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${sheybanLat},${sheybanLng}`;
  const neshanUrl = `https://neshan.org/maps/@${sheybanLat},${sheybanLng},15z`;
  const baladUrl = `https://balad.ir/location?latitude=${sheybanLat}&longitude=${sheybanLng}`;

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(coordinatesString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden mt-8 transition-all">
      {/* Map Header & Controls */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-900/10 shrink-0">
              <Compass className="w-5 h-5 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  نقشه تعاملی و موقعیت کارگاه سوله پیراسازه نوین شیبان
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                  مسیریابی آنلاین
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                دسترسی آسان ناوگان تریلی و بازدید حضوری از خطوط ساخت، برش CNC و سندبلاست
              </p>
            </div>
          </div>

          {/* Location Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-2xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveLocation('sheyban')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLocation === 'sheyban'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>کارگاه شیبان</span>
            </button>
            <button
              onClick={() => setActiveLocation('kianpars')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLocation === 'kianpars'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>دفتر کیانپارس</span>
            </button>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                activeTab === 'map'
                  ? 'bg-white text-blue-900 shadow-xs border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نمای گرافیکی و شریان‌های مواصلاتی
            </button>
            <button
              onClick={() => setActiveTab('transit')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                activeTab === 'transit'
                  ? 'bg-white text-blue-900 shadow-xs border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              راهنمای ترابری تریلی و بارهای ترافیکی
            </button>
          </div>

          {/* Zoom controls for map */}
          {activeTab === 'map' && (
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.45))}
                title="بزرگنمایی نقشه"
                aria-label="بزرگنمایی نقشه"
                className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
                title="کوچک‌نمایی نقشه"
                aria-label="کوچک‌نمایی نقشه"
                className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="text-[10px] font-mono px-2 py-1 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
              >
                ۱۰۰٪
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Map Visual Canvas */}
      {activeTab === 'map' ? (
        <div className="relative bg-[#ECE5DB] overflow-hidden select-none min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-2">
          
          {/* Subtle Map Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#A89A88 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* SVG Vector Graphic Schematic Map of Ahvaz - Sheyban Transit Corridor */}
          <div 
            className="w-full max-w-4xl transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg 
              viewBox="0 0 900 520" 
              className="w-full h-auto drop-shadow-sm font-sans"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions */}
              <defs>
                {/* River Gradient */}
                <linearGradient id="karunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
                </linearGradient>

                {/* Highway Glow Filter */}
                <filter id="roadGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#78350F" floodOpacity="0.15" />
                </filter>

                {/* Radar pulse animation for workshop */}
                <radialGradient id="pulseGradient">
                  <stop offset="0%" stopColor="#B45309" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#D97706" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background regions */}
              {/* Ahvaz City Metro Area */}
              <path 
                d="M 120 320 C 180 300, 300 280, 420 340 C 480 370, 520 480, 380 500 C 240 520, 100 480, 120 320 Z" 
                fill="#E4DACD" 
                stroke="#D3C5B4" 
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x="240" y="440" fill="#8C7E6C" fontSize="18" fontWeight="bold" opacity="0.6">
                محدوده کلانشهر اهواز
              </text>

              {/* Sheyban Area */}
              <rect 
                x="570" 
                y="90" 
                width="260" 
                height="190" 
                rx="28" 
                fill="#E9DEC9" 
                stroke="#D8C7B0" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
              <text x="630" y="125" fill="#926229" fontSize="16" fontWeight="bold" opacity="0.8">
                منطقه صنعتی شیبان
              </text>
              <text x="630" y="145" fill="#A87435" fontSize="12" opacity="0.7">
                حاشیه بزرگراه ترانزیتی شمال اهواز
              </text>

              {/* Karun River (رود خروشان کارون) */}
              <path 
                d="M 850 40 Q 750 120, 680 180 T 520 250 T 400 280 T 260 310 T 80 430" 
                fill="none" 
                stroke="url(#karunGradient)" 
                strokeWidth="32" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M 850 40 Q 750 120, 680 180 T 520 250 T 400 280 T 260 310 T 80 430" 
                fill="none" 
                stroke="#DBEAFE" 
                strokeWidth="6" 
                strokeDasharray="16 20"
                strokeLinecap="round"
                opacity="0.9"
              />
              <text x="360" y="240" fill="#1E40AF" fontSize="13" fontWeight="bold" opacity="0.8" transform="rotate(-15 360 240)">
                رودخانه کارون (Karun River)
              </text>

              {/* Secondary Roads & Ring Roads */}
              {/* Ahvaz Ring Road */}
              <path 
                d="M 120 400 C 180 340, 360 320, 520 340 C 640 360, 720 440, 780 490" 
                fill="none" 
                stroke="#CBBCA8" 
                strokeWidth="6" 
                strokeLinecap="round"
              />
              <text x="630" y="450" fill="#7C6D5B" fontSize="11" opacity="0.7">
                کمربندی شرق اهواز (به سمت فولاد خوزستان)
              </text>

              {/* Main Transit Arteries (بزرگراه ترانزیتی اهواز - شیبان - شوشتر) */}
              <path 
                d="M 190 390 L 340 310 L 520 220 L 720 150 L 860 100" 
                fill="none" 
                stroke="#78350F" 
                strokeWidth="14" 
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roadGlow)"
              />
              {/* Road Centerline (yellow dashed) */}
              <path 
                d="M 190 390 L 340 310 L 520 220 L 720 150 L 860 100" 
                fill="none" 
                stroke="#FEF08A" 
                strokeWidth="2.5" 
                strokeDasharray="14 12" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Road Label */}
              <rect x="360" y="275" width="220" height="24" rx="6" fill="#78350F" opacity="0.95" />
              <text x="375" y="291" fill="#FEF08A" fontSize="11" fontWeight="bold">
                بزرگراه اهواز - شیبان - ملاثانی (مسیر ترانزیت تریلی)
              </text>

              {/* Bridge over Karun */}
              <rect x="502" y="210" width="36" height="20" rx="3" fill="#44403C" stroke="#FEF08A" strokeWidth="1.5" />
              <text x="495" y="200" fill="#57534E" fontSize="10" fontWeight="bold">پل ترانزیت</text>

              {/* Landmark: Kianpars Ahvaz */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setActiveLocation('kianpars')}
              >
                <circle cx="210" cy="360" r="14" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="3" />
                <rect x="140" y="380" width="140" height="42" rx="8" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
                <text x="155" y="398" fill="#1E3A8A" fontSize="12" fontWeight="bold">دفتر مرکزی کیانپارس</text>
                <text x="160" y="413" fill="#64748B" fontSize="10">مهندسی و قراردادها</text>
              </g>

              {/* Landmark: Ahvaz International Airport */}
              <g>
                <circle cx="340" cy="460" r="8" fill="#64748B" stroke="#FFFFFF" strokeWidth="2" />
                <text x="355" y="465" fill="#475569" fontSize="11" fontWeight="bold">فرودگاه بین‌المللی اهواز (۱۵ دقیقه)</text>
              </g>

              {/* Landmark: Khuzestan Steel & Oxin */}
              <g>
                <circle cx="680" cy="480" r="8" fill="#78716C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="540" y="495" fill="#57534E" fontSize="11" fontWeight="bold">کارخانجات فولاد خوزستان و ورق اکسین اهواز</text>
              </g>

              {/* PRIMARY DESTINATION: SHEYBAN WORKSHOP */}
              <g 
                className="cursor-pointer"
                onClick={() => setActiveLocation('sheyban')}
              >
                {/* Radar Pulse Effect */}
                <circle cx="720" cy="150" r="44" fill="url(#pulseGradient)" className="animate-ping" opacity="0.4" style={{ animationDuration: '3s' }} />
                <circle cx="720" cy="150" r="28" fill="#F59E0B" opacity="0.3" />
                <circle cx="720" cy="150" r="16" fill="#B45309" stroke="#FFFFFF" strokeWidth="3.5" />
                
                {/* Center marker dot */}
                <circle cx="720" cy="150" r="6" fill="#FEF3C7" />

                {/* Callout Card on the map */}
                <g filter="drop-shadow(0 4px 12px rgba(120, 53, 15, 0.25))">
                  <path d="M 620 100 L 710 135 L 690 100 Z" fill="#78350F" />
                  <rect x="520" y="18" width="280" height="82" rx="14" fill="#78350F" stroke="#FDE68A" strokeWidth="2" />
                  
                  {/* Badge */}
                  <rect x="690" y="26" width="98" height="18" rx="6" fill="#F59E0B" />
                  <text x="702" y="39" fill="#78350F" fontSize="10" fontWeight="900">موقعیت دقیق کارگاه</text>

                  {/* Title */}
                  <text x="540" y="52" fill="#FFFFFF" fontSize="14" fontWeight="900">
                    کارگاه سوله سازی پیراسازه شیبان
                  </text>
                  <text x="540" y="70" fill="#FEF3C7" fontSize="11">
                    خطوط برش CNC، مونتاژ، جرثقیل و سندبلاست
                  </text>
                  <text x="540" y="86" fill="#FCD34D" fontSize="10" fontFamily="monospace">
                    GPS: 31.4085° N , 48.7750° E
                  </text>
                </g>
              </g>

              {/* Compass Rose */}
              <g transform="translate(80, 70)">
                <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#D6C7B2" strokeWidth="2" opacity="0.9" />
                <path d="M 0 -20 L 6 0 L 0 -4 L -6 0 Z" fill="#B45309" />
                <path d="M 0 20 L 6 0 L 0 4 L -6 0 Z" fill="#78716C" />
                <text x="-4" y="-23" fill="#B45309" fontSize="11" fontWeight="bold">شمال</text>
              </g>

              {/* Distance Arrow indicator */}
              <path 
                d="M 230 350 Q 380 280, 670 160" 
                fill="none" 
                stroke="#B45309" 
                strokeWidth="2.5" 
                strokeDasharray="6 6"
              />
              <rect x="360" y="210" width="140" height="22" rx="6" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />
              <text x="375" y="225" fill="#78350F" fontSize="10" fontWeight="bold">
                فاصله: ۱۲ دقیقه از اهواز
              </text>
            </svg>
          </div>

          {/* Quick Floating Location Pin Summary Box */}
          <div className="absolute bottom-3 right-3 left-3 sm:left-auto sm:w-80 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/90 shadow-md text-right">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1">
              <span className="flex items-center gap-1.5 text-amber-900">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {activeLocation === 'sheyban' ? 'کارگاه ساخت شیبان' : 'دفتر کیانپارس اهواز'}
              </span>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                لوکیشن فعال
              </span>
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
              {activeLocation === 'sheyban'
                ? 'خوزستان، حاشیه بزرگراه اهواز - شیبان، کارگاه تخصصی ساخت سوله و سازه‌های سنگین پیراسازه'
                : 'خوزستان، اهواز، منطقه کیانپارس، دفتر فنی و مهندسی طراحی و محاسبات سازه پیراسازه'}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold text-center flex items-center justify-center gap-1 shadow-sm transition-all"
              >
                <Navigation className="w-3 h-3" />
                <span>مسیریابی گوگل مپ</span>
              </a>
              <button
                onClick={handleCopyCoordinates}
                className="py-1.5 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 border border-stone-300 transition-colors"
                title="کپی مختصات GPS"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'کپی شد' : 'کپی مختصات'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Transit & Workshop Specs Tab */
        <div className="p-6 bg-[#FAF8F5] text-right space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Trailer & Heavy Transit */}
            <div className="p-4 rounded-2xl bg-white border border-[#E0D5C7] space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>تردد تریلی و ترافیک آزاد</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                موقعیت کارگاه در حاشیه بزرگراه شیبان به گونه‌ای است که تریلی‌های ۱۸ چرخ و کمرشکن حمل تیرورق و رفترهای دهانه عریض، بدون ورود به طرح ترافیک شهر اهواز در ۲۴ ساعت شبانه‌روز امکان بارگیری و تردد دارند.
              </p>
            </div>

            {/* Box 2: Workshop Capacity */}
            <div className="p-4 rounded-2xl bg-white border border-[#E0D5C7] space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Factory className="w-4 h-4 text-amber-700" />
                <span>تجهیزات و خطوط تولید</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                مجهز به جرثقیل‌های سقفی سنگین، دستگاه‌های برش اتوماتیک CNC پلاسما، خطوط مونتاژ شابلونی و سالن ایزوله سندبلاست اتوماتیک SA 2.5 و رنگ‌آمیزی صنعتی سه‌لایه اپوکسی.
              </p>
            </div>

            {/* Box 3: Visiting Hours */}
            <div className="p-4 rounded-2xl bg-white border border-[#E0D5C7] space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Route className="w-4 h-4 text-amber-700" />
                <span>هماهنگی بازدید مهندسان</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                کارفرمایان و مهندسان ناظر می‌توانند در تمام روزهای کاری با هماهنگی تلفنی قبلی، جهت بازرسی کیفیت جوش و مراحل ساخت از کارگاه شیبان بازدید به عمل آورند.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Navigation Action Buttons Grid (Google Maps + Neshan + Balad + Call) */}
      <div className="p-4 sm:p-6 bg-white border-t border-slate-200">
        <div className="text-xs font-black text-slate-900 mb-3 text-right flex items-center justify-between">
          <span>مسیریابی مستقیم به کارگاه سوله پیراسازه نوین شیبان با نرم‌افزارهای نقشه:</span>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            مختصات: {coordinatesString}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          
          {/* 1. Google Maps Navigation */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-gradient-to-b from-blue-50 to-blue-100/60 border border-blue-300 hover:border-blue-500 text-slate-900 hover:shadow-md transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Navigation className="w-4 h-4" />
            </div>
            <span className="text-xs font-black text-blue-950 flex items-center gap-1">
              <span>گوگل مپ</span>
              <ArrowUpRight className="w-3 h-3 text-blue-700" />
            </span>
            <span className="text-[10px] text-slate-500">Google Maps Nav</span>
          </a>

          {/* 2. Neshan (نشان - پرکاربرد در ایران بدون نیاز به فیلترشکن) */}
          <a
            href={neshanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-gradient-to-b from-sky-50 to-sky-100/60 border border-sky-200 hover:border-sky-400 text-slate-900 hover:shadow-md transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-xs font-black text-sky-950 flex items-center gap-1">
              <span>مسیریاب نشان</span>
              <ArrowUpRight className="w-3 h-3 text-sky-600" />
            </span>
            <span className="text-[10px] text-slate-500">سریع و بدون فیلتر</span>
          </a>

          {/* 3. Balad (بلد) */}
          <a
            href={baladUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-gradient-to-b from-emerald-50 to-emerald-100/60 border border-emerald-200 hover:border-emerald-400 text-slate-900 hover:shadow-md transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Route className="w-4 h-4" />
            </div>
            <span className="text-xs font-black text-emerald-950 flex items-center gap-1">
              <span>مسیریاب بلد</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
            </span>
            <span className="text-[10px] text-slate-500">مسیریابی شهری و جاده‌ای</span>
          </a>

          {/* 4. Direct Call for Gate / Route Guidance */}
          <a
            href={`tel:${workshopPhone}`}
            className="p-3 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-300 hover:border-blue-600 text-slate-900 hover:shadow-md transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1">
              <span>تماس مستقیم کارگاه</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{workshopPhone}</span>
          </a>

        </div>

        {/* Local Traffic & SEO Notice */}
        <div className="mt-4 p-3 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-2.5 text-right">
          <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-950 leading-relaxed">
            <strong>نکته جهت مراجعین و رانندگان محترم تریلی:</strong> جهت تخلیه ورق‌های رول و کلاف از کارخانجات فولاد یا بارگیری اسکلت‌های سنگین، ورودی کارگاه دارای رمپ عریض و باسکول استاندارد است. لطفاً پیش از عزیمت با شماره <span className="font-mono font-bold text-blue-900">{workshopPhone}</span> هماهنگ فرمایید.
          </p>
        </div>
      </div>
    </div>
  );
};
