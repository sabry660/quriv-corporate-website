import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/sound';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Simulate initial luxury load progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      soundManager.playChime();
      const finishTimer = setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 800); // Allow fade out animation
      }, 500);

      return () => clearTimeout(finishTimer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-gold" />

          {/* Logo Image */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] border border-[#D4AF37]/30"
              >
                <img
                  src="/logo.jpg"
                  alt="Quriv Technologies Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Center Floating Core Spark */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-[#E6C766] shadow-[0_0_12px_#D4AF37]"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>

            {/* Typography Brand Name */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-bold tracking-[0.3em] font-display uppercase text-white mb-2"
            >
              Quriv<span className="text-[#D4AF37]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4 }}
              className="text-xs uppercase tracking-[0.4em] text-[#A7A7A7]"
            >
              Technologies
            </motion.p>

            {/* Progress Bar & Percentage Counter */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E6C766] shadow-[0_0_10px_#D4AF37]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 text-[11px] font-mono tracking-widest text-[#A7A7A7]/80">
              {progress < 100 ? `INITIALIZING SYSTEM... ${progress}%` : 'SYSTEM READY'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
