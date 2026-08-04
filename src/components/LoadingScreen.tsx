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
        }, 800);
      }, 500);

      return () => clearTimeout(finishTimer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none animate-pulse-gold" />

          {/* Main Content Container - Perfectly Centered */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Circular Logo Container with Gold Loading Ring */}
            <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
              
              {/* Gold Loading Ring - Thick and Premium */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: [0.16, 1, 0.3, 1],
                  repeatType: 'loop'
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  borderTop: '4px solid #D4AF37',
                  borderRight: '4px solid #E6C766',
                  borderBottom: '4px solid #D4AF37',
                  borderLeft: '4px solid transparent',
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
                }}
              />
              
              {/* Inner Gold Ring - Counter Rotation */}
              <motion.div
                initial={{ rotate: 360 }}
                animate={{ rotate: 0 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: [0.16, 1, 0.3, 1],
                  repeatType: 'loop'
                }}
                className="absolute inset-2 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTop: '2px solid #E6C766',
                  borderRight: '2px solid transparent',
                  borderBottom: '2px solid #D4AF37',
                  borderLeft: '2px solid #E6C766',
                  opacity: 0.6
                }}
              />

              {/* Circular Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-24 h-24 rounded-full overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.5)] border-2 border-[#D4AF37]/50"
              >
                <img
                  src="/logo.jpg"
                  alt="Quriv Technologies Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Company Name - Larger and Premium */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-[0.35em] font-display uppercase text-white mb-3">
                Quriv
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm uppercase tracking-[0.5em] text-[#A7A7A7] font-light"
              >
                Technologies
              </motion.p>
            </motion.div>

            {/* Elegant Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="text-[10px] font-mono tracking-[0.4em] text-[#D4AF37] mb-2">
                {progress < 100 ? `LOADING ${progress}%` : 'COMPLETE'}
              </div>
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
