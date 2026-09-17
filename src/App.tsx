import { useState, useEffect } from 'react';
import { COMPANY_INFO, DEFAULT_GALLERY_IMAGES, BLOG_POSTS_DATA } from './siteConfig';
import { CompanyConfig, GalleryImageItem, BlogPost, GoogleSheetsConfig, GoogleSheetsSyncResult } from './types';
import { 
  loadGoogleSheetsConfig, 
  saveGoogleSheetsConfig, 
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
import { ContentEditorModal } from './components/ContentEditorModal';

export function App() {
  const [config, setConfig] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem('solepirasazeh_company_config');
      if (saved) {
        return { ...COMPANY_INFO, ...JSON.parse(saved) };
      }
    } catch {
      // fallback to default
    }
    return COMPANY_INFO;
  });

  // Google Sheets CMS Configuration state
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(() => loadGoogleSheetsConfig());
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [sheetsSyncResult, setSheetsSyncResult] = useState<GoogleSheetsSyncResult | null>(null);

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

  const handleUpdateGalleryImages = (newImages: GalleryImageItem[]) => {
    setGalleryImages(newImages);
    try {
      localStorage.setItem('solepirasazeh_gallery_images_v3', JSON.stringify(newImages));
    } catch {
      // ignore
    }
  };

  const handleSaveSheetsConfig = (newSheetsConfig: GoogleSheetsConfig) => {
    setSheetsConfig(newSheetsConfig);
    saveGoogleSheetsConfig(newSheetsConfig);
  };

  const handleSyncSheetsNow = async (): Promise<GoogleSheetsSyncResult> => {
    if (!sheetsConfig.sheetIdOrUrl) {
      const fail: GoogleSheetsSyncResult = {
        success: false,
        message: 'لطفاً ابتدا لینک یا شناسه گوگل شیت را وارد فرمایید.'
      };
      setSheetsSyncResult(fail);
      return fail;
    }

    setIsSyncingSheets(true);
    try {
      const { gallery, articles, result } = await syncAllFromGoogleSheets(sheetsConfig);
      if (result.success) {
        if (gallery.length > 0) setGalleryImages(gallery);
        if (articles.length > 0) setBlogPosts(articles);
      }
      setSheetsSyncResult(result);
      return result;
    } catch (err) {
      const errRes: GoogleSheetsSyncResult = {
        success: false,
        message: (err as Error).message || 'خطا در ارتباط با گوگل شیت',
        error: String(err)
      };
      setSheetsSyncResult(errRes);
      return errRes;
    } finally {
      setIsSyncingSheets(false);
    }
  };

  // Background auto-sync on mount if enabled and has sheet ID
  useEffect(() => {
    if (sheetsConfig.enabled && sheetsConfig.sheetIdOrUrl && sheetsConfig.autoSync) {
      syncAllFromGoogleSheets(sheetsConfig).then(({ gallery, articles, result }) => {
        if (result.success) {
          if (gallery.length > 0) setGalleryImages(gallery);
          if (articles.length > 0) setBlogPosts(articles);
          setSheetsSyncResult(result);
        }
      }).catch(() => {
        // silent fail to avoid interrupting user experience
      });
    }
  }, []);

  const isGoogleSheetsActive = Boolean(
    sheetsConfig.enabled && 
    sheetsConfig.sheetIdOrUrl && 
    (sheetsSyncResult?.success || Boolean(loadGoogleSheetsCache().lastSyncTime))
  );

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Hidden admin triggers: URL query ?admin, hash #admin, or Ctrl+Shift+E
  useEffect(() => {
    const checkUrlAdmin = () => {
      if (
        window.location.hash === '#admin' || 
        window.location.search.includes('admin') ||
        window.location.search.includes('edit')
      ) {
        setIsEditorOpen(true);
      }
    };
    checkUrlAdmin();
    window.addEventListener('hashchange', checkUrlAdmin);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + E or Cmd + Shift + E to toggle secret editor
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsEditorOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrlAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSaveConfig = (newConfig: CompanyConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('solepirasazeh_company_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

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
          onUpdateImages={handleUpdateGalleryImages}
          isGoogleSheetsSync={isGoogleSheetsActive}
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
          isGoogleSheetsSync={isGoogleSheetsActive}
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
        onSecretAdminOpen={() => setIsEditorOpen(true)}
      />

      {/* 12. Floating Quick Contact Dock (Mobile & Desktop) */}
      <FloatingActionDock 
        config={config}
        onOpenQuoteForm={scrollToQuoteForm}
      />

      {/* 13. Visual Content & Contacts Editor Modal */}
      <ContentEditorModal 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        sheetsConfig={sheetsConfig}
        onSaveSheetsConfig={handleSaveSheetsConfig}
        onSyncSheetsNow={handleSyncSheetsNow}
        syncStatus={sheetsSyncResult}
        isSyncing={isSyncingSheets}
      />

    </div>
  );
}

export default App;
