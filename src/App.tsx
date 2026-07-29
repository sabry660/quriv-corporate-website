import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { GlobalVideoBackground } from './components/GlobalVideoBackground';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import {
  AboutSection,
  TechnologiesSection,
  ProcessSection,
  IndustriesSection,
  GallerySection,
  PartnersSection,
  TeamSection,
  LocationsSection,
  FAQSection,
  ContactSection,
} from './components/SectionContainer';
import { BookMeetingModal } from './components/BookMeetingModal';
import { CreateAccountModal } from './components/CreateAccountModal';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { FooterShowcase } from './components/FooterShowcase';
import { SectionId } from './types';
import { soundManager } from './utils/sound';
import { I18nProvider, useI18n } from './utils/i18n';

function AppContent() {
  const { language, setLanguage } = useI18n();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookMeetingOpen, setBookMeetingOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Track overall page scroll progress and active section via IntersectionObserver
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to sync camera keyframe with current visible section
    const sectionElements = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as SectionId;
          setActiveSection(sectionId);
          // Update URL hash silently as user scrolls
          if (window.history.replaceState) {
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    // Sync initial section from URL hash if provided
    const hash = window.location.hash.replace('#', '') as SectionId;
    if (hash && document.getElementById(hash)) {
      setTimeout(() => {
        handleNavigate(hash);
      }, 200);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isLoading]);

  // Smooth cinematic camera flight navigation with offset calculation & hash sync
  const handleNavigate = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    soundManager.playCameraTransition();

    // Update URL hash without page reload
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${sectionId}`);
    } else {
      window.location.hash = `#${sectionId}`;
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navOffset = 80; // height of fixed navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setMuted(!nextState);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#D4AF37]/30 selection:text-[#E6C766]">
      {/* 1. LOADING SCREEN */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. UNIFIED CINEMATIC VIDEO BACKGROUND */}
      <GlobalVideoBackground
        activeSection={activeSection}
        reducedMotion={reducedMotion}
      />

      {/* 3. CONTINUOUS 3D WEBGL CAMERA BACKGROUND */}
      <Background3D
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* 4. NAVBAR */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBookMeeting={() => setBookMeetingOpen(true)}
        onOpenCreateAccount={() => setCreateAccountOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        selectedLanguage={language}
        onChangeLanguage={setLanguage}
      />

      {/* 5. MAIN ONE-PAGE CONNECTED SECTIONS */}
      <main className="relative z-10">
        {/* HERO */}
        <Hero
          onOpenBookMeeting={() => setBookMeetingOpen(true)}
          onExploreClick={() => handleNavigate('about')}
        />

        {/* CONNECTED DIGITAL MUSEUM STATIONS */}
        <AboutSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <TechnologiesSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <ProcessSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <IndustriesSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <GallerySection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <PartnersSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <TeamSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <LocationsSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <FAQSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
        <ContactSection onOpenBookMeeting={() => setBookMeetingOpen(true)} />
      </main>

      {/* 6. FOOTER EXPERIENCE */}
      <FooterShowcase
        onNavigate={handleNavigate}
        onOpenBookMeeting={() => setBookMeetingOpen(true)}
      />

      {/* 7. SYSTEM TELEMETRY INSPECTOR */}
      <DesignSystemShowcase
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        soundEnabled={soundEnabled}
        reducedMotion={reducedMotion}
      />

      {/* 8. INTERACTIVE MODALS */}
      <BookMeetingModal
        isOpen={bookMeetingOpen}
        onClose={() => setBookMeetingOpen(false)}
      />

      <CreateAccountModal
        isOpen={createAccountOpen}
        onClose={() => setCreateAccountOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
