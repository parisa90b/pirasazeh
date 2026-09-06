import os

images_data = [
    {
        'file': '1.jfif',
        'title': 'اسکلت فلزی سوله صنعتی دهانه عریض اهواز',
        'subtitle': 'سوله پیراسازه - دهانه ۲۴ متر',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': '2.jfif',
        'title': 'پوشش سقف و استراکچر سوله صنعتی خوزستان',
        'subtitle': 'پوشش عایق‌بندی و پشم شیشه',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': '3.jfif',
        'title': 'پوشش سقف و پرلین‌های Z ضدزنگ',
        'subtitle': 'کارگاه پیراسازه اهواز',
        'theme': 'silver',
        'has_crane': False
    },
    {
        'file': '5.jfif',
        'title': 'اسکلت سوله صنعتی چند دهانه در اهواز',
        'subtitle': 'طراحی بهینه وزن فولاد',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': '6.jfif',
        'title': 'نصب تاج سوله تیرورقی توسط اکیپ اجرایی',
        'subtitle': 'مونتاژ رفترها و مهاربندها',
        'theme': 'darkblue',
        'has_crane': False
    },
    {
        'file': '6e2a2ddd-2d11-40ae-98c9-615d429c9d67.jfif',
        'title': 'مونتاژ پیچ و مهره‌ای فریم‌های استاندارد',
        'subtitle': 'اتصالات اصطکاکی گرید 10.9',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': '7.jfif',
        'title': 'بادبندهای ضربدری و استرات‌های سازه سنگین',
        'subtitle': 'مقاوم در برابر باد و زلزله خوزستان',
        'theme': 'sunset',
        'has_crane': False
    },
    {
        'file': '9.jfif',
        'title': 'سوله تیرورقی تک دهانه صنعتی خوزستان',
        'subtitle': 'دهانه ۲۱ متر استاندارد با آبرو',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': '10.jfif',
        'title': 'طراحی و ساخت سوله چند دهانه انبار مرکزی',
        'subtitle': 'شهرک صنعتی اهواز - ۲۴۰۰ مترمربع',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': '11.jfif',
        'title': 'نصب ستون‌ها و نشیمن پل جرثقیل سقفی',
        'subtitle': 'تیر حمال استاندارد جرثقیل ۱۰ تن',
        'theme': 'blue',
        'has_crane': True
    },
    {
        'file': '13.jfif',
        'title': 'اسکلت فلزی سوله کارگاهی استاندارد اهواز',
        'subtitle': 'دهانه ۱۶ متر کارگاهی',
        'theme': 'cyan',
        'has_crane': False
    },
    {
        'file': 'ad6b5d3f-19cf-46ff-a6b1-5c130a2c8dee.jfif',
        'title': 'کارگاه ساخت سوله پیراسازه شیبان اهواز',
        'subtitle': 'مجهز به جرثقیل سقفی پیراسازه',
        'theme': 'crane_yellow',
        'has_crane': True
    },
    {
        'file': 'd18d29a5-681e-4282-9c53-f481b7378972.jfif',
        'title': 'ستون‌های سوله سندبلاست و رنگ‌آمیزی اپوکسی',
        'subtitle': 'آماده‌سازی SA 2.5 کارگاه شیبان',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': 'I380X253_035307977168.jpg',
        'title': 'سوله صنعتی دو طبقه دارای نیم‌طبقه و بچه سوله',
        'subtitle': 'شهرک صنعتی اهواز',
        'theme': 'blue',
        'has_crane': False
    },
    {
        'file': 'Picture1.jpg',
        'title': 'خط تولید و ساخت سوله و تیرورق پیراسازه',
        'subtitle': 'سالن مونتاژ شیبان با جرثقیل سقفی',
        'theme': 'crane_yellow',
        'has_crane': True
    },
    {
        'file': 'Picture2.jpg',
        'title': 'سوله صنعتی با پوشش ضدزنگ زینک کرومات',
        'subtitle': 'پوشش محافظتی اقلیم گرم و مرطوب خوزستان',
        'theme': 'orange',
        'has_crane': False
    }
]

os.makedirs('public/images/projects', exist_ok=True)

def generate_svg(item):
    theme = item['theme']
    if theme in ['blue', 'darkblue', 'cyan']:
        bg_color = '#0F172A'
    elif theme == 'sunset':
        bg_color = '#1E1B4B'
    elif theme == 'orange':
        bg_color = '#1C1917'
    elif theme == 'crane_yellow':
        bg_color = '#1E293B'
    else:
        bg_color = '#18181B'

    if theme in ['blue', 'cyan']:
        primary = '#38BDF8'
    elif theme == 'orange':
        primary = '#FB923C'
    elif theme == 'sunset':
        primary = '#F472B6'
    else:
        primary = '#FBBF24'

    crane_section = """
  <!-- Overhead Traveling Crane (جرثقیل سقفی پیراسازه) -->
  <rect x="170" y="460" width="45" height="20" fill="#F59E0B" rx="3" />
  <rect x="985" y="460" width="45" height="20" fill="#F59E0B" rx="3" />
  <line x1="200" y1="470" x2="1000" y2="470" stroke="#EAB308" stroke-width="16" stroke-linecap="round" />
  <rect x="490" y="450" width="220" height="40" fill="#CA8A04" rx="6" stroke="#FEF08A" stroke-width="2" />
  <text x="600" y="477" font-family="sans-serif" font-size="18" font-weight="900" fill="#000" text-anchor="middle">جرثقیل سقفی پیراسازه</text>
  <line x1="600" y1="490" x2="600" y2="580" stroke="#E2E8F0" stroke-width="4" stroke-dasharray="6,6" />
  <circle cx="600" cy="590" r="16" fill="#F59E0B" />
""" if item['has_crane'] else """
  <!-- X-Bracing (مهاربند ضربدری) -->
  <line x1="212" y1="400" x2="988" y2="700" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="10,6" />
  <line x1="988" y1="400" x2="212" y2="700" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="10,6" />
"""

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{bg_color}" />
      <stop offset="100%" stop-color="#090D16" />
    </linearGradient>
    <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{primary}" stop-opacity="0.9" />
      <stop offset="100%" stop-color="{primary}" stop-opacity="0.4" />
    </linearGradient>
  </defs>

  <!-- Background Sky / Hall -->
  <rect width="1200" height="900" fill="url(#sky)" />

  <!-- Grid Blueprint lines -->
  <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
    <line x1="0" y1="150" x2="1200" y2="150" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="450" x2="1200" y2="450" />
    <line x1="0" y1="600" x2="1200" y2="600" />
    <line x1="0" y1="750" x2="1200" y2="750" />
    <line x1="200" y1="0" x2="200" y2="900" />
    <line x1="400" y1="0" x2="400" y2="900" />
    <line x1="600" y1="0" x2="600" y2="900" />
    <line x1="800" y1="0" x2="800" y2="900" />
    <line x1="1000" y1="0" x2="1000" y2="900" />
  </g>

  <!-- Ground Plane -->
  <polygon points="0,720 1200,720 1200,900 0,900" fill="#0B0F19" />
  <line x1="0" y1="720" x2="1200" y2="720" stroke="#334155" stroke-width="4" />

  <!-- Steel Structure Visualization -->
  <!-- Left Column -->
  <rect x="180" y="380" width="32" height="340" fill="url(#beamGrad)" stroke="{primary}" stroke-width="2" rx="3" />
  <!-- Right Column -->
  <rect x="988" y="380" width="32" height="340" fill="url(#beamGrad)" stroke="{primary}" stroke-width="2" rx="3" />

  <!-- Center Rafter (Gable Roof) -->
  <polygon points="180,380 600,210 600,240 212,400" fill="url(#beamGrad)" stroke="{primary}" stroke-width="2" />
  <polygon points="1020,380 600,210 600,240 988,400" fill="url(#beamGrad)" stroke="{primary}" stroke-width="2" />
  
  <!-- Ridge Plate -->
  <circle cx="600" cy="215" r="14" fill="#F59E0B" stroke="#fff" stroke-width="2" />

  <!-- Knee Haunch brackets -->
  <polygon points="180,380 270,440 270,470 180,440" fill="{primary}" opacity="0.7" />
  <polygon points="1020,380 930,440 930,470 1020,440" fill="{primary}" opacity="0.7" />

  <!-- Purlins (Z-purlins along rafters) -->
  <g stroke="{primary}" stroke-width="3" opacity="0.8">
    <line x1="280" y1="340" x2="280" y2="360" />
    <line x1="380" y1="300" x2="380" y2="320" />
    <line x1="480" y1="260" x2="480" y2="280" />
    <line x1="720" y1="260" x2="720" y2="280" />
    <line x1="820" y1="300" x2="820" y2="320" />
    <line x1="920" y1="340" x2="920" y2="360" />
  </g>

{crane_section}

  <!-- Base Plates & Anchor Bolts -->
  <rect x="160" y="710" width="72" height="14" fill="#64748B" rx="2" />
  <rect x="968" y="710" width="72" height="14" fill="#64748B" rx="2" />
  <circle cx="175" cy="717" r="4" fill="#E2E8F0" />
  <circle cx="217" cy="717" r="4" fill="#E2E8F0" />
  <circle cx="983" cy="717" r="4" fill="#E2E8F0" />
  <circle cx="1025" cy="717" r="4" fill="#E2E8F0" />

  <!-- Branding Badge Top Right -->
  <rect x="750" y="50" width="400" height="80" rx="16" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
  <text x="1120" y="88" font-family="sans-serif" font-size="22" font-weight="900" fill="#F8FAFC" text-anchor="end">سوله پیراسازه اهواز</text>
  <text x="1120" y="114" font-family="sans-serif" font-size="14" font-weight="500" fill="#94A3B8" text-anchor="end">کارگاه ساخت شیبان | ۰۹۱۶۹۸۸۱۳۲۱</text>

  <!-- Photo Project Card Bottom Left -->
  <rect x="50" y="750" width="1100" height="110" rx="18" fill="rgba(15,23,42,0.92)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
  <text x="1110" y="796" font-family="sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" text-anchor="end">{item['title']}</text>
  <text x="1110" y="830" font-family="sans-serif" font-size="16" font-weight="500" fill="{primary}" text-anchor="end">{item['subtitle']}</text>
  <text x="90" y="815" font-family="monospace" font-size="16" font-weight="700" fill="#94A3B8">{item['file']}</text>
</svg>"""

for item in images_data:
    svg_content = generate_svg(item)
    p1 = os.path.join('public/images/projects', item['file'])
    p2 = os.path.join('public', item['file'])
    with open(p1, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    with open(p2, 'w', encoding='utf-8') as f:
        f.write(svg_content)

print(f'Successfully generated {len(images_data)} assets in public/ and public/images/projects/')
