import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  whiteTheme?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  whiteTheme = false
}) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16'
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Structural Logo Mark */}
      <div className={`relative ${dimensions} shrink-0 rounded-2xl p-1.5 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center ${
        whiteTheme 
          ? 'bg-blue-600/20 border border-blue-400/30 text-white shadow-md shadow-blue-900/30' 
          : 'bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 text-white border border-blue-600/40 shadow-lg shadow-blue-900/20'
      }`}>
        {/* Vector SVG exact architecture mark */}
        <svg 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="logoBlueBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="logoBars" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          {/* Top curved rafter + right vertical tapered column flank */}
          <path 
            d="M 12 14 C 42 20, 74 32, 104 40 L 98 100 C 94 74, 86 50, 68 38 C 50 28, 30 22, 12 22 Z" 
            fill="url(#logoBlueBeam)" 
          />

          {/* Horizontal structural beam stripes / purlins */}
          <rect x="12" y="26" width="22" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="33" width="31" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="40" width="41" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="47" width="50" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="54" width="58" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="61" width="65" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="68" width="71" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="75" width="76" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="82" width="80" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="89" width="83" height="4.5" rx="1.5" fill="url(#logoBars)" />
          <rect x="12" y="96" width="84" height="4.5" rx="1.5" fill="url(#logoBars)" />
        </svg>
      </div>

      {/* Optional Brand Text */}
      {showText && (
        <div className="flex flex-col text-right">
          <span className={`text-base sm:text-lg font-black tracking-tight leading-snug ${
            whiteTheme ? 'text-white' : 'text-slate-900 group-hover:text-blue-700 transition-colors'
          }`}>
            سوله پیراسازه نوین
          </span>
          <span className={`text-[11px] font-semibold ${
            whiteTheme ? 'text-blue-200' : 'text-blue-800'
          }`}>
            مدیریت دکتر پیراسته (هیئت علمی دانشگاه چمران)
          </span>
        </div>
      )}
    </div>
  );
};
