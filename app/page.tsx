'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ThreeCanvas from '@/components/ThreeCanvas';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HighlightsRibbon from '@/components/HighlightsRibbon';
import AboutAtelier from '@/components/AboutAtelier';
import KineticStudio from '@/components/KineticStudio';
import CollectionGallery from '@/components/CollectionGallery';
import Masterclass from '@/components/Masterclass';
import BoutiqueStore from '@/components/BoutiqueStore';
import ProcessPipeline from '@/components/ProcessPipeline';
import PricingTiers from '@/components/PricingTiers';
import SpecificationsGrid from '@/components/SpecificationsGrid';
import FAQAccordion from '@/components/FAQAccordion';
import NewsletterCTA from '@/components/NewsletterCTA';
import Footer from '@/components/Footer';
import SalesAssistantAI from '@/components/SalesAssistantAI';
import ConsultationModal from '@/components/ConsultationModal';
import CatalogModal from '@/components/CatalogModal';

export default function Home() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Atelier Commercial License ($799)');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleOpenConsultation = (tier?: string) => {
    if (tier) setSelectedTier(tier);
    setIsConsultationOpen(true);
  };

  const handlePlayVideo = () => {
    document.getElementById('kinetic-studio')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setIsPlayingVideo(true), 500);
  };

  return (
    <main id="main-content" className="min-h-screen bg-obsidian relative selection:bg-crimson-rose selection:text-white">
      {/* 0. Preloader, Cursor, & Scroll Progress */}
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      {/* 1. Hardware Accelerated Three.js 3D Background */}
      <ThreeCanvas />

      {/* 2. Glass Navigation */}
      <Navbar
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenConsultation={handleOpenConsultation}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* 3. Hero Section */}
      <Hero onPlayVideo={handlePlayVideo} />

      {/* 4. Highlights Ribbon */}
      <HighlightsRibbon />

      {/* 5. About Atelier Section */}
      <AboutAtelier />

      {/* 6. Main 300-Frame Botanical Kinetic Studio Engine */}
      <KineticStudio
        isPlayingVideo={isPlayingVideo}
        setIsPlayingVideo={setIsPlayingVideo}
      />

      {/* 7. Collection Gallery */}
      <CollectionGallery />

      {/* 8. Care Masterclass */}
      <Masterclass onOpenConsultation={handleOpenConsultation} />

      {/* 9. Boutique Store */}
      <BoutiqueStore onOpenConsultation={handleOpenConsultation} />

      {/* 10. Process Pipeline */}
      <ProcessPipeline />

      {/* 11. Pricing & Licensing Tiers */}
      <PricingTiers onOpenConsultation={handleOpenConsultation} />

      {/* 12. Specifications Grid */}
      <SpecificationsGrid />

      {/* 13. FAQ Accordion */}
      <FAQAccordion />

      {/* 14. Newsletter CTA */}
      <NewsletterCTA />

      {/* 15. Footer */}
      <Footer />

      {/* 16. AI Sales & Business Assistant Widget */}
      <SalesAssistantAI
        isOpen={isAssistantOpen}
        setIsOpen={setIsAssistantOpen}
        onOpenConsultation={handleOpenConsultation}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* 17. Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedTier={selectedTier}
      />

      {/* 18. 300-Frame Catalog Lightbox Modal */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
    </main>
  );
}
