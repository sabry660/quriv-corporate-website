import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  UserCheck,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  FileText,
  Megaphone,
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Lock,
  LineChart,
  FileSpreadsheet,
  Globe,
  KeyRound
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface FintechSolutionsProps {
  onOpenBookMeeting: () => void;
  onBack?: () => void;
}

export const FINTECH_DATA = {
  title: 'Financial Technology Solutions',
  subtitle: 'Bank-Grade Engineering for Institutional & Retail Financial Services',
  intro:
    'Quriv designs and engineers high-security, compliant financial technology platforms—from enterprise corporate websites and client portals to real-time administrative telemetry and automated regulatory reporting.',

  /* 10 SPECIFIC SERVICES */
  services: [
    {
      id: 'corporate-website',
      number: '01',
      title: 'Corporate Website',
      tagline: 'High-Trust Web Properties for Financial Institutions',
      description:
        'Bespoke, high-security corporate web platforms engineered with ultra-fast global content delivery, strict access controls, and authoritative brand presentation.',
      icon: Building2,
      highlights: [
        'Institutional Brand Presentation',
        'Sub-100ms Global Edge Performance',
        'SOC-2 Compliant Architecture',
        'Regulatory Disclosures & Investor Relations Portals',
      ],
    },
    {
      id: 'customer-portal',
      number: '02',
      title: 'Customer Portal',
      tagline: 'Secure Client Account Management & Asset Telemetry',
      description:
        'Encrypted web client portals enabling users to monitor portfolios, initiate transfers, request documentation, and securely communicate with advisors.',
      icon: UserCheck,
      highlights: [
        'Real-Time Portfolio Tracking',
        'Encrypted Document Vault',
        'Direct Advisor Communication Channel',
        'Custom Account Statement Generation',
      ],
    },
    {
      id: 'dashboard',
      number: '03',
      title: 'Dashboard',
      tagline: 'Institutional Operations & Liquidity Management',
      description:
        'High-concurrency administrative control centers giving financial officers real-time visibility across balances, ledger updates, and operational workflows.',
      icon: LayoutDashboard,
      highlights: [
        'Real-Time Ledger & Balance Telemetry',
        'Role-Based Executive Access Control',
        'Audit Logging & Activity Trails',
        'Transaction Approval Workflows',
      ],
    },
  ],

  /* PROJECT SHOWCASE PLACEHOLDERS */
  projects: [
    {
      id: 'fintech-proj-1',
      name: '[ Financial Institution Name ]',
      sector: '[ Institutional Wealth Management ]',
      description:
        'Bank-grade digital portal featuring an encrypted customer dashboard, multi-factor passkey authentication, and automated quarterly statement exports.',
      servicesUsed: ['Corporate Website', 'Customer Portal', 'Secure Authentication', 'Reporting', 'Analytics'],
      mainImagePlaceholder: 'Placeholder Institutional Portal',
      dashboardPlaceholder: 'Placeholder Executive Dashboard',
      securityPlaceholder: 'Placeholder Security Architecture',
    },
    {
      id: 'fintech-proj-2',
      name: '[ Asset Management Firm ]',
      sector: '[ Global Investment Services ]',
      description:
        'High-performance corporate website with integrated client portal, real-time portfolio telemetry, and compliant marketing acquisition funnels.',
      servicesUsed: ['Corporate Website', 'Dashboard', 'Analytics', 'Marketing', 'Monthly Consulting'],
      mainImagePlaceholder: 'Placeholder Institutional Portal',
      dashboardPlaceholder: 'Placeholder Executive Dashboard',
      securityPlaceholder: 'Placeholder Security Architecture',
    },
  ],
};

export const FintechSolutions: React.FC<FintechSolutionsProps> = ({
  onOpenBookMeeting,
  onBack,
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'previews' | 'showcase'>('overview');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('corporate-website');
  const [previewMode, setPreviewMode] = useState<'portal' | 'dashboard' | 'auth' | 'reporting'>('portal');

  const selectedService =
    FINTECH_DATA.services.find((s) => s.id === selectedServiceId) || FINTECH_DATA.services[0];

  return (
    <div className="space-y-12 py-4 text-white relative">
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0a0a0f]/95 via-[#0d0d14]/95 to-[#08080c]/95 border border-[#D4AF37]/35 backdrop-blur-2xl p-8 sm:p-12 gold-glow overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#E6C766]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>FINANCIAL TECHNOLOGY ARCHITECTURE</span>
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
            {FINTECH_DATA.title}
          </h2>

          <p className="text-base sm:text-lg text-[#FFFFFF]/90 font-light leading-relaxed max-w-3xl">
            {FINTECH_DATA.intro}
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
              Explore 10 Services
            </button>
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'services', label: '10 Services' },
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
              Financial Platform System Previews
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Preview bank-grade client portals, executive dashboards, zero-trust authentication pipelines, and automated reporting interfaces.
            </p>
          </div>

          {/* Interactive Preview Mode Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'portal', label: 'Customer Portal' },
              { id: 'dashboard', label: 'Admin Dashboard' },
              { id: 'auth', label: 'Secure Auth (MFA)' },
              { id: 'reporting', label: 'Automated Reporting' },
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
          <div className="p-8 rounded-3xl bg-[#0b0b10]/90 border border-white/10 backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#A7A7A7] border-b border-white/10 pb-4">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-white font-mono uppercase">
                  FinTech Surface // {previewMode.toUpperCase()}
                </span>
              </span>
              <span className="text-[#D4AF37]">ENCRYPTED BANK-GRADE TELEMETRY</span>
            </div>

            <div className="py-10 px-6 bg-[#040407] rounded-2xl border border-white/5 min-h-[300px] flex items-center justify-center text-center">
              {previewMode === 'portal' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Client Portal Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Client account portal preview placeholder demonstrating encrypted asset tracking, real-time account balances, document vaults, and advisor messaging.
                  </p>
                </div>
              )}

              {previewMode === 'dashboard' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <LayoutDashboard className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Operations Dashboard Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Administrative control center preview placeholder highlighting real-time transaction ledger monitors, multi-user role assignments, and audit logs.
                  </p>
                </div>
              )}

              {previewMode === 'auth' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Authentication & Identity Pipeline Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Zero-trust security architecture preview placeholder illustrating hardware passkey verification, multi-factor authorization, and biometric sign-in steps.
                  </p>
                </div>
              )}

              {previewMode === 'reporting' && (
                <div className="space-y-4 max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Automated Reporting Engine Preview Placeholder</h4>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    Automated financial statement compiler preview placeholder demonstrating scheduled tax document exports, PDF generation, and regulatory compliance formatting.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. THE 10 SERVICES SECTION */}
      {(activeTab === 'services' || activeTab === 'overview') && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              END-TO-END SERVICES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              The 10 FinTech Services
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Custom financial technology engineering built to meet rigorous security, compliance, and operational standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Service Navigation Column */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
              {FINTECH_DATA.services.map((srv) => {
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
                        ? 'bg-[#101018] border-[#D4AF37] text-white shadow-lg'
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
                        isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-white/20'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Service Specification Display Panel */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0b0b10]/95 border border-[#D4AF37]/30 backdrop-blur-2xl space-y-6">
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
                  Deliverables & Highlights
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
                <span className="text-xs font-mono text-[#A7A7A7]">INSTITUTIONAL GRADE</span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase font-display hover:bg-[#E6C766] transition-colors cursor-pointer"
                >
                  Book a Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROJECT SHOWCASE (STRUCTURED PLACEHOLDERS) */}
      {(activeTab === 'showcase' || activeTab === 'overview') && (
        <div className="space-y-8">
          <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              PORTFOLIO SHOWCASE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              FinTech Projects Showcase
            </h3>
            <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
              Structured placeholders for financial technology platforms and institutional wealth management portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FINTECH_DATA.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-[#0b0b10]/90 border border-white/10 space-y-6 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold text-lg font-display">{proj.name}</span>
                    <span className="text-[#D4AF37] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                      {proj.sector}
                    </span>
                  </div>

                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Placeholder Frames Matrix */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[9px] font-mono text-[#D4AF37] uppercase">PORTAL</div>
                      <div className="text-[11px] font-mono text-[#A7A7A7]">{proj.mainImagePlaceholder}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[9px] font-mono text-[#D4AF37] uppercase">DASHBOARD</div>
                      <div className="text-[11px] font-mono text-[#A7A7A7]">{proj.dashboardPlaceholder}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-center space-y-1">
                      <div className="text-[9px] font-mono text-[#D4AF37] uppercase">SECURITY</div>
                      <div className="text-[11px] font-mono text-[#A7A7A7]">{proj.securityPlaceholder}</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-[10px] font-mono text-[#A7A7A7] uppercase">Services Implemented:</div>
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
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c0c12]/95 via-[#08080c]/95 to-[#121018]/95 border border-[#D4AF37]/40 backdrop-blur-2xl text-center space-y-6 gold-glow">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>BUILD YOUR FINTECH ARCHITECTURE</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Ready to Engineer High-Security Financial Solutions?
        </h3>

        <p className="text-sm text-[#A7A7A7] font-light max-w-2xl mx-auto leading-relaxed">
          Schedule a technical consultation with our software architects to review client portal requirements, security authentication pipelines, and automated reporting systems.
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
