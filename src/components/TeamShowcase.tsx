import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Linkedin,
  Mail,
  User,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Sparkles,
  Check,
  ExternalLink
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

export interface TeamMemberItem {
  id: string;
  fullName: string;
  position: string;
  shortDescription: string;
  shortBio: string;
  photoPath: string;
  linkedInUrl: string;
  email: string;
  size: 'hero' | 'tall' | 'wide' | 'standard';
  location: string;
}

export const TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 'cto',
    fullName: '[ Chief Technology Officer ]',
    position: 'Chief Technology Officer',
    shortDescription: 'Directs technical vision, core cloud infrastructure, and enterprise system architecture.',
    shortBio: 'Over 14 years of experience leading distributed software architecture, cloud transformations, and high-concurrency web engines for global client deployments.',
    photoPath: '/public/team/cto-portrait.jpg',
    linkedInUrl: 'https://www.linkedin.com/company/quriv-technologies',
    email: 'cto@quriv.com',
    size: 'hero',
    location: 'Alexandria / Global',
  },
  {
    id: 'architect',
    fullName: '[ Lead Software Architect ]',
    position: 'Lead Software Architect',
    shortDescription: 'Specializes in high-throughput API design, microservices, and database performance.',
    shortBio: 'Expert in resilient server-side systems, database indexing strategies, and automated failover architecture across multi-region edge environments.',
    photoPath: '/public/team/architect-portrait.jpg',
    linkedInUrl: 'https://www.linkedin.com/company/quriv-technologies',
    email: 'architecture@quriv.com',
    size: 'tall',
    location: 'Zurich Hub',
  },
  {
    id: 'design',
    fullName: '[ Head of Product Design ]',
    position: 'Head of Product Design',
    shortDescription: 'Crafts responsive user interfaces, design systems, and digital brand experiences.',
    shortBio: 'Pioneers clean, accessible visual systems for enterprise platforms with a meticulous focus on spatial hierarchy, typography, and fluid user interaction.',
    photoPath: '/public/team/design-portrait.jpg',
    linkedInUrl: 'https://www.linkedin.com/company/quriv-technologies',
    email: 'design@quriv.com',
    size: 'wide',
    location: 'San Francisco Hub',
  },
  {
    id: 'cloud',
    fullName: '[ Principal Cloud Specialist ]',
    position: 'Principal Cloud Specialist',
    shortDescription: 'Manages container orchestration, CI/CD pipelines, and zero-downtime infrastructure.',
    shortBio: 'Specializes in Kubernetes clusters, security compliance, automated testing suites, and real-time operational monitoring.',
    photoPath: '/public/team/cloud-portrait.jpg',
    linkedInUrl: 'https://www.linkedin.com/company/quriv-technologies',
    email: 'cloud@quriv.com',
    size: 'standard',
    location: 'London Hub',
  },
];

interface TeamShowcaseProps {
  onOpenBookMeeting: () => void;
}

export const TeamShowcase: React.FC<TeamShowcaseProps> = ({ onOpenBookMeeting }) => {
  const { t } = useI18n();
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  const handleCopyEmail = (e: React.MouseEvent, email: string, memberId: string) => {
    e.stopPropagation();
    soundManager.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmailId(memberId);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  const handleOpenLinkedIn = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    soundManager.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-10 text-white relative z-10">
      {/* SECTION INTRODUCTION */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t('common.ourProfessionals')}</span>
        </div>

        <p className="text-sm sm:text-base text-[#C0C0C0] font-light leading-relaxed">
          {t('common.teamDescription')}
        </p>
      </div>

      {/* ASYMMETRICAL DYNAMIC BENTO LAYOUT (No Repetitive Card Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {TEAM_MEMBERS.map((member) => {
          const isHovered = activeHoverId === member.id;
          const isHero = member.size === 'hero';
          const isTall = member.size === 'tall';
          const isWide = member.size === 'wide';

          // Grid Span Assignments for Asymmetrical Layout
          let colSpan = 'lg:col-span-6'; // hero takes 6 cols
          if (isTall) colSpan = 'lg:col-span-6';
          else if (isWide) colSpan = 'lg:col-span-7';
          else if (member.size === 'standard') colSpan = 'lg:col-span-5';

          return (
            <motion.div
              key={member.id}
              onMouseEnter={() => {
                soundManager.playHover();
                setActiveHoverId(member.id);
              }}
              onMouseLeave={() => setActiveHoverId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-3xl bg-black/40 border border-white/10 hover:border-[#D4AF37] backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 shadow-2xl gold-glow ${colSpan} ${
                isHero ? 'min-h-[440px] bg-gradient-to-br from-black/60 via-[#0a0a0f]/80 to-[#141008]/60 border-[#D4AF37]/40' : ''
              } ${isTall ? 'min-h-[440px]' : ''} ${isWide ? 'min-h-[360px]' : ''}`}
            >
              {/* Subtle Ambient Light Glow behind frame */}
              <div
                className={`absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-30'
                }`}
              />

              {/* Top Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                  <Building className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider font-bold">{member.location}</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#E6C766]">
                  {member.position}
                </div>
              </div>

              {/* Main Member Body Section */}
              <div className="py-6 space-y-6 relative z-10 flex-grow flex flex-col justify-center">
                {/* Text Details & Position */}
                <div className="space-y-2 max-w-lg">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-[#E6C766] transition-colors">
                    {member.fullName}
                  </div>

                  <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                    {member.position}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
                    {member.shortDescription}
                  </p>
                </div>

                {/* HOVER REVEAL PANEL: Short Bio & Contact Triggers */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="pt-4 border-t border-white/10 space-y-3 overflow-hidden"
                    >
                      <p className="text-xs text-[#D1D1D1] font-light leading-relaxed italic bg-white/[0.03] p-3 rounded-xl border border-white/5">
                        "{member.shortBio}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer: Social & Contact Triggers */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10 gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleOpenLinkedIn(e, member.linkedInUrl)}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 text-[#A7A7A7] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                    title="Open LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="hidden sm:inline">LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </button>

                  {/* Email Copy Button */}
                  <button
                    onClick={(e) => handleCopyEmail(e, member.email, member.id)}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 text-[#A7A7A7] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                    title="Copy Contact Email"
                  >
                    {copiedEmailId === member.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="hidden sm:inline">{member.email}</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    onOpenBookMeeting();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 hover:border-[#D4AF37] text-xs font-mono text-[#E6C766] hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Summary Badge */}
      <div className="flex items-center justify-center gap-2 pt-4 text-xs font-mono text-[#A7A7A7]">
        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
        <span>{t('common.directConsultationsAvailable')}</span>
      </div>
    </div>
  );
};
