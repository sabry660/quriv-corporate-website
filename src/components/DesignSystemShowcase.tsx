import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Camera, Sliders, Volume2, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { SectionId } from '../types';
import { CAMERA_KEYFRAMES } from './Background3D';

interface DesignSystemShowcaseProps {
  activeSection: SectionId;
  scrollProgress: number;
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export const DesignSystemShowcase: React.FC<DesignSystemShowcaseProps> = ({
  activeSection,
  scrollProgress,
  soundEnabled,
  reducedMotion,
}) => {
  const [expanded, setExpanded] = useState(false);
  const currentKeyframe = CAMERA_KEYFRAMES[activeSection] || CAMERA_KEYFRAMES.hero;

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden md:block select-none">
      <motion.div
        layout
        className="bg-[#101010]/90 border border-[#D4AF37]/30 rounded-2xl backdrop-blur-2xl shadow-2xl p-4 text-white overflow-hidden max-w-xs"
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between gap-3 text-left focus:outline-none"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E6C766]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quriv System Telemetry</span>
          </div>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-[#A7A7A7]" />
          ) : (
            <ChevronUp className="w-4 h-4 text-[#A7A7A7]" />
          )}
        </button>

        {/* Quick Compact Status */}
        {!expanded && (
          <div className="mt-2 text-[10px] font-mono text-[#A7A7A7] flex items-center justify-between pt-1 border-t border-white/[0.05]">
            <span>CAMERA: {activeSection.toUpperCase()}</span>
            <span className="text-[#D4AF37]">{(scrollProgress * 100).toFixed(0)}% SCROLL</span>
          </div>
        )}

        {/* Detailed Expanded Inspector */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-white/[0.08] space-y-3 text-xs"
            >
              {/* Color Palette Specification Swatches */}
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#A7A7A7] mb-2">
                  <Palette className="w-3 h-3 text-[#D4AF37]" />
                  <span>Color Tokens</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  <div className="h-6 rounded bg-[#050505] border border-white/20" title="Background: #050505" />
                  <div className="h-6 rounded bg-[#101010] border border-white/20" title="Surface: #101010" />
                  <div className="h-6 rounded bg-[#D4AF37]" title="Primary Gold: #D4AF37" />
                  <div className="h-6 rounded bg-[#E6C766]" title="Secondary Gold: #E6C766" />
                  <div className="h-6 rounded bg-[#FFFFFF]" title="Text: #FFFFFF" />
                </div>
              </div>

              {/* Live Camera Keyframe Telemetry */}
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#A7A7A7] mb-1.5">
                  <Camera className="w-3 h-3 text-[#D4AF37]" />
                  <span>Active Camera Keyframe</span>
                </div>
                <div className="p-2 rounded bg-black/60 font-mono text-[10px] text-[#E6C766] space-y-1 border border-white/[0.05]">
                  <div>POS: [{currentKeyframe.position.join(', ')}]</div>
                  <div>TGT: [{currentKeyframe.target.join(', ')}]</div>
                  <div>SCALE: {currentKeyframe.objectScale}x</div>
                </div>
              </div>

              {/* System State Toggles */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A7A7A7] pt-1 border-t border-white/[0.05]">
                <div className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-[#D4AF37]" />
                  <span>AUDIO: {soundEnabled ? 'ACTIVE' : 'MUTED'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-[#D4AF37]" />
                  <span>MOTION: {reducedMotion ? 'REDUCED' : '60FPS'}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
