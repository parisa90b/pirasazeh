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
import { ProjectsGallery } from './components/ProjectsGallery';
import { CustomQuoteFormSection } from './components/CustomQuoteFormSection';
import { TimelineProcess } from './components/TimelineProcess';
import { ComparisonTable } from './components/ComparisonTable';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActionDock } from './components/FloatingActionDock';

export function App() {
  const [config] = useState<CompanyConfig>(() => COMPANY_INFO);

  // Google Sheets CMS Configuration state (siteConfig.ts is the master source of truth)
  const [sheetsConfig] = useState<GoogleSheetsConfig>(() => loadGoogleSheetsConfig());

  // Gallery images state (cached from Google Sheets or fallback to real project photos)
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

  // Blog posts state (cached from Google Sheets or fallback to engineering articles)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const cached = loadGoogleSheetsCache();
    if (cached.articles && cached.articles.length > 0) {
      return cached.articles;
    }
    return BLOG_POSTS_DATA;
  });

  // Background auto-sync on mount if enabled and has sheet ID or URLs
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      
      {/* 1. Header & Navigation (Clean, no settings button or cPanel button) */}
      <Navbar 
        config={config}
        onOpenQuoteForm={scrollToQuoteForm}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section (Warm Nude theme, direct WhatsApp / Bale links) */}
        <HeroSection 
          config={config}
          onOpenQuoteForm={scrollToQuoteForm}
        />

        {/* 3. Trust & Engineering Certifications (3-Year Warranty, Mabhas 6 & 10) */}
        <TrustBadges />

        {/* 4. Projects Gallery (Pure visual gallery without descriptions - SEO optimized) */}
        <ProjectsGallery 
          images={galleryImages}
        />

        {/* 5. Custom Quote Form (Direct transmission of dimensions to structural designer via WhatsApp & Bale) */}
        <CustomQuoteFormSection 
          config={config}
        />

        {/* 6. Timeline Process (Design, Fabrication, Sandblasting & Erection) */}
        <TimelineProcess />

        {/* 7. Structure Types & Prefabricated Foundation (معرفی انواع سازه و فونداسیون پیش‌ساخته) */}
        <ComparisonTable />

        {/* 8. Engineering Blog & SEO Articles */}
        <BlogSection 
          posts={blogPosts}
        />

        {/* 9. SEO FAQs Section */}
        <FaqSection />

        {/* 10. Contact & Factory Addresses */}
        <ContactSection 
          config={config}
        />

      </main>

      {/* 11. Footer */}
      <Footer 
        config={config}
      />

      {/* 12. Floating Quick Contact Dock (Mobile & Desktop) */}
      <FloatingActionDock 
        config={config}
        onOpenQuoteForm={scrollToQuoteForm}
      />

    </div>
  );
}

export default App;
