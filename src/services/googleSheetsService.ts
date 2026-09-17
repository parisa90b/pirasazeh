import { GalleryImageItem, BlogPost, GoogleSheetsConfig, GoogleSheetsSyncResult } from '../types';

export const DEFAULT_GOOGLE_SHEETS_CONFIG: GoogleSheetsConfig = {
  enabled: true,
  // Sample public sheet or user-defined sheet ID
  sheetIdOrUrl: '',
  gallerySheetName: 'Gallery',
  articlesSheetName: 'Articles',
  autoSync: true,
};

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
 * Fetches rows from a Google Sheet tab by name or gid
 */
export async function fetchSheetRows(sheetId: string, sheetName: string): Promise<string[][]> {
  const cleanId = extractSpreadsheetId(sheetId);
  if (!cleanId) {
    throw new Error('شناسه گوگل شیت نامعتبر یا خالی است.');
  }

  // 1. Try Google Visualization API (JSON endpoint - fast and structured)
  const gvizUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  
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
  const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const altCsvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}`;

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

  throw new Error(`امکان بازخوانی برگه «${sheetName}» وجود ندارد. لطفاً اطمینان حاصل کنید دسترسی شیت روی «هر کسی که پیوند را دارد (Anyone with the link can view)» تنظیم شده باشد.`);
}

/**
 * Maps raw matrix rows into GalleryImageItem objects
 */
export function parseGalleryRows(rows: string[][]): GalleryImageItem[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.toLowerCase().trim());

  // Find column indices with Persian / English aliases
  const findCol = (aliases: string[]): number => {
    return headers.findIndex(h => aliases.some(a => h === a || h.includes(a)));
  };

  const imageIdx = findCol(['imageurl', 'image', 'تصویر', 'عکس', 'آدرس_عکس', 'لینک_عکس', 'لینک', 'url']);
  const titleIdx = findCol(['title', 'عنوان', 'نام', 'نام_پروژه', 'پروژه']);
  const catIdx = findCol(['category', 'دسته‌بندی', 'دسته', 'نوع']);
  const locIdx = findCol(['location', 'مکان', 'شهر', 'موقعیت', 'محل_اجرا', 'استان']);
  const dimIdx = findCol(['dimensions', 'ابعاد', 'دهانه', 'مشخصات', 'متراژ']);
  const altIdx = findCol(['alttext', 'alt', 'متن_سئو', 'توضیح', 'متن_جایگزین']);

  if (imageIdx === -1) {
    throw new Error('ستون تصویر (imageUrl یا «عکس») در برگه گالری یافت نشد.');
  }

  const items: GalleryImageItem[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rawImage = row[imageIdx]?.trim();
    if (!rawImage) continue;

    const normalizedImage = normalizeImageUrl(rawImage);
    const title = titleIdx !== -1 ? row[titleIdx]?.trim() : '';
    const category = catIdx !== -1 ? row[catIdx]?.trim() : 'سوله صنعتی';
    const location = locIdx !== -1 ? row[locIdx]?.trim() : 'اهواز، خوزستان';
    const dimensions = dimIdx !== -1 ? row[dimIdx]?.trim() : '';
    const altText = altIdx !== -1 ? row[altIdx]?.trim() : (title || 'پروژه سوله پیراسازه');

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

  const headers = rows[0].map(h => h.toLowerCase().trim());

  const findCol = (aliases: string[]): number => {
    return headers.findIndex(h => aliases.some(a => h === a || h.includes(a)));
  };

  const titleIdx = findCol(['title', 'عنوان', 'نام_مقاله', 'تیتر']);
  const slugIdx = findCol(['slug', 'پیوند', 'اسلاگ', 'شناسه']);
  const summaryIdx = findCol(['summary', 'excerpt', 'خلاصه', 'چکیده', 'توضیح']);
  const catIdx = findCol(['category', 'دسته‌بندی', 'دسته', 'گروه']);
  const readTimeIdx = findCol(['readtime', 'زمان_مطالعه', 'مدت']);
  const dateIdx = findCol(['date', 'تاریخ', 'زمان_انتشار']);
  const authorIdx = findCol(['author', 'نویسنده', 'مؤلف']);
  const imageIdx = findCol(['imageurl', 'image', 'تصویر', 'عکس', 'عکس_شاخص']);
  const contentIdx = findCol(['content', 'متن', 'محتوا', 'متن_مقاله', 'متن_کامل']);
  const tagsIdx = findCol(['tags', 'برچسب', 'تگ', 'کلمات_کلیدی']);

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
 * Synchronizes both Gallery and Articles from the configured Google Sheet
 */
export async function syncAllFromGoogleSheets(
  config: GoogleSheetsConfig
): Promise<{ gallery: GalleryImageItem[]; articles: BlogPost[]; result: GoogleSheetsSyncResult }> {
  const sheetId = extractSpreadsheetId(config.sheetIdOrUrl);
  if (!sheetId) {
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
  try {
    const galleryRows = await fetchSheetRows(sheetId, config.gallerySheetName || 'Gallery');
    galleryItems = parseGalleryRows(galleryRows);
  } catch (err) {
    // Try Persian tab name as fallback if 'Gallery' was used
    try {
      const galleryRows = await fetchSheetRows(sheetId, 'گالری');
      galleryItems = parseGalleryRows(galleryRows);
    } catch {
      errors.push(`خطا در دریافت برگه گالری: ${(err as Error).message}`);
    }
  }

  // 2. Fetch Articles
  try {
    const articlesRows = await fetchSheetRows(sheetId, config.articlesSheetName || 'Articles');
    articlesItems = parseArticlesRows(articlesRows);
  } catch (err) {
    // Try Persian tab name as fallback if 'Articles' was used
    try {
      const articlesRows = await fetchSheetRows(sheetId, 'مقالات');
      articlesItems = parseArticlesRows(articlesRows);
    } catch {
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
