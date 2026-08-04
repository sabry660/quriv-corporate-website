import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  QrCode,
  UtensilsCrossed,
  Truck,
  ChefHat,
  CalendarDays,
  Megaphone,
  MapPin,
  Search,
  BarChart3,
  Calendar,
  ArrowRight,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
  Store,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface FoodIndustrySolutionsProps {
  onOpenBookMeeting: () => void;
  onBack?: () => void;
}

export const FOOD_INDUSTRY_DATA = {
  title: 'Food Industry Solutions',
  subtitle: 'Digital Technology Architectures for Restaurants, Cafes & Culinary Groups',
  intro:
    'Quriv partners with fine dining establishments, restaurant chains, and cloud kitchens to elevate guest experiences, streamline kitchen dispatch operations, and maximize direct online ordering channels.',

  /* 8 EXCLUSIVE SERVICES */
  services: [
    {
      id: 'website',
      number: '01',
      title: 'Website',
      tagline: 'Luxury Restaurant Websites Engineered for Visual Appeal & Direct Orders',
      description:
        'Bespoke culinary web properties designed with high-definition imagery, seamless online reservation widgets, and instant mobile menu accessibility.',
      icon: Globe,
      highlights: [
        'Interactive Digital Menu Displays',
        'Direct Booking & Table Reservation Widget',
        'Sub-150ms Page Loading Speeds',
        'Multi-Location Store Locator',
      ],
      previews: {
        desktop: '/projects/food-website-desktop.jpg',
        tablet: '/projects/food-website-tablet.jpg',
        mobile: '/projects/food-website-mobile.jpg',
      },
      screenshots: [
        '/projects/food-website-1.jpg',
        '/projects/food-website-2.jpg',
        '/projects/food-website-3.jpg',
      ],
    },
    {
      id: 'qr-menu',
      number: '02',
      title: 'QR Menu',
      tagline: 'Contactless Smart Digital Menu System',
      description:
        'Fast, elegant QR code menus allowing guests to view high-resolution dish photos, filter dietary requirements, and order directly from their table.',
      icon: QrCode,
      highlights: [
        'Instant Scan Without App Download',
        'Real-Time Item Availability Toggle',
        'Multi-Language & Currency Support',
        'Allergen & Dietary Filtering',
      ],
      features: [
        'High-Resolution Dish Photos',
        'Dietary Filtering',
        'Multi-Language Support',
        'Instant Ordering',
        'Real-Time Availability',
      ],
      screenshots: [
        '/projects/food-qr-1.jpg',
        '/projects/food-qr-2.jpg',
        '/projects/food-qr-3.jpg',
      ],
    },
    {
      id: 'online-ordering',
      number: '03',
      title: 'Online Ordering',
      tagline: 'Commission-Free Direct Ordering Gateway',
      description:
        'Custom web checkout engine enabling guests to place takeout and delivery orders directly from your brand website without third-party commission fees.',
      icon: UtensilsCrossed,
      highlights: [
        'Zero-Commission Direct Revenue',
        'Scheduled Pickup & Delivery Slots',
        'Custom Modifier & Topping Selectors',
        'One-Touch Apple Pay / Google Pay',
      ],
      features: [
        'Custom Modifiers',
        'Scheduled Orders',
        'Multiple Payment Options',
        'Order Tracking',
        'Guest Accounts',
      ],
      screenshots: [
        '/projects/food-ordering-1.jpg',
        '/projects/food-ordering-2.jpg',
      ],
    },
    {
      id: 'delivery-integration',
      number: '04',
      title: 'Delivery Integration',
      tagline: 'Automated Third-Party Courier Synchronization',
      description:
        'Unified delivery management that automatically aggregates orders from major courier fleets directly into your central point-of-sale system.',
      icon: Truck,
      highlights: [
        'Automated Courier Fleet Dispatch',
        'Consolidated Kitchen Tickets',
        'Live Rider Tracking Telemetry',
        'Estimated Time of Arrival (ETA) Calculations',
      ],
      features: [
        'Multi-Courier Integration',
        'Live Tracking',
        'Auto-Dispatch',
        'ETA Calculations',
        'Order Consolidation',
      ],
      screenshots: [
        '/projects/food-delivery-1.jpg',
        '/projects/food-delivery-2.jpg',
      ],
    },
    {
      id: 'kitchen-dashboard',
      number: '05',
      title: 'Kitchen Dashboard',
      tagline: 'Kitchen Display System (KDS) for Peak Operations',
      description:
        'Intuitive touch screen kitchen displays replacing paper tickets with color-coded prep timers, order status tracking, and station routing.',
      icon: ChefHat,
      highlights: [
        'Station-Specific Ticket Routing',
        'Order Preparation Timer Alerts',
        'Instant Prep Delay Notifications',
        'Order Assembly Verification',
      ],
      modules: [
        'Station Routing',
        'Prep Timers',
        'Delay Alerts',
        'Order Queue',
        'Assembly Verification',
      ],
      screenshots: [
        '/projects/food-kitchen-1.jpg',
        '/projects/food-kitchen-2.jpg',
      ],
    },
    {
      id: 'reservations',
      number: '06',
      title: 'Reservations',
      tagline: 'Table Management & Guest Reservation Portal',
      description:
        'Smart table booking system giving host staff floor plan management, guest VIP notes, deposit collection, and automated SMS confirmation reminders.',
      icon: CalendarDays,
      highlights: [
        'Visual Table & Floor Plan Layout',
        'Automated SMS & WhatsApp Confirmations',
        'Special Requests & VIP Guest Profiles',
        'No-Show Prevention Deposit Options',
      ],
      features: [
        'Floor Plan Management',
        'VIP Profiles',
        'Deposit Collection',
        'SMS Confirmations',
        'Waitlist Management',
      ],
      screenshots: [
        '/projects/food-reservations-1.jpg',
        '/projects/food-reservations-2.jpg',
      ],
    },
    {
      id: 'marketing',
      number: '07',
      title: 'Marketing Service',
      tagline: 'Monthly Full-Service Digital Brand Management',
      description:
        'Dedicated monthly social media and digital marketing service crafted to elevate brand prestige and drive qualified guest inquiries.',
      icon: TrendingUp,
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
    {
      id: 'monthly-consulting',
      number: '08',
      title: 'Monthly Consulting',
      tagline: 'Dedicated Strategic Review Meetings',
      description:
        'Monthly review meetings with our technology and growth team to analyze performance, refine strategy, and map out future digital initiatives.',
      icon: MessageSquare,
      pillars: [
        'Growth Strategy',
        'Strategic Recommendations',
        'Performance Reviews',
        'Future Roadmap Planning',
      ],
    },
  ],

  /* BEFORE & AFTER COMPARISON */
  beforeAfter: [
    {
      metricTitle: 'Order Taking & Processing',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Paper order tickets, manual phone calls, handwritten kitchen notes, and delayed order transmission.',
      afterLabel: 'digitallyTransformedRestaurant',
      afterText: 'Digital order entry, instant kitchen display system, automated routing, and real-time order tracking.',
      beforeImage: '/projects/food-before-1.jpg',
      afterImage: '/projects/food-after-1.jpg',
    },
    {
      metricTitle: 'Menu Management',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Printed physical menus, manual price updates, seasonal reprinting costs, and limited item information.',
      afterLabel: 'digitallyTransformedRestaurant',
      afterText: 'Digital QR menus, instant price updates, real-time availability toggles, and rich item descriptions.',
      beforeImage: '/projects/food-before-2.jpg',
      afterImage: '/projects/food-after-2.jpg',
    },
    {
      metricTitle: 'Table Reservations',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Phone-based bookings, manual reservation books, double-booking errors, and no guest history tracking.',
      afterLabel: 'digitallyTransformedRestaurant',
      afterText: 'Online booking system, automated table management, guest preference tracking, and instant confirmations.',
      beforeImage: '/projects/food-before-3.jpg',
      afterImage: '/projects/food-after-3.jpg',
    },
    {
      metricTitle: 'Inventory & Cost Control',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Manual stock counting, spreadsheet tracking, delayed waste reporting, and inaccurate cost analysis.',
      afterLabel: 'digitallyTransformedRestaurant',
      afterText: 'Real-time inventory tracking, automated low-stock alerts, precise cost analysis, and waste reduction insights.',
      beforeImage: '/projects/food-before-4.jpg',
      afterImage: '/projects/food-after-4.jpg',
    },
  ],

  /* PROJECT SHOWCASE */
  projects: [
    {
      id: 'food-proj-1',
      name: '[ Restaurant Partner Name ]',
      location: '[ Location / City ]',
      description:
        'Complete restaurant digital deployment featuring a luxury brand website, QR code menu ordering, and kitchen display system (KDS) integration.',
      servicesUsed: ['Website', 'QR Menu', 'Online Ordering', 'Kitchen Dashboard', 'Analytics'],
      mainImage: '/projects/food-restaurant-1.jpg',
      qrMenu: '/projects/food-qr-menu-1.jpg',
      kds: '/projects/food-kds-1.jpg',
    },
    {
      id: 'food-proj-2',
      name: '[ Multi-Branch Culinary Group ]',
      location: '[ Regional Locations ]',
      description:
        'Centralized online ordering platform with automated delivery courier integration, table reservation management, and Google Business profile optimization.',
      servicesUsed: ['Online Ordering', 'Delivery Integration', 'Reservations', 'Google Business', 'Monthly Consulting'],
      mainImage: '/projects/food-restaurant-2.jpg',
      qrMenu: '/projects/food-qr-menu-2.jpg',
      kds: '/projects/food-kds-2.jpg',
    },
  ],
};

export const FoodIndustrySolutions: React.FC<FoodIndustrySolutionsProps> = ({ onOpenBookMeeting, onBack }) => {
  const { t, dir } = useI18n();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'previews' | 'showcase' | 'beforeAfter'>('overview');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('qr-ordering');
  const [previewMode, setPreviewMode] = useState<'kitchen' | 'delivery' | 'reservations' | 'analytics'>('kitchen');

  const selectedService =
    FOOD_INDUSTRY_DATA.services.find((s) => s.id === selectedServiceId) || FOOD_INDUSTRY_DATA.services[0];

  return (
    <div className="space-y-12 py-4 text-white relative">
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#120f0a]/95 via-[#0d0a08]/95 to-[#16120b]/95 border border-[#D4AF37]/35 backdrop-blur-2xl p-8 sm:p-12 gold-glow overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#E6C766]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>{t('common.restaurantCulinaryTechnology')}</span>
            </div>

            {onBack && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onBack();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="text-lg font-mono text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
              >
                &larr; {t('allSolutions')}
              </button>
            )}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
            {FOOD_INDUSTRY_DATA.title}
          </h2>

          <p className="text-base sm:text-lg text-[#FFFFFF]/90 font-light leading-relaxed max-w-3xl">
            {FOOD_INDUSTRY_DATA.intro}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBookMeeting();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{t('common.bookMeeting')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('services');
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-full bg-white/[0.05] border border-white/15 text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-white/[0.1] hover:border-white/30 transition-all cursor-pointer"
            >
              {t('common.exploreServices', { count: FOOD_INDUSTRY_DATA.services.length })}
            </button>
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'overview', label: t('common.overview') },
            { id: 'services', label: `${FOOD_INDUSTRY_DATA.services.length} ${t('common.services')}` },
            { id: 'previews', label: t('common.systemPreviews') },
            { id: 'beforeAfter', label: t('common.operationalComparison') },
            { id: 'showcase', label: t('common.projectShowcase') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as any);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold shadow-md'
                  : 'bg-black/40 border border-white/10 text-[#A7A7A7] hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW & SYSTEM PREVIEWS */}
      {(activeTab === 'overview' || activeTab === 'previews') && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              {t('common.culinarySystems')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('common.restaurantTechnologySystemPreviews')}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              {t('common.restaurantTechnologyPreviewDescription')}
            </p>
          </div>

          {/* Interactive Preview Mode Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'qrmenu', label: t('common.contactlessQrMenu') },
              { id: 'kds', label: t('common.kitchenDisplayKds') },
              { id: 'ordering', label: t('common.onlineOrderingPortal') },
              { id: 'reservations', label: t('common.tableReservations') },
            ].map((pm) => (
              <button
                key={pm.id}
                onClick={() => {
                  soundManager.playClick();
                  setPreviewMode(pm.id as any);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  previewMode === pm.id
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-black/60 border border-white/10 text-[#A7A7A7] hover:text-white'
                }`}
              >
                {pm.label}
              </button>
            ))}
          </div>

          {/* Glass Preview Panel */}
          <div className="p-8 rounded-3xl bg-[#0e0c08]/90 border border-white/10 backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#A7A7A7] border-b border-white/10 pb-4">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-white font-mono uppercase">
                  {t('common.foodIndustrySurface')} // {previewMode.toUpperCase()}
                </span>
              </span>
              <span className="text-[#D4AF37]">{t('common.optimizedRestaurantOperations')}</span>
            </div>

            <div className="py-10 px-6 bg-[#060503] rounded-2xl border border-white/5 min-h-[300px] flex items-center justify-center text-center">
              {previewMode === 'qrmenu' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.qrMenu')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Interactive mobile QR code menu featuring dietary tags, real-time item availability toggles, high-resolution food photography, and direct-from-table ordering.
                  </p>
                </div>
              )}

              {previewMode === 'kds' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <ChefHat className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.kitchenDisplay')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Kitchen display console highlighting station-specific ticket routing, color-coded prep timing countdowns, delay alerts, and instant order bump functions.
                  </p>
                </div>
              )}

              {previewMode === 'ordering' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.onlineOrdering')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Commission-free direct web ordering portal featuring scheduled pickup times, custom meal modifiers, Apple Pay integration, and automated courier assignment.
                  </p>
                </div>
              )}

              {previewMode === 'reservations' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <CalendarDays className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.tableReservations')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Host station floor plan and table booking console showcasing real-time seating availability, guest VIP notes, and automated WhatsApp booking confirmations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. THE 8 SERVICES SECTION */}
      {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              {t('common.endToEndServices')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('common.theFoodIndustryServices', { count: FOOD_INDUSTRY_DATA.services.length })}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              {t('common.customFoodTechnology')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Service List Navigation */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {FOOD_INDUSTRY_DATA.services.map((srv) => {
                const IconComp = srv.icon;
                const isSelected = srv.id === selectedServiceId;
                return (
                  <div
                    key={srv.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedServiceId(srv.id);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#14100b] border-[#D4AF37] text-white shadow-lg'
                        : 'bg-black/40 border-white/[0.08] text-[#A7A7A7] hover:bg-black/70 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-white/[0.05] text-[#D4AF37] group-hover:bg-white/10'
                        }`}
                      >
                        {srv.number}
                      </div>
                      <div>
                        <div className="text-sm font-bold font-display text-white">{srv.title}</div>
                        <div className="text-[10px] font-mono text-[#A7A7A7] truncate max-w-[180px]">
                          {srv.tagline}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? `text-[#D4AF37] ${dir === 'rtl' ? '-translate-x-1' : 'translate-x-1'}` : 'text-white/20'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Service Specification Display Panel */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0e0c08]/95 border border-[#D4AF37]/30 backdrop-blur-2xl space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-mono text-[#E6C766] uppercase">
                  <span>{t('common.serviceSpecification')} {selectedService.number}</span>
                </div>
                <h4 className="text-2xl font-bold font-display text-white">{selectedService.title}</h4>
                <div className="text-xs font-mono text-[#D4AF37]">{selectedService.tagline}</div>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="text-xs font-mono text-white uppercase tracking-wider">
                  {t('common.coreHighlightsFeatures')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E6C766] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span>{t('common.restaurantReady')}</span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase font-display hover:bg-[#E6C766] transition-colors cursor-pointer"
                >
                  {t('common.bookMeeting')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BEFORE & AFTER INTERACTIVE COMPARISON SCENE */}
      {activeTab === 'beforeAfter' && (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c0c10]/95 via-[#08080a]/95 to-[#12100d]/95 border border-[#D4AF37]/30 backdrop-blur-2xl space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              {t('common.operationalComparison')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('common.beforeAfterTransformation')}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              {t('common.foodIndustryComparisonDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {FOOD_INDUSTRY_DATA.beforeAfter.map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider border-b border-white/10 pb-3">
                  {item.metricTitle}
                </div>
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel={t(`common.${item.beforeLabel}`)}
                  afterLabel={t(`common.${item.afterLabel}`)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/30 space-y-1.5">
                    <p className="text-xs text-red-200/90 font-light leading-relaxed">
                      {item.beforeText}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
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

      {/* 4. PROJECT SHOWCASE (STRUCTURED PLACEHOLDERS) */}
      {activeTab === 'showcase' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              {t('common.portfolioShowcase')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('common.foodIndustryProjectsShowcase')}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              {t('common.foodIndustryProjectsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOOD_INDUSTRY_DATA.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-[#0e0c08]/90 border border-white/10 space-y-6 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold text-lg font-display">{proj.name}</span>
                    <span className="text-[#D4AF37] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                      {proj.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Project Images Matrix */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[9px] font-mono text-[#D4AF37] uppercase">{t('common.restaurant')}</div>
                      <img src={proj.mainImage} alt="Restaurant" className="w-full h-16 object-cover rounded" />
                    </div>

                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[9px] font-mono text-[#D4AF37] uppercase">{t('common.qrMenu')}</div>
                      <img src={proj.qrMenu} alt="QR Menu" className="w-full h-16 object-cover rounded" />
                    </div>

                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[9px] font-mono text-[#D4AF37] uppercase">{t('common.kitchenKds')}</div>
                      <img src={proj.kds} alt="KDS" className="w-full h-16 object-cover rounded" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-[10px] font-mono text-[#A7A7A7] uppercase">{t('common.servicesImplemented')}</div>
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
                  <span>{t('common.editableProjectSpecification')}</span>
                  <span>{t('common.readyForLiveData')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CALL TO ACTION (BOOK A MEETING) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#120e0a]/95 via-[#0a0805]/95 to-[#16120b]/95 border border-[#D4AF37]/40 backdrop-blur-2xl text-center space-y-6 gold-glow">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t('common.buildYourFoodIndustryArchitecture')}</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          {t('common.readyToEngineerFoodSolutions')}
        </h3>

        <p className="text-sm text-[#A7A7A7] font-light max-w-2xl mx-auto leading-relaxed">
          {t('common.bookCulinaryConsultation')}
        </p>

        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBookMeeting();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>{t('common.bookMeeting')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
