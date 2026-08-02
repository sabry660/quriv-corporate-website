import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUp,
  Sparkles,
  ShieldCheck,
  Globe2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  MessageCircle,
  ExternalLink,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';
import { SectionId } from '../types';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface FooterShowcaseProps {
  onNavigate: (sectionId: SectionId) => void;
  onOpenBookMeeting: () => void;
}

export const FooterShowcase: React.FC<FooterShowcaseProps> = ({
  onNavigate,
  onOpenBookMeeting,
}) => {
  const { t } = useI18n();
  const handleBackToTop = () => {
    soundManager.playCameraTransition();
    onNavigate('hero');
  };

  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent via-black/80 to-black text-white pt-24 pb-16 px-6 md:px-12 border-t border-white/10 backdrop-blur-md overflow-hidden">
      {/* Ambient Lighting & Cinematic Lighting Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* TOP MOVIE ENDING FOCAL POINT: LOGO & CINEMATIC HEADLINE */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-[#D4AF37]/30">
              <img
                src="/logo.jpg"
                alt="Quriv Technologies Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
              QURIV<span className="text-[#D4AF37]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#C0C0C0] font-light leading-relaxed max-w-2xl mx-auto">
              Pioneering bespoke software architectures, cloud transformations, and high-concurrency systems engineered for enterprise performance from our Alexandria headquarters.
            </p>
          </motion.div>

          {/* BACK TO TOP CAMERA FLIGHT TRIGGER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-2 flex items-center justify-center gap-4"
          >
            <button
              onClick={handleBackToTop}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/15 hover:border-[#D4AF37] text-xs font-mono text-[#E6C766] hover:text-white transition-all cursor-pointer flex items-center gap-2.5 shadow-xl group gold-glow"
              title="Return to Hero Section"
            >
              <ArrowUp className="w-4 h-4 text-[#D4AF37] group-hover:-translate-y-1 transition-transform" />
              <span>Back to Top (Camera Flight)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBookMeeting();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold text-xs font-display uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            >
              Book Meeting
            </button>
          </motion.div>
        </div>

        {/* FOUR COLUMN STRUCTURED NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-8 border-t border-white/10 text-xs">
          {/* COLUMN 1: QUICK LINKS */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Quick Navigation</span>
            </div>
            <ul className="space-y-2.5 font-mono text-[#A7A7A7]">
              {[
                { id: 'hero', label: '01. Home Overview' },
                { id: 'about', label: '02. Engineering Vision' },
                { id: 'technologies', label: '03. Tech Stack Matrix' },
                { id: 'process', label: '04. Development Lifecycle' },
                { id: 'team', label: '05. Leadership & Team' },
                { id: 'locations', label: '06. Office Locations' },
                { id: 'faq', label: '07. Knowledge Base (FAQ)' },
                { id: 'contact', label: '08. Get In Touch' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate(link.id as SectionId);
                    }}
                    className="hover:text-white hover:translate-x-1 transition-all cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: SERVICES */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Core Services</span>
            </div>
            <ul className="space-y-2.5 text-[#A7A7A7] font-light">
              <li className="hover:text-white transition-colors cursor-default">• Custom Software Architecture</li>
              <li className="hover:text-white transition-colors cursor-default">• High-Concurrency API Gateways</li>
              <li className="hover:text-white transition-colors cursor-default">• Microservices & Cloud Infrastructure</li>
              <li className="hover:text-white transition-colors cursor-default">• Enterprise UI/UX Design Systems</li>
              <li className="hover:text-white transition-colors cursor-default">• Cybersecurity & Code Audits</li>
              <li className="hover:text-white transition-colors cursor-default">• Zero-Downtime CI/CD Pipelines</li>
            </ul>
          </div>

          {/* COLUMN 3: INDUSTRIES */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Target Industries</span>
            </div>
            <ul className="space-y-2.5 text-[#A7A7A7] font-light">
              <li className="hover:text-white transition-colors cursor-default">• Fintech & High-Frequency Trading</li>
              <li className="hover:text-white transition-colors cursor-default">• Food & Hospitality (Cloud Kitchens)</li>
              <li className="hover:text-white transition-colors cursor-default">• Real Estate & Keyless Access Systems</li>
              <li className="hover:text-white transition-colors cursor-default">• Global E-Commerce & Retail Engines</li>
              <li className="hover:text-white transition-colors cursor-default">• Healthcare & Life Sciences SaaS</li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT & HEAD OFFICE */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('footer.headOffice')}</span>
            </div>
            <div className="space-y-3 font-mono text-[#A7A7A7]">
              <div className="space-y-0.5">
                <div className="text-white font-bold">Alexandria, Egypt</div>
                <div className="text-[11px] text-[#A7A7A7]">Azarita</div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-white">ceo@quriv.com</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>01157502000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA LINKS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="text-xs font-mono text-[#A7A7A7]">
            {t('footer.connectOnOfficialChannels')}
          </div>

          <div className="flex items-center gap-3">
            {[
              { name: t('social.facebook'), url: 'https://www.facebook.com/p/Quriv-Technologies-100093578880006/', icon: Facebook },
              { name: t('social.linkedin'), url: 'https://www.linkedin.com/company/quriv-technologies', icon: Linkedin },
              { name: t('social.whatsapp'), url: 'https://wa.me/201157502000', icon: MessageCircle },
              { name: t('social.email'), url: 'mailto:ceo@quriv.com', icon: Mail },
            ].map((social) => {
              const IconComp = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 text-xs font-mono text-[#C0C0C0] hover:text-white transition-all cursor-pointer flex items-center gap-2"
                >
                  <IconComp className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{social.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                </a>
              );
            })}
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-[11px] font-mono text-[#A7A7A7] text-center sm:text-left">
          <div>
            © 2026 Quriv Technologies Inc. {t('footer.allRightsReserved')}
          </div>
        </div>
      </div>
    </footer>
  );
};
