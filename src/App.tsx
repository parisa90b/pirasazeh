import { useState, useEffect } from 'react';
import { COMPANY_INFO, DEFAULT_GALLERY_IMAGES } from './siteConfig';
import { CompanyConfig, GalleryImageItem } from './types';
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

  // Gallery images state (persistent in localStorage, defaults to 16 SEO curated projects)
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>(() => {
    try {
      const saved = localStorage.getItem('solepirasazeh_gallery_images');
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

  const handleAddImages = (newImages: GalleryImageItem[]) => {
    setGalleryImages((prev) => {
      const updated = [...newImages, ...prev];
      try {
        localStorage.setItem('solepirasazeh_gallery_images', JSON.stringify(updated));
      } catch {
        // storage quota fallback
      }
      return updated;
    });
  };

  const handleRemoveImage = (id: string) => {
    setGalleryImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      try {
        localStorage.setItem('solepirasazeh_gallery_images', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleResetDefaultImages = () => {
    setGalleryImages(DEFAULT_GALLERY_IMAGES);
    try {
      localStorage.setItem('solepirasazeh_gallery_images', JSON.stringify(DEFAULT_GALLERY_IMAGES));
    } catch {
      // ignore
    }
  };

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
          onAddImages={handleAddImages}
          onRemoveImage={handleRemoveImage}
          onResetDefaultImages={handleResetDefaultImages}
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
        <BlogSection />

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
      />

    </div>
  );
}

export default App;
