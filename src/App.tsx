import { useState, useEffect } from 'react';
import { COMPANY_INFO, DEFAULT_GALLERY_IMAGES, BLOG_POSTS_DATA } from './siteConfig';
import { CompanyConfig, GalleryImageItem, BlogPost, GoogleSheetsConfig } from './types';
import { 
  loadGoogleSheetsConfig, 
  loadGoogleSheetsCache, 
  syncAllFromGoogleSheets 
} from './services/googleSheetsService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { IranCoverageSection } from './components/IranCoverageSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { CustomQuoteFormSection } from './components/CustomQuoteFormSection';
import { TimelineProcess } from './components/TimelineProcess';
import { ComparisonTable } from './components/ComparisonTable';
import { SteelPriceAndToolsSection } from './components/SteelPriceAndToolsSection';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActionDock } from './components/FloatingActionDock';

export function App() {
  const [config] = useState<CompanyConfig>(() => COMPANY_INFO);
  const [quoteCity, setQuoteCity] = useState<string>('اهواز');

  // Google Sheets CMS Configuration state
  const [sheetsConfig] = useState<GoogleSheetsConfig>(() => loadGoogleSheetsConfig());

  // Gallery images state
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>(() => {
    const cached = loadGoogleSheetsCache();
    if (cached.gallery && cached.gallery.length > 0) {
      return cached.gallery;
    }
    try {
      const saved = localStorage.getItem('solepirasazeh_gallery_images_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_GALLERY_IMAGES;
  });

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const cached = loadGoogleSheetsCache();
    if (cached.articles && cached.articles.length > 0) {
      return cached.articles;
    }
    return BLOG_POSTS_DATA;
  });

  // Background auto-sync on mount
  useEffect(() => {
    const hasSheets = Boolean(
      sheetsConfig.enabled && 
      sheetsConfig.autoSync && 
      (sheetsConfig.sheetIdOrUrl || sheetsConfig.gallerySheetUrl || sheetsConfig.articlesSheetUrl)
    );

    if (hasSheets) {
      syncAllFromGoogleSheets(sheetsConfig).then(({ gallery, articles, result }) => {
        if (result.success) {
          if (gallery.length > 0) setGalleryImages(gallery);
          if (articles.length > 0) setBlogPosts(articles);
        }
      }).catch((err) => {
        console.warn('Google Sheets sync notice:', err);
      });
    }
  }, [sheetsConfig]);

  const scrollToQuoteForm = () => {
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCityForQuote = (cityName: string) => {
    setQuoteCity(cityName);
    scrollToQuoteForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Header & Navigation with Blue Architectural Logo */}
      <Navbar 
        config={config}
        onOpenQuoteForm={scrollToQuoteForm}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section: Modern Navy & Blue Theme, Line 1 Phone Number Priority, Dr. Pirasteh Credentials */}
        <HeroSection 
          config={config}
          onOpenQuoteForm={scrollToQuoteForm}
        />

        {/* 3. Trust & Engineering Badges (Dr. Pirasteh, 3-Year Warranty, NDT, Mabhas 6 & 10) */}
        <TrustBadges />

        {/* 4. Nationwide Iran Coverage: 31 Provinces & Industrial Cities (سئو برای تمام شهرهای ایران) */}
        <IranCoverageSection 
          onSelectCityForQuote={handleSelectCityForQuote}
        />

        {/* 5. Projects Gallery & Flagship Portfolio (سوله‌ها، پل‌های ماشین‌رو، جرثقیل‌ها) */}
        <ProjectsGallery 
          images={galleryImages}
        />

        {/* 6. Custom Quote Form (Direct transmission of dimensions to structural designer via WhatsApp & Bale) */}
        <CustomQuoteFormSection 
          config={config}
          initialValues={{
            projectTitle: quoteCity !== 'اهواز' ? `پروژه سوله در استان ${quoteCity}` : undefined
          }}
        />

        {/* 7. Timeline Process (Design, Fabrication, Sandblasting & Erection) */}
        <TimelineProcess />

        {/* 8. Structure Types & Prefabricated Foundation (انواع سازه و فونداسیون پیش‌ساخته) */}
        <ComparisonTable />

        {/* 9. Live Steel Prices & Material Weight Calculator (رصد آنلاین مراجع قیمت آهن و محاسبه‌گر سوله صنعتی سبک بهینه شده) */}
        <SteelPriceAndToolsSection 
          config={config}
        />

        {/* 10. Engineering Blog & Technical Articles */}
        <BlogSection 
          posts={blogPosts}
        />

        {/* 11. FAQ Section */}
        <FaqSection />

        {/* 12. Contact & Factory Addresses + Interactive Sheyban Map with Google Maps & Local Routing */}
        <ContactSection 
          config={config}
        />

      </main>

      {/* 13. Footer: Deep Corporate Navy, Blue Logo, Full 31 Provinces SEO Link Cloud */}
      <Footer 
        config={config}
      />

      {/* 14. Floating Quick Contact Dock (Mobile & Desktop with Direct Phone Number) */}
      <FloatingActionDock 
        config={config}
        onOpenQuoteForm={scrollToQuoteForm}
      />

    </div>
  );
}

export default App;
