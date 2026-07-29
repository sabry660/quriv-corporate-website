import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HERO_METRICS } from '../data/siteData';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n.tsx';

interface HeroProps {
  onOpenBookMeeting: () => void;
  onExploreClick: () => void;
}

// Counter animation component
const Counter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [displayText, setDisplayText] = useState(value);

  useEffect(() => {
    // Extract numeric value from string (e.g., "42+" -> 42, "98%" -> 98)
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

      // Ease out cubic
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

  // Reconstruct display text with counter
  useEffect(() => {
    const numericMatch = value.match(/(\d+)/);
    if (numericMatch) {
      const suffix = value.replace(numericMatch[0], '');
      setDisplayText(`${count}${suffix}`);
    }
  }, [count, value]);

  return <span>{displayText}</span>;
};

export const Hero: React.FC<HeroProps> = ({ onOpenBookMeeting, onExploreClick }) => {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 pt-32 pb-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.08] max-w-4xl mb-6"
        >
          {t('hero.title')}{' '}
          <span className="gold-text-shimmer drop-shadow-[0_0_35px_rgba(212,175,55,0.3)]">
            {t('hero.titleHighlight')}
          </span>
        </motion.h1>

        {/* Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-lg md:text-xl text-[#A7A7A7] max-w-2xl leading-relaxed font-light mb-10"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBookMeeting();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-[#050505] text-xs sm:text-sm font-bold tracking-wider uppercase font-display gold-glow hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>{t('hero.bookMeeting')}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onExploreClick();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#101010]/90 border border-white/10 hover:border-[#D4AF37]/60 text-xs sm:text-sm font-bold tracking-wider uppercase font-display text-white hover:text-[#E6C766] backdrop-blur-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>{t('hero.exploreSolutions')}</span>
          </button>
        </motion.div>

        {/* SPECIFIC REALISTIC METRICS BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/[0.08] w-full max-w-4xl"
        >
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-5 rounded-2xl bg-[#101010]/70 border border-white/[0.06] backdrop-blur-md hover:border-[#D4AF37]/30 transition-colors"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                <Counter value={metric.value} />
              </div>
              <div className="text-[11px] text-[#A7A7A7] mt-1 font-light tracking-wide">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#A7A7A7]/70">
          Cinematic Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 p-1 flex justify-center">
          <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
