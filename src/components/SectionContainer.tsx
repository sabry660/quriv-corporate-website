import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionId, CameraKeyframe } from '../types';
import { CAMERA_KEYFRAMES } from './Background3D';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n.tsx';
import { HospitalitySolutions } from './HospitalitySolutions';
import { EcommerceSolutions } from './EcommerceSolutions';
import { FoodIndustrySolutions } from './FoodIndustrySolutions';
import { FintechSolutions } from './FintechSolutions';
import { WorkGallery } from './WorkGallery';
import { PartnersMarquee } from './PartnersMarquee';
import { TeamShowcase } from './TeamShowcase';
import { LocationsShowcase } from './LocationsShowcase';
import { FaqAccordion } from './FaqAccordion';
import { ContactShowcase } from './ContactShowcase';
import {
  PARTNERS_DATA,
  TECHNOLOGIES_LIST,
  CORE_SERVICES_LIST,
  ENGINEERING_FLOW,
  DETAILED_INDUSTRIES_DATA,
  PROCESS_STEPS,
  ABOUT_EXHIBIT_DATA,
} from '../data/siteData';

// Counter animation component
const Counter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [displayText, setDisplayText] = useState(value);

  useEffect(() => {
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) {
      setDisplayText(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[1], 10);
    const suffix = value.replace(numericMatch[0], '');

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  useEffect(() => {
    const numericMatch = value.match(/(\d+)/);
    if (numericMatch) {
      const suffix = value.replace(numericMatch[0], '');
      setDisplayText(`${count}${suffix}`);
    }
  }, [count, value]);

  return <span>{displayText}</span>;
};

interface SectionContainerProps {
  id: SectionId;
  title: string;
  subtitle: string;
  cameraKeyframe: CameraKeyframe;
  onOpenBookMeeting: () => void;
  roomCode?: string;
  lightingTheme?:
    | 'warm-gold'
    | 'soft-white'
    | 'cool-gold'
    | 'museum-spotlight'
    | 'dark-cinematic'
    | 'alliance-corridor'
    | 'engineering-studio'
    | 'global-presence'
    | 'knowledge-library'
    | 'mission-control';
  children?: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  title,
  subtitle,
  roomCode,
  lightingTheme = 'warm-gold',
  children,
}) => {
  return (
    <section
      id={id}
      data-section={id}
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/[0.06]"
    >
      {/* Dynamic Spatial Museum Lighting Atmosphere Overlay */}
      {lightingTheme === 'warm-gold' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      )}
      {lightingTheme === 'soft-white' && (
        <div className="absolute -top-20 left-1/4 w-[600px] h-[400px] bg-white/[0.03] rounded-full blur-[180px] pointer-events-none" />
      )}
      {lightingTheme === 'cool-gold' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#D4AF37]/5 to-black/60 pointer-events-none" />
      )}
      {lightingTheme === 'museum-spotlight' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#D4AF37]/15 via-[#E6C766]/5 to-transparent blur-[120px] pointer-events-none" />
      )}
      {lightingTheme === 'dark-cinematic' && (
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-80" />
      )}
      {lightingTheme === 'alliance-corridor' && (
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
      )}
      {lightingTheme === 'engineering-studio' && (
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#E6C766]/5 rounded-full blur-[140px] pointer-events-none" />
      )}
      {lightingTheme === 'global-presence' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-[#D4AF37]/10 rounded-full animate-ping-slow pointer-events-none" />
      )}
      {lightingTheme === 'knowledge-library' && (
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      )}
      {lightingTheme === 'mission-control' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#D4AF37]/10 via-[#E6C766]/5 to-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />
      )}

      {/* Main Spatial Stage Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Room Header Exhibit Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/[0.08] gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010]/80 border border-[#D4AF37]/30 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#E6C766] mb-4 gold-glow backdrop-blur-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>{roomCode || `QURIV // ${id.toUpperCase()}`}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              {title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#A7A7A7] max-w-md font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Section Content Body */}
        {children}
      </div>
    </section>
  );
};

/* ========================================================================
   1. ABOUT SECTION (MUSEUM EXHIBIT ROOM 01: FOUNDATION & ARCHITECTURE)
   ======================================================================== */
export const AboutSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  return (
    <SectionContainer
      id="about"
      title={t('about.title')}
      subtitle={t('about.subtitle')}
      roomCode="QURIV // ARCHITECTURAL FOUNDATION"
      lightingTheme="soft-white"
      cameraKeyframe={CAMERA_KEYFRAMES.about}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <div className="space-y-12">
        {/* Company Introduction Block - Asymmetric Floating Glass Manifesto */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0e0e]/80 border border-white/10 backdrop-blur-2xl relative overflow-hidden space-y-6">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white leading-tight">
                Crafting Software That Defines Digital Markets.
              </h3>
              <p className="text-sm sm:text-base text-[#A7A7A7] font-light leading-relaxed">
                {ABOUT_EXHIBIT_DATA.introduction}
              </p>
            </div>

            {/* Live Telemetry Pillar */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs text-[#A7A7A7]">
              <div className="text-[10px] text-[#E6C766] uppercase tracking-widest border-b border-white/[0.08] pb-2 flex justify-between items-center">
                <span>HEADQUARTERS TELEMETRY</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-white">Alexandria, Egypt</span>
              </div>
              <div className="flex justify-between">
                <span>ENGAGEMENT:</span>
                <span className="text-[#E6C766]">International</span>
              </div>
              <div className="flex justify-between">
                <span>DELIVERY:</span>
                <span className="text-white">Full Source Transfer</span>
              </div>
            </div>
          </div>

          {/* Interactive Mission / Vision Exhibition Display */}
          <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('mission');
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  activeTab === 'mission'
                    ? 'bg-[#101010] border-[#D4AF37] text-white gold-glow'
                    : 'bg-black/40 border-white/[0.06] text-[#A7A7A7] hover:bg-black/80 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-1">FOUNDATIONAL MANIFESTO</div>
                <div className="text-base font-bold font-display">Our Mission</div>
              </button>

              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('vision');
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  activeTab === 'vision'
                    ? 'bg-[#101010] border-[#D4AF37] text-white gold-glow'
                    : 'bg-black/40 border-white/[0.06] text-[#A7A7A7] hover:bg-black/80 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-1">LONG-TERM BENCHMARK</div>
                <div className="text-base font-bold font-display">Our Vision</div>
              </button>
            </div>

            <div className="lg:col-span-8 p-6 rounded-2xl bg-black/60 border border-white/10 min-h-[160px] flex items-center">
              <AnimatePresence mode="wait">
                {activeTab === 'mission' && (
                  <motion.p
                    key="mission"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm sm:text-base text-white/90 font-light leading-relaxed italic"
                  >
                    "{ABOUT_EXHIBIT_DATA.mission}"
                  </motion.p>
                )}
                {activeTab === 'vision' && (
                  <motion.p
                    key="vision"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm sm:text-base text-white/90 font-light leading-relaxed italic"
                  >
                    "{ABOUT_EXHIBIT_DATA.vision}"
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Core Values - Asymmetric Museum Plaques */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
              ENGINEERING PRINCIPLES
            </div>
            <h4 className="text-2xl font-bold font-display text-white">Core Values</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_EXHIBIT_DATA.coreValues.map((val, idx) => (
              <div
                key={val.id}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-6 rounded-2xl bg-[#101010]/80 border border-white/[0.08] hover:border-[#D4AF37]/50 backdrop-blur-xl transition-all hover:-translate-y-1 group space-y-3 ${
                  idx % 2 === 1 ? 'lg:translate-y-4' : ''
                }`}
              >
                <div className="text-xs font-mono text-[#E6C766] border-b border-white/[0.06] pb-2 flex justify-between items-center">
                  <span>PLAQUE {val.number}</span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h5 className="text-lg font-bold font-display text-white group-hover:text-[#E6C766] transition-colors">
                  {val.title}
                </h5>
                <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Museum Timeline */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0d0d]/80 border border-white/10 backdrop-blur-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{t('about.chronologicalMilestones')}</div>
              <h4 className="text-2xl font-bold font-display text-white mt-1">{t('about.companyTimeline')}</h4>
            </div>
            <div className="text-xs font-mono text-[#A7A7A7]">{t('about.structuredEvolution')}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {ABOUT_EXHIBIT_DATA.timeline.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundManager.playHover()}
                className="p-5 rounded-2xl bg-black/60 border border-white/10 relative space-y-3 hover:border-[#D4AF37]/60 transition-all group"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#D4AF37]/10 text-[10px] font-mono font-bold text-[#E6C766]">
                  {item.stage}
                </div>
                <h5 className="text-base font-bold font-display text-white group-hover:text-[#E6C766] transition-colors">
                  {item.title}
                </h5>
                <div className="text-[11px] font-mono text-[#A7A7A7]">{item.subtitle}</div>
                <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Counter Column Wall */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-black via-[#101010]/90 to-black border border-[#D4AF37]/30 gold-glow">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_EXHIBIT_DATA.achievements.map((ach, idx) => (
              <div key={idx} className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#E6C766]"><Counter value={ach.value} /></div>
                <div className="text-xs font-bold font-display text-white mt-2">{ach.label}</div>
                <div className="text-[10px] font-mono text-[#A7A7A7] mt-1">{ach.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Quriv Block */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e0e]/80 border border-white/10 backdrop-blur-2xl space-y-6">
          <div className="max-w-xl space-y-2">
            <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">WHY CLIENTS CHOOSE QURIV</div>
            <h4 className="text-2xl font-bold font-display text-white">Minimal & Purpose-Built Architecture</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_EXHIBIT_DATA.whyQuriv.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-black/60 border border-white/[0.08] hover:border-[#D4AF37]/40 transition-all space-y-3"
              >
                <h5 className="text-base font-bold font-display text-white">{item.title}</h5>
                <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#A7A7A7]">QURIV SOFTWARE ARCHITECTURE SUITE V4</span>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBookMeeting();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all"
            >
              Consult Architecture Team
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

/* ========================================================================
   2. TECHNOLOGIES SECTION (TECHNOLOGY LABORATORY + SYSTEM ARCHITECTURE BLUEPRINT)
   ======================================================================== */
export const TechnologiesSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  const [selectedTechId, setSelectedTechId] = useState<string>('react');
  const [activeFlowIndex, setActiveFlowIndex] = useState<number>(0);
  const [activeServiceId, setActiveServiceId] = useState<string>('website-dev');

  const selectedTech = TECHNOLOGIES_LIST.find((t) => t.id === selectedTechId) || TECHNOLOGIES_LIST[0];
  const activeFlowStep = ENGINEERING_FLOW[activeFlowIndex] || ENGINEERING_FLOW[0];
  const selectedService = CORE_SERVICES_LIST.find((s) => s.id === activeServiceId) || CORE_SERVICES_LIST[0];

  return (
    <SectionContainer
      id="technologies"
      title={t('technologies.title')}
      subtitle={t('technologies.subtitle')}
      roomCode="QURIV // TECHNOLOGY STACK"
      lightingTheme="cool-gold"
      cameraKeyframe={CAMERA_KEYFRAMES.technologies}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <div className="space-y-16 relative">
        {/* Spatial Background Typography Wall Accent */}
        <div className="absolute -top-12 left-0 right-0 pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap text-center">
          <span className="text-[120px] sm:text-[180px] font-extrabold font-display uppercase tracking-tighter text-white">
            LABORATORY // SPECS
          </span>
        </div>

        {/* ========================================================================
           EXHIBIT PART A: CORE TECHNOLOGY SPECIFICATION EXHIBITION
           ======================================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.08] pb-4 gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#E6C766]">
                FRAMEWORK SPECIFICATIONS
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase">PURE TYPOGRAPHY // NO LOGOS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Asymmetrical Pure Typography Exhibit List (8 Techs ONLY) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {TECHNOLOGIES_LIST.map((tech, idx) => {
                const isSelected = tech.id === selectedTechId;
                const paddedIndex = String(idx + 1).padStart(2, '0');

                return (
                  <div
                    key={tech.id}
                    tabIndex={0}
                    role="button"
                    aria-selected={isSelected}
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedTechId(tech.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        soundManager.playClick();
                        setSelectedTechId(tech.id);
                      }
                    }}
                    className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isSelected
                        ? 'bg-[#101010]/90 border-[#D4AF37] gold-glow shadow-[0_0_30px_rgba(212,175,55,0.25)] -translate-y-0.5'
                        : 'bg-[#0a0a0c]/50 border-white/[0.08] hover:border-white/25 hover:bg-[#0f0f13]/70 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Subtle hover light reflection line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-[#D4AF37] opacity-80">{paddedIndex}</span>
                        <span className="text-lg font-extrabold font-display text-white tracking-wide group-hover:text-[#E6C766] transition-colors">
                          {tech.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-wider hidden sm:inline">
                          {tech.category}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            isSelected ? 'bg-[#D4AF37] scale-125 shadow-[0_0_8px_#D4AF37]' : 'bg-white/20 group-hover:bg-white/50'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Floating Glass Architectural Spec Display Board */}
            <div className="lg:col-span-7 lg:-mt-2 p-8 sm:p-10 rounded-3xl bg-[#0b0b0e]/80 border border-white/10 backdrop-blur-2xl space-y-8 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="text-[10px] font-mono text-[#E6C766] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    {selectedTech.category} SPECIFICATION
                  </span>
                  <span className="text-xs font-mono text-[#A7A7A7]">LAB_ID // {selectedTech.id.toUpperCase()}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                    {selectedTech.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A7A7A7] font-light leading-relaxed">
                    {selectedTech.description}
                  </p>
                </div>

                {/* Code-Inspired Digital Blueprint Specification Console */}
                <div className="p-5 rounded-2xl bg-black/90 border border-white/10 space-y-3 font-mono text-xs text-[#E6C766]">
                  <div className="flex items-center justify-between text-[10px] text-[#A7A7A7] uppercase border-b border-white/[0.08] pb-2">
                    <span>// SYSTEM_SPECIFICATION_V4</span>
                    <span className="text-emerald-400">&bull; VERIFIED</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-white/90">
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">RUNTIME EXECUTION:</span>
                      <span className="text-[#E6C766]">LOW-LATENCY EDGE COMPATIBLE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">TYPE SYSTEM:</span>
                      <span>STRICT TYPE-SAFE ARCHITECTURE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">SCALE CAPACITY:</span>
                      <span className="text-emerald-300">ENTERPRISE CONCURRENCY</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#A7A7A7]">ARCHITECTURE COMPLIANT</span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all"
                >
                  Consult Architecture Team
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================
           EXHIBIT PART B: SYSTEM ARCHITECTURE BLUEPRINT (ENGINEERING FLOW)
           ======================================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09090b]/85 border border-[#D4AF37]/30 backdrop-blur-2xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>ENGINEERING FLOW</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                System Architecture Blueprint
              </h4>
            </div>
            <div className="text-xs font-mono text-[#E6C766] bg-[#D4AF37]/10 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30">
              SEQUENTIAL SYSTEM PIPELINE
            </div>
          </div>

          {/* Interactive Flow Stage Selector Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ENGINEERING_FLOW.map((step, idx) => {
              const isActive = idx === activeFlowIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveFlowIndex(idx);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 font-mono text-xs flex flex-col justify-between min-h-[90px] ${
                    isActive
                      ? 'bg-[#101010] border-[#D4AF37] text-white gold-glow shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'bg-black/40 border-white/[0.06] text-[#A7A7A7] hover:bg-black/70 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] text-[#D4AF37] font-bold">{step.stepNumber}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/20'}`} />
                  </div>
                  <div className="font-bold text-xs font-display text-white mt-2">{step.stage}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Flow Step Blueprint Display Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-white/10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="text-[10px] font-mono text-[#E6C766] uppercase tracking-widest">
                  STAGE {activeFlowStep.stepNumber} // {activeFlowStep.stage.toUpperCase()} LAYER
                </div>
                <h5 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  {activeFlowStep.title}
                </h5>
              </div>

              {/* Technologies Linked to This Pipeline Stage */}
              <div className="flex flex-wrap gap-2">
                {activeFlowStep.techs.map((techName, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#E6C766]"
                  >
                    {techName}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
              {activeFlowStep.blueprintSpec}
            </p>

            {/* Architectural System Diagram Code Simulation Box */}
            <div className="p-4 rounded-xl bg-[#08080a] border border-white/[0.08] font-mono text-[11px] text-[#A7A7A7] space-y-2">
              <div className="text-[10px] text-[#D4AF37] uppercase font-bold">// ARCHITECTURAL PIPELINE DATA FLOW</div>
              <div className="text-white/80 overflow-x-auto whitespace-nowrap py-1">
                [CLIENT_UI] ==&gt; [LOGIC_CORE] ==&gt; [GATEWAY_RPC] ==&gt; [ACID_STORE] ==&gt; [AWS_EDGE] ==&gt; [CICD_ROLLOUT]
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================
           EXHIBIT PART C: DEVELOPMENT CONTROL CENTER (CORE SERVICES SUITE)
           ======================================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0a0a0d]/80 border border-white/10 backdrop-blur-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">DEVELOPMENT CONTROL CENTER</div>
              <h4 className="text-2xl font-bold font-display text-white mt-1">Core Services Suite</h4>
            </div>
            <div className="text-xs font-mono text-[#E6C766]">8 OFFICIAL SERVICES</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Toggles */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {CORE_SERVICES_LIST.map((srv) => (
                <button
                  key={srv.id}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveServiceId(srv.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all font-mono text-xs flex items-center justify-between ${
                    srv.id === activeServiceId
                      ? 'bg-[#101010] border-[#D4AF37] text-white gold-glow'
                      : 'bg-black/40 border-white/[0.06] text-[#A7A7A7] hover:bg-black/80 hover:text-white'
                  }`}
                >
                  <span>{srv.name}</span>
                  <span className="text-[10px] text-[#D4AF37]">&bull;</span>
                </button>
              ))}
            </div>

            {/* Service Monitor */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-6 flex flex-col justify-between min-h-[280px]">
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-[#E6C766] uppercase tracking-widest">
                  SERVICE MODULE SPECIFICATION
                </div>
                <h5 className="text-2xl font-bold font-display text-white">{selectedService.name}</h5>
                <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#A7A7A7]">TRANSFER STATUS: BINDING</span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  className="px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  Request Service Brief
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

/* ========================================================================
   3. PROCESS SECTION (DEVELOPMENT PROCESS / HOW WE WORK)
   ======================================================================== */
export const ProcessSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];

  return (
    <SectionContainer
      id="process"
      title={t('process.title')}
      subtitle={t('process.subtitle')}
      roomCode="QURIV // DEVELOPMENT PROCESS"
      lightingTheme="cool-gold"
      cameraKeyframe={CAMERA_KEYFRAMES.process}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <div className="space-y-12 relative">
        {/* Spatial Background Typography Wall Accent */}
        <div className="absolute -top-10 left-0 right-0 pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap text-center">
          <span className="text-[100px] sm:text-[160px] font-extrabold font-display uppercase tracking-tighter text-white">
            PROCESS // WORKFLOW
          </span>
        </div>

        {/* Introduction Narrative Paragraph */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0d]/80 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>END-TO-END PRODUCT LIFECYCLE</span>
            </div>
            <p className="text-sm sm:text-base text-[#FFFFFF]/90 font-light leading-relaxed">
              Every successful digital product follows a structured process from idea to launch and continuous improvement. We combine strategic analysis, clean engineering, and rigorous testing to build scalable digital solutions for long-term growth.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto justify-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 font-mono text-xs text-[#E6C766]">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-white">07</span>
            <div className="text-[10px] text-[#A7A7A7] uppercase leading-tight">
              Structured<br />Phases
            </div>
          </div>
        </div>

        {/* Interactive Spatial 7-Phase Pipeline Selector */}
        <div className="space-y-8">
          {/* Phase Navigation Nodes Bar */}
          <div className="relative">
            {/* Background Floating Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/30 to-[#D4AF37]/10 -translate-y-1/2 pointer-events-none" />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPast = idx < activeStepIndex;

                return (
                  <button
                    key={step.id}
                    tabIndex={0}
                    role="button"
                    aria-selected={isActive}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveStepIndex(idx);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        soundManager.playClick();
                        setActiveStepIndex(idx);
                      }
                    }}
                    className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 font-mono text-xs flex flex-col justify-between min-h-[110px] backdrop-blur-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                      isActive
                        ? 'bg-[#101010] border-[#D4AF37] text-white gold-glow shadow-[0_0_25px_rgba(212,175,55,0.35)] -translate-y-1'
                        : isPast
                        ? 'bg-black/60 border-[#D4AF37]/30 text-white/80 hover:border-[#D4AF37] hover:bg-black/80'
                        : 'bg-black/40 border-white/[0.08] text-[#A7A7A7] hover:bg-black/70 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-bold ${isActive ? 'text-[#D4AF37]' : 'text-[#A7A7A7]'}`}>
                        PHASE {step.stepNumber}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive
                            ? 'bg-[#D4AF37] scale-125 shadow-[0_0_8px_#D4AF37] animate-pulse'
                            : isPast
                            ? 'bg-[#D4AF37]/60'
                            : 'bg-white/20 group-hover:bg-white/50'
                        }`}
                      />
                    </div>

                    {/* Step Title */}
                    <div className="mt-3">
                      <h4 className="font-extrabold font-display text-sm text-white group-hover:text-[#E6C766] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-[#A7A7A7] line-clamp-1 font-sans mt-0.5 font-light">
                        {step.summary}
                      </p>
                    </div>

                    {/* Bottom Progress Bar Indicator */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isActive ? 'w-full bg-[#D4AF37]' : isPast ? 'w-full bg-[#D4AF37]/40' : 'w-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Glass Showcase Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#0a0a0e]/90 border border-[#D4AF37]/40 backdrop-blur-3xl gold-glow relative overflow-hidden shadow-2xl space-y-8"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Showcase Panel Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#E6C766] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    PHASE {activeStep.stepNumber} OF 07 // {activeStep.title.toUpperCase()}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-2">
                    {activeStep.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#A7A7A7]">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveStepIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#D4AF37] hover:text-white disabled:opacity-30 disabled:hover:border-white/10 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    &larr; Previous Phase
                  </button>
                  <button
                    disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveStepIndex((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1));
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#E6C766] hover:bg-[#D4AF37] hover:text-black disabled:opacity-30 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    Next Phase &rarr;
                  </button>
                </div>
              </div>

              {/* Description & Overview */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider">
                  Phase Overview
                </h4>
                <p className="text-base sm:text-lg text-[#A7A7A7] font-light leading-relaxed max-w-4xl">
                  {activeStep.description}
                </p>
              </div>

              {/* Deliverables & Expected Outcome Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
                {/* Deliverables Column */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-black/70 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-white uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/[0.08] pb-2">
                      <span>Key Deliverables</span>
                      <span className="text-[10px] text-[#D4AF37] font-normal">{activeStep.deliverables.length} SPECIFIED ITEMS</span>
                    </div>

                    <div className="space-y-2.5">
                      {activeStep.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3 text-xs sm:text-sm font-mono text-white/90 hover:border-[#D4AF37]/40 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-[#A7A7A7] pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span>QUALITY VERIFIED</span>
                    <span className="text-emerald-400">&bull; STANDARD COMPLIANT</span>
                  </div>
                </div>

                {/* Expected Outcome Column */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0f0e0b] border border-[#D4AF37]/30 space-y-4 flex flex-col justify-between gold-glow">
                  <div>
                    <div className="text-xs font-mono text-[#E6C766] uppercase tracking-wider mb-3 border-b border-[#D4AF37]/20 pb-2">
                      Expected Outcome
                    </div>
                    <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                      {activeStep.expectedOutcome}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-[#A7A7A7]">PREDICTABLE EXECUTION</span>
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onOpenBookMeeting();
                      }}
                      className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold text-xs font-display uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all text-center cursor-pointer"
                    >
                      Start Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionContainer>
  );
};

/* ========================================================================
   4. PARTNERS SECTION (INFINITE ALLIANCE MARQUEES)
   ======================================================================== */
export const PartnersSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  return (
    <SectionContainer
      id="partners"
      title={t('partners.title')}
      subtitle={t('partners.subtitle')}
      roomCode="QURIV // ALLIANCE MARQUEE"
      lightingTheme="alliance-corridor"
      cameraKeyframe={CAMERA_KEYFRAMES.partners}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <PartnersMarquee onOpenBookMeeting={onOpenBookMeeting} />
    </SectionContainer>
  );
};

/* ========================================================================
   4. INDUSTRIES WE SERVE SECTION
   ======================================================================== */
export const IndustriesSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  const [selectedIndustry, setSelectedIndustry] = useState<'hospitality' | 'ecommerce' | 'food' | 'fintech' | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'projects' | 'gallery' | 'testimonials'>('services');

  const currentDetailedIndustry = selectedIndustry ? DETAILED_INDUSTRIES_DATA[selectedIndustry] : null;

  return (
    <SectionContainer
      id="industries"
      title={t('industries.title')}
      subtitle={t('industries.subtitle')}
      roomCode="QURIV // INDUSTRIES WE SERVE"
      lightingTheme="museum-spotlight"
      cameraKeyframe={CAMERA_KEYFRAMES.industries}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <div className="space-y-12 relative">
        {/* Introduction Paragraph */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0d]/80 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>DOMAIN SPECIFIC ENGINEERING</span>
            </div>
            <p className="text-sm sm:text-base text-[#FFFFFF]/90 font-light leading-relaxed">
              We engineer domain-specific software solutions tailored to the operational demands of four core industries. Each architecture is built from first principles to ensure high performance, security, and long-term scalability.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto justify-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 font-mono text-xs text-[#E6C766]">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-white">04</span>
            <div className="text-[10px] text-[#A7A7A7] uppercase leading-tight">
              Specialized<br />Sectors
            </div>
          </div>
        </div>

        {/* MAIN 4 INDUSTRIES INTERACTIVE LAYOUT (WHEN NO INDUSTRY IS EXPANDED) */}
        {!selectedIndustry && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* 1. Hospitality (Featured Wide Hero Card) */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Navigate to Hospitality solution"
              onClick={() => {
                soundManager.playCameraTransition();
                setSelectedIndustry('hospitality');
              }}
              onMouseEnter={() => soundManager.playHover()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  soundManager.playCameraTransition();
                  setSelectedIndustry('hospitality');
                }
              }}
              className="md:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-[#101014]/90 via-[#0a0a0d]/90 to-[#14120c]/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] backdrop-blur-2xl gold-glow group cursor-pointer transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all duration-700" />
              <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                    01 // HOSPITALITY
                  </span>
                  <span className="text-xs font-mono text-[#E6C766] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time PMS Sync</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-[#E6C766] transition-colors">
                    Hospitality
                  </h3>
                  <p className="text-sm text-[#A7A7A7] font-light leading-relaxed mt-2 max-w-xl">
                    High-concurrency reservation engines, real-time rate distribution gateways, and contactless mobile guest portals for luxury hotel groups and global booking networks.
                  </p>
                </div>
              </div>

              {/* Preview image placeholder banner */}
              <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 overflow-hidden shrink-0">
                    <img
                      src={DETAILED_INDUSTRIES_DATA.hospitality.heroImage}
                      alt="Hospitality Preview"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-xs font-mono">
                    <div className="text-white font-bold">Keyless Guest Portal</div>
                    <div className="text-[#A7A7A7] text-[10px]">Sub-250ms Rate Propagation</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] group-hover:text-white font-bold transition-colors">
                  <span>ENTER HOSPITALITY</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </div>

            {/* 2. E-Commerce */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Navigate to E-Commerce solution"
              onClick={() => {
                soundManager.playCameraTransition();
                setSelectedIndustry('ecommerce');
              }}
              onMouseEnter={() => soundManager.playHover()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  soundManager.playCameraTransition();
                  setSelectedIndustry('ecommerce');
                }
              }}
              className="md:col-span-5 p-8 rounded-3xl bg-[#0a0a0e]/90 border border-white/10 hover:border-[#D4AF37]/70 backdrop-blur-2xl group cursor-pointer transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6C766]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E6C766]/15 transition-all duration-700" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#E6C766] uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    02 // E-COMMERCE
                  </span>
                  <span className="text-xs font-mono text-[#E6C766] font-bold">&lt;150ms Load</span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold font-display text-white group-hover:text-[#E6C766] transition-colors">
                    E-Commerce
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed mt-2">
                    High-throughput storefronts, automated inventory synchronization, and custom checkout pipelines built for flash sale traffic spikes.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D4AF37] group-hover:text-white font-bold transition-colors">
                <span>EXPLORE E-COMMERCE</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </div>
            </div>

            {/* 3. Food Industry */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Navigate to Food Industry solution"
              onClick={() => {
                soundManager.playCameraTransition();
                setSelectedIndustry('food');
              }}
              onMouseEnter={() => soundManager.playHover()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  soundManager.playCameraTransition();
                  setSelectedIndustry('food');
                }
              }}
              className="md:col-span-6 p-8 rounded-3xl bg-[#0a0a0e]/90 border border-white/10 hover:border-[#D4AF37]/70 backdrop-blur-2xl group cursor-pointer transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    03 // FOOD INDUSTRY
                  </span>
                  <span className="text-xs font-mono text-[#D4AF37] font-bold">Sub-Minute Dispatch</span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold font-display text-white group-hover:text-[#E6C766] transition-colors">
                    Food Industry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed mt-2">
                    Order dispatch platforms, kitchen display systems (KDS), and real-time delivery tracking for multi-branch restaurant chains and cloud kitchens.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D4AF37] group-hover:text-white font-bold transition-colors">
                <span>EXPLORE FOOD ARCHITECTURE</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </div>
            </div>

            {/* 4. FinTech */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Navigate to FinTech solution"
              onClick={() => {
                soundManager.playCameraTransition();
                setSelectedIndustry('fintech');
              }}
              onMouseEnter={() => soundManager.playHover()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  soundManager.playCameraTransition();
                  setSelectedIndustry('fintech');
                }
              }}
              className="md:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0d]/90 via-[#101014]/90 to-[#12100a]/90 border border-white/10 hover:border-[#D4AF37]/70 backdrop-blur-2xl group cursor-pointer transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#E6C766] uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    04 // FINTECH
                  </span>
                  <span className="text-xs font-mono text-[#E6C766] font-bold">99.999% Accuracy</span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold font-display text-white group-hover:text-[#E6C766] transition-colors">
                    FinTech
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed mt-2">
                    Bank-grade payment gateways, double-entry immutable ledgers, and automated compliance telemetry for digital financial institutions.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D4AF37] group-hover:text-white font-bold transition-colors">
                <span>EXPLORE FINTECH SOLUTION</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </div>
            </div>
          </div>
        )}

        {/* DEDICATED HOSPITALITY SHOWCASE DESTINATION */}
        {selectedIndustry === 'hospitality' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="hospitality-solutions-destination"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedIndustry(null);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-mono text-[#D4AF37] hover:text-white hover:bg-white/10 transition-all cursor-pointer font-bold"
                >
                  <span>&larr; Return to All Industries</span>
                </button>
              </div>

              <HospitalitySolutions onOpenBookMeeting={onOpenBookMeeting} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* DEDICATED E-COMMERCE SHOWCASE DESTINATION */}
        {selectedIndustry === 'ecommerce' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="ecommerce-solutions-destination"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedIndustry(null);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-mono text-[#D4AF37] hover:text-white hover:bg-white/10 transition-all cursor-pointer font-bold"
                >
                  <span>&larr; Return to All Industries</span>
                </button>
              </div>

              <EcommerceSolutions onOpenBookMeeting={onOpenBookMeeting} onBack={() => setSelectedIndustry(null)} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* DEDICATED FOOD INDUSTRY SHOWCASE DESTINATION */}
        {(selectedIndustry === 'food' || selectedIndustry === 'food-beverage') && (
          <AnimatePresence mode="wait">
            <motion.div
              key="food-solutions-destination"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedIndustry(null);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-mono text-[#D4AF37] hover:text-white hover:bg-white/10 transition-all cursor-pointer font-bold"
                >
                  <span>&larr; Return to All Industries</span>
                </button>
              </div>

              <FoodIndustrySolutions onOpenBookMeeting={onOpenBookMeeting} onBack={() => setSelectedIndustry(null)} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* DEDICATED FINTECH SHOWCASE DESTINATION */}
        {selectedIndustry === 'fintech' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="fintech-solutions-destination"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedIndustry(null);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-mono text-[#D4AF37] hover:text-white hover:bg-white/10 transition-all cursor-pointer font-bold"
                >
                  <span>&larr; Return to All Industries</span>
                </button>
              </div>

              <FintechSolutions onOpenBookMeeting={onOpenBookMeeting} onBack={() => setSelectedIndustry(null)} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* DEDICATED OTHER INDUSTRY PANELS */}
        {selectedIndustry &&
          selectedIndustry !== 'hospitality' &&
          selectedIndustry !== 'ecommerce' &&
          selectedIndustry !== 'food' &&
          selectedIndustry !== 'food-beverage' &&
          selectedIndustry !== 'fintech' &&
          currentDetailedIndustry && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDetailedIndustry.id}
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-[#0a0a0e]/95 border border-[#D4AF37]/40 backdrop-blur-3xl gold-glow relative overflow-hidden shadow-2xl space-y-8"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Navigation Bar inside Expanded Industry Panel */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.1]">
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedIndustry(null);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] hover:text-white transition-colors cursor-pointer mb-1"
                  >
                    <span>&larr; Return to All Industries</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E6C766] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                      {currentDetailedIndustry.heroPlaceholderSpec.badge}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                    {currentDetailedIndustry.title}
                  </h3>
                  <p className="text-sm text-[#A7A7A7] font-light max-w-2xl">
                    {currentDetailedIndustry.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedIndustry(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono text-[#A7A7A7] hover:text-white hover:border-white/20 transition-all cursor-pointer"
                  >
                    Close Solution
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onOpenBookMeeting();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold text-xs font-display uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    Book Meeting
                  </button>
                </div>
              </div>

              {/* HERO IMAGE PLACEHOLDER & OVERVIEW BANNER */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/60 p-6 sm:p-8 rounded-2xl border border-white/10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                    SOLUTION OVERVIEW
                  </div>
                  <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                    {currentDetailedIndustry.shortIntro}
                  </p>
                  <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-[#A7A7A7]">
                    <span className="text-white font-bold">{currentDetailedIndustry.heroPlaceholderSpec.metricValue}</span>
                    <span>•</span>
                    <span>{currentDetailedIndustry.heroPlaceholderSpec.metricLabel}</span>
                    <span>•</span>
                    <span className="text-[#E6C766]">{currentDetailedIndustry.heroPlaceholderSpec.visualTheme}</span>
                  </div>
                </div>

                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-white/15 aspect-[16/9] bg-black">
                  <img
                    src={currentDetailedIndustry.heroImage}
                    alt={`${currentDetailedIndustry.title} Architecture Visual`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                      {currentDetailedIndustry.heroPlaceholderSpec.badge}
                    </span>
                    <span className="text-[#E6C766] font-bold">VERIFIED ARCHITECTURE</span>
                  </div>
                </div>
              </div>

              {/* SUB-NAVIGATION TABS */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
                {[
                  { id: 'services', label: 'Available Services' },
                  { id: 'projects', label: 'Key Projects' },
                  { id: 'gallery', label: 'Architectural Gallery' },
                  { id: 'testimonials', label: 'Client Endorsements' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold shadow-md'
                        : 'bg-white/[0.03] text-[#A7A7A7] hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TABBED CONTENT AREA */}
              <div className="min-h-[300px]">
                {/* 1. Services */}
                {activeTab === 'services' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentDetailedIndustry.services.map((srv, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3 hover:border-[#D4AF37]/40 transition-colors"
                      >
                        <h4 className="text-lg font-bold font-display text-white">{srv.title}</h4>
                        <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
                          {srv.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {srv.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[10px] font-mono text-[#E6C766] border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Key Projects */}
                {activeTab === 'projects' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentDetailedIndustry.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{proj.type}</span>
                          <h4 className="text-xl font-bold font-display text-white">{proj.name}</h4>
                          <p className="text-xs text-[#A7A7A7] font-light">{proj.highlight}</p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="text-[#A7A7A7]">VERIFIED IMPACT:</span>
                          <span className="text-[#E6C766] font-bold">{proj.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Architectural Gallery */}
                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentDetailedIndustry.gallery.map((gal, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3"
                      >
                        <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10 bg-black">
                          <img
                            src={gal.imageUrl}
                            alt={gal.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-sm font-bold font-display text-white">{gal.title}</h4>
                        <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">{gal.caption}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Client Endorsements / Testimonials */}
                {activeTab === 'testimonials' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentDetailedIndustry.testimonials.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between space-y-4"
                      >
                        <p className="text-xs sm:text-sm text-white/90 italic font-light leading-relaxed">
                          "{t.quote}"
                        </p>
                        <div className="pt-4 border-t border-white/10">
                          <div className="text-xs font-bold font-display text-white">{t.author}</div>
                          <div className="text-[10px] font-mono text-[#E6C766]">
                            {t.title} — {t.company}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PANEL BOTTOM CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#A7A7A7]">
                  {currentDetailedIndustry.title.toUpperCase()} SOLUTION ARCHITECTURE
                </span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display gold-glow hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all cursor-pointer"
                >
                  Consult Architecture Team
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </SectionContainer>
  );
};

/* ========================================================================
   5. GALLERY SECTION (PREMIUM WORK PORTFOLIO CAROUSELS)
   ======================================================================== */
export const GallerySection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  return (
    <SectionContainer
      id="gallery"
      title={t('gallery.title')}
      subtitle={t('gallery.subtitle')}
      roomCode="QURIV // PORTFOLIO EXHIBIT"
      lightingTheme="dark-cinematic"
      cameraKeyframe={CAMERA_KEYFRAMES.gallery}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <WorkGallery onOpenBookMeeting={onOpenBookMeeting} />
    </SectionContainer>
  );
};

/* ========================================================================
   6. TEAM SECTION (MEET OUR TEAM)
   ======================================================================== */
export const TeamSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  return (
    <SectionContainer
      id="team"
      title={t('team.title')}
      subtitle={t('team.subtitle')}
      roomCode="QURIV // TEAM"
      lightingTheme="engineering-studio"
      cameraKeyframe={CAMERA_KEYFRAMES.team}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <TeamShowcase onOpenBookMeeting={onOpenBookMeeting} />
    </SectionContainer>
  );
};

/* ========================================================================
   7. LOCATIONS SECTION (OUR LOCATIONS)
   ======================================================================== */
export const LocationsSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  return (
    <SectionContainer
      id="locations"
      title={t('locations.title')}
      subtitle={t('locations.subtitle')}
      roomCode="QURIV // OUR LOCATIONS"
      lightingTheme="global-presence"
      cameraKeyframe={CAMERA_KEYFRAMES.locations}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <LocationsShowcase onOpenBookMeeting={onOpenBookMeeting} />
    </SectionContainer>
  );
};

/* ========================================================================
   8. FAQ SECTION (FREQUENTLY ASKED QUESTIONS)
   ======================================================================== */
export const FAQSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  return (
    <SectionContainer
      id="faq"
      title={t('faq.title')}
      subtitle={t('faq.subtitle')}
      roomCode="QURIV // FREQUENTLY ASKED QUESTIONS"
      lightingTheme="knowledge-library"
      cameraKeyframe={CAMERA_KEYFRAMES.faq}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <FaqAccordion onOpenBookMeeting={onOpenBookMeeting} />
    </SectionContainer>
  );
};

/* ========================================================================
   9. CONTACT SECTION (LET'S BUILD SOMETHING GREAT TOGETHER)
   ======================================================================== */
export const ContactSection: React.FC<{ onOpenBookMeeting: () => void }> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();

  return (
    <SectionContainer
      id="contact"
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
      roomCode="QURIV // LET'S BUILD SOMETHING GREAT TOGETHER"
      lightingTheme="mission-control"
      cameraKeyframe={CAMERA_KEYFRAMES.contact}
      onOpenBookMeeting={onOpenBookMeeting}
    >
      <ContactShowcase onOpenBookMeeting={onOpenBookMeeting} />
    </SectionContainer>
  );
};
