import React, { useState, useRef, useEffect } from 'react';
import { 
  Images, 
  UploadCloud, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ZoomIn, 
  Trash2, 
  Plus,
  RotateCcw,
  Sparkles,
  MapPin,
  Building2,
  Award,
  Search,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Zap,
  Route
} from 'lucide-react';
import { GalleryImageItem } from '../types';
import { PROJECTS_DATA, CRANE_PROJECTS_DATA, BRIDGE_PROJECTS_DATA } from '../siteConfig';

interface ProjectsGalleryProps {
  images: GalleryImageItem[];
  onAddImages: (newImages: GalleryImageItem[]) => void;
  onRemoveImage: (id: string) => void;
  onResetDefaultImages?: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  images,
  onAddImages,
  onRemoveImage,
  onResetDefaultImages,
}) => {
  // Active view: 'portfolio' (17 company sheds) | 'bridges' (4 vehicular bridges) | 'cranes' (6 overhead cranes) | 'gallery' (pure visual photos)
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bridges' | 'cranes' | 'gallery'>('portfolio');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [portfolioCategory, setPortfolioCategory] = useState<string>('all');
  const [bridgeSpanFilter, setBridgeSpanFilter] = useState<string>('all');
  const [craneCapacityFilter, setCraneCapacityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bridgeSearchQuery, setBridgeSearchQuery] = useState<string>('');
  const [craneSearchQuery, setCraneSearchQuery] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery Categories
  const galleryCategories = [
    { id: 'all', label: 'همه تصاویر' },
    { id: 'سوله صنعتی', label: 'سوله صنعتی' },
    { id: 'کارگاه شیبان', label: 'کارگاه شیبان' },
    { id: 'نصب و مونتاژ', label: 'نصب و مونتاژ' },
    { id: 'پوشش سقف', label: 'پوشش سقف' },
  ];

  const filteredGalleryImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category?.includes(activeCategory) || img.title?.includes(activeCategory));

  // Portfolio Categories for 17 flagship shed projects
  const portfolioCategories = [
    { id: 'all', label: 'همه سوله‌ها (۱۷)' },
    { id: 'industrial-shed', label: 'سوله صنعتی و کارخانه' },
    { id: 'sports', label: 'سالن ورزشی و استخر' },
    { id: 'heavy-structure', label: 'سازه سنگین و هوانوردی' },
    { id: 'warehouse', label: 'انبار، سیلو و تجاری' },
  ];

  const filteredPortfolio = PROJECTS_DATA.filter(proj => {
    const matchesCat = portfolioCategory === 'all' || proj.category === portfolioCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      proj.title.toLowerCase().includes(query) || 
      proj.location.toLowerCase().includes(query) ||
      proj.structureTypeTitle.toLowerCase().includes(query) ||
      proj.description.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  // Bridge Filter Logic
  const bridgeSpanFilters = [
    { id: 'all', label: 'همه پل‌ها (۴)' },
    { id: '20-27', label: 'دهانه ۲۰ تا ۲۷ متر' },
    { id: '30-36', label: 'دهانه ۳۰ تا ۳۶ متر' },
  ];

  const filteredBridges = BRIDGE_PROJECTS_DATA.filter(bridge => {
    let matchesSpan = true;
    if (bridgeSpanFilter === '20-27') {
      matchesSpan = bridge.spanWidth >= 20 && bridge.spanWidth <= 27;
    } else if (bridgeSpanFilter === '30-36') {
      matchesSpan = bridge.spanWidth >= 30;
    }

    const query = bridgeSearchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      bridge.title.toLowerCase().includes(query) ||
      bridge.location.toLowerCase().includes(query) ||
      bridge.structureType.toLowerCase().includes(query) ||
      (bridge.client && bridge.client.toLowerCase().includes(query)) ||
      (bridge.description && bridge.description.toLowerCase().includes(query));

    return matchesSpan && matchesSearch;
  });

  // Crane Filter Logic
  const craneFilters = [
    { id: 'all', label: 'همه جرثقیل‌ها (۶)' },
    { id: '3-5', label: '۳ تا ۵ تن کارگاهی' },
    { id: '10', label: '۱۰ تن نیمه‌سنگین' },
    { id: '40', label: '۴۰ تن فوق‌سنگین' },
  ];

  const filteredCranes = CRANE_PROJECTS_DATA.filter(crane => {
    let matchesCapacity = true;
    if (craneCapacityFilter === '3-5') {
      matchesCapacity = crane.capacityTons <= 5;
    } else if (craneCapacityFilter === '10') {
      matchesCapacity = crane.capacityTons === 10;
    } else if (craneCapacityFilter === '40') {
      matchesCapacity = crane.capacityTons === 40;
    }

    const query = craneSearchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      crane.title.toLowerCase().includes(query) ||
      crane.client.toLowerCase().includes(query) ||
      crane.location.toLowerCase().includes(query) ||
      crane.capacity.toLowerCase().includes(query) ||
      (crane.description && crane.description.toLowerCase().includes(query));

    return matchesCapacity && matchesSearch;
  });

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, images.length]);

  // File upload processor
  const processFiles = (files: FileList | File[]) => {
    const filesArray = Array.from(files);
    if (filesArray.length === 0) return;

    const newItems: GalleryImageItem[] = [];
    let processed = 0;

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const rawName = file.name.replace(/\.[^/.]+$/, '');
          newItems.push({
            id: 'img-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
            imageUrl: event.target.result as string,
            title: `پروژه سوله پیراسازه اهواز - ${rawName}`,
            altText: `تصویر ساخت و نصب سوله صنعتی سوله پیراسازه در استان خوزستان (${rawName})`,
            category: 'پروژه جدید',
            location: 'اهواز، خوزستان',
            originalFileName: file.name
          });
        }
        processed++;
        if (processed === filesArray.length) {
          onAddImages(newItems);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && images.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && images.length > 0) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  const scrollToQuote = () => {
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="projects" 
      itemScope 
      itemType="https://schema.org/ImageGallery"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`py-14 lg:py-20 bg-[#FBF9F5] border-b border-[#E8DFD5] transition-colors duration-200 ${
        isDragging ? 'bg-amber-50/70 ring-2 ring-amber-500 ring-inset' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6">
          <div className="text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1 text-xs font-bold text-amber-900 mb-2.5 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>رزومه و نمونه‌کارهای شرکت سوله پیراسازه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              نمونه کارهای شرکت – سوله‌ها، پل‌های ماشین‌رو و جرثقیل‌های سقفی
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
              سوابق پروژه‌های شاخص سوله تیرورقی، پل‌های فلزی ماشین‌رو، سازه‌های سنگین، جرثقیل‌های سقفی (۳ تا ۴۰ تن) و گالری مستند کارگاه شیبان اهواز
            </p>
          </div>

          {/* Action buttons (Add photo & Reset) */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
              id="gallery-file-upload"
            />
            
            <button
              onClick={() => {
                setActiveTab('gallery');
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              title="بارگذاری تصاویر سوله از حافظه دستگاه"
            >
              <Plus className="w-4 h-4" />
              <span>بارگذاری عکس جدید</span>
            </button>

            {onResetDefaultImages && (
              <button
                onClick={() => {
                  if (window.confirm('آیا مایلید گالری به ۱۶ عکس سئو شده استاندارد بازنشانی شود؟')) {
                    onResetDefaultImages();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#D8CEBF] bg-[#F5EFEB] hover:bg-[#EAE0D3] text-stone-700 font-medium text-xs shadow-sm transition-all cursor-pointer"
                title="بارگذاری مجدد ۱۶ عکس سئو شده"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">بازنشانی ۱۶ عکس سئو</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary View Switcher: 4 Tabs (Sheds Portfolio vs. Vehicular Bridges vs. Overhead Cranes vs. Image Gallery) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#EFE7DE] border border-[#DDD3C5] max-w-4xl mb-6 shadow-inner overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 min-w-[155px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-amber-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>سوله‌ها و سازه‌ها (۱۷)</span>
          </button>

          <button
            onClick={() => setActiveTab('bridges')}
            className={`flex-1 min-w-[155px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'bridges'
                ? 'bg-amber-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>پل‌های ماشین‌رو (۴)</span>
          </button>

          <button
            onClick={() => setActiveTab('cranes')}
            className={`flex-1 min-w-[155px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'cranes'
                ? 'bg-amber-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>جرثقیل‌های سقفی (۶)</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 min-w-[155px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-stone-900 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <Images className="w-4 h-4" />
            <span>گالری تصاویر کارگاه ({images.length})</span>
          </button>
        </div>

        {/* Drag Over Notification */}
        {isDragging && (
          <div className="mb-6 p-4 rounded-2xl border-2 border-dashed border-amber-600 bg-amber-50 text-center text-amber-900 font-bold text-sm">
            عکس‌ها را همین‌جا رها کنید تا به گالری اضافه شوند...
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: Pure Visual Gallery (No text cards under thumbnails) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div>
            {/* Minimal Category Filter Tabs */}
            {images.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                {galleryCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-[#F2EAE0] text-stone-700 hover:bg-[#E8DDCF]'
                    }`}
                  >
                    {cat.label}
                    {cat.id === 'all' && ` (${images.length})`}
                  </button>
                ))}
              </div>
            )}

            {filteredGalleryImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredGalleryImages.map((img, idx) => {
                  const realIndex = images.findIndex((item) => item.id === img.id);
                  const fallbackUrl = img.originalFileName ? `/images/projects/${img.originalFileName}` : img.imageUrl;
                  
                  return (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImageIndex(realIndex >= 0 ? realIndex : idx)}
                      itemScope
                      itemType="https://schema.org/ImageObject"
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 border border-[#E0D5C7] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.altText || img.title || 'سوله پیراسازه اهواز'}
                        title={img.title || 'سوله صنعتی پیراسازه اهواز'}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        itemProp="contentUrl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.endsWith('.svg') && !target.src.includes('data:')) {
                            target.src = fallbackUrl;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Schema hidden microdata for SEO spiders */}
                      <meta itemProp="name" content={img.title || 'سوله صنعتی پیراسازه اهواز'} />
                      <meta itemProp="caption" content={img.altText || img.title || 'سوله پیراسازه'} />
                      <meta itemProp="contentLocation" content={img.location || 'اهواز، خوزستان'} />

                      {/* Subtle hover overlay with zoom icon */}
                      <div className="absolute inset-0 bg-stone-900/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-amber-900 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Category badge on hover (compact pill) */}
                      {img.category && (
                        <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {img.category}
                        </div>
                      )}

                      {/* Quick Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('آیا از حذف این عکس از گالری اطمینان دارید؟')) {
                            onRemoveImage(img.id);
                          }
                        }}
                        title="حذف تصویر"
                        className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-[#D8CEBF] bg-[#F5EFEB]/60 p-10 sm:p-14 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EAE1D7] text-amber-800 flex items-center justify-center mx-auto shadow-inner">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-stone-900">
                    تصویری در این دسته‌بندی وجود ندارد
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    می‌توانید عکس‌های جدید سوله را بارگذاری کنید یا با کلیک بر روی دکمه زیر، ۱۶ عکس سئو شده پیش‌فرض را بازیابی نمایید.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>بارگذاری عکس جدید</span>
                  </button>

                  {onResetDefaultImages && (
                    <button
                      onClick={onResetDefaultImages}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D8CEBF] bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-amber-700" />
                      <span>بازیابی ۱۶ عکس سئو شده</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: Company Official Projects List (17 Flagship Projects) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            
            {/* Filter and Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F4EDE5] p-3 rounded-2xl border border-[#E2D6C7]">
              {/* Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {portfolioCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPortfolioCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      portfolioCategory === cat.id
                        ? 'bg-amber-800 text-white shadow-sm'
                        : 'bg-white/70 text-stone-700 hover:bg-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در پروژه‌ها و شهرها..."
                  className="w-full pr-9 pl-4 py-1.5 rounded-xl bg-white border border-[#DDD0C0] text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700 text-right"
                />
              </div>
            </div>

            {/* Projects Grid of 17 Flagship items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPortfolio.map((proj, index) => (
                <div 
                  key={proj.id}
                  className="group bg-white rounded-2xl p-5 border border-[#E8DFD5] hover:border-amber-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header: Number index & Location badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-200">
                        {index + 1}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-medium border border-stone-200">
                        <MapPin className="w-3 h-3 text-amber-700" />
                        <span>{proj.location}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-stone-900 leading-snug group-hover:text-amber-900 transition-colors mb-2">
                      {proj.title}
                    </h3>

                    {/* Structure type badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-semibold mb-3 bg-amber-50/70 px-2.5 py-1 rounded-lg border border-amber-100/80">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{proj.structureTypeTitle}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                      {proj.description}
                    </p>
                  </div>

                  {/* Card Footer: Dimensions & Request Quote CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="text-stone-500 font-mono text-[11px] flex items-center gap-2">
                      {proj.width > 0 && (
                        <span>دهانه: {proj.width}م</span>
                      )}
                      {proj.length > 0 && (
                        <span>• طول: {proj.length}م</span>
                      )}
                    </div>

                    <button
                      onClick={scrollToQuote}
                      className="text-amber-800 hover:text-amber-950 font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>استعلام سوله مشابه</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPortfolio.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500 text-sm">پروژه‌ای با این مشخصات یافت نشد.</p>
              </div>
            )}

            {/* Bottom Call to Action banner */}
            <div className="p-6 rounded-2xl bg-[#F4EDE5] border border-[#DDD0C0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <h4 className="text-sm sm:text-base font-black text-stone-900">
                  نیاز به طراحی، ساخت یا نصب سوله اختصاصی دارید؟
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  مشاوران فنی و مهندسان محاسب شرکت سوله پیراسازه آماده ارائه برآورد بهینه آهن‌آلات و فونداسیون هستند.
                </p>
              </div>
              <button
                onClick={scrollToQuote}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                ارسال ابعاد و دریافت قیمت
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2.5: Vehicular Bridges (پل‌های ماشین‌رو - ۴ پروژه) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'bridges' && (
          <div className="space-y-6">
            
            {/* Technical Highlights Bar for Bridges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-amber-900/5 border border-amber-900/15 text-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Route className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">دهانه‌های عریض ۲۰ تا ۳۶ متر</div>
                  <div className="text-[11px] text-stone-600">شاه‌تیرهای قوی تیرورقی جوشی ورق سنگین</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">استاندارد AASHTO و نشریه ۱۳۹</div>
                  <div className="text-[11px] text-stone-600">بارگذاری کامیون‌های سنگین و ترافیک جاده‌ای</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">همکاری با اداره راه و ترابری</div>
                  <div className="text-[11px] text-stone-600">پروژه‌های کلیدی در لالی و مسجدسلیمان</div>
                </div>
              </div>
            </div>

            {/* Filter and Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F4EDE5] p-3 rounded-2xl border border-[#E2D6C7]">
              {/* Span Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {bridgeSpanFilters.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setBridgeSpanFilter(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      bridgeSpanFilter === cat.id
                        ? 'bg-amber-800 text-white shadow-sm'
                        : 'bg-white/70 text-stone-700 hover:bg-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bridgeSearchQuery}
                  onChange={(e) => setBridgeSearchQuery(e.target.value)}
                  placeholder="جستجو در محورها، دهانه یا لالی..."
                  className="w-full pr-9 pl-4 py-1.5 rounded-xl bg-white border border-[#DDD0C0] text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700 text-right"
                />
              </div>
            </div>

            {/* Bridges Grid (4 Projects) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBridges.map((bridge, index) => (
                <div 
                  key={bridge.id}
                  className="group bg-white rounded-2xl p-5 border border-[#E8DFD5] hover:border-amber-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Index & Prominent Span Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-200">
                          {index + 1}
                        </span>
                        <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-stone-900 text-amber-400 border border-stone-800 shadow-sm">
                          دهانه {bridge.spanWidth} متر
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-medium border border-stone-200">
                        <MapPin className="w-3 h-3 text-amber-700" />
                        <span className="truncate max-w-[180px] sm:max-w-none">{bridge.location}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-stone-900 leading-snug group-hover:text-amber-900 transition-colors mb-1.5">
                      {bridge.title}
                    </h3>

                    {/* Client Name */}
                    {bridge.client && (
                      <div className="text-xs text-stone-500 font-medium mb-3">
                        کارفرما: <span className="text-stone-700 font-bold">{bridge.client}</span>
                      </div>
                    )}

                    {/* Technical Specs Metric Boxes */}
                    <div className="grid grid-cols-2 gap-2 mb-3 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE3D8] text-xs">
                      <div>
                        <span className="text-[11px] text-stone-500 block">عرض دهانه سازه:</span>
                        <span className="font-mono font-bold text-stone-900">{bridge.spanWidth} متر باز</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-stone-500 block">مشخصات امتداد/دهانه‌ها:</span>
                        <span className="font-mono font-bold text-stone-900">
                          {bridge.lengthText || `دهانه ${bridge.spanWidth} متری`}
                        </span>
                      </div>
                    </div>

                    {/* Structure type badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-semibold mb-3 bg-amber-50/70 px-2.5 py-1 rounded-lg border border-amber-100/80 w-full">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{bridge.structureType}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                      {bridge.description}
                    </p>
                  </div>

                  {/* Card Footer: Request Quote CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">
                      عرشه فولادی و شاه‌تیر جاده‌ای
                    </span>

                    <button
                      onClick={scrollToQuote}
                      className="text-amber-800 hover:text-amber-950 font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>استعلام پل مشابه</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBridges.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500 text-sm">پلی با این مشخصات یافت نشد.</p>
              </div>
            )}

            {/* Bottom Call to Action banner for Bridges */}
            <div className="p-6 rounded-2xl bg-[#F4EDE5] border border-[#DDD0C0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <h4 className="text-sm sm:text-base font-black text-stone-900">
                  نیاز به طراحی، ساخت شاه‌تیر و نصب پل فلزی ماشین‌رو یا خطوط صنعتی دارید؟
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  دفتر فنی و خط تولید سوله پیراسازه آمادگی کامل جهت مدلسازی عرشه‌های فلزی، شاه‌تیرهای تیرورقی، تیرهای کامپوزیت و مونتاژ سریع پل‌های راهداری را دارد.
                </p>
              </div>
              <button
                onClick={scrollToQuote}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                ارسال مشخصات و استعلام قیمت
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: Company Overhead Cranes (جرثقیل‌های سقفی - ۶ پروژه) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'cranes' && (
          <div className="space-y-6">
            
            {/* Technical Highlights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-amber-900/5 border border-amber-900/15 text-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">طراحی از ۳ تا ۴۰ تن</div>
                  <div className="text-[11px] text-stone-600">محاسبات دینامیکی بار چرخ‌ها و ترمز</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">دهانه‌های عریض تا ۲۱ متر</div>
                  <div className="text-[11px] text-stone-600">تک پل رونده و دو پل تیرورقی سنگین</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">تیر حمال و نشیمن ستون‌ها</div>
                  <div className="text-[11px] text-stone-600">منطبق بر ضوابط CMAA 70 و استانداردهای FEM</div>
                </div>
              </div>
            </div>

            {/* Filter and Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F4EDE5] p-3 rounded-2xl border border-[#E2D6C7]">
              {/* Capacity Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {craneFilters.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCraneCapacityFilter(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      craneCapacityFilter === cat.id
                        ? 'bg-amber-800 text-white shadow-sm'
                        : 'bg-white/70 text-stone-700 hover:bg-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={craneSearchQuery}
                  onChange={(e) => setCraneSearchQuery(e.target.value)}
                  placeholder="جستجو در کارفرما، ظرفیت یا شهر..."
                  className="w-full pr-9 pl-4 py-1.5 rounded-xl bg-white border border-[#DDD0C0] text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700 text-right"
                />
              </div>
            </div>

            {/* Cranes Grid (6 Projects) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCranes.map((crane, index) => (
                <div 
                  key={crane.id}
                  className="group bg-white rounded-2xl p-5 border border-[#E8DFD5] hover:border-amber-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Index & Prominent Capacity Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-200">
                          {index + 1}
                        </span>
                        <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-stone-900 text-amber-400 border border-stone-800 shadow-sm">
                          {crane.capacity}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-medium border border-stone-200">
                        <MapPin className="w-3 h-3 text-amber-700" />
                        <span>{crane.location}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-stone-900 leading-snug group-hover:text-amber-900 transition-colors mb-1.5">
                      {crane.title}
                    </h3>

                    {/* Client Name */}
                    <div className="text-xs text-stone-500 font-medium mb-3">
                      کارفرما: <span className="text-stone-700 font-bold">{crane.client}</span>
                    </div>

                    {/* Technical Specs Metric Boxes */}
                    <div className="grid grid-cols-2 gap-2 mb-3 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE3D8] text-xs">
                      <div>
                        <span className="text-[11px] text-stone-500 block">عرض دهانه (اسپن):</span>
                        <span className="font-mono font-bold text-stone-900">{crane.spanWidth} متر</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-stone-500 block">طول مسیر حرکت:</span>
                        <span className="font-mono font-bold text-stone-900">
                          {crane.length ? `${crane.length} متر` : 'استاندارد سالن'}
                        </span>
                      </div>
                    </div>

                    {/* Structure type badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-semibold mb-3 bg-amber-50/70 px-2.5 py-1 rounded-lg border border-amber-100/80 w-full">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{crane.craneType}</span>
                    </div>

                    {/* Description */}
                    {crane.description && (
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                        {crane.description}
                      </p>
                    )}
                  </div>

                  {/* Card Footer: Request Quote CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">
                      پل فولادی و تیر حمال
                    </span>

                    <button
                      onClick={scrollToQuote}
                      className="text-amber-800 hover:text-amber-950 font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>استعلام جرثقیل مشابه</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCranes.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500 text-sm">جرثقیلی با این مشخصات یافت نشد.</p>
              </div>
            )}

            {/* Bottom Call to Action banner for Cranes */}
            <div className="p-6 rounded-2xl bg-[#F4EDE5] border border-[#DDD0C0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <h4 className="text-sm sm:text-base font-black text-stone-900">
                  نیاز به ساخت سوله صنعتی همراه با جرثقیل سقفی دارید؟
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  دفتر فنی سوله پیراسازه کلیه بارهای دینامیکی چرخ‌ها، تیر حمال (Runway Beam)، کنسول ستون‌ها و ریل را به صورت یکپارچه با اسکلت سوله محاسبه می‌کند.
                </p>
              </div>
              <button
                onClick={scrollToQuote}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                ثبت مشخصات و استعلام قیمت
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Full-screen Lightbox Modal */}
      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <div 
          onClick={() => setSelectedImageIndex(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 transition-all"
        >
          {/* Lightbox Top Header Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between text-white mb-3 px-2"
          >
            <div className="text-right">
              <h4 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{images[selectedImageIndex].title || 'سوله پیراسازه اهواز'}</span>
              </h4>
              {images[selectedImageIndex].location && (
                <p className="text-[11px] sm:text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{images[selectedImageIndex].location}</span>
                  {images[selectedImageIndex].dimensions && (
                    <span className="text-amber-300 mr-2">• {images[selectedImageIndex].dimensions}</span>
                  )}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="بستن (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Previous Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              title="تصویر قبلی (کلید راست)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Centered Image View */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[80vh] flex items-center justify-center"
          >
            <img
              src={images[selectedImageIndex].imageUrl}
              alt={images[selectedImageIndex].altText || images[selectedImageIndex].title || 'سوله پیراسازه'}
              className="max-h-[78vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Navigation Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              title="تصویر بعدی (کلید چپ)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Counter Pill */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mt-3 px-4 py-1 rounded-full bg-black/60 text-stone-200 text-xs font-mono border border-white/10"
          >
            {selectedImageIndex + 1} از {images.length}
          </div>
        </div>
      )}
    </section>
  );
};
