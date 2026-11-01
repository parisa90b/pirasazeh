import React, { useState } from 'react';
import { 
  MapPin, 
  Wind, 
  CloudSnow, 
  ShieldAlert, 
  Truck, 
  Send, 
  Search, 
  CheckCircle,
  Building,
  PhoneCall
} from 'lucide-react';
import { IRAN_PROVINCES_DATA, COMPANY_INFO } from '../siteConfig';
import { IranProvinceItem } from '../types';

interface IranCoverageSectionProps {
  onSelectCityForQuote?: (cityName: string) => void;
}

export const IranCoverageSection: React.FC<IranCoverageSectionProps> = ({
  onSelectCityForQuote
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<IranProvinceItem>(IRAN_PROVINCES_DATA[0]);

  const filteredProvinces = IRAN_PROVINCES_DATA.filter((p) => 
    p.name.includes(searchQuery) || 
    p.capital.includes(searchQuery) || 
    p.industrialHubs.includes(searchQuery)
  );

  const handleOrderQuote = (provinceName: string) => {
    if (onSelectCityForQuote) {
      onSelectCityForQuote(provinceName);
    } else {
      const el = document.getElementById('quote-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="iran-coverage" className="py-20 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] border-b border-slate-200 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold text-blue-900 shadow-sm">
            <Building className="w-3.5 h-3.5 text-blue-700" />
            <span>سوله سازی سراسر کشور | پوشش ۳۱ استان و تمام شهرک‌های صنعتی ایران</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            طراحی و ساخت سوله صنعتی و اسکلت فلزی در{' '}
            <span className="text-blue-700 underline decoration-blue-300 decoration-wavy decoration-2 underline-offset-8">
              تمام شهرهای ایران
            </span>
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            محاسبات تخصصی بار باد، بار برف و زلزله طبق مبحث ششم مقررات ملی و آیین‌نامه ۲۸۰۰ زیر نظر مستقیم <strong className="text-slate-900">دکتر پیراسته (عضو هیئت علمی دانشگاه چمران)</strong> به همراه حمل سریع با ناوگان تریلی و تیم‌های نصب مجهز به تمامی استان‌های کشور.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام استان، شهر یا شهرک صنعتی (مثال: تهران، اصفهان، عسلویه، شیراز)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Interactive Layout: Province Chips + Selected Province Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Province Selector Chips Grid (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500">انتخاب استان جهت مشاهده الزامات فنی و سئو:</span>
              <span className="text-xs font-mono font-bold text-blue-700">{filteredProvinces.length} استان</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-[420px] overflow-y-auto pl-1 pr-0.5 py-1">
              {filteredProvinces.map((prov) => {
                const isSelected = selectedProvince.id === prov.id;
                return (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvince(prov)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25 scale-[1.03]'
                        : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-800 border border-slate-200/80'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`} />
                    <span>{prov.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>حمل قطعات با کدهای مهندسی و بارنامه بیمه‌شده سراسری</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>تیم نصاب مقیم در تمامی مناطق کشور</span>
              </div>
            </div>
          </div>

          {/* Selected Province Engineering & Logistics Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-7 rounded-3xl border border-blue-900/40 shadow-xl shadow-slate-950/20 space-y-6">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-blue-400 block mb-0.5">مشخصات مهندسی سازه در:</span>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>استان {selectedProvince.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-600/30 text-blue-300 font-normal">
                    مرکز: {selectedProvince.capital}
                  </span>
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
            </div>

            {/* Industrial Hubs & Covered Cities */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400">شهرک‌های صنعتی و شهرهای تحت پوشش:</span>
              <p className="text-xs text-blue-100 leading-relaxed bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
                {selectedProvince.industrialHubs}
              </p>
            </div>

            {/* Engineering Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-300 text-[11px]">
                  <Wind className="w-3.5 h-3.5 text-blue-400" />
                  <span>سرعت مبنای باد:</span>
                </div>
                <div className="text-base font-black text-white font-mono">
                  {selectedProvince.windSpeedKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-300 text-[11px]">
                  <CloudSnow className="w-3.5 h-3.5 text-cyan-300" />
                  <span>بار برف مبحث ۶:</span>
                </div>
                <div className="text-base font-black text-white font-mono">
                  {selectedProvince.snowLoadKg} <span className="text-xs font-normal text-slate-400">kg/m²</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>خطر لرزه‌خیزی ۲۸۰۰:</span>
                </div>
                <div className="text-xs font-bold text-white">
                  {selectedProvince.seismicZone}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300 text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>زمان بارگیری و حمل:</span>
                </div>
                <div className="text-xs font-bold text-white">
                  {selectedProvince.deliveryTimeDays}
                </div>
              </div>
            </div>

            {/* Actions for this city */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => handleOrderQuote(selectedProvince.name)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>استعلام آنلاین هزینه سوله در {selectedProvince.name}</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phonePrimary}`}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>مشاوره تلفنی مستقیم: <span className="font-mono text-white">{COMPANY_INFO.phonePrimary}</span></span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
