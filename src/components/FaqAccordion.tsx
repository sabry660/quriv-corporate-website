import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Code2,
  Lock,
  Layers,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export interface FaqItem {
  id: string;
  category: 'Engineering' | 'Security' | 'Engagement' | 'Ownership' | 'Cloud & SLA';
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Engineering',
    question: 'What defines Quriv Technologies’ software engineering standards?',
    answer: 'We engineer custom, high-concurrency software architectures combining resilient backend services with responsive modern user interfaces. Every line of code is structured for modularity, clean type safety, edge performance, and long-term enterprise maintainability.',
    highlights: ['Sub-120ms Target Latency', 'Clean TypeScript & Type Stripping', 'Modular Component Architecture', 'Automated Integration Testing'],
  },
  {
    id: 'faq-2',
    category: 'Security',
    question: 'How are data protection, privacy, and system security enforced?',
    answer: 'All architectures adhere to strict security protocols including end-to-end payload encryption, role-based access control (RBAC), sanitized API parameters, and zero client-exposed API secrets. Cloud databases and edge gateways are isolated behind secure middleware proxies.',
    highlights: ['Zero Client-Exposed API Keys', 'Encrypted Transport Payloads', 'Role-Based Access Control', 'Automated Vulnerability Audits'],
  },
  {
    id: 'faq-3',
    category: 'Engagement',
    question: 'What is the standard project lifecycle and engagement model?',
    answer: 'Our engagement model begins with an in-depth architectural consultation and scope blueprinting, followed by milestone-driven agile development sprints. Clients receive continuous live preview environments, transparent telemetry updates, and direct channel communication with lead software engineers.',
    highlights: ['Direct Architect Access', 'Milestone Sprint Billing', 'Live Staging Previews', '24/7 Telemetry Dashboard'],
  },
  {
    id: 'faq-4',
    category: 'Ownership',
    question: 'Who owns the final source code and intellectual property?',
    answer: 'You retain 100% full ownership of all custom software codebases, database schemas, API integrations, and digital design assets. Upon project completion, all repository access, production builds, and documentation are transferred entirely to your organization with zero recurring platform lock-in fees.',
    highlights: ['100% IP Ownership Transfer', 'Zero Platform Lock-in Fees', 'Full Source Code Repositories', 'Complete Architecture Documentation'],
  },
  {
    id: 'faq-5',
    category: 'Cloud & SLA',
    question: 'What hosting and cloud deployment architectures are supported?',
    answer: 'We deploy across leading enterprise cloud platforms including Cloud Run, AWS, Google Cloud, and edge CDN networks. We configure automated CI/CD pipelines, container orchestration, zero-downtime rolling updates, and failover redundancy.',
    highlights: ['Multi-Cloud Redundancy', 'Zero-Downtime Deployment', 'Automated Container Builds', '24/7 Infrastructure Monitoring'],
  },
  {
    id: 'faq-6',
    category: 'Engineering',
    question: 'Can Quriv integrate with existing legacy databases or third-party APIs?',
    answer: 'Yes. We specialize in building secure microservice wrappers, custom REST/GraphQL gateways, and database connectors that seamlessly synchronize with your existing legacy systems without requiring disruptive infrastructure overhauls.',
    highlights: ['REST & GraphQL Gateways', 'Legacy System Wrappers', 'Bi-Directional Database Sync', 'Custom Middleware Architecture'],
  },
];

const CATEGORIES = ['All', 'Engineering', 'Security', 'Engagement', 'Ownership', 'Cloud & SLA'] as const;

interface FaqAccordionProps {
  onOpenBookMeeting: () => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ onOpenBookMeeting }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredItems = selectedCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    soundManager.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Accessible keyboard navigation across items
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % filteredItems.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + filteredItems.length) % filteredItems.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      itemRefs.current[filteredItems.length - 1]?.focus();
    }
  };

  return (
    <div className="space-y-8 text-white relative z-10 max-w-4xl mx-auto">
      {/* Intro Sub-header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>KNOWLEDGE BASE & ARCHITECTURAL CLARITY</span>
        </div>
        <p className="text-sm text-[#A7A7A7] font-light leading-relaxed max-w-2xl mx-auto">
          Direct answers regarding our software engineering standards, security protocols, engagement workflows, and full intellectual property ownership.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold shadow-md scale-105'
                  : 'bg-black/50 border border-white/10 text-[#A7A7A7] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ACCORDION PANELS CONTAINER */}
      <div className="space-y-4" role="region" aria-label="Frequently Asked Questions List">
        {filteredItems.map((item, index) => {
          const isOpen = openId === item.id;
          const buttonId = `faq-btn-${item.id}`;
          const panelId = `faq-panel-${item.id}`;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={`rounded-2xl bg-black/50 border backdrop-blur-2xl overflow-hidden transition-all duration-300 shadow-xl ${
                isOpen
                  ? 'border-[#D4AF37]/60 bg-gradient-to-r from-black/80 via-[#0e0e14]/90 to-black/80 gold-glow'
                  : 'border-white/10 hover:border-white/25 hover:bg-black/60'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                ref={(el) => (itemRefs.current[index] = el)}
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleAccordion(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 focus:ring-offset-black rounded-2xl group"
              >
                <div className="flex items-center gap-4">
                  {/* Category Indicator Icon Badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/5 border border-white/10 text-[#D4AF37] group-hover:border-[#D4AF37]'
                  }`}>
                    {item.category === 'Engineering' && <Code2 className="w-5 h-5" />}
                    {item.category === 'Security' && <Lock className="w-5 h-5" />}
                    {item.category === 'Engagement' && <Layers className="w-5 h-5" />}
                    {item.category === 'Ownership' && <ShieldCheck className="w-5 h-5" />}
                    {item.category === 'Cloud & SLA' && <HelpCircle className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                      // {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-[#E6C766] transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>
                </div>

                {/* Animated Chevron Indicator */}
                <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37] transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[#D4AF37]/20 border-[#D4AF37]' : 'group-hover:bg-white/10'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Answer Content Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-white/10 space-y-4">
                      <p className="text-xs sm:text-sm text-[#C0C0C0] font-light leading-relaxed pl-14">
                        {item.answer}
                      </p>

                      {/* Optional Highlight Tags */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pl-14 flex flex-wrap gap-2 pt-2">
                          {item.highlights.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-[#E6C766] flex items-center gap-1.5"
                            >
                              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* BOTTOM CONSULTATION PROMPT CARD */}
      <div className="rounded-3xl bg-gradient-to-r from-black/80 via-[#121018]/90 to-black/80 border border-[#D4AF37]/40 backdrop-blur-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl gold-glow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="text-base font-bold font-display text-white">
              Have a custom technical question?
            </div>
            <p className="text-xs text-[#A7A7A7] font-light">
              Connect directly with our senior software architects to discuss your custom project specifications.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenBookMeeting();
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 flex-shrink-0"
        >
          <span>Book Architectural Meeting</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
