import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Clock,
  Mail,
  Building2,
  Navigation,
  Globe2,
  Sparkles,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export interface LocationItem {
  id: string;
  city: string;
  country: string;
  type: string;
  isHeadOffice: boolean;
  imagePlaceholder: string;
  description: string;
  coordinates: string;
  mapPlaceholderText: string;
  workingHours: string;
  contactEmail: string;
  status: string;
}

export const LOCATIONS_LIST: LocationItem[] = [
  {
    id: 'hq-alexandria',
    city: 'Alexandria',
    country: 'Egypt',
    type: 'Head Office',
    isHeadOffice: true,
    imagePlaceholder: '/public/locations/alexandria-hq.jpg',
    description: 'Central software architecture engineering headquarters directing global client engagements, technical strategy, and core codebase transfers.',
    coordinates: '31.2001° N, 29.9187° E',
    mapPlaceholderText: '[ INTERACTIVE MAP VIEW // ALEXANDRIA HEADQUARTERS COORDINATES ]',
    workingHours: 'Sunday - Thursday: 09:00 - 18:00 (UTC+2)',
    contactEmail: 'alexandria@quriv.com',
    status: 'ACTIVE // HEADQUARTERS',
  },
];

interface LocationsShowcaseProps {
  onOpenBookMeeting: () => void;
}

export const LocationsShowcase: React.FC<LocationsShowcaseProps> = ({ onOpenBookMeeting }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('hq-alexandria');
  const [activeTab, setActiveTab] = useState<'map' | 'details' | 'contact'>('map');

  const selectedLocation =
    LOCATIONS_LIST.find((loc) => loc.id === selectedLocationId) || LOCATIONS_LIST[0];

  return (
    <div className="space-y-10 text-white relative z-10">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>GEOGRAPHIC PRESENCE & HEADQUARTERS</span>
        </div>
        <p className="text-sm text-[#A7A7A7] font-light leading-relaxed">
          Engineered in Alexandria, Egypt. Operating with a distributed engineering approach for clients and enterprise partners globally.
        </p>
      </div>

      {/* Location Selection Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {LOCATIONS_LIST.map((loc) => {
          const isSelected = loc.id === selectedLocationId;
          return (
            <button
              key={loc.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedLocationId(loc.id);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-6 py-3 rounded-2xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold shadow-xl gold-glow scale-105'
                  : 'bg-black/50 border border-white/10 text-[#A7A7A7] hover:text-white hover:bg-white/10'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#D4AF37]'}`} />
              <span>{loc.city}, {loc.country}</span>
              {loc.isHeadOffice && (
                <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-widest ${isSelected ? 'bg-black/20 text-black font-extrabold' : 'bg-[#D4AF37]/20 text-[#E6C766]'}`}>
                  Head Office
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Map & Office Dashboard Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Interactive Map Canvas Frame (Interactive Map Style) */}
        <div className="lg:col-span-7 rounded-3xl bg-black/60 border border-[#D4AF37]/30 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl gold-glow min-h-[420px]">
          {/* Animated Map Grid & Overlay Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/80 pointer-events-none" />

          {/* Map Header Status */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
              <Compass className="w-4 h-4" />
              <span className="uppercase tracking-widest">{selectedLocation.coordinates}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{selectedLocation.status}</span>
            </div>
          </div>

          {/* Center Interactive Map View Visualization */}
          <div className="my-8 relative rounded-2xl bg-gradient-to-br from-[#0c0c12] via-[#08080c] to-[#120f08] border border-white/10 p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[260px] overflow-hidden group">
            {/* Radar Sweep Effect */}
            <div className="absolute w-72 h-72 rounded-full border border-[#D4AF37]/20 animate-spin-slow pointer-events-none" />

            {/* Floating Location Marker */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#E6C766] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)]"
            >
              <MapPin className="w-8 h-8 fill-[#D4AF37]/30 text-[#D4AF37]" />
              <span className="absolute -bottom-1 w-3 h-3 rounded-full bg-[#D4AF37] animate-ping" />
            </motion.div>

            <div className="relative z-10 space-y-1">
              <div className="text-xl font-bold font-display text-white">
                {selectedLocation.city}, {selectedLocation.country}
              </div>
              <div className="text-xs font-mono text-[#D4AF37]">
                {selectedLocation.mapPlaceholderText}
              </div>
            </div>

            <div className="relative z-10 text-[11px] font-mono text-[#A7A7A7] bg-black/60 px-4 py-1.5 rounded-full border border-white/10">
              [ GIS LAT/LONG TELEMETRY // {selectedLocation.coordinates} ]
            </div>
          </div>

          {/* Map Footer Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 relative z-10 text-xs font-mono">
            <div className="text-[#A7A7A7] flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>FACILITY ID: QURIV-{selectedLocation.id.toUpperCase()}</span>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBookMeeting();
              }}
              className="inline-flex items-center gap-2 text-[#E6C766] hover:text-white transition-colors cursor-pointer"
            >
              <span>Schedule On-Site Consultation</span>
              <Navigation className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Glass Panel: Detailed Office Specifications */}
        <div className="lg:col-span-5 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
          {/* Top Office Badge */}
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                OFFICE SPECIFICATION
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#E6C766]">
                {selectedLocation.type}
              </span>
            </div>

            <h3 className="text-3xl font-bold font-display text-white">
              {selectedLocation.city}
            </h3>
            <div className="text-xs font-mono text-[#E6C766]">
              {selectedLocation.country} {selectedLocation.isHeadOffice ? '(Primary Head Office)' : ''}
            </div>
          </div>

          {/* Office Image Placeholder */}
          <div className="rounded-2xl bg-gradient-to-b from-black/80 to-[#121218] border border-white/10 p-6 text-center space-y-3 relative overflow-hidden group">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Building2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-[#D4AF37]">
                [ OFFICE IMAGE PLACEHOLDER ]
              </div>
              <div className="text-[11px] font-mono text-[#A7A7A7]">
                Path: {selectedLocation.imagePlaceholder}
              </div>
            </div>
          </div>

          {/* Office Description */}
          <div className="space-y-1">
            <div className="text-xs font-mono text-white uppercase tracking-wider">
              Office Overview
            </div>
            <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
              {selectedLocation.description}
            </p>
          </div>

          {/* Working Hours Placeholder & Contact Placeholder */}
          <div className="space-y-3 pt-2">
            {/* Working Hours Placeholder */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[#A7A7A7] uppercase">
                  Working Hours Placeholder
                </div>
                <div className="text-xs font-mono text-[#E6C766]">
                  {selectedLocation.workingHours}
                </div>
              </div>
            </div>

            {/* Contact Placeholder */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[#A7A7A7] uppercase">
                  Contact Placeholder
                </div>
                <div className="text-xs font-mono text-[#E6C766]">
                  {selectedLocation.contactEmail}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBookMeeting();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs font-display uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book Architecture Consultation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Trust Badge */}
      <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-[#A7A7A7]">
        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
        <span>CONFIDENTIAL ARCHITECTURAL CONSULTATIONS DIRECTED FROM HEAD OFFICE</span>
      </div>
    </div>
  );
};
