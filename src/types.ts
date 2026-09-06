export interface CompanyConfig {
  companyName: string;
  brandTitle: string;
  tagline: string;
  phonePrimary: string;       // شماره موبایل اصلی (پاسخگویی مستقیم مهندس محاسب)
  phoneSecondary: string;     // تلفن ثابت دفتر مرکزی
  phoneFactory: string;       // تلفن کارخانه و خط تولید
  phoneSales1: string;        // کارشناس ارشد برآورد پروژه
  phoneSales2: string;        // سرپرست نصب و اجرای سازه
  whatsappNumber: string;     // شماره واتساپ بدون صفر و با پیش‌شماره (مانند 989123456789)
  baleId: string;             // آیدی یا شماره بله (Bale)
  eitaaId: string;            // آیدی ایتا (Eitaa)
  telegramId: string;         // آیدی تلگرام
  instagramId: string;        // آیدی اینستاگرام
  email: string;
  officeAddress: string;
  factoryAddress: string;
}

export interface GalleryImageItem {
  id: string;
  imageUrl: string;
  title?: string;
  altText?: string;
  category?: string;
  location?: string;
  dimensions?: string;
  originalFileName?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'industrial-shed' | 'heavy-structure' | 'warehouse' | 'sports' | 'cold-storage';
  categoryTitle: string;
  structureTypeTitle: string;
  location: string;
  width: number;    // عرض دهانه (متر)
  length: number;   // طول سالن (متر)
  height: number;   // ارتفاع مفید / تاج (متر)
  imageUrl: string;
  description: string;
  weightTons?: number;
  year?: string;
}

export interface CraneProjectItem {
  id: string;
  title: string;
  client: string;
  location: string;
  capacity: string;
  capacityTons: number;
  spanWidth: number;
  length?: number;
  craneType: string;
  description?: string;
}

export interface BridgeProjectItem {
  id: string;
  title: string;
  location: string;
  spanWidth: number; // عرض دهانه یا مشخصه دهانه (متر)
  lengthText?: string; // طول پل یا مشخصات امتداد
  client?: string; // کارفرما نظیر اداره راه و ترابری
  structureType: string;
  description: string;
}

export interface QuoteRequest {
  clientName: string;
  clientPhone: string;
  city: string;
  structureType: string;
  spanWidth: number; // عرض دهانه سوله (متر)
  hallLength: number; // طول سالن (متر)
  wallHeight: number; // ارتفاع مفید (متر)
  hasCrane: boolean;
  craneCapacityTons: number;
  roofType: string;
  additionalNotes: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  imageUrl: string;
  content: string[];
  tags: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  details: string[];
}

export interface StructureComparison {
  title: string;
  optimalSpan: string;
  weightRatio: string;
  speed: string;
  costEfficiency: string;
  bestFor: string;
  disadvantages: string;
}

export interface StructureTypeItem {
  id: string;
  title: string;
  subtitleEn: string;
  badge: string;
  description: string;
  features: string[];
  applications: string;
  specifications: {
    label: string;
    value: string;
  }[];
}
