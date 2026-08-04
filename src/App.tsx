import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
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
  const [logoPopupOpen, setLogoPopupOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Smooth cinematic camera flight navigation with offset calculation & hash sync
  const handleNavigate = useCallback((sectionId: SectionId) => {
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
        behavior: 'smooth',
      });
    }
  }, []);

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
  }, [isLoading, handleNavigate]);

  // Auto-play ambient music on mount
  useEffect(() => {
    if (soundEnabled) {
      console.log('Attempting to play ambient audio on mount');
      soundManager.playAmbient().catch((error) => {
        console.log('Autoplay blocked, will try on first interaction:', error);
        // Fallback: try to play on first interaction if autoplay is blocked
        const handleFirstInteraction = () => {
          console.log('First interaction detected, playing ambient audio');
          if (soundEnabled) {
            soundManager.playAmbient();
          }
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
        };
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
      });
    }
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setMuted(!nextState);
    if (nextState) {
      soundManager.playAmbient();
    } else {
      soundManager.setMuted(true);
    }
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
      />

      {/* 3. CONTINUOUS 3D WEBGL CAMERA BACKGROUND */}
      <Background3D
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      {/* 4. NAVBAR */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBookMeeting={() => setBookMeetingOpen(true)}
        onOpenCreateAccount={() => setCreateAccountOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        selectedLanguage={language}
        onChangeLanguage={setLanguage}
        onOpenLogoPopup={() => setLogoPopupOpen(true)}
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

      {/* Logo Popup Modal */}
      {logoPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setLogoPopupOpen(false)}>
          <div className="relative max-w-2xl w-full bg-[#101010] border border-[#D4AF37]/30 rounded-3xl p-8 gold-glow" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLogoPopupOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 gold-glow">
                <img
                  src="/logo.jpg"
                  alt="Quriv Technologies Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold font-display text-white">
                  Quriv<span className="text-[#D4AF37]">.</span>
                </h2>
                <p className="text-sm text-[#A7A7A7] font-mono uppercase tracking-widest">
                  Technologies
                </p>
                <p className="text-xs text-[#A7A7A7] mt-4">
                  Enterprise Software Architecture & Digital Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
