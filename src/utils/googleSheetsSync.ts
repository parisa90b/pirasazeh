import { GalleryImageItem, BlogPost, GoogleSheetsConfig } from '../types';

/**
 * استخراج شناسه شیت از آدرس کامل مرورگر یا مقدار وارد شده
 * ورودی می‌تواند URL کامل یا فقط ID باشد:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit...
 */
export function extractSheetId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * تبدیل خودکار لینک‌های اشتراک‌گذاری گوگل درایو به لینک مستقیم تصویر
 * نمونه ورودی: https://drive.google.com/file/d/1a2b3c/view?usp=sharing
 * نمونه خروجی: https://lh3.googleusercontent.com/d/1a2b3c
 */
export function normalizeImageUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();

  // تبدیل لینک‌های گوگل درایو
  const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }

  // اگر لینک با http یا / شروع شود
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed;
  }

  // در غیر این صورت اگر نام فایلی در هاست باشد
  if (trimmed.includes('.')) {
    return `/images/projects/${trimmed}`;
  }

  return trimmed;
}

/**
 * دریافت و پارس داده‌های شیت با استفاده از پروتکل Google Visualization API (GViz)
 * بدون نیاز به API Key یا OAuth
 */
export async function fetchSheetData(sheetId: string, sheetName: string): Promise<Record<string, string>[]> {
  const cleanId = extractSheetId(sheetId);
  if (!cleanId) {
    throw new Error('شناسه گوگل شیت نامعتبر یا خالی است.');
  }

  const encodedSheet = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:json&sheet=${encodedSheet}&headers=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`خطا در برقراری ارتباط با گوگل شیت (${response.status}: ${response.statusText}). لطفاً مطمئن شوید دسترسی شیت روی «Anyone with the link can view» تنظیم شده باشد.`);
  }

  const text = await response.text();
  
  // بررسی و جداسازی پاسخ JSON از wrapper تابع GViz: /*O_o*/ google.visualization.Query.setResponse({...});
  const startIdx = text.indexOf('{');
  const endIdx = text.lastIndexOf('}');
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('فرمت داده برگشتی از گوگل شیت قابل تشخیص نیست.');
  }

  const jsonStr = text.substring(startIdx, endIdx + 1);
  const data = JSON.parse(jsonStr);

  if (data.status === 'error') {
    const errorMsg = data.errors && data.errors[0] ? data.errors[0].detailed_message || data.errors[0].message : 'خطای ناشناخته گوگل شیت';
    throw new Error(`خطای شیت: ${errorMsg}`);
  }

  const table = data.table;
  if (!table || !table.rows) {
    return [];
  }

  // استخراج هدرها از ستون‌ها
  let headers: string[] = (table.cols || []).map((col: { label?: string; id?: string }) => (col.label || '').trim());
  let rows = table.rows;

  // اگر لیبل‌ها خالی بود، ممکن است سطر اول محتوای هدر باشد
  const hasLabels = headers.some((h) => h.length > 0);
  if (!hasLabels && rows.length > 0) {
    headers = (rows[0].c || []).map((cell: { v?: unknown }) => (cell && cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : ''));
    rows = rows.slice(1);
  }

  // تبدیل هر سطر به آبجکت کلید-مقدار
  return rows.map((r: { c?: Array<{ v?: unknown; f?: string } | null> }) => {
    const rowObj: Record<string, string> = {};
    if (!r.c) return rowObj;

    r.c.forEach((cell, idx) => {
      const header = headers[idx] ? headers[idx].toLowerCase() : `col_${idx}`;
      const val = cell && cell.v !== null && cell.v !== undefined ? (cell.f ? cell.f : String(cell.v)).trim() : '';
      rowObj[header] = val;
    });

    return rowObj;
  }).filter((row: Record<string, string>) => {
    // فقط سطرهایی را نگه دار که حداقل یک فیلد معتبر دارند
    return Object.values(row).some((val) => val && val.length > 0);
  });
}

/**
 * تبدیل سطرهای شیت به ساختار گالری تصاویر (GalleryImageItem)
 */
export async function syncGalleryFromGoogleSheet(sheetId: string, sheetName = 'گالری'): Promise<GalleryImageItem[]> {
  const rows = await fetchSheetData(sheetId, sheetName);
  const items: GalleryImageItem[] = [];

  rows.forEach((row, index) => {
    // جستجوی فیلدها با اسامی منعطف فارسی و انگلیسی
    const findField = (...keys: string[]): string => {
      for (const k of keys) {
        const lower = k.toLowerCase();
        for (const [colName, val] of Object.entries(row)) {
          if (colName === lower || colName.includes(lower)) {
            if (val && val.trim().length > 0) return val.trim();
          }
        }
      }
      return '';
    };

    const rawImageUrl = findField('imageurl', 'image', 'لینک عکس', 'عکس', 'تصویر', 'آدرس عکس', 'url', 'link');
    if (!rawImageUrl) return; // سطر بدون عکس نادیده گرفته می‌شود

    const title = findField('title', 'عنوان', 'نام پروژه', 'تیتر') || `پروژه سوله پیراسازه ${index + 1}`;
    const category = findField('category', 'دسته‌بندی', 'دسته', 'گروه') || 'سوله صنعتی';
    const location = findField('location', 'موقعیت', 'شهر', 'مکان', 'استان') || 'اهواز، خوزستان';
    const dimensions = findField('dimensions', 'ابعاد', 'مشخصات', 'دهانه') || 'طراحی و ساخت پیراسازه';
    const altText = findField('alttext', 'alt', 'متن جایگزین', 'توضیح') || `${title} - شرکت سوله سازی پیراسازه اهواز`;

    items.push({
      id: `gsheet-img-${index + 1}-${Date.now().toString(36)}`,
      imageUrl: normalizeImageUrl(rawImageUrl),
      title,
      category,
      location,
      dimensions,
      altText,
      originalFileName: rawImageUrl
    });
  });

  return items;
}

/**
 * تبدیل سطرهای شیت به ساختار مقالات وبلاگ (BlogPost)
 */
export async function syncBlogFromGoogleSheet(sheetId: string, sheetName = 'مقالات'): Promise<BlogPost[]> {
  const rows = await fetchSheetData(sheetId, sheetName);
  const posts: BlogPost[] = [];

  rows.forEach((row, index) => {
    const findField = (...keys: string[]): string => {
      for (const k of keys) {
        const lower = k.toLowerCase();
        for (const [colName, val] of Object.entries(row)) {
          if (colName === lower || colName.includes(lower)) {
            if (val && val.trim().length > 0) return val.trim();
          }
        }
      }
      return '';
    };

    const title = findField('title', 'عنوان', 'تیتر', 'عنوان مقاله');
    if (!title) return; // سطر بدون عنوان مقاله رد می‌شود

    const id = findField('id', 'slug', 'شناسه') || `article-${index + 1}`;
    const category = findField('category', 'دسته‌بندی', 'دسته', 'موضوع') || 'مهندسی سازه';
    const date = findField('date', 'تاریخ', 'زمان انتشار') || 'شهریور ۱۴۰۳';
    const readTime = findField('readtime', 'زمان مطالعه', 'مدت مطالعه') || '۵ دقیقه';
    const author = findField('author', 'نویسنده', 'نگارنده') || 'تیم مهندسی محاسب پیراسازه';
    const rawImage = findField('imageurl', 'image', 'عکس', 'تصویر', 'عکس شاخص') || '/images/projects/1.jfif';
    const summary = findField('summary', 'خلاصه', 'چکیده', 'توضیح کوتاه') || 'راهنمای تخصصی طراحی و ساخت سازه‌های فولادی و سوله‌های صنعتی در خوزستان.';
    
    // متن کامل مقاله: ممکن است پاراگراف‌ها با اینتر یا ### جدا شده باشند
    const rawContent = findField('content', 'متن', 'متن کامل', 'محتوا', 'مقاله');
    let contentParagraphs: string[] = [];
    if (rawContent) {
      contentParagraphs = rawContent
        .split(/\n\s*\n|###/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    }
    if (contentParagraphs.length === 0) {
      contentParagraphs = [summary];
    }

    // برچسب‌ها (کلمات کلیدی)
    const rawTags = findField('tags', 'برچسب‌ها', 'تگ‌ها', 'کلمات کلیدی');
    let tags: string[] = [];
    if (rawTags) {
      tags = rawTags
        .split(/[,،#\s]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    }
    if (tags.length === 0) {
      tags = ['سوله', 'خوزستان', 'اسکلت_فلزی'];
    }

    posts.push({
      id,
      title,
      slug: id,
      summary,
      category,
      readTime,
      date,
      author,
      imageUrl: normalizeImageUrl(rawImage),
      content: contentParagraphs,
      tags
    });
  });

  return posts;
}

/**
 * همگام‌سازی کامل گالری و مقالات با مدیریت خطا
 */
export async function syncAllFromGoogleSheet(config: GoogleSheetsConfig): Promise<{
  gallery: GalleryImageItem[];
  blog: BlogPost[];
  syncedAt: string;
}> {
  const sheetIdentifier = config.sheetIdOrUrl || '';
  if (!config.enabled || !sheetIdentifier.trim()) {
    throw new Error('اتصال گوگل شیت غیرفعال است یا شناسه/لینک شیت تنظیم نشده است.');
  }

  const galleryPromise = syncGalleryFromGoogleSheet(sheetIdentifier, config.gallerySheetName || 'گالری')
    .catch((err) => {
      console.warn('Google Sheet Gallery Sync Warning:', err);
      return [] as GalleryImageItem[];
    });

  const blogPromise = syncBlogFromGoogleSheet(sheetIdentifier, config.articlesSheetName || 'مقالات')
    .catch((err) => {
      console.warn('Google Sheet Blog Sync Warning:', err);
      return [] as BlogPost[];
    });

  const [gallery, blog] = await Promise.all([galleryPromise, blogPromise]);

  const now = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date());

  return {
    gallery,
    blog,
    syncedAt: now
  };
}
