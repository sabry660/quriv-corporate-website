import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* After Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.width || 0 }}
        />
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        animate={{ scale: isDragging ? 1.5 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <div className="flex items-center gap-1">
            <ArrowLeft className="w-4 h-4 text-gray-800" />
            <ArrowRight className="w-4 h-4 text-gray-800" />
          </div>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20">
        <span className="text-xs font-mono text-white font-bold">{beforeLabel}</span>
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-[#D4AF37]/90 backdrop-blur-md border border-[#D4AF37]/30">
        <span className="text-xs font-mono text-black font-bold">{afterLabel}</span>
      </div>

      {/* Drag instruction */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
        <span className="text-[10px] font-mono text-white uppercase tracking-wider">
          ← Drag to compare →
        </span>
      </div>
    </div>
  );
};
