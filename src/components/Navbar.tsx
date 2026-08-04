import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Globe,
  Calendar,
  UserPlus,
  Volume2,
  VolumeX,
  ChevronDown,
  Languages,
} from 'lucide-react';
import { SectionId, LanguageCode, NavLinkItem } from '../types';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n.tsx';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
  onOpenBookMeeting: () => void;
  onOpenCreateAccount: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  selectedLanguage: LanguageCode;
  onChangeLanguage: (lang: LanguageCode) => void;
  onOpenLogoPopup: () => void;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'about', label: 'nav.about' },
  { id: 'technologies', label: 'nav.technologies' },
  { id: 'process', label: 'nav.process' },
  { id: 'industries', label: 'nav.industries' },
  { id: 'gallery', label: 'nav.gallery' },
  { id: 'partners', label: 'nav.partners' },
  { id: 'team', label: 'nav.team' },
  { id: 'locations', label: 'nav.locations' },
  { id: 'faq', label: 'nav.faq' },
  { id: 'contact', label: 'nav.contact' },
];

const LANGUAGES: LanguageCode[] = ['EN', 'AR'];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBookMeeting,
  onOpenCreateAccount,
  soundEnabled,
  onToggleSound,
  selectedLanguage,
  onChangeLanguage,
  onOpenLogoPopup,
}) => {
  const { t, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: SectionId) => {
    soundManager.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
    
    // Ensure scroll happens after menu closes
    setTimeout(() => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const navOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/75 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
      dir={dir}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* LOGO */}
        <motion.button
          onClick={() => {
            soundManager.playClick();
            onOpenLogoPopup();
          }}
          onMouseEnter={() => soundManager.playHover()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Quriv Technologies Home"
        >
          <motion.div
            className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#101010] border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-300 gold-glow overflow-hidden"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/logo.jpg"
              alt="Quriv Technologies Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.span 
              className="text-base font-bold tracking-[0.2em] font-display uppercase text-white group-hover:text-[#E6C766] transition-colors"
              whileHover={{ letterSpacing: '0.25em' }}
              transition={{ duration: 0.3 }}
            >
              Quriv<span className="text-[#D4AF37]">.</span>
            </motion.span>
            <span className="text-[9px] tracking-[0.35em] text-[#A7A7A7] uppercase -mt-1 font-mono">
              Technologies
            </span>
          </div>
        </motion.button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#101010]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/[0.08]">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                onMouseEnter={() => soundManager.playHover()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#A7A7A7] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#E6C766]/10 rounded-full border border-[#D4AF37]/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(link.label)}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* ACTIONS & CONTROLS */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleSound();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="p-2.5 rounded-full bg-[#101010] border border-white/[0.08] hover:border-[#D4AF37]/50 text-[#A7A7A7] hover:text-[#E6C766] transition-all"
            title={soundEnabled ? 'Mute Audio Architecture' : 'Enable Audio Architecture'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Premium Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playClick();
                const newLang = selectedLanguage === 'EN' ? 'AR' : 'EN';
                onChangeLanguage(newLang);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#101010] border border-white/[0.08] hover:border-[#D4AF37]/60 text-xs font-mono text-[#A7A7A7] hover:text-white transition-all group"
            >
              <Languages className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="font-bold">{selectedLanguage}</span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                animate={{
                  scale: selectedLanguage === 'EN' ? [1, 1.2, 1] : [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </button>
          </div>

          {/* Create Account Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCreateAccount();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#101010] border border-white/[0.12] hover:border-[#D4AF37]/60 text-xs font-medium text-white hover:text-[#E6C766] transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('nav.createAccount')}</span>
          </button>

          {/* Book Meeting Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBookMeeting();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-[#050505] text-xs font-bold tracking-wide hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('common.bookMeeting')}</span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex xl:hidden items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBookMeeting();
            }}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-[#050505] text-xs font-bold"
          >
            {t('common.bookMeeting')}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2.5 rounded-xl bg-[#101010] border border-white/[0.1] text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-[#D4AF37]/20 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-2.5 px-4 rounded-xl text-sm font-medium tracking-wider uppercase font-display transition-all ${
                    activeSection === link.id
                      ? 'bg-[#D4AF37]/15 text-[#E6C766] border border-[#D4AF37]/30'
                      : 'text-[#A7A7A7] hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {t(link.label)}
                </button>
              ))}

              <div className="h-[1px] bg-white/[0.08] my-3" />

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenCreateAccount();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#101010] border border-white/10 text-xs text-white"
                >
                  <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('nav.createAccount')}</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-xs font-bold text-[#050505]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('common.bookMeeting')}</span>
                </button>
              </div>

              {/* Language Switcher Mobile */}
              <div className="flex items-center justify-between pt-3 text-xs text-[#A7A7A7]">
                <span>{t('common.language') || 'Language'}</span>
                <div className="flex items-center gap-1.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        soundManager.playClick();
                        onChangeLanguage(lang);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedLanguage === lang
                          ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                          : 'bg-[#101010] text-[#A7A7A7] hover:bg-white/10'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
