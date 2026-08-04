import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n';

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
  {
    id: 'expedia',
    name: 'Expedia',
    url: 'https://www.expedia.com',
    logoPath: '/partners/expedia.png',
    category: 'Global Travel Platform',
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    url: 'https://www.airbnb.com',
    logoPath: '/partners/airbnb.png',
    category: 'Accommodation Sharing',
  },
  {
    id: 'hotels',
    name: 'Hotels.com',
    url: 'https://www.hotels.com',
    logoPath: '/partners/hotels.png',
    category: 'Hotel Booking',
  },
  {
    id: 'priceline',
    name: 'Priceline',
    url: 'https://www.priceline.com',
    logoPath: '/partners/priceline.png',
    category: 'Travel Deals',
  },
  {
    id: 'kayak',
    name: 'KAYAK',
    url: 'https://www.kayak.com',
    logoPath: '/partners/kayak.png',
    category: 'Travel Search Engine',
  },
  {
    id: 'hostelworld',
    name: 'Hostelworld',
    url: 'https://www.hostelworld.com',
    logoPath: '/partners/hostelworld.png',
    category: 'Budget Accommodation',
  },
];

interface PartnersMarqueeProps {
  onOpenBookMeeting?: () => void;
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = () => {
  const { t } = useI18n();
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
          <span>{t('common.officialAlliances')}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
          {t('common.alliancesDescription')}
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
        <span>{t('common.directApiIntegrations')}</span>
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

const PartnerCard: React.FC<{ partner: Partner; onClick: () => void }> = ({ partner, onClick }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative flex flex-col items-center justify-between px-6 py-5 rounded-2xl bg-[#101010]/80 border border-white/[0.08] hover:border-[#D4AF37]/40 backdrop-blur-md cursor-pointer transition-all group min-w-[180px] sm:min-w-[220px]"
    >
      {!imageError && partner.logoPath ? (
        <img
          src={partner.logoPath}
          alt={partner.name}
          className="w-full h-20 object-contain flex-1"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-20 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-1">
          <span className="text-sm font-bold text-[#D4AF37] font-mono">
            {partner.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex flex-col items-center text-center w-full pt-3 border-t border-white/[0.05]">
        <span className="text-xs font-bold text-white truncate group-hover:text-[#E6C766] transition-colors">
          {partner.name}
        </span>
        <span className="text-[9px] text-[#A7A7A7] truncate font-mono">
          {partner.category}
        </span>
      </div>
      <ExternalLink className="w-3 h-3 text-[#A7A7A7] group-hover:text-[#D4AF37] transition-colors shrink-0 absolute top-3 right-3" />
    </motion.div>
  );
};
