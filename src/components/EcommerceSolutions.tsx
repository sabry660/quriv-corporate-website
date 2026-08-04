import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  ShoppingCart,
  Smartphone,
  BarChart3,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
  TrendingUp,
  Search,
  ShieldCheck,
  ShoppingBag,
  LayoutDashboard,
  CreditCard,
  Boxes,
  ShoppingBasket,
  UserCheck
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface EcommerceSolutionsProps {
  onOpenBookMeeting: () => void;
  onBack?: () => void;
}

export const ECOMMERCE_DATA = {
  title: 'E-Commerce Solutions',
  subtitle: 'Scalable, High-Performance Digital Commerce Ecosystems',
  intro:
    'Quriv helps brands scale and sell globally through custom, high-concurrency e-commerce architectures engineered for lightning-fast speeds, seamless payment processing, and high-conversion checkout experiences.',

  /* 8 EXCLUSIVE SERVICES */
  services: [
    {
      id: 'online-store',
      number: '01',
      title: 'Online Store Development',
      tagline: 'Custom Storefronts Engineered for Velocity & Conversions',
      description:
        'Custom headless and monolithic online storefronts designed for instantaneous load times, fluid mobile shopping, and effortless brand storytelling.',
      icon: ShoppingBag,
      deliverables: [
        'Headless Frontend Architecture',
        'Sub-150ms Page Load Times',
        'Custom Product Configuration',
        'Mobile-First Touch Navigation',
      ],
      previews: {
        desktop: '/projects/ecom-store-desktop.jpg',
        tablet: '/projects/ecom-store-tablet.jpg',
        mobile: '/projects/ecom-store-mobile.jpg',
      },
      screenshots: [
        '/projects/ecom-store-1.jpg',
        '/projects/ecom-store-2.jpg',
        '/projects/ecom-store-3.jpg',
      ],
    },
    {
      id: 'admin-dashboard',
      number: '02',
      title: 'Admin Dashboard',
      tagline: 'Centralized Control Over Commerce Operations',
      description:
        'Unified administrative management console providing real-time oversight of inventory levels, multi-channel sales, and operational workflows.',
      icon: LayoutDashboard,
      deliverables: [
        'Real-Time Sales Operations',
        'Multi-Storefront Control',
        'Role-Based Staff Access',
        'Custom Data Exports',
      ],
      modules: [
        'Sales Overview',
        'Inventory Control',
        'Order Management',
        'Customer Analytics',
        'Staff Permissions',
      ],
      screenshots: [
        '/projects/ecom-dashboard-1.jpg',
        '/projects/ecom-dashboard-2.jpg',
      ],
    },
    {
      id: 'payment-gateway',
      number: '03',
      title: 'Payment Gateway Integration',
      tagline: 'Frictionless, Bank-Grade Payment Checkout',
      description:
        'Integration of global and localized payment gateways with multi-currency settlement, automated fraud checks, and one-click checkout flows.',
      icon: CreditCard,
      deliverables: [
        'Multi-Currency Processing',
        'PCI-DSS Compliant Security',
        'One-Click Apple Pay / Google Pay',
        'Automated Tax Calculation',
      ],
      features: [
        'Multi-Currency Support',
        'Fraud Detection',
        'Instant Checkout',
        'Tax Automation',
        'Recurring Payments',
      ],
      screenshots: [
        '/projects/ecom-payment-1.jpg',
        '/projects/ecom-payment-2.jpg',
      ],
    },
    {
      id: 'inventory-management',
      number: '04',
      title: 'Inventory Management',
      tagline: 'Real-Time Stock Synchronization Across Warehouses',
      description:
        'Automated inventory tracking that synchronizes stock across multiple channels, physical stores, and fulfillment hubs in real time.',
      icon: Boxes,
      deliverables: [
        'Multi-Warehouse Stock Sync',
        'Low Stock Automated Alerts',
        'Variant & SKU Management',
        'Supplier Orders Telemetry',
      ],
      features: [
        'Real-Time Sync',
        'Low Stock Alerts',
        'SKU Management',
        'Supplier Portal',
        'Forecasting',
      ],
      screenshots: [
        '/projects/ecom-inventory-1.jpg',
        '/projects/ecom-inventory-2.jpg',
      ],
    },
    {
      id: 'order-management',
      number: '05',
      title: 'Order Management',
      tagline: 'End-to-End Fulfillment & Logistics Control',
      description:
        'Streamlined order processing from cart checkout to courier dispatch, label printing, and automated customer tracking notifications.',
      icon: ShoppingBasket,
      deliverables: [
        'Automated Order Routing',
        'Shipping Label Generation',
        'Live Courier Tracking API',
        'Returns & Refunds Portal',
      ],
      features: [
        'Auto-Routing',
        'Label Printing',
        'Tracking Integration',
        'Returns Portal',
        'Bulk Processing',
      ],
      screenshots: [
        '/projects/ecom-order-1.jpg',
        '/projects/ecom-order-2.jpg',
      ],
    },
    {
      id: 'customer-accounts',
      number: '06',
      title: 'Customer Accounts',
      tagline: 'Personalized Accounts & Loyalty Systems',
      description:
        'Frictionless customer registration, order history lookup, saved shipping addresses, and integrated loyalty rewards programs.',
      icon: UserCheck,
      deliverables: [
        'One-Click Social Login',
        'Saved Payment & Address Vault',
        'Re-Order & Wishlist Portals',
        'Tiered Loyalty Program Integration',
      ],
      features: [
        'Social Login',
        'Address Vault',
        'Order History',
        'Wishlist',
        'Loyalty Points',
      ],
      screenshots: [
        '/projects/ecom-accounts-1.jpg',
        '/projects/ecom-accounts-2.jpg',
      ],
    },
    {
      id: 'marketing',
      number: '07',
      title: 'Marketing Service',
      tagline: 'Monthly Full-Service Digital Brand Management',
      description:
        'Dedicated monthly social media and digital marketing service crafted to elevate brand prestige and drive qualified customer inquiries.',
      icon: TrendingUp,
      deliverables: [
        '20 Posts / Month',
        '10 Reels / Month',
        'Influencer Communication',
        'Product Launch Campaigns',
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
      metricTitle: 'Product Discovery & Browsing',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Static category pages, limited search functionality, manual product filtering, and poor mobile experience.',
      afterLabel: 'digitallyTransformedStore',
      afterText: 'Dynamic product discovery, AI-powered search, instant filtering, and seamless mobile-first browsing.',
      beforeImage: '/projects/ecom-before-1.jpg',
      afterImage: '/projects/ecom-after-1.jpg',
    },
    {
      metricTitle: 'Checkout & Payment',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Multi-page checkout forms, manual payment entry, cart abandonment issues, and slow processing times.',
      afterLabel: 'digitallyTransformedStore',
      afterText: 'One-page checkout, saved payment methods, instant processing, and multiple payment gateway options.',
      beforeImage: '/projects/ecom-before-2.jpg',
      afterImage: '/projects/ecom-after-2.jpg',
    },
    {
      metricTitle: 'Inventory Management',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Manual stock updates, overselling issues, delayed sync across channels, and manual reordering.',
      afterLabel: 'digitallyTransformedStore',
      afterText: 'Real-time inventory sync, automated stock alerts, multi-channel synchronization, and predictive reordering.',
      beforeImage: '/projects/ecom-before-3.jpg',
      afterImage: '/projects/ecom-after-3.jpg',
    },
    {
      metricTitle: 'Customer Analytics',
      beforeLabel: 'traditionalOperations',
      beforeText: 'Basic sales reports, manual data analysis, delayed insights, and limited customer segmentation.',
      afterLabel: 'digitallyTransformedStore',
      afterText: 'Real-time analytics dashboard, AI-powered insights, instant reporting, and advanced customer segmentation.',
      beforeImage: '/projects/ecom-before-4.jpg',
      afterImage: '/projects/ecom-after-4.jpg',
    },
  ],

  /* PROJECT SHOWCASE */
  projects: [
    {
      id: 'ecom-proj-1',
      name: '[ E-commerce Partner Name ]',
      market: '[ Market / Region ]',
      description:
        'High-concurrency online storefront engineered with custom product configurators, localized currency switching, and automated warehouse fulfillment.',
      servicesUsed: ['Online Store Development', 'Admin Dashboard', 'Payment Gateway Integration', 'Analytics'],
      mainImage: '/projects/ecom-store-1.jpg',
      mobile: '/projects/ecom-mobile-1.jpg',
      dashboard: '/projects/ecom-dashboard-1.jpg',
      analytics: '/projects/ecom-analytics-1.jpg',
    },
    {
      id: 'ecom-proj-2',
      name: '[ Multi-Brand Retailer ]',
      market: '[ Global Market ]',
      description:
        'Enterprise multi-brand commerce portal featuring real-time inventory synchronization across 15 physical stores and an integrated customer accounts system.',
      servicesUsed: ['Inventory Management', 'Order Management', 'Customer Accounts', 'SEO', 'Marketing'],
      mainImage: '/projects/ecom-store-2.jpg',
      mobile: '/projects/ecom-mobile-2.jpg',
      dashboard: '/projects/ecom-dashboard-2.jpg',
      analytics: '/projects/ecom-analytics-2.jpg',
    },
  ],
};

export const EcommerceSolutions: React.FC<EcommerceSolutionsProps> = ({ onOpenBookMeeting, onBack }) => {
  const { t, dir } = useI18n();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'showcase' | 'previews' | 'beforeAfter'>('overview');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('online-store');
  const [previewMode, setPreviewMode] = useState<'storefront' | 'dashboard' | 'mobile' | 'analytics'>('storefront');

  const selectedService =
    ECOMMERCE_DATA.services.find((s) => s.id === selectedServiceId) || ECOMMERCE_DATA.services[0];

  return (
    <div className="space-y-12 py-4 text-white relative">
      {/* Top Header / Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0a0a0e]/95 via-[#0d0d14]/95 to-[#12100d]/95 border border-[#D4AF37]/30 backdrop-blur-2xl p-8 sm:p-12 gold-glow overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#E6C766]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>DIGITAL COMMERCE ARCHITECTURE</span>
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
            {ECOMMERCE_DATA.title}
          </h2>

          <p className="text-base sm:text-lg text-[#FFFFFF]/90 font-light leading-relaxed max-w-3xl">
            {ECOMMERCE_DATA.intro}
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
              {t('common.exploreServices', { count: ECOMMERCE_DATA.services.length })}
            </button>
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'overview', label: t('common.overview') },
            { id: 'services', label: `${ECOMMERCE_DATA.services.length} ${t('common.services')}` },
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
              {t('common.systemArchitecture')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('common.interactiveCommerceSystemPreviews')}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              {t('common.customCommerceTechnology')}
            </p>
          </div>

          {/* Interactive Preview Mode Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'storefront', label: t('common.onlineStorefront') },
              { id: 'dashboard', label: t('common.adminDashboard') },
              { id: 'mobile', label: t('common.mobileScreens') },
              { id: 'analytics', label: t('common.analyticsTelemetry') },
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

          {/* Glass Preview Surface Container */}
          <div className="p-8 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#A7A7A7] border-b border-white/10 pb-4">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-white font-mono uppercase">
                  Preview Surface // {previewMode.toUpperCase()}
                </span>
              </span>
              <span className="text-[#D4AF37]">HIGH CONCURRENCY ARCHITECTURE</span>
            </div>

            <div className="py-10 px-6 bg-[#050508] rounded-2xl border border-white/5 min-h-[300px] flex items-center justify-center text-center">
              {previewMode === 'storefront' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.onlineStorefront')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {t('common.onlineStorefrontPreviewDescription')}
                  </p>
                </div>
              )}

              {previewMode === 'dashboard' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <LayoutDashboard className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.adminDashboard')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {t('common.adminDashboardPreviewDescription')}
                  </p>
                </div>
              )}

              {previewMode === 'mobile' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.mobileScreens')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {t('common.mobileScreensPreviewDescription')}
                  </p>
                </div>
              )}

              {previewMode === 'analytics' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">{t('common.analyticsTelemetry')}</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {t('common.analyticsTelemetryPreviewDescription')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. THE 8 CORE SERVICES SECTION */}
      {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              FULL-SPECTRUM COMMERCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              The 9 E-Commerce Services
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              End-to-end digital commerce solutions engineered to maximize performance, scalability, and sales conversions.
            </p>
          </div>

          {/* Interactive Service Selector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              {ECOMMERCE_DATA.services.map((srv) => {
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
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#101014] border-[#D4AF37] text-white shadow-lg'
                        : 'bg-black/40 border-white/[0.08] text-[#A7A7A7] hover:bg-black/70 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-white/[0.05] text-[#D4AF37] group-hover:bg-white/10'
                        }`}
                      >
                        {srv.number}
                      </div>
                      <div>
                        <div className="text-sm font-bold font-display text-white">{srv.title}</div>
                        <div className="text-[10px] font-mono text-[#A7A7A7] truncate max-w-[200px]">
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

            {/* Service Detail Panel */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0b0b0f]/95 border border-[#D4AF37]/30 backdrop-blur-2xl space-y-6">
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
                  {t('common.deliverablesFeatures')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E6C766] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span>{t('common.readyForDeployment')}</span>
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
              {t('common.ecommerceComparisonDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {ECOMMERCE_DATA.beforeAfter.map((item, idx) => (
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

      {/* 4. PROJECT SHOWCASE SECTION (STRUCTURED PLACEHOLDERS) */}
      {activeTab === 'showcase' && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              {t('common.portfolioShowcase')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {t('common.ecommerceProjectShowcase')}
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              {t('common.ecommerceProjectsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ECOMMERCE_DATA.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-[#0b0b0f]/90 border border-white/10 space-y-6 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold text-lg font-display">{proj.name}</span>
                    <span className="text-[#D4AF37] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                      {proj.market}
                    </span>
                  </div>

                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Project Images Matrix */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">{t('common.storefront')}</div>
                      <img src={proj.mainImage} alt="Storefront" className="w-full h-16 object-cover rounded" />
                    </div>

                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">{t('common.mobile')}</div>
                      <img src={proj.mobile} alt="Mobile" className="w-full h-16 object-cover rounded" />
                    </div>

                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">{t('common.dashboard')}</div>
                      <img src={proj.dashboard} alt="Dashboard" className="w-full h-16 object-cover rounded" />
                    </div>

                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">{t('common.analytics')}</div>
                      <img src={proj.analytics} alt="Analytics" className="w-full h-16 object-cover rounded" />
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
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0e0e14]/95 via-[#0a0a0d]/95 to-[#14120a]/95 border border-[#D4AF37]/40 backdrop-blur-2xl text-center space-y-6 gold-glow">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t('common.buildYourCommerceArchitecture')}</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          {t('common.readyToEngineerCommerceSolutions')}
        </h3>

        <p className="text-sm text-[#A7A7A7] font-light max-w-2xl mx-auto leading-relaxed">
          {t('common.bookCommerceConsultation')}
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
