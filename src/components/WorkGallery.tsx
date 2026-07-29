import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Layers,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

export interface WorkGalleryItem {
  id: string;
  name: string;
  industry: string;
  description: string;
  imagePath: string;
  type: 'image' | 'video';
  specifications: string[];
}

export interface WorkCategory {
  id: string;
  title: string;
  subtitle: string;
  folder: string;
  items: WorkGalleryItem[];
}

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: 'websites',
    title: 'Websites',
    subtitle: 'High-performance corporate platforms & headless web experiences',
    folder: '/public/gallery/websites/',
    items: [
      {
        id: 'web-1',
        name: '[ High-Concurrency Web Portal ]',
        industry: '[ Enterprise Software ]',
        description: 'Custom web platform engineered for instantaneous global page loads, responsive navigation, and multi-region content delivery.',
        imagePath: '/public/gallery/websites/website-1.jpg',
        type: 'image',
        specifications: ['Headless Architecture', 'Sub-120ms Page Load', 'Global Edge CDN', 'Custom Content Layouts'],
      },
      {
        id: 'web-2',
        name: '[ Direct-to-Consumer Storefront ]',
        industry: '[ E-Commerce ]',
        description: 'Scalable online store featuring dynamic product configurators, localized currency switching, and instant checkout flows.',
        imagePath: '/public/gallery/websites/website-2.jpg',
        type: 'image',
        specifications: ['Custom Checkout Engine', 'Multi-Currency Support', 'Real-Time Stock Sync', 'Mobile-First Touch UI'],
      },
      {
        id: 'web-3',
        name: '[ Culinary Brand Property ]',
        industry: '[ Food Industry ]',
        description: 'Digital web presence with interactive digital menus, online table reservation widgets, and direct pickup ordering.',
        imagePath: '/public/gallery/websites/website-3.jpg',
        type: 'image',
        specifications: ['Interactive Digital Menu', 'Direct Table Booking', 'Commission-Free Ordering', 'Local Search SEO'],
      },
    ],
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Real-time telemetry consoles & operations control centers',
    folder: '/public/gallery/dashboards/',
    items: [
      {
        id: 'dash-1',
        name: '[ Financial Settlement Console ]',
        industry: '[ FinTech ]',
        description: 'Bank-grade administrative dashboard providing real-time transaction ledger monitors, audit logging, and automated compliance.',
        imagePath: '/public/gallery/dashboards/dashboard-1.jpg',
        type: 'image',
        specifications: ['Real-Time Ledger Telemetry', 'Role-Based Access Control', 'Encrypted Data Exports', 'Audit Logging'],
      },
      {
        id: 'dash-2',
        name: '[ Kitchen Display System ]',
        industry: '[ Food Industry ]',
        description: 'Touch-enabled kitchen dispatch telemetry replacing paper tickets with color-coded preparation timers and station routing.',
        imagePath: '/public/gallery/dashboards/dashboard-2.jpg',
        type: 'image',
        specifications: ['Station Ticket Routing', 'Prep Countdown Timers', 'Delay Notifications', 'Multi-Branch Sync'],
      },
      {
        id: 'dash-3',
        name: '[ Rate Distribution Gateway ]',
        industry: '[ Hospitality ]',
        description: 'Centralized channel manager dashboard synchronizing room inventory and rate updates across global online travel agencies.',
        imagePath: '/public/gallery/dashboards/dashboard-3.jpg',
        type: 'image',
        specifications: ['Multi-OTA Rate Sync', 'Automated Overbooking Protection', 'Yield Analytics', '24/7 Telemetry'],
      },
    ],
  },
  {
    id: 'guest-portals',
    title: 'Guest Portals',
    subtitle: 'Contactless guest registration, keyless access, & self-service web apps',
    folder: '/public/gallery/guest-portals/',
    items: [
      {
        id: 'portal-1',
        name: '[ Keyless Mobile Guest Portal ]',
        industry: '[ Hospitality ]',
        description: 'Web-based guest portal enabling digital check-in, room key unlock, dining requests, and instant concierge messaging.',
        imagePath: '/public/gallery/guest-portals/portal-1.jpg',
        type: 'image',
        specifications: ['Zero-App-Download Access', 'Digital Room Key Integration', 'In-Room Service Requests', 'Instant Messaging'],
      },
      {
        id: 'portal-2',
        name: '[ Client Wealth Management Portal ]',
        industry: '[ FinTech ]',
        description: 'Encrypted client account portal featuring live portfolio tracking, document vault storage, and secure messaging with advisors.',
        imagePath: '/public/gallery/guest-portals/portal-2.jpg',
        type: 'image',
        specifications: ['Portfolio Telemetry', 'Encrypted Document Vault', 'Multi-Factor Passkey Auth', 'Statement Generation'],
      },
    ],
  },
  {
    id: 'videos',
    title: 'Videos',
    subtitle: 'Cinematic project walk-throughs, motion showcases, & interactive video reels',
    folder: '/public/gallery/videos/',
    items: [
      {
        id: 'vid-1',
        name: '[ Digital Experience Reel ]',
        industry: '[ Showcase ]',
        description: 'High-definition video walkthrough illustrating user interactions, fluid page transitions, and responsive mobile gesture controls.',
        imagePath: '/public/gallery/videos/video-1.mp4',
        type: 'video',
        specifications: ['4K Motion Render', 'Fluid UI Transitions', 'Mobile Gesture Demonstration', 'Spatial Sound Design'],
      },
      {
        id: 'vid-2',
        name: '[ Operations Dashboard Walkthrough ]',
        industry: '[ Operations ]',
        description: 'Demonstration video highlighting real-time data streaming, dark-mode analytics panels, and interactive data visualization charts.',
        imagePath: '/public/gallery/videos/video-2.mp4',
        type: 'video',
        specifications: ['Live Data Telemetry', 'Interactive Analytics Reel', 'Executive Command Overview', 'High-Frame-Rate Screen Capture'],
      },
    ],
  },
];

interface WorkGalleryProps {
  onOpenBookMeeting: () => void;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  const [activeCategoryId, setActiveCategoryId] = useState<string>('websites');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<WorkGalleryItem | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    WORK_CATEGORIES.find((cat) => cat.id === activeCategoryId) || WORK_CATEGORIES[0];
  const items = activeCategory.items;

  // Reset index when category changes
  const handleCategoryChange = (catId: string) => {
    soundManager.playClick();
    setActiveCategoryId(catId);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || selectedItem !== null) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, items.length, selectedItem]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem) return; // Modal is active
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length, selectedItem]);

  return (
    <div className="space-y-8 text-white relative z-10" ref={containerRef}>
      {/* Section Sub-Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-base text-[#A7A7A7] font-light leading-relaxed">
          {t('gallery.explorePortfolio')}
        </p>
      </div>

      {/* Category Navigation Pills (Horizontal Bar) */}
      <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 pt-2 no-scrollbar px-2">
        {WORK_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold shadow-lg gold-glow scale-105'
                  : 'bg-black/50 border border-white/10 text-[#A7A7A7] hover:text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Active Category Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
            CAROUSEL // {activeCategory.title.toUpperCase()}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            {activeCategory.subtitle}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#A7A7A7]">
          <span>
            [ ITEM {currentIndex + 1} OF {items.length} ]
          </span>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3 py-1 rounded-md border text-[10px] uppercase font-mono transition-colors ${
              isAutoPlay ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C766]' : 'bg-black/40 border-white/10 text-[#A7A7A7]'
            }`}
          >
            {isAutoPlay ? 'Auto-Slide: ON' : 'Auto-Slide: OFF'}
          </button>
        </div>
      </div>

      {/* Fluid Carousel Ribbon Track (Drag & Touch Enabled, No Static Grids) */}
      <div className="relative overflow-hidden py-4 px-1">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          onMouseEnter={() => soundManager.playHover()}
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 border border-[#D4AF37]/50 text-white hover:text-[#D4AF37] hover:bg-black backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          onMouseEnter={() => soundManager.playHover()}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 border border-[#D4AF37]/50 text-white hover:text-[#D4AF37] hover:bg-black backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategoryId}-${currentIndex}`}
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50 || velocity.x < -300) {
                handleNext();
              } else if (swipe > 50 || velocity.x > 300) {
                handlePrev();
              }
            }}
            className="max-w-4xl mx-auto rounded-3xl bg-[#0b0b10]/90 border border-[#D4AF37]/30 backdrop-blur-2xl p-8 sm:p-10 space-y-6 shadow-2xl gold-glow cursor-grab active:cursor-grabbing"
          >
            {/* Slide Top Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Layers className="w-4 h-4" />
                <span className="uppercase font-bold">{items[currentIndex].industry}</span>
              </div>

              <div className="text-[#A7A7A7]">
                Folder: <span className="text-white">{activeCategory.folder}</span>
              </div>
            </div>

            {/* Slide Body: Large Placeholder Image / Frame */}
            <div className="relative rounded-2xl bg-black/90 border border-white/10 overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center justify-center group">
              {/* Image Loading Attempt with High-Tech Glass Placeholder Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#121018] via-[#09090e] to-[#161208] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  {items[currentIndex].type === 'video' ? (
                    <Play className="w-10 h-10 fill-[#D4AF37]" />
                  ) : (
                    <ImageIcon className="w-10 h-10" />
                  )}
                </div>

                <div className="space-y-1 max-w-lg">
                  <div className="text-xs font-mono text-[#D4AF37] uppercase">
                    [ MEDIA PATH // {items[currentIndex].imagePath} ]
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white">
                    {items[currentIndex].name}
                  </h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {items[currentIndex].description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#A7A7A7]">
                  <Eye className="w-3 h-3 text-[#D4AF37]" />
                  <span>Drag or Swipe to Navigate // Keyboard &larr; &rarr; Supported</span>
                </div>
              </div>
            </div>

            {/* Slide Bottom Information & CTA Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xl font-bold font-display text-white">
                  {items[currentIndex].name}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {items[currentIndex].specifications.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#E6C766]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedItem(items[currentIndex]);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold text-xs font-display uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Project</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Progress Indicator */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playClick();
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-[#D4AF37]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* DETAILED PROJECT INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0b0b10] border border-[#D4AF37]/50 p-8 sm:p-10 text-white space-y-6 shadow-2xl gold-glow overflow-hidden"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedItem(null);
                }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-mono text-[#E6C766] uppercase">
                  <span>PROJECT INSPECTION SPECIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {selectedItem.name}
                </h3>
                <div className="text-xs font-mono text-[#D4AF37]">{selectedItem.industry}</div>
              </div>

              {/* Large Project Image / Video Placeholder Display */}
              <div className="p-8 rounded-2xl bg-black/80 border border-white/10 text-center space-y-3">
                <div className="text-xs font-mono text-[#D4AF37] uppercase">
                  SOURCE FILE: {selectedItem.imagePath}
                </div>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed max-w-xl mx-auto">
                  {selectedItem.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono text-white uppercase tracking-wider">
                  Technical Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedItem.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E6C766] flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#A7A7A7]">
                  Architecture transfers ready for deployment.
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedItem(null);
                      onOpenBookMeeting();
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Book a Meeting</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
