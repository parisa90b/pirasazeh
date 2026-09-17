import { GalleryImageItem, BlogPost, GoogleSheetsConfig, GoogleSheetsSyncResult } from '../types';
import { DEFAULT_GOOGLE_SHEETS_CONFIG } from '../siteConfig';

export { DEFAULT_GOOGLE_SHEETS_CONFIG };

const STORAGE_KEY_CONFIG = 'solepirasazeh_sheets_config_v1';
const STORAGE_KEY_GALLERY = 'solepirasazeh_sheets_gallery_cache_v1';
const STORAGE_KEY_ARTICLES = 'solepirasazeh_sheets_articles_cache_v1';
const STORAGE_KEY_LAST_SYNC = 'solepirasazeh_sheets_last_sync_v1';

/**
 * Extracts the 44-character Spreadsheet ID from full URL, embed URL, or bare ID
 */
export function extractSpreadsheetId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  // If it's already just the ID (alphanumeric, dashes, underscores)
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) {
    return trimmed;
  }
  return trimmed;
}

/**
 * Extracts all unique Google Spreadsheet IDs from a string
 * Supports comma-separated, space-separated, or multiple URLs in text
 */
export function extractMultipleSpreadsheetIds(input: string): string[] {
  if (!input) return [];
  const matches = [...input.matchAll(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g)];
  if (matches.length > 0) {
    return Array.from(new Set(matches.map(m => m[1])));
  }
  const parts = input.split(/[\s,;\n\r]+/).map(p => extractSpreadsheetId(p)).filter(Boolean);
  return Array.from(new Set(parts));
}

/**
 * Normalizes image URLs:
 * - Converts Google Drive share links to direct CDN viewable image links
 * - Keeps standard http/https or local paths intact
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Google Drive share link detection
  // Example: https://drive.google.com/file/d/1XyZ.../view?usp=sharing
  // or https://drive.google.com/open?id=1XyZ...
  if (trimmed.includes('drive.google.com')) {
    const fileIdMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      // Direct high-speed Google CDN format for shared files
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }

  // Dropbox share link normalization (?raw=1)
  if (trimmed.includes('dropbox.com') && !trimmed.includes('raw=1')) {
    return trimmed.replace(/\?dl=[01]/, '').concat(trimmed.includes('?') ? '&raw=1' : '?raw=1');
  }

  return trimmed;
}

/**
 * Robust CSV parser that handles commas, quotes, and newlines correctly
 */
export function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [''];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"' && inQuotes && next === '"') {
      row[row.length - 1] += '"';
      i++;
    } else if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

/**
 * Parses Google Visualization API (GViz) JSON response
 */
export function parseGVizResponse(rawText: string): string[][] | null {
  try {
    const match = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
    if (!match || !match[1]) return null;

    const data = JSON.parse(match[1]);
    if (!data.table) return null;

    const { cols, rows } = data.table;
    const resultRows: string[][] = [];

    // Header row from cols or first row
    const headers: string[] = cols.map((col: { label?: string; id?: string }) => col.label || col.id || '');
    resultRows.push(headers);

    for (const r of rows) {
      if (!r || !r.c) continue;
      const rowVals: string[] = r.c.map((cell: { v?: unknown; f?: string } | null) => {
        if (!cell || cell.v === null || cell.v === undefined) return '';
        return String(cell.v).trim();
      });
      resultRows.push(rowVals);
    }

    return resultRows;
  } catch {
    return null;
  }
}

/**
 * Fetches rows from a Google Sheet tab by name or gid.
 * If sheetName is omitted or empty, fetches the first sheet tab.
 */
export async function fetchSheetRows(sheetId: string, sheetName?: string): Promise<string[][]> {
  const cleanId = extractSpreadsheetId(sheetId);
  if (!cleanId) {
    throw new Error('شناسه گوگل شیت نامعتبر یا خالی است.');
  }

  const hasSheetName = Boolean(sheetName && sheetName.trim() !== '');
  const sheetParam = hasSheetName ? `&sheet=${encodeURIComponent(sheetName!.trim())}` : '';

  // 1. Try Google Visualization API (JSON endpoint - fast and structured)
  const gvizUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:json${sheetParam}`;
  
  try {
    const res = await fetch(gvizUrl);
    if (res.ok) {
      const text = await res.text();
      const rows = parseGVizResponse(text);
      if (rows && rows.length > 0) {
        // If cols had empty labels, row 0 is empty strings, row 1 might be headers
        if (rows[0].every(h => !h) && rows.length > 1) {
          return rows.slice(1);
        }
        return rows;
      }
    }
  } catch (err) {
    console.warn('GViz fetch failed, falling back to CSV export:', err);
  }

  // 2. Fallback: Google Sheets CSV Export endpoint
  const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv${sheetParam}`;
  const altCsvUrl = hasSheetName
    ? `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(sheetName!.trim())}`
    : `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv`;

  for (const url of [csvUrl, altCsvUrl]) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const csvText = await res.text();
        const parsed = parseCSV(csvText);
        if (parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // try next
    }
  }

  throw new Error(`امکان بازخوانی برگه ${sheetName ? `«${sheetName}»` : 'پیش‌فرض'} وجود ندارد.`);
}

/**
 * Tries multiple candidate sheet tab names until one succeeds
 */
export async function fetchSheetWithCandidates(sheetId: string, candidates: (string | undefined)[]): Promise<string[][]> {
  const cleanId = extractSpreadsheetId(sheetId);
  if (!cleanId) {
    throw new Error('شناسه گوگل شیت نامعتبر یا خالی است.');
  }

  // Filter unique candidates
  const uniqueList: (string | undefined)[] = [];
  for (const c of candidates) {
    if (!uniqueList.includes(c)) uniqueList.push(c);
  }

  for (const name of uniqueList) {
    try {
      const rows = await fetchSheetRows(cleanId, name);
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch {
      // try next candidate tab
    }
  }

  throw new Error(`هیچ‌یک از برگه‌های مشخص‌شده بازخوانی نشدند. لطفاً اطمینان حاصل کنید دسترسی شیت روی «Anyone with the link can view» تنظیم شده باشد.`);
}

/**
 * Maps raw matrix rows into GalleryImageItem objects
 */
export function parseGalleryRows(rows: string[][]): GalleryImageItem[] {
  if (rows.length < 2) return [];

  // Clean and normalize headers (remove parentheses, brackets, zero-width chars)
  const headers = rows[0].map(h => 
    h.toLowerCase()
      .replace(/[\(\)\[\]«»]/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );

  // Find column indices with Persian / English aliases
  const findCol = (aliases: string[]): number => {
    return headers.findIndex(h => aliases.some(a => {
      const normA = a.toLowerCase().replace(/[\(\)\[\]«»]/g, '').trim();
      return h === normA || h.includes(normA) || normA.includes(h);
    }));
  };

  const imageIdx = findCol(['imageurl', 'image', 'تصویر', 'عکس', 'لینک عکس', 'لینک_عکس', 'آدرس عکس', 'لینک', 'url']);
  const titleIdx = findCol(['title', 'عنوان پروژه', 'عنوان', 'نام پروژه', 'نام', 'پروژه']);
  const catIdx = findCol(['category', 'دسته‌بندی', 'دسته بندی', 'دسته', 'گروه', 'نوع']);
  const locIdx = findCol(['location', 'شهر و مکان', 'شهر', 'مکان', 'موقعیت', 'محل اجرا', 'استان']);
  const dimIdx = findCol(['dimensions', 'ابعاد و مشخصات', 'ابعاد', 'مشخصات', 'دهانه', 'متراژ']);
  const altIdx = findCol(['alttext', 'alt', 'توضیح سئو', 'متن سئو', 'توضیح', 'متن جایگزین', 'متن_جایگزین']);

  if (imageIdx === -1) {
    throw new Error('ستون تصویر (imageUrl یا «عکس») در برگه گالری یافت نشد.');
  }

  const items: GalleryImageItem[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rawImage = row[imageIdx]?.trim();
    if (!rawImage) continue;

    const normalizedImage = normalizeImageUrl(rawImage);
    let title = titleIdx !== -1 ? row[titleIdx]?.trim() : '';
    if (title.startsWith('http://') || title.startsWith('https://') || title.includes('drive.google.com')) {
      title = '';
    }

    let category = catIdx !== -1 ? row[catIdx]?.trim() : 'سوله صنعتی';
    if (category.startsWith('http://') || category.startsWith('https://') || category.includes('drive.google.com')) {
      category = 'سوله صنعتی';
    }

    let location = locIdx !== -1 ? row[locIdx]?.trim() : 'اهواز، خوزستان';
    if (location.startsWith('http://') || location.startsWith('https://') || location.includes('drive.google.com')) {
      location = 'اهواز، خوزستان';
    }

    let dimensions = dimIdx !== -1 ? row[dimIdx]?.trim() : '';
    if (dimensions.startsWith('http://') || dimensions.startsWith('https://') || dimensions.includes('drive.google.com')) {
      dimensions = '';
    }

    let altText = altIdx !== -1 ? row[altIdx]?.trim() : '';
    if (altText.startsWith('http://') || altText.startsWith('https://') || altText.includes('drive.google.com')) {
      altText = '';
    }

    items.push({
      id: `sheet-gallery-${i}-${Date.now()}`,
      imageUrl: normalizedImage,
      title: title || 'پروژه سوله و سازه فولادی پیراسازه',
      category: category || 'سوله صنعتی',
      location: location || 'اهواز، خوزستان',
      dimensions: dimensions || '',
      altText: altText || title || 'سوله صنعتی در خوزستان'
    });
  }

  return items;
}

/**
 * Maps raw matrix rows into BlogPost objects
 */
export function parseArticlesRows(rows: string[][]): BlogPost[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => 
    h.toLowerCase()
      .replace(/[\(\)\[\]«»]/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );

  const findCol = (aliases: string[]): number => {
    return headers.findIndex(h => aliases.some(a => {
      const normA = a.toLowerCase().replace(/[\(\)\[\]«»]/g, '').trim();
      return h === normA || h.includes(normA) || normA.includes(h);
    }));
  };

  const titleIdx = findCol(['title', 'عنوان پروژه', 'عنوان', 'نام مقاله', 'نام_مقاله', 'تیتر']);
  const slugIdx = findCol(['slug', 'پیوند', 'اسلاگ', 'شناسه', 'نام انگلیسی']);
  const summaryIdx = findCol(['summary', 'excerpt', 'خلاصه', 'چکیده', 'توضیح کوتاه', 'توضیح']);
  const catIdx = findCol(['category', 'دسته‌بندی', 'دسته بندی', 'دسته', 'گروه']);
  const readTimeIdx = findCol(['readtime', 'زمان مطالعه', 'زمان_مطالعه', 'مدت مطالعه', 'مدت']);
  const dateIdx = findCol(['date', 'تاریخ', 'زمان انتشار', 'تاریخ انتشار']);
  const authorIdx = findCol(['author', 'نویسنده', 'مؤلف', 'نگارنده']);
  const imageIdx = findCol(['imageurl', 'image', 'تصویر', 'عکس', 'عکس شاخص', 'عکس_شاخص', 'لینک عکس']);
  const contentIdx = findCol(['content', 'متن', 'محتوا', 'متن مقاله', 'متن_مقاله', 'متن کامل']);
  const tagsIdx = findCol(['tags', 'برچسب', 'تگ', 'کلمات کلیدی', 'کلمات_کلیدی', 'برچسب‌ها']);

  if (titleIdx === -1) {
    throw new Error('ستون عنوان (title یا «عنوان») در برگه مقالات یافت نشد.');
  }

  const posts: BlogPost[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const title = row[titleIdx]?.trim();
    if (!title) continue;

    const rawSlug = slugIdx !== -1 ? row[slugIdx]?.trim() : '';
    const slug = rawSlug || `article-${i}-${encodeURIComponent(title.slice(0, 20).replace(/\s+/g, '-'))}`;
    const summary = summaryIdx !== -1 ? row[summaryIdx]?.trim() : '';
    const category = catIdx !== -1 ? row[catIdx]?.trim() : 'استانداردهای مهندسی';
    const readTime = readTimeIdx !== -1 ? row[readTimeIdx]?.trim() : '۵ دقیقه';
    const date = dateIdx !== -1 ? row[dateIdx]?.trim() : '۱۴۰۳/۰۶/۱۵';
    const author = authorIdx !== -1 ? row[authorIdx]?.trim() : 'تیم فنی مهندسی پیراسازه';
    const rawImage = imageIdx !== -1 ? row[imageIdx]?.trim() : '';
    const imageUrl = normalizeImageUrl(rawImage) || '/images/projects/1.jfif';

    // Content: split by double newlines or single newlines
    const rawContent = contentIdx !== -1 ? row[contentIdx]?.trim() : '';
    let contentParagraphs: string[] = [];
    if (rawContent) {
      if (rawContent.includes('||')) {
        contentParagraphs = rawContent.split('||').map(p => p.trim()).filter(Boolean);
      } else if (rawContent.includes('\n\n')) {
        contentParagraphs = rawContent.split('\n\n').map(p => p.trim()).filter(Boolean);
      } else if (rawContent.includes('\n')) {
        contentParagraphs = rawContent.split('\n').map(p => p.trim()).filter(Boolean);
      } else {
        contentParagraphs = [rawContent];
      }
    } else {
      contentParagraphs = [summary || title];
    }

    // Tags: split by comma
    const rawTags = tagsIdx !== -1 ? row[tagsIdx]?.trim() : '';
    const tags = rawTags 
      ? rawTags.split(/[,،]/).map(t => t.trim()).filter(Boolean)
      : ['سوله', 'اسکلت فلزی', 'اهواز'];

    posts.push({
      id: `sheet-post-${i}-${Date.now()}`,
      title,
      slug,
      summary: summary || title,
      category: category || 'مهندسی سازه',
      readTime: readTime || '۵ دقیقه',
      date: date || '۱۴۰۳',
      author: author || 'مهندسی پیراسازه',
      imageUrl,
      content: contentParagraphs,
      tags: tags.length > 0 ? tags : ['سوله سازی']
    });
  }

  return posts;
}

/**
 * Synchronizes both Gallery and Articles from the configured Google Sheet(s)
 * Supports:
 * - Single sheet with 2 tabs ('Gallery' and 'Articles' or 'گالری' and 'مقالات')
 * - Two separate sheets (via gallerySheetUrl / articlesSheetUrl OR two comma-separated URLs in sheetIdOrUrl)
 * - Automatic fallback to Sheet1 / first tab if custom names aren't used
 */
export async function syncAllFromGoogleSheets(
  config: GoogleSheetsConfig
): Promise<{ gallery: GalleryImageItem[]; articles: BlogPost[]; result: GoogleSheetsSyncResult }> {
  const allIds = extractMultipleSpreadsheetIds(config.sheetIdOrUrl || '');

  const gallerySheetId = config.gallerySheetUrl
    ? extractSpreadsheetId(config.gallerySheetUrl)
    : (allIds[0] || '');

  const articlesSheetId = config.articlesSheetUrl
    ? extractSpreadsheetId(config.articlesSheetUrl)
    : (allIds.length > 1 ? allIds[1] : (allIds[0] || ''));

  if (!gallerySheetId && !articlesSheetId) {
    return {
      gallery: [],
      articles: [],
      result: {
        success: false,
        message: 'شناسه یا پیوند گوگل شیت وارد نشده است.',
        error: 'NO_SHEET_ID'
      }
    };
  }

  let galleryItems: GalleryImageItem[] = [];
  let articlesItems: BlogPost[] = [];
  const errors: string[] = [];

  // 1. Fetch Gallery
  if (gallerySheetId) {
    const galleryCandidates = [
      config.gallerySheetName,
      'Gallery',
      'گالری',
      'پروژه‌ها',
      'تصاویر',
      'Sheet1',
      'Sheet 1',
      'برگه ۱',
      'برگه1',
      '' // first tab
    ];

    try {
      const galleryRows = await fetchSheetWithCandidates(gallerySheetId, galleryCandidates);
      galleryItems = parseGalleryRows(galleryRows);
    } catch (err) {
      errors.push(`خطا در دریافت برگه گالری: ${(err as Error).message}`);
    }
  }

  // 2. Fetch Articles
  if (articlesSheetId) {
    const articlesCandidates = [
      config.articlesSheetName,
      'Articles',
      'مقالات',
      'وبلاگ',
      'اخبار',
      'Sheet1',
      'Sheet 1',
      'برگه ۱',
      'برگه1',
      '' // first tab
    ];

    try {
      const articlesRows = await fetchSheetWithCandidates(articlesSheetId, articlesCandidates);
      articlesItems = parseArticlesRows(articlesRows);
    } catch (err) {
      errors.push(`خطا در دریافت برگه مقالات: ${(err as Error).message}`);
    }
  }

  const hasAnyData = galleryItems.length > 0 || articlesItems.length > 0;
  const nowStr = new Date().toLocaleString('fa-IR');

  if (hasAnyData) {
    // Save to local cache
    saveGoogleSheetsCache({
      gallery: galleryItems,
      articles: articlesItems,
      lastSyncTime: nowStr
    });

    const successMessage = `همگام‌سازی با موفقیت انجام شد: ${galleryItems.length} تصویر گالری و ${articlesItems.length} مقاله از گوگل شیت بارگذاری شدند.`;
    return {
      gallery: galleryItems,
      articles: articlesItems,
      result: {
        success: true,
        message: successMessage,
        galleryCount: galleryItems.length,
        articlesCount: articlesItems.length
      }
    };
  }

  return {
    gallery: [],
    articles: [],
    result: {
      success: false,
      message: errors.join(' | ') || 'داده‌ای در شیت‌ها یافت نشد یا دسترسی شیت عمومی نیست.',
      error: errors.join('\n')
    }
  };
}

/**
 * Cache management in LocalStorage
 */
export function saveGoogleSheetsCache(data: {
  gallery: GalleryImageItem[];
  articles: BlogPost[];
  lastSyncTime: string;
}) {
  try {
    if (data.gallery.length > 0) {
      localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(data.gallery));
    }
    if (data.articles.length > 0) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(data.articles));
    }
    localStorage.setItem(STORAGE_KEY_LAST_SYNC, data.lastSyncTime);
  } catch (err) {
    console.warn('LocalStorage cache write error:', err);
  }
}

export function loadGoogleSheetsCache(): {
  gallery: GalleryImageItem[] | null;
  articles: BlogPost[] | null;
  lastSyncTime: string | null;
} {
  try {
    const rawG = localStorage.getItem(STORAGE_KEY_GALLERY);
    const rawA = localStorage.getItem(STORAGE_KEY_ARTICLES);
    const lastSync = localStorage.getItem(STORAGE_KEY_LAST_SYNC);

    return {
      gallery: rawG ? JSON.parse(rawG) : null,
      articles: rawA ? JSON.parse(rawA) : null,
      lastSyncTime: lastSync || null
    };
  } catch {
    return { gallery: null, articles: null, lastSyncTime: null };
  }
}

export function loadGoogleSheetsConfig(): GoogleSheetsConfig {
  try {
    const hasCodeConfig = Boolean(
      (DEFAULT_GOOGLE_SHEETS_CONFIG.sheetIdOrUrl && DEFAULT_GOOGLE_SHEETS_CONFIG.sheetIdOrUrl.trim() !== '') ||
      (DEFAULT_GOOGLE_SHEETS_CONFIG.gallerySheetUrl && DEFAULT_GOOGLE_SHEETS_CONFIG.gallerySheetUrl.trim() !== '') ||
      (DEFAULT_GOOGLE_SHEETS_CONFIG.articlesSheetUrl && DEFAULT_GOOGLE_SHEETS_CONFIG.articlesSheetUrl.trim() !== '')
    );

    // If configured in siteConfig.ts, it acts as the master config for all visitors
    if (hasCodeConfig) {
      const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (raw) {
        return { 
          ...DEFAULT_GOOGLE_SHEETS_CONFIG, 
          ...JSON.parse(raw), 
          sheetIdOrUrl: DEFAULT_GOOGLE_SHEETS_CONFIG.sheetIdOrUrl,
          gallerySheetUrl: DEFAULT_GOOGLE_SHEETS_CONFIG.gallerySheetUrl,
          articlesSheetUrl: DEFAULT_GOOGLE_SHEETS_CONFIG.articlesSheetUrl,
        };
      }
      return DEFAULT_GOOGLE_SHEETS_CONFIG;
    }

    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return { ...DEFAULT_GOOGLE_SHEETS_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_GOOGLE_SHEETS_CONFIG;
}

export function saveGoogleSheetsConfig(config: GoogleSheetsConfig) {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch {
    // ignore
  }
}
