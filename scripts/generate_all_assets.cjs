const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // 1. Read existing logo SVG
  const logoSvgPath = path.join(publicDir, 'logo.svg');
  const logoSvg = fs.readFileSync(logoSvgPath, 'utf8');

  // Create a bordered/padded square SVG for high-visibility Google search favicon
  const squareFaviconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F172A" />
          <stop offset="100%" stop-color="#1E3A8A" />
        </linearGradient>
        <linearGradient id="pirasazehBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="50%" stop-color="#60A5FA" />
          <stop offset="100%" stop-color="#93C5FD" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#60A5FA" />
          <stop offset="100%" stop-color="#38BDF8" />
        </linearGradient>
      </defs>
      
      <!-- Rounded background badge for crisp display in Google search results & tabs -->
      <rect width="512" height="512" rx="110" fill="url(#bgGrad)" />
      
      <!-- Subtle inner border -->
      <rect x="8" y="8" width="496" height="496" rx="102" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="8" />

      <!-- Centered Logo scaled to 360x360 within 512x512 -->
      <g transform="translate(86, 76) scale(3.2)">
        <!-- Top Curved Structural Rafter and Right Column -->
        <path d="M 12 12 
                 C 40 18, 72 30, 102 38 
                 L 96 98 
                 C 93 72, 85 48, 68 36 
                 C 52 26, 30 20, 12 20 
                 Z" 
              fill="url(#pirasazehBlueGrad)" />

        <!-- 11 Horizontal Beam Louvers -->
        <rect x="12" y="24" width="22" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="31" width="31" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="38" width="41" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="45" width="50" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="52" width="58" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="59" width="65" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="66" width="71" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="73" width="76" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="80" width="80" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="87" width="82" height="4.5" rx="1.5" fill="url(#barGrad)" />
        <rect x="12" y="94" width="83" height="4.5" rx="1.5" fill="url(#barGrad)" />
      </g>
    </svg>
  `;

  const faviconSvgBuffer = Buffer.from(squareFaviconSvg);

  // Generate Google-compliant Favicon sizes
  await sharp(faviconSvgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('✓ Created favicon-48x48.png');

  await sharp(faviconSvgBuffer).resize(96, 96).png().toFile(path.join(publicDir, 'favicon-96x96.png'));
  console.log('✓ Created favicon-96x96.png');

  await sharp(faviconSvgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  await sharp(faviconSvgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  console.log('✓ Created android-chrome-192x192.png');

  await sharp(faviconSvgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('✓ Created android-chrome-512x512.png');

  await sharp(faviconSvgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Created logo.png');

  // Also create favicon.ico from 48x48
  await sharp(faviconSvgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ Created favicon.ico');

  // 2. Generate Real Industrial Shed Portfolio Showcase Image (1200x630) for Google Rich Snippet & Social OG
  const shedSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
      <defs>
        <linearGradient id="shedSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0B132B" />
          <stop offset="40%" stop-color="#1C2541" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        
        <linearGradient id="steelRafter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2563EB" />
          <stop offset="50%" stop-color="#1D4ED8" />
          <stop offset="100%" stop-color="#1E3A8A" />
        </linearGradient>

        <linearGradient id="craneBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="50%" stop-color="#EAB308" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>

        <linearGradient id="groundFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0A0F1D" />
        </linearGradient>

        <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#1E3A8A" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- Background Factory Hall / Atmosphere -->
      <rect width="1200" height="630" fill="url(#shedSky)" />

      <!-- Blueprint Engineering Grid -->
      <g stroke="rgba(59, 130, 246, 0.08)" stroke-width="1.2">
        <line x1="0" y1="70" x2="1200" y2="70" />
        <line x1="0" y1="140" x2="1200" y2="140" />
        <line x1="0" y1="210" x2="1200" y2="210" />
        <line x1="0" y1="280" x2="1200" y2="280" />
        <line x1="0" y1="350" x2="1200" y2="350" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="490" x2="1200" y2="490" />
        <line x1="150" y1="0" x2="150" y2="630" />
        <line x1="300" y1="0" x2="300" y2="630" />
        <line x1="450" y1="0" x2="450" y2="630" />
        <line x1="600" y1="0" x2="600" y2="630" />
        <line x1="750" y1="0" x2="750" y2="630" />
        <line x1="900" y1="0" x2="900" y2="630" />
        <line x1="1050" y1="0" x2="1050" y2="630" />
      </g>

      <!-- Reinforced Concrete Floor -->
      <polygon points="0,490 1200,490 1200,630 0,630" fill="url(#groundFloor)" />
      <line x1="0" y1="490" x2="1200" y2="490" stroke="#38BDF8" stroke-width="2.5" opacity="0.6" />

      <!-- 3D Perspective Heavy Portal Frames (Shed Framework) -->
      <!-- Frame 3 (Background Frame) -->
      <g opacity="0.4" stroke="#60A5FA" stroke-width="2">
        <line x1="260" y1="490" x2="260" y2="240" />
        <line x1="940" y1="490" x2="940" y2="240" />
        <line x1="260" y1="240" x2="600" y2="130" />
        <line x1="940" y1="240" x2="600" y2="130" />
      </g>

      <!-- Frame 2 (Midground Frame) -->
      <g opacity="0.7" stroke="#3B82F6" stroke-width="4">
        <line x1="190" y1="490" x2="190" y2="220" />
        <line x1="1010" y1="490" x2="1010" y2="220" />
        <line x1="190" y1="220" x2="600" y2="105" />
        <line x1="1010" y1="220" x2="600" y2="105" />
      </g>

      <!-- Longitudinal Purlins & Crane Runway Girders Connecting Frames -->
      <g stroke="#38BDF8" stroke-width="2.5" opacity="0.6">
        <line x1="100" y1="200" x2="260" y2="240" />
        <line x1="1100" y1="200" x2="940" y2="240" />
        <line x1="600" y1="80" x2="600" y2="130" />
        <line x1="360" y1="138" x2="430" y2="185" />
        <line x1="840" y1="138" x2="770" y2="185" />
      </g>

      <!-- Foreground Heavy Portal Frame (Main Solid Steel Columns & Rafters) -->
      <!-- Left Column (IPE / Box Section) -->
      <rect x="95" y="200" width="34" height="290" fill="url(#steelRafter)" stroke="#60A5FA" stroke-width="2.5" rx="3" />
      <!-- Left Haunch (لچکی و استیفنر گوشه سوله) -->
      <polygon points="95,200 190,240 190,265 95,245" fill="#1D4ED8" stroke="#38BDF8" stroke-width="2" />

      <!-- Right Column -->
      <rect x="1071" y="200" width="34" height="290" fill="url(#steelRafter)" stroke="#60A5FA" stroke-width="2.5" rx="3" />
      <!-- Right Haunch -->
      <polygon points="1105,200 1010,240 1010,265 1105,245" fill="#1D4ED8" stroke="#38BDF8" stroke-width="2" />

      <!-- Left Rafter (تیر شیبدار سقف) -->
      <polygon points="95,200 600,75 600,105 129,225" fill="url(#steelRafter)" stroke="#60A5FA" stroke-width="2.5" />

      <!-- Right Rafter -->
      <polygon points="1105,200 600,75 600,105 1071,225" fill="url(#steelRafter)" stroke="#60A5FA" stroke-width="2.5" />

      <!-- Ridge Apex Plate (تاج سوله و پلیت سر تیر) -->
      <polygon points="575,70 625,70 615,115 585,115" fill="#38BDF8" stroke="#FFFFFF" stroke-width="2" />

      <!-- Heavy Industrial Overhead Crane (جرثقیل سقفی کارخانه ۲۰ تن) -->
      <g id="overheadCrane">
        <!-- Runway Track Beam on Corbel -->
        <rect x="80" y="270" width="60" height="20" fill="#475569" stroke="#94A3B8" stroke-width="1.5" rx="3" />
        <rect x="1060" y="270" width="60" height="20" fill="#475569" stroke="#94A3B8" stroke-width="1.5" rx="3" />
        <!-- Main Yellow Crane Girder -->
        <rect x="120" y="273" width="960" height="26" rx="5" fill="url(#craneBeam)" stroke="#FEF08A" stroke-width="2" />
        <!-- Crane Trolley and Hoist -->
        <rect x="520" y="260" width="160" height="48" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="3" />
        <!-- Steel Cable & Hook -->
        <line x1="600" y1="308" x2="600" y2="400" stroke="#CBD5E1" stroke-width="4.5" stroke-dasharray="8,4" />
        <circle cx="600" cy="410" r="16" fill="#F59E0B" stroke="#000" stroke-width="2" />
        <path d="M 600 426 C 585 435, 590 455, 608 450 C 618 445, 615 435, 606 430" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round" />
      </g>

      <!-- Industrial Spotlight Accents -->
      <circle cx="350" cy="180" r="8" fill="#FDE047" />
      <polygon points="350,185 240,490 460,490" fill="rgba(253, 224, 71, 0.05)" />
      
      <circle cx="850" cy="180" r="8" fill="#FDE047" />
      <polygon points="850,185 740,490 960,490" fill="rgba(253, 224, 71, 0.05)" />

      <!-- Top Header Glassmorphism Banner -->
      <rect x="30" y="24" width="1140" height="110" rx="20" fill="url(#badgeGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
      
      <!-- Logo inside Banner -->
      <g transform="translate(60, 36) scale(0.85)">
        <path d="M 12 12 C 40 18, 72 30, 102 38 L 96 98 C 93 72, 85 48, 68 36 C 52 26, 30 20, 12 20 Z" fill="#38BDF8" />
        <rect x="12" y="24" width="22" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="31" width="31" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="38" width="41" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="45" width="50" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="52" width="58" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="59" width="65" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="66" width="71" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="73" width="76" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="80" width="80" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="87" width="82" height="4.5" rx="1.5" fill="#60A5FA" />
        <rect x="12" y="94" width="83" height="4.5" rx="1.5" fill="#60A5FA" />
      </g>

      <!-- Persian Title and Identity -->
      <text x="1130" y="65" font-family="'Vazirmatn', Tahoma, sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" text-anchor="end">شرکت سوله پیراسازه نوین</text>
      <text x="1130" y="105" font-family="'Vazirmatn', Tahoma, sans-serif" font-size="20" font-weight="700" fill="#38BDF8" text-anchor="end">مدیریت: دکتر علی‌اکبر پیراسته (عضو هیئت علمی دانشگاه چمران)</text>

      <!-- Phone Number Highlight Badge on Left of Banner -->
      <rect x="170" y="44" width="320" height="70" rx="14" fill="#2563EB" stroke="#60A5FA" stroke-width="2" />
      <text x="330" y="72" font-family="'Vazirmatn', Tahoma, sans-serif" font-size="14" font-weight="600" fill="#DBEAFE" text-anchor="middle">تماس مستقیم مهندس ناظر و استعلام:</text>
      <text x="330" y="102" font-family="monospace, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">09169881321</text>

      <!-- Bottom Feature Footer Strip -->
      <rect x="30" y="505" width="1140" height="95" rx="18" fill="url(#badgeGrad)" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
      
      <text x="1130" y="545" font-family="'Vazirmatn', Tahoma, sans-serif" font-size="22" font-weight="800" fill="#F8FAFC" text-anchor="end">طراحی و ساخت انواع سوله صنعتی تیرورقی، سبک بهینه و جرثقیل سقفی</text>
      <text x="1130" y="580" font-family="'Vazirmatn', Tahoma, sans-serif" font-size="16" font-weight="600" fill="#94A3B8" text-anchor="end">کارخانه و سالن مونتاژ شیبان اهواز | ارسال و نصب در سراسر ۳۱ استان کشور | گارانتی ۳ ساله کتبی</text>
      
      <text x="70" y="562" font-family="'Vazirmatn', Tahoma, sans-serif" font-size="18" font-weight="800" fill="#FBBF24">Solehsazeh.ir</text>
    </svg>
  `;

  const shedSvgBuffer = Buffer.from(shedSvg);
  await sharp(shedSvgBuffer)
    .jpeg({ quality: 90, progressive: true })
    .toFile(path.join(publicDir, 'shed-portfolio-preview.jpg'));
  console.log('✓ Created shed-portfolio-preview.jpg');

  // Also write shed-preview.jpg
  await sharp(shedSvgBuffer)
    .jpeg({ quality: 90, progressive: true })
    .toFile(path.join(publicDir, 'shed-preview.jpg'));
  console.log('✓ Created shed-preview.jpg');
}

run().catch(console.error);
