import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  TrendingUp,
  Search,
  MapPin,
  BarChart3,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Sparkles,
  Play,
  Send,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  Check,
  ArrowRight,
  Layers,
  SlidersHorizontal,
  CheckCircle2,
  Image as ImageIcon,
  Monitor,
  Tablet,
  FileText,
  MessageSquare,
  Award,
  ShieldCheck,
  Video
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

/* ========================================================================
   TYPES & DATA FOR HOSPITALITY SOLUTIONS
   ======================================================================== */

export interface HospitalityProjectItem {
  id: string;
  name: string;
  country: string;
  description: string;
  servicesUsed: string[];
  mainImage: string;
  gallery: string[];
}

export interface HospitalityTestimonialItem {
  id: string;
  clientName: string;
  position: string;
  company: string;
  photoPlaceholder: string;
  review: string;
}

export interface HospitalityGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
}

/* Structured data with clean placeholders */
export const HOSPITALITY_DATA = {
  title: 'Hospitality Solutions',
  subtitle: 'Complete Digital Transformation for Hotels, Resorts & Luxury Accommodations',
  intro:
    'Quriv helps hotels become fully digital by improving guest experience, increasing direct bookings, and simplifying daily operations.',

  /* 8 EXCLUSIVE SERVICES REQUIRED */
  services: {
    websiteDev: {
      id: 'website-dev',
      number: '01',
      title: 'Website Development',
      tagline: 'Luxury Hotel Websites Engineered for Direct Bookings',
      description:
        'We design and develop bespoke luxury hotel websites focused on lightning-fast speed, flawless user experience, and maximizing direct, commission-free booking conversions.',
      previews: {
        desktop: '/projects/website-desktop-placeholder.jpg',
        tablet: '/projects/website-tablet-placeholder.jpg',
        mobile: '/projects/website-mobile-placeholder.jpg',
      },
      screenshots: [
        '/projects/website-shot-1.jpg',
        '/projects/website-shot-2.jpg',
        '/projects/website-shot-3.jpg',
      ],
      projectLink: 'https://demo-hotel.quriv.com',
    },

    guestPortal: {
      id: 'guest-portal',
      number: '02',
      title: 'Guest Portal',
      tagline: 'Contactless Digital Concierge & In-Room Services',
      description:
        'A comprehensive web application enabling guests to manage their entire stay directly from their smartphones without downloading any app.',
      features: [
        'Order Room Service',
        'Request Laundry',
        'Book Spa',
        'Book Restaurant',
        'Request Maintenance',
        'Contact Reception',
        'View Hotel Services',
      ],
      screenshots: [
        '/projects/portal-shot-1.jpg',
        '/projects/portal-shot-2.jpg',
        '/projects/portal-shot-3.jpg',
      ],
    },

    dashboard: {
      id: 'dashboard',
      number: '03',
      title: 'Management Dashboard',
      tagline: 'Centralized Hotel Operations Control',
      description:
        'An intuitive management dashboard providing hotel managers and staff with real-time operational visibility and control across every department.',
      modules: [
        'Reservations Management',
        'Rooms & Housekeeping Status',
        'Guests Directory',
        'Staff Allocation',
        'Revenue & Folio Tracking',
        'Custom Operational Reports',
        'Real-Time Hotel Analytics',
      ],
      screenshots: [
        '/projects/dashboard-shot-1.jpg',
        '/projects/dashboard-shot-2.jpg',
      ],
    },

    marketing: {
      id: 'marketing',
      number: '04',
      title: 'Marketing Service',
      tagline: 'Monthly Full-Service Digital Brand Management',
      description:
        'Dedicated monthly social media and digital marketing service crafted to elevate brand prestige and drive qualified guest inquiries.',
      deliverables: [
        '20 Posts / Month',
        '10 Reels / Month',
        'Influencer Communication',
        'Food Review Pages',
        'Paid Advertising',
        'Community Management',
        'DM Replies',
        'Comment Management',
        'Weekly Strategy Meetings',
        'Bespoke Graphic Design',
        'Weekly Performance Reports',
      ],
    },

    seo: {
      id: 'seo',
      number: '05',
      title: 'SEO',
      tagline: 'Search Engine Optimization for Hotel Visibility',
      description:
        'We optimize hotel websites for search engines to capture high-intent travelers, rank for key destination searches, and consistently increase organic direct bookings.',
    },

    googleBusiness: {
      id: 'google-business',
      number: '06',
      title: 'Google Business Profile',
      tagline: 'Local Maps & Business Search Optimization',
      description:
        'Complete setup and active optimization of your Google Business Profile to capture local guest searches and turn map views into direct stay reservations.',
      focusAreas: [
        'Photos Optimization',
        'Reviews Management & Replies',
        'Regular Posts & Updates',
        'Maps Positioning',
        'Accurate Business Information',
      ],
    },

    analytics: {
      id: 'analytics',
      number: '07',
      title: 'Analytics & Unified Reporting',
      tagline: 'Consolidated Operational & Marketing Telemetry',
      description:
        'Clear, unified reporting that brings all hotel web, social, and booking performance metrics into easy-to-read executive dashboards.',
      coverage: [
        'Website Performance',
        'Social Media Insights',
        'Traffic Sources',
        'Conversions Tracking',
        'Direct Bookings Revenue',
        'Campaign Performance',
      ],
    },

    monthlyConsulting: {
      id: 'monthly-consulting',
      number: '08',
      title: 'Monthly Consulting',
      tagline: 'Dedicated Strategic Review Meetings',
      description:
        'Monthly review meetings with our technology and growth team to analyze performance, refine strategy, and map out future digital initiatives.',
      pillars: [
        'Growth Strategy',
        'Strategic Recommendations',
        'Performance Reviews',
        'Future Roadmap Planning',
      ],
    },
  },

  /* BEFORE & AFTER COMPARISON (No fake numbers) */
  beforeAfter: [
    {
      metricTitle: 'Guest Check-In & Arrivals',
      beforeLabel: 'Traditional Operations',
      beforeText: 'Manual front desk registration queues, physical key handoffs, paper form filling, and waiting times during peak arrivals.',
      afterLabel: 'Digitally Transformed Hotel',
      afterText: 'Sub-minute digital mobile check-in, keyless digital room entry, and instant room assignment via guest smartphone.',
    },
    {
      metricTitle: 'Guest Service Requests',
      beforeLabel: 'Traditional Operations',
      beforeText: 'In-room phone calls to reception, delayed room service notes, manual laundry requests, and phone busy signals.',
      afterLabel: 'Digitally Transformed Hotel',
      afterText: 'Instant web portal service ordering for room dining, spa, laundry, and maintenance with live order status updates.',
    },
    {
      metricTitle: 'Website & Direct Bookings',
      beforeLabel: 'Traditional Operations',
      beforeText: 'Heavy reliance on third-party booking channels with high commissions, slow website loading, and complex booking steps.',
      afterLabel: 'Digitally Transformed Hotel',
      afterText: 'Fast luxury hotel website with streamlined direct booking funnel, local currency support, and direct payment processing.',
    },
    {
      metricTitle: 'Hotel Management & Reporting',
      beforeLabel: 'Traditional Operations',
      beforeText: 'Disconnected spreadsheets, paper daily logs, delayed department updates, and manual monthly report consolidation.',
      afterLabel: 'Digitally Transformed Hotel',
      afterText: 'Unified management dashboard connecting reservations, guests, staff tasks, and real-time operational reports.',
    },
  ],

  /* PROJECT SHOWCASE PLACEHOLDERS */
  projects: [
    {
      id: 'proj-1',
      name: '[ Hotel Partner Name ]',
      country: '[ Country / Location ]',
      description:
        'Complete digital transformation featuring a custom direct-booking website, keyless guest portal, and unified staff dashboard.',
      servicesUsed: ['Website Development', 'Guest Portal', 'Dashboard', 'SEO', 'Analytics'],
      mainImage: '/projects/project-placeholder-1.jpg',
      gallery: [
        '/projects/project-1-a.jpg',
        '/projects/project-1-b.jpg',
        '/projects/project-1-c.jpg',
      ],
    },
    {
      id: 'proj-2',
      name: '[ Luxury Resort Partner ]',
      country: '[ Country / Location ]',
      description:
        'Luxury resort web property with integrated guest service portal, monthly marketing campaigns, and Google Business profile management.',
      servicesUsed: ['Website Development', 'Guest Portal', 'Marketing', 'Google Business', 'Monthly Consulting'],
      mainImage: '/projects/project-placeholder-2.jpg',
      gallery: [
        '/projects/project-2-a.jpg',
        '/projects/project-2-b.jpg',
      ],
    },
  ] as HospitalityProjectItem[],

  /* TESTIMONIAL PLACEHOLDERS */
  testimonials: [
    {
      id: 'test-1',
      clientName: '[ Partner Executive Name ]',
      position: '[ General Manager ]',
      company: '[ Luxury Hotel Group ]',
      photoPlaceholder: '/projects/testimonial-placeholder-1.jpg',
      review:
        'Feedback placeholder from hotel management regarding the seamless digital transformation, elevated guest feedback, and increased direct bookings achieved through Quriv software solutions.',
    },
    {
      id: 'test-2',
      clientName: '[ Operations Director Name ]',
      position: '[ Operations Director ]',
      company: '[ Coastal Resort Collection ]',
      photoPlaceholder: '/projects/testimonial-placeholder-2.jpg',
      review:
        'Testimonial placeholder highlighting the efficiency gains of the unified management dashboard and the convenience of the guest mobile portal.',
    },
  ] as HospitalityTestimonialItem[],

  /* GALLERY CAROUSELS LOADED FROM /public/projects/ */
  galleryCarousels: {
    websites: [
      { id: 'gw-1', title: 'Luxury Hotel Website', subtitle: 'Direct Booking Engine', imageUrl: '/projects/gallery-web-1.jpg' },
      { id: 'gw-2', title: 'Boutique Resort Portal', subtitle: 'Immersive Visual Layout', imageUrl: '/projects/gallery-web-2.jpg' },
    ],
    portals: [
      { id: 'gp-1', title: 'In-Room Dining Portal', subtitle: 'Mobile Guest Ordering', imageUrl: '/projects/gallery-portal-1.jpg' },
      { id: 'gp-2', title: 'Concierge Request UI', subtitle: 'Contactless Service Requests', imageUrl: '/projects/gallery-portal-2.jpg' },
    ],
    dashboards: [
      { id: 'gd-1', title: 'Reservations & Rooms Console', subtitle: 'Real-Time Hotel Management', imageUrl: '/projects/gallery-dash-1.jpg' },
      { id: 'gd-2', title: 'Executive Revenue Analytics', subtitle: 'Performance & Reports', imageUrl: '/projects/gallery-dash-2.jpg' },
    ],
    marketing: [
      { id: 'gm-1', title: 'Social Media Graphic Design', subtitle: 'Brand Content & Campaigns', imageUrl: '/projects/gallery-mkt-1.jpg' },
      { id: 'gm-2', title: 'Dining & Amenity Showcase', subtitle: 'High-Impact Photography', imageUrl: '/projects/gallery-mkt-2.jpg' },
    ],
    videos: [
      { id: 'gv-1', title: 'Digital Guest Experience Walkthrough', subtitle: 'Full Journey Showcase', imageUrl: '/projects/gallery-vid-1.jpg', videoUrl: '' },
    ],
  },
};

/* ========================================================================
   MAIN HOSPITALITY SOLUTIONS COMPONENT
   ======================================================================== */

interface HospitalitySolutionsProps {
  onOpenBookMeeting?: () => void;
}

export const HospitalitySolutions: React.FC<HospitalitySolutionsProps> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  // Navigation / Filter States
  const [activeNavTab, setActiveNavTab] = useState<'services' | 'beforeAfter' | 'projects' | 'testimonials' | 'gallery' | 'meeting'>('services');

  // Website preview mode state
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Gallery Carousel category state
  const [activeGalleryCat, setActiveGalleryCat] = useState<'websites' | 'portals' | 'dashboards' | 'marketing' | 'videos'>('websites');
  const [galleryIndex, setGalleryIndex] = useState<number>(0);

  // Active Project Gallery modal or view
  const [selectedProject, setSelectedProject] = useState<HospitalityProjectItem | null>(null);

  // Meeting Form State
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    meetingDate: '',
    meetingTime: '',
    projectType: 'Hospitality Digital Transformation',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setFormSubmitted(true);
  };

  // Helper for gallery next/prev
  const currentGalleryList = HOSPITALITY_DATA.galleryCarousels[activeGalleryCat] || [];
  const handlePrevGallery = () => {
    soundManager.playClick();
    setGalleryIndex((prev) => (prev === 0 ? currentGalleryList.length - 1 : prev - 1));
  };
  const handleNextGallery = () => {
    soundManager.playClick();
    setGalleryIndex((prev) => (prev === currentGalleryList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-16 py-4 text-white relative">

      {/* 1. HERO & INTRODUCTION SCENE */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0d0d12]/90 via-[#09090c]/95 to-[#12100a]/90 border border-[#D4AF37]/30 backdrop-blur-2xl p-8 sm:p-12 gold-glow overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#E6C766]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>PRIMARY INDUSTRY PRACTICE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
            {HOSPITALITY_DATA.title}
          </h2>

          <p className="text-base sm:text-lg text-[#FFFFFF]/90 font-light leading-relaxed max-w-3xl">
            {HOSPITALITY_DATA.intro}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveNavTab('meeting');
                const el = document.getElementById('book-hospitality-meeting');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveNavTab('services');
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-full bg-white/[0.05] border border-white/15 text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/[0.1] hover:border-white/30 transition-all cursor-pointer"
            >
              Explore 8 Core Services
            </button>
          </div>
        </div>

        {/* Floating Quick Navigation Tabs */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'services', label: '8 Core Services' },
            { id: 'beforeAfter', label: 'Operational Transformation' },
            { id: 'projects', label: 'Projects' },
            { id: 'testimonials', label: 'Partner Feedback' },
            { id: 'gallery', label: 'Media Gallery' },
            { id: 'meeting', label: 'Book a Meeting' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveNavTab(tab.id as any);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeNavTab === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold shadow-md'
                  : 'bg-black/40 border border-white/10 text-[#A7A7A7] hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SERVICES SECTION (EXCLUSIVELY 8 REQUESTED SERVICES) */}
      {(activeNavTab === 'services' || activeNavTab === 'beforeAfter') && (
        <div className="space-y-12">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              COMPLETE SERVICE SUITE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('industries.dedicatedHospitalityServices')}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Engineered exclusively for hotel groups, boutique resorts, and luxury accommodations.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* SERVICE 1: WEBSITE DEVELOPMENT (UNIQUE SCENE LAYOUT) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-8 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                    <Globe className="w-4 h-4" />
                    <span>SERVICE 01 // {t('industries.service01')}</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {HOSPITALITY_DATA.services.websiteDev.title}
                  </h4>
                  <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                    {HOSPITALITY_DATA.services.websiteDev.description}
                  </p>
                </div>

                {/* Device Selector Controls */}
                <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-white/10 shrink-0 self-start">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setPreviewDevice('desktop');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'text-[#A7A7A7] hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop Preview</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setPreviewDevice('tablet');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewDevice === 'tablet'
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'text-[#A7A7A7] hover:text-white'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span>Tablet Preview</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setPreviewDevice('mobile');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'text-[#A7A7A7] hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Preview</span>
                  </button>
                </div>
              </div>

              {/* Website Preview Frame Scene */}
              <div className="bg-black/80 rounded-2xl border border-white/10 p-6 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#A7A7A7] border-b border-white/10 pb-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-white font-mono">Hotel Website Live Frame ({previewDevice})</span>
                  </span>

                  <a
                    href={HOSPITALITY_DATA.services.websiteDev.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors"
                  >
                    <span>Project Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Simulated Responsive Preview Canvas */}
                <div className="flex justify-center items-center py-6 bg-[#050508] rounded-xl border border-white/5 min-h-[260px]">
                  <div
                    className={`transition-all duration-500 bg-[#0a0a0d] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center p-6 text-center ${
                      previewDevice === 'desktop'
                        ? 'w-full max-w-3xl aspect-[16/9]'
                        : previewDevice === 'tablet'
                        ? 'w-full max-w-md aspect-[4/3]'
                        : 'w-full max-w-xs aspect-[9/16]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-mono text-[#D4AF37] uppercase">
                        {previewDevice.toUpperCase()} PREVIEW PLACEHOLDER
                      </div>
                      <p className="text-xs text-[#A7A7A7] font-light max-w-sm">
                        Website Preview Placeholder ({previewDevice} layout) showcasing direct booking bar, room suites catalog, and high-resolution visual storytelling.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Website Screenshots Row */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{t('industries.websiteScreenshotsGallery')}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {HOSPITALITY_DATA.services.websiteDev.screenshots.map((shot, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 group">
                        <div className="aspect-[16/9] rounded-lg bg-black border border-white/10 flex items-center justify-center text-xs font-mono text-[#A7A7A7]">
                          <span>{t('industries.screenshotPlaceholder')} 0{idx + 1}</span>
                        </div>
                        <div className="text-[11px] font-mono text-[#A7A7A7] group-hover:text-white transition-colors">
                          {t('industries.suiteBookingInterface')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE 2: GUEST PORTAL (PHONE APP SCENE) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-8 relative overflow-hidden">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <Smartphone className="w-4 h-4" />
                  <span>SERVICE 02 // {t('industries.service02')}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.guestPortal.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.guestPortal.description}
                </p>
              </div>

              {/* Guest Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {HOSPITALITY_DATA.services.guestPortal.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[#D4AF37]/50 transition-all text-center space-y-2 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-mono text-white font-bold">{feat}</div>
                  </div>
                ))}
              </div>

              {/* Portal Screenshots Placeholders */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider">
                  {t('industries.guestPortalMobileScreenshots')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {HOSPITALITY_DATA.services.guestPortal.screenshots.map((shot, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/80 border border-white/10 text-center space-y-3">
                      <div className="aspect-[9/16] rounded-xl bg-[#050508] border border-white/10 flex items-center justify-center p-4">
                        <div className="text-xs font-mono text-[#A7A7A7]">
                          {t('industries.screenshotPlaceholder')} 0{idx + 1}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-[#E6C766]">{t('industries.digitalKeyAccess')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICE 3: DASHBOARD (ADMIN SCENE) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-8 relative overflow-hidden">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>SERVICE 03 // {t('industries.service03')}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.dashboard.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.dashboard.description}
                </p>
              </div>

              {/* Dashboard Modules Pill Matrix */}
              <div className="flex flex-wrap gap-2.5">
                {HOSPITALITY_DATA.services.dashboard.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E6C766] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>

              {/* Dashboard Screenshots Placeholders */}
              <div className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider mb-3">
                {t('industries.dashboardScreenshots')}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {HOSPITALITY_DATA.services.dashboard.screenshots.map((shot, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black/80 border border-white/10 space-y-3">
                    <div className="aspect-[16/9] rounded-xl bg-[#050508] border border-white/10 flex items-center justify-center p-4">
                      <div className="text-xs font-mono text-[#A7A7A7] text-center">
                        {t('industries.screenshotPlaceholder')} 0{idx + 1}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white flex items-center justify-between">
                      <span>{t('industries.reservationsModule')}</span>
                      <span className="text-[#D4AF37]">{t('industries.liveOperationalTelemetry')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICE 4: MARKETING (DELIVERABLES GRID) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-8 relative overflow-hidden">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <TrendingUp className="w-4 h-4" />
                  <span>SERVICE 04 // {t('industries.service04')}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.marketing.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.marketing.description}
                </p>
              </div>

              {/* Marketing Monthly Deliverables Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {HOSPITALITY_DATA.services.marketing.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="text-[10px] font-mono text-[#D4AF37]">MONTHLY DELIVERABLE 0{idx + 1}</div>
                    <div className="text-sm font-bold font-display text-white">{deliv}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES 5, 6, 7, 8 GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* SERVICE 5: SEO */}
              <div className="p-8 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <Search className="w-4 h-4" />
                  <span>SERVICE 05 // {t('industries.service05')}</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.seo.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.seo.description}
                </p>
              </div>

              {/* SERVICE 6: GOOGLE BUSINESS */}
              <div className="p-8 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <MapPin className="w-4 h-4" />
                  <span>SERVICE 06 // {t('industries.service06')}</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.googleBusiness.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.googleBusiness.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {HOSPITALITY_DATA.services.googleBusiness.focusAreas.map((fa, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-[#E6C766] border border-white/10">
                      • {fa}
                    </span>
                  ))}
                </div>
              </div>

              {/* SERVICE 7: ANALYTICS */}
              <div className="p-8 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <BarChart3 className="w-4 h-4" />
                  <span>SERVICE 07 // {t('industries.service07')}</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.analytics.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.analytics.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {HOSPITALITY_DATA.services.analytics.coverage.map((cov, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-[#E6C766] border border-white/10">
                      • {cov}
                    </span>
                  ))}
                </div>
              </div>

              {/* SERVICE 8: MONTHLY CONSULTING */}
              <div className="p-8 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
                  <Calendar className="w-4 h-4" />
                  <span>SERVICE 08 // {t('industries.service08')}</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white">
                  {HOSPITALITY_DATA.services.monthlyConsulting.title}
                </h4>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {HOSPITALITY_DATA.services.monthlyConsulting.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {HOSPITALITY_DATA.services.monthlyConsulting.pillars.map((pil, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-[#E6C766] border border-white/10">
                      • {pil}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3. BEFORE & AFTER INTERACTIVE COMPARISON SCENE */}
      {(activeNavTab === 'beforeAfter' || activeNavTab === 'services') && (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c0c10]/95 via-[#08080a]/95 to-[#12100d]/95 border border-[#D4AF37]/30 backdrop-blur-2xl space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              OPERATIONAL COMPARISON
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Before & After Digital Transformation
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Comparing traditional hotel operational workflows with a fully integrated Quriv software architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOSPITALITY_DATA.beforeAfter.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-black/70 border border-white/10 space-y-6">
                <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider border-b border-white/10 pb-3">
                  {item.metricTitle}
                </div>

                <div className="space-y-4">
                  {/* Before Box */}
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/30 space-y-1.5">
                    <div className="text-[10px] font-mono text-red-400 uppercase font-bold">
                      {item.beforeLabel}
                    </div>
                    <p className="text-xs text-red-200/90 font-light leading-relaxed">
                      {item.beforeText}
                    </p>
                  </div>

                  {/* After Box */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      {item.afterLabel}
                    </div>
                    <p className="text-xs text-emerald-200/90 font-light leading-relaxed">
                      {item.afterText}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROJECTS SHOWCASE SECTION (PLACEHOLDERS) */}
      {activeNavTab === 'projects' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              PROJECT PORTFOLIO
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Hospitality Projects Showcase
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Bespoke digital architecture implementations across hotels and resorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOSPITALITY_DATA.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-black/80 border border-white/10 space-y-6 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/9] rounded-2xl bg-[#050508] border border-white/10 flex items-center justify-center p-6 text-center overflow-hidden relative">
                    <div className="text-xs font-mono text-[#A7A7A7]">
                      Project Main Image Placeholder
                      <br />
                      ({proj.name})
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold text-lg font-display">{proj.name}</span>
                    <span className="text-[#D4AF37] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                      {proj.country}
                    </span>
                  </div>

                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-[10px] font-mono text-[#A7A7A7] uppercase">Services Used:</div>
                    <div className="flex flex-wrap gap-2">
                      {proj.servicesUsed.map((srv, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[10px] font-mono text-[#E6C766]">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                  <span>Project Gallery (Editable)</span>
                  <span>{proj.gallery.length} Images Placeholder</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TESTIMONIALS SECTION (STRUCTURE ONLY - NO FAKE NAMES) */}
      {activeNavTab === 'testimonials' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              PARTNER FEEDBACK
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Client Endorsements & Reviews
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Structured testimonial entries from verified hospitality management partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOSPITALITY_DATA.testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-3xl bg-black/80 border border-white/10 space-y-6 flex flex-col justify-between"
              >
                <p className="text-sm text-white/90 font-light italic leading-relaxed">
                  "{t.review}"
                </p>

                <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-[#A7A7A7] shrink-0">
                    Photo
                  </div>
                  <div>
                    <div className="text-sm font-bold font-display text-white">{t.clientName}</div>
                    <div className="text-xs font-mono text-[#E6C766]">
                      {t.position} — {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MEDIA GALLERY CAROUSELS (LOADED FROM /public/projects/) */}
      {activeNavTab === 'gallery' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              MEDIA GALLERY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Hospitality Media Showcase
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Interactive carousels displaying hotel websites, portals, dashboards, and video walkthroughs.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {[
              { id: 'websites', label: 'Hotel Websites' },
              { id: 'portals', label: 'Guest Portals' },
              { id: 'dashboards', label: 'Dashboards' },
              { id: 'marketing', label: 'Marketing Designs' },
              { id: 'videos', label: 'Videos' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveGalleryCat(cat.id as any);
                  setGalleryIndex(0);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeGalleryCat === cat.id
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-black/60 border border-white/10 text-[#A7A7A7] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Carousel Viewport */}
          <div className="p-8 rounded-3xl bg-black/80 border border-white/10 space-y-6 relative overflow-hidden">
            {currentGalleryList.length > 0 ? (
              <div className="space-y-6">
                <div className="aspect-[16/9] rounded-2xl bg-[#050508] border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="text-center space-y-2">
                    <div className="text-xs font-mono text-[#D4AF37] uppercase">
                      /public/projects/{activeGalleryCat} Placeholder
                    </div>
                    <h4 className="text-xl font-bold font-display text-white">
                      {currentGalleryList[galleryIndex].title}
                    </h4>
                    <p className="text-xs text-[#A7A7A7]">
                      {currentGalleryList[galleryIndex].subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A7A7A7]">
                    Item {galleryIndex + 1} of {currentGalleryList.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevGallery}
                      className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={handleNextGallery}
                      className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs font-mono text-[#A7A7A7] py-12 text-center">
                No items in this gallery category.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. BOOK A MEETING CTA & FORM */}
      <div id="book-hospitality-meeting" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0e0e14]/95 via-[#09090d]/95 to-[#121008]/95 border border-[#D4AF37]/40 backdrop-blur-2xl space-y-8 gold-glow">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E6C766]">
            <Calendar className="w-4 h-4" />
            <span>EXECUTIVE CONSULTATION</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Book a Hospitality Consultation
          </h3>
          <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
            Discuss your hotel or resort digital transformation directly with our lead software architects.
          </p>
        </div>

        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">Consultation Request Received</h4>
            <p className="text-xs text-emerald-200/90 font-light max-w-md mx-auto">
              Thank you, {formData.fullName}. Our hospitality architecture team will review your details and confirm your preferred date ({formData.meetingDate || 'As scheduled'}).
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Company / Hotel Property *</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="e.g. Grand Horizon Hotel Group"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="alexander@hotelgroup.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                />
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Preferred Meeting Date</span>
                </label>
                <input
                  type="date"
                  name="meetingDate"
                  value={formData.meetingDate}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-all"
                />
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Preferred Time</span>
                </label>
                <input
                  type="time"
                  name="meetingTime"
                  value={formData.meetingTime}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Project Focus</span>
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-all"
              >
                <option value="Hospitality Digital Transformation" className="bg-black text-white">
                  Hospitality Digital Transformation (Full Suite)
                </option>
                <option value="Website Development & Direct Bookings" className="bg-black text-white">
                  Website Development & Direct Bookings
                </option>
                <option value="Guest Portal & Concierge App" className="bg-black text-white">
                  Guest Portal & Concierge App
                </option>
                <option value="Management Dashboard & Analytics" className="bg-black text-white">
                  Management Dashboard & Analytics
                </option>
                <option value="Monthly Marketing & SEO Services" className="bg-black text-white">
                  Monthly Marketing & SEO Services
                </option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A7A7A7] uppercase flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Message & Project Scope</span>
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Share details about your hotel property, current software setup, and target timelines..."
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Meeting Request</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
