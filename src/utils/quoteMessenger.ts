import { QuoteRequest } from '../types';

/**
 * تبدیل اعداد انگلیسی به فارسی برای زیبایی فونت
 */
export const toPersianDigits = (num: number | string): string => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/[0-9]/g, (x) => farsiDigits[parseInt(x)]);
};

export const formatPersianNumber = (num: number): string => {
  return toPersianDigits(num.toLocaleString('fa-IR'));
};

/**
 * تولید متن پیام استاندارد برای ارسال به پیام‌رسان‌ها (واتساپ و بله)
 */
export const buildQuoteMessage = (quote: QuoteRequest): string => {
  const area = quote.spanWidth * quote.hallLength;
  
  const craneText = quote.hasCrane 
    ? `✅ نیاز به جرثقیل سقفی: دارد (ظرفیت ${toPersianDigits(quote.craneCapacityTons)} تن)`
    : `❌ جرثقیل سقفی: ندارد`;

  return `🏗️ *درخواست استعلام ساخت سوله و استراکچر فلزی*
───────────────────
👤 *کارفرما:* ${quote.clientName || 'نامشخص'}
📱 *تلفن تماس:* ${quote.clientPhone || 'نامشخص'}
📍 *شهر محل احداث:* ${quote.city || 'نامشخص'}
🏷️ *نوع سازه:* ${quote.structureType}

📐 *ابعاد و مشخصات هندسی سالن:*
• عرض دهانه: ${toPersianDigits(quote.spanWidth)} متر
• طول سالن: ${toPersianDigits(quote.hallLength)} متر
• ارتفاع ستون / مفید: ${toPersianDigits(quote.wallHeight)} متر
• زیربنای کل سالن: ${formatPersianNumber(area)} مترمربع

⚙️ *تجهیزات و پوشش:*
• ${craneText}
• نوع پوشش سقف: ${quote.roofType}

📝 *توضیحات تکمیلی:*
${quote.additionalNotes || 'توضیح خاصی ثبت نشده است.'}
───────────────────
⚡ لطفاً پس از مدلسازی اولیه و بررسی بار برف و باد، نقشه جانمایی و پیش‌فاکتور قیمت را به این شماره ارسال فرمایید.`;
};

/**
 * ساخت لینک مستقیم ارسال به واتساپ
 */
export const getWhatsAppLink = (phone: string, quote: QuoteRequest): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = buildQuoteMessage(quote);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * ساخت لینک ارسال مستقیم به بله
 */
export const getBaleLink = (baleId: string, quote: QuoteRequest): string => {
  const message = buildQuoteMessage(quote);
  // Bale web link format
  return `https://ble.ir/${baleId}?text=${encodeURIComponent(message)}`;
};
