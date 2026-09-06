# راهنمای استقرار و میزبانی وب‌سایت در سی‌پنل (cPanel) با رم ۲۵۶ مگابایت

این راهنما برای میزبانی وب‌سایت سبک و سریع شرکت سوله و سازه‌های فلزی آریانا بر روی هاست‌های اشتراکی سی‌پنل حتی با کمترین منابع سخت‌افزاری (رم ۲۵۶ مگابایت یا کمتر) تهیه شده است.

---

## چرا این سایت روی رم ۲۵۶ مگابایت با نهایت سرعت کار می‌کند؟
این وب‌سایت به عنوان یک **SPA ایستا (Static Single Page Application)** کامپایل می‌شود:
- نیازی به سرور فعال Node.js یا پردازش پس‌زمینه در هاست ندارد.
- تمام کدهای جاوااسکریپت و استایل‌های Tailwind به فایل‌های بسیار کم‌حجم HTML/CSS/JS در پوشه `dist` تبدیل می‌شوند.
- وب‌سرور لایت‌اسپید (LiteSpeed) یا آپاچی (Apache) سی‌پنل فایل‌ها را مستقیماً از دیسک تحویل مرورگر کاربر می‌دهد که کمتر از چند مگابایت حافظه رم مصرف می‌کند.

---

## مراحل گام‌به‌گام آپلود و راه‌اندازی در cPanel:

### ۱. تولید فایل‌های نهایی (Build)
در ترمینال سیستم خود یا محیط پروژه، دستور زیر را اجرا کنید:
```bash
npm run build
```
این دستور پوشه‌ای به نام `dist` ایجاد می‌کند که شامل تمام فایل‌های آماده میزبانی است.

### ۲. فشرده‌سازی پوشه dist
وارد پوشه `dist` شوید و تمام محتویات داخل آن (فایل‌های `index.html`، پوشه `assets` و ...) را با فرمت **ZIP** فشرده کنید (مثلاً `site-build.zip`).
> ⚠️ **نکته مهم:** خود محتویات داخل پوشه `dist` را زیپ کنید، نه پوشه بالادستی `dist` را.

### ۳. ورود به cPanel و File Manager
1. وارد کنترل‌پنل cPanel هاست خود شوید.
2. بر روی آیکون **File Manager** (مدیریت فایل) کلیک کنید.
3. به پوشه ریشه وب‌سایت یعنی **`public_html`** بروید.
4. اگر وب‌سایت قبلی وجود دارد، فایل‌های غیرضروری را حذف یا به پوشه‌ای دیگر منتقل کنید.

### ۴. آپلود و اکسترکت (Extract)
1. روی گزینه **Upload** در بالای صفحه کلیک کنید و فایل `site-build.zip` را آپلود کنید.
2. پس از پایان آپلود به `public_html` بازگردید.
3. روی فایل زیپ کلیک راست کرده و گزینه **Extract** را انتخاب نمایید تا فایل‌ها در `public_html` باز شوند.
4. فایل `index.html` باید مستقیماً در مسیر `/public_html/index.html` قرار گرفته باشد.

---

## تنظیم فایل `.htaccess` برای لایت‌اسپید / آپاچی
برای عملکرد روان و سئو، یک فایل متنی با نام `.htaccess` در پوشه `public_html` ایجاد کنید (یا در صورت وجود ویرایش کنید) و کدهای زیر را درون آن قرار دهید:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # اگر فایل یا پوشه درخواستی به صورت فیزیکی وجود دارد، همان را مستقیماً لود کن
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # در غیر این صورت به صفحه اصلی هدایت کن
  RewriteRule ^ index.html [L]
</IfModule>

# فعال‌سازی کش فایل‌های استاتیک برای سرعت فوق‌العاده
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# فشرده‌سازی GZIP برای کاهش مصرف پهنای باند و رم
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
```

---

## نحوه تغییر شماره تلفن، لینک‌های شبکه‌های اجتماعی و پروژه‌ها
برای تغییر هرگونه شماره تماس، لینک‌های واتساپ، بله، ایتا، تلگرام یا نمونه‌کارها:
1. فایل `src/siteConfig.ts` را در ادیتور باز کنید.
2. مقادیر مربوط به شماره موبایل، تلفن ثابت، آیدی بله یا واتساپ را تغییر دهید.
3. مجدداً دستور `npm run build` را بزنید و محتویات پوشه `dist` را در `public_html` آپلود کنید.
