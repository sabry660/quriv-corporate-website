import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  LayoutDashboard,
  CreditCard,
  Boxes,
  ShoppingBasket,
  UserCheck,
  BarChart3,
  Search,
  Megaphone,
  ArrowRight,
  ExternalLink,
  Smartphone,
  Monitor,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface EcommerceSolutionsProps {
  onOpenBookMeeting: () => void;
  onBack?: () => void;
}

export const ECOMMERCE_DATA = {
  title: 'E-Commerce Solutions',
  subtitle: 'Scalable, High-Performance Digital Commerce Ecosystems',
  intro:
    'Quriv helps brands scale and sell globally through custom, high-concurrency e-commerce architectures engineered for lightning-fast speeds, seamless payment processing, and high-conversion checkout experiences.',

  /* 9 SPECIFIC SERVICES */
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
    },
  ],

  /* PROJECT SHOWCASE PLACEHOLDERS */
  projects: [
    {
      id: 'ecom-proj-1',
      name: '[ E-Commerce Partner Brand ]',
      market: '[ Global Direct-to-Consumer ]',
      description:
        'High-concurrency online storefront engineered with custom product configurators, localized currency switching, and automated warehouse fulfillment.',
      servicesUsed: ['Online Store Development', 'Admin Dashboard', 'Payment Gateway Integration', 'Analytics'],
      mainImagePlaceholder: 'Placeholder Project Image',
      mobileScreensPlaceholder: 'Placeholder Mobile Screens',
      dashboardPlaceholder: 'Placeholder Dashboard',
      analyticsPlaceholder: 'Placeholder Analytics',
    },
    {
      id: 'ecom-proj-2',
      name: '[ Retail Enterprise Platform ]',
      market: '[ Multi-Region Retailer ]',
      description:
        'Enterprise multi-brand commerce portal featuring real-time inventory synchronization across 15 physical stores and an integrated customer accounts system.',
      servicesUsed: ['Inventory Management', 'Order Management', 'Customer Accounts', 'SEO', 'Marketing'],
      mainImagePlaceholder: 'Placeholder Project Image',
      mobileScreensPlaceholder: 'Placeholder Mobile Screens',
      dashboardPlaceholder: 'Placeholder Dashboard',
      analyticsPlaceholder: 'Placeholder Analytics',
    },
  ],
};

export const EcommerceSolutions: React.FC<EcommerceSolutionsProps> = ({ onOpenBookMeeting, onBack }) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'showcase' | 'previews'>('overview');
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
                &larr; {t('industries.allSolutions')}
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
              <span>Book a Meeting</span>
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
              Explore 9 Services
            </button>
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'services', label: '9 Core Services' },
            { id: 'previews', label: 'System Previews' },
            { id: 'showcase', label: 'Project Showcase' },
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
              SYSTEM ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Interactive Commerce System Previews
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Preview the components of our e-commerce platforms across storefronts, management dashboards, mobile screens, and analytics telemetry.
            </p>
          </div>

          {/* Interactive Preview Mode Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'storefront', label: 'Online Storefront' },
              { id: 'dashboard', label: 'Admin Dashboard' },
              { id: 'mobile', label: 'Mobile Screens' },
              { id: 'analytics', label: 'Analytics Telemetry' },
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
                  <h4 className="text-xl font-bold font-display text-white">Online Storefront Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Interactive storefront preview placeholder displaying fluid product listing grid, dynamic filtering options, localized pricing, and sub-second checkout drawer.
                  </p>
                </div>
              )}

              {previewMode === 'dashboard' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <LayoutDashboard className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Admin Dashboard Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Real-time admin console preview placeholder featuring inventory management, order routing telemetry, SKU updates, and multi-channel synchronization controls.
                  </p>
                </div>
              )}

              {previewMode === 'mobile' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Mobile Screens Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Responsive mobile shopping app screen placeholders featuring swipeable product galleries, one-touch Apple Pay checkout, and instant order tracking.
                  </p>
                </div>
              )}

              {previewMode === 'analytics' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Analytics Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Commerce analytics report preview placeholder visualizing real-time sales velocity, conversion funnels, customer acquisition metrics, and revenue projections.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. THE 9 CORE SERVICES SECTION */}
      {(activeTab === 'services' || activeTab === 'overview') && (
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
                        isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-white/20'
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
                  <span>SERVICE {selectedService.number} // SPECIFICATION</span>
                </div>
                <h4 className="text-2xl font-bold font-display text-white">{selectedService.title}</h4>
                <div className="text-xs font-mono text-[#D4AF37]">{selectedService.tagline}</div>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="text-xs font-mono text-white uppercase tracking-wider">
                  Deliverables & Features
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
                <span className="text-xs font-mono text-[#A7A7A7]">READY FOR DEPLOYMENT</span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase font-display hover:bg-[#E6C766] transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROJECT SHOWCASE SECTION (STRUCTURED PLACEHOLDERS) */}
      {(activeTab === 'showcase' || activeTab === 'overview') && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              PORTFOLIO SHOWCASE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              E-Commerce Project Showcase
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Structured placeholders for custom e-commerce platforms and retail architectures.
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

                  {/* Placeholder Frames Matrix */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">STOREFRONT</div>
                      <div className="text-xs font-mono text-[#A7A7A7]">{proj.mainImagePlaceholder}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">MOBILE</div>
                      <div className="text-xs font-mono text-[#A7A7A7]">{proj.mobileScreensPlaceholder}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">DASHBOARD</div>
                      <div className="text-xs font-mono text-[#A7A7A7]">{proj.dashboardPlaceholder}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase">ANALYTICS</div>
                      <div className="text-xs font-mono text-[#A7A7A7]">{proj.analyticsPlaceholder}</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-[10px] font-mono text-[#A7A7A7] uppercase">Integrated Services:</div>
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
                  <span>Editable Project Specification</span>
                  <span>Ready for Live Data</span>
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
          <span>START YOUR E-COMMERCE ARCHITECTURE</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Ready to Scale Your Online Store?
        </h3>

        <p className="text-sm text-[#A7A7A7] font-light max-w-2xl mx-auto leading-relaxed">
          Consult our technical architecture team to map out your online store development, payment gateway integration, and high-concurrency order management system.
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
            <span>Book a Meeting</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
