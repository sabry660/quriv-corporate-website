import React from 'react';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

export interface Partner {
  id: string;
  name: string;
  url: string;
  logoPath: string;
  category: string;
}

export const PARTNERS_LIST: Partner[] = [
  {
    id: 'booking',
    name: 'Booking.com',
    url: 'https://www.booking.com',
    logoPath: '/partners/booking.png',
    category: 'Travel & Accommodation',
  },
  {
    id: 'agoda',
    name: 'Agoda',
    url: 'https://www.agoda.com',
    logoPath: '/partners/agoda.png',
    category: 'Global Booking Platform',
  },
  {
    id: 'trip',
    name: 'Trip.com',
    url: 'https://www.trip.com',
    logoPath: '/partners/trip.png',
    category: 'International Travel',
  },
  {
    id: 'wego',
    name: 'Wego',
    url: 'https://www.wego.com',
    logoPath: '/partners/wego.png',
    category: 'Travel Marketplace',
  },
  {
    id: 'laterooms',
    name: 'LateRooms',
    url: 'https://www.laterooms.com',
    logoPath: '/partners/laterooms.png',
    category: 'Hospitality Networks',
  },
  {
    id: 'clicktripz',
    name: 'ClickTripz',
    url: 'https://www.clicktripz.com',
    logoPath: '/partners/Clicktripz.png',
    category: 'Travel Media & Tech',
  },
];

interface PartnersMarqueeProps {
  onOpenBookMeeting?: () => void;
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = () => {
  // Duplicate arrays for smooth loop transitions
  const row1Items = [...PARTNERS_LIST, ...PARTNERS_LIST, ...PARTNERS_LIST];
  const row2Items = [...PARTNERS_LIST].reverse().concat([...PARTNERS_LIST].reverse(), [...PARTNERS_LIST].reverse());
  const row3Items = [...PARTNERS_LIST, ...PARTNERS_LIST, ...PARTNERS_LIST];

  const handlePartnerClick = (partner: Partner) => {
    soundManager.playClick();
    window.open(partner.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-10 py-4 relative z-10 text-white">
      {/* Sub-header description */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>OFFICIAL SOFTWARE & MEDIA ALLIANCES</span>
        </div>
        <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
          Integrated directly into global reservation networks, rate distribution engines, and digital travel marketplaces.
        </p>
      </div>

      {/* Infinite Marquee Rows Container */}
      <div className="space-y-6 overflow-hidden relative">
        {/* Top Fade Mask Left/Right for smooth glass transition */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20" />

        {/* MARQUEE ROW 1: Leftward Infinite Scroll (Fast Speed ~28s) */}
        <div className="relative w-full overflow-hidden flex items-center py-2 group">
          <div className="flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused] whitespace-nowrap will-change-transform">
            {row1Items.map((partner, index) => (
              <PartnerCard key={`row1-${partner.id}-${index}`} partner={partner} onClick={() => handlePartnerClick(partner)} />
            ))}
          </div>
        </div>

        {/* MARQUEE ROW 2: Rightward Infinite Scroll (Medium Speed ~38s) */}
        <div className="relative w-full overflow-hidden flex items-center py-2 group">
          <div className="flex gap-6 animate-marquee-right group-hover:[animation-play-state:paused] whitespace-nowrap will-change-transform">
            {row2Items.map((partner, index) => (
              <PartnerCard key={`row2-${partner.id}-${index}`} partner={partner} onClick={() => handlePartnerClick(partner)} />
            ))}
          </div>
        </div>

        {/* MARQUEE ROW 3: Leftward Infinite Scroll (Steady Speed ~32s, Accent Variant) */}
        <div className="relative w-full overflow-hidden flex items-center py-2 group">
          <div className="flex gap-6 animate-marquee-left-slow group-hover:[animation-play-state:paused] whitespace-nowrap will-change-transform">
            {row3Items.map((partner, index) => (
              <PartnerCard key={`row3-${partner.id}-${index}`} partner={partner} onClick={() => handlePartnerClick(partner)} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Trust Badge */}
      <div className="flex items-center justify-center gap-2 pt-4 text-xs font-mono text-[#A7A7A7]">
        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
        <span>DIRECT API & RESERVATION INTEGRATIONS ACTIVE</span>
      </div>

      {/* Embedded CSS for GPU Keyframe Infinite Marquees */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes marquee-left-slow {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }

        .animate-marquee-left {
          display: flex;
          animation: marquee-left 28s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          animation: marquee-right 38s linear infinite;
        }
        .animate-marquee-left-slow {
          display: flex;
          animation: marquee-left-slow 32s linear infinite;
        }
      `}</style>
    </div>
  );
};

interface PartnerCardProps {
  partner: Partner;
  onClick: () => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onClick }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => soundManager.playHover()}
      className="flex-shrink-0 min-w-[220px] sm:min-w-[260px] px-6 py-4 rounded-2xl bg-black/40 border border-white/10 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 cursor-pointer group flex items-center justify-between gap-4 gold-glow hover:scale-105"
    >
      <div className="flex flex-col">
        <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">
          {partner.category}
        </span>
        <div className="h-8 flex items-center pt-1">
          <img
            src={partner.logoPath}
            alt={partner.name}
            className="max-h-7 max-w-[140px] object-contain filter brightness-90 group-hover:brightness-110 transition-all"
            onError={(e) => {
              // Hide image on error and display typography logo
              (e.target as HTMLElement).style.display = 'none';
              const textFallback = (e.target as HTMLElement).nextElementSibling;
              if (textFallback) (textFallback as HTMLElement).style.display = 'block';
            }}
          />
          <span
            className="text-lg font-bold font-display text-white group-hover:text-[#E6C766] transition-colors"
            style={{ display: 'none' }}
          >
            {partner.name}
          </span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 flex items-center justify-center text-[#A7A7A7] group-hover:text-[#E6C766] transition-all">
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
