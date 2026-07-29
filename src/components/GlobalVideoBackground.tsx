import React, { useEffect, useRef, useState } from 'react';
import { SectionId } from '../types';

interface GlobalVideoBackgroundProps {
  activeSection: SectionId;
  reducedMotion?: boolean;
}

// Section-specific visual configurations
const SECTION_CONFIGS: Record<SectionId, {
  brightness: number;
  contrast: number;
  saturation: number;
  overlayOpacity: number;
  vignetteIntensity: number;
  particleDensity: number;
  colorTemperature: 'warm' | 'cool' | 'neutral';
}> = {
  hero: {
    brightness: 1.0,
    contrast: 1.25,
    saturation: 0.8,
    overlayOpacity: 0.75,
    vignetteIntensity: 0.85,
    particleDensity: 1.0,
    colorTemperature: 'warm',
  },
  about: {
    brightness: 0.95,
    contrast: 1.15,
    saturation: 0.7,
    overlayOpacity: 0.82,
    vignetteIntensity: 0.90,
    particleDensity: 0.8,
    colorTemperature: 'neutral',
  },
  technologies: {
    brightness: 0.9,
    contrast: 1.3,
    saturation: 0.6,
    overlayOpacity: 0.88,
    vignetteIntensity: 0.92,
    particleDensity: 1.2,
    colorTemperature: 'cool',
  },
  process: {
    brightness: 0.92,
    contrast: 1.2,
    saturation: 0.75,
    overlayOpacity: 0.85,
    vignetteIntensity: 0.88,
    particleDensity: 0.9,
    colorTemperature: 'neutral',
  },
  industries: {
    brightness: 0.88,
    contrast: 1.35,
    saturation: 0.65,
    overlayOpacity: 0.90,
    vignetteIntensity: 0.95,
    particleDensity: 1.1,
    colorTemperature: 'warm',
  },
  gallery: {
    brightness: 0.85,
    contrast: 1.4,
    saturation: 0.7,
    overlayOpacity: 0.92,
    vignetteIntensity: 0.93,
    particleDensity: 1.3,
    colorTemperature: 'neutral',
  },
  partners: {
    brightness: 0.93,
    contrast: 1.18,
    saturation: 0.8,
    overlayOpacity: 0.80,
    vignetteIntensity: 0.87,
    particleDensity: 0.7,
    colorTemperature: 'neutral',
  },
  team: {
    brightness: 0.95,
    contrast: 1.1,
    saturation: 0.85,
    overlayOpacity: 0.78,
    vignetteIntensity: 0.82,
    particleDensity: 0.6,
    colorTemperature: 'warm',
  },
  locations: {
    brightness: 0.9,
    contrast: 1.25,
    saturation: 0.72,
    overlayOpacity: 0.86,
    vignetteIntensity: 0.89,
    particleDensity: 0.85,
    colorTemperature: 'neutral',
  },
  faq: {
    brightness: 0.94,
    contrast: 1.15,
    saturation: 0.78,
    overlayOpacity: 0.83,
    vignetteIntensity: 0.86,
    particleDensity: 0.75,
    colorTemperature: 'neutral',
  },
  contact: {
    brightness: 0.97,
    contrast: 1.1,
    saturation: 0.9,
    overlayOpacity: 0.70,
    vignetteIntensity: 0.80,
    particleDensity: 0.5,
    colorTemperature: 'warm',
  },
};

export const GlobalVideoBackground: React.FC<GlobalVideoBackgroundProps> = ({
  activeSection,
  reducedMotion = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const config = SECTION_CONFIGS[activeSection] || SECTION_CONFIGS.hero;

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    };

    const handleError = () => {
      setHasError(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    if (video.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Color temperature filter
  const getColorTemperatureFilter = (temp: 'warm' | 'cool' | 'neutral') => {
    switch (temp) {
      case 'warm':
        return 'sepia(0.15) saturate(1.1)';
      case 'cool':
        return 'hue-rotate(10deg) saturate(0.9)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Background Poster Fallback */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-40' : 'opacity-100'
        }`}
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop")',
        }}
      />

      {/* Unified Cinematic Video Background */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isVideoLoaded ? 'opacity-35' : 'opacity-0'
          }`}
          style={{
            filter: `
              grayscale(${config.saturation < 0.8 ? 0.3 : 0})
              brightness(${config.brightness})
              contrast(${config.contrast})
              ${getColorTemperatureFilter(config.colorTemperature)}
            `,
          }}
        >
          {/* Local Video Files */}
          <source 
            src="/videos/hero-placeholder.mp4" 
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source 
            src="/videos/hero-placeholder.webm" 
            type="video/webm"
            media="(min-width: 768px)"
          />
          
          {/* Mobile-Optimized Fallback (lower quality) */}
          <source 
            src="/videos/hero-placeholder.mp4" 
            type="video/mp4"
            media="(max-width: 767px)"
          />
          
          {/* Online Cinematic Fallback */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-and-black-3d-lines-41238-large.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Section-Aware Dark Luxury Overlay */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,${config.overlayOpacity}) 50%, rgba(5,5,5,0.98) 100%)`,
        }}
      />

      {/* Dynamic Radial Vignette Mask */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse_at_center,transparent_${100 - config.vignetteIntensity * 100}%,#050505_${config.vignetteIntensity * 100}%)`,
        }}
      />

      {/* Subtle Noise Texture for Cinematic Depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] transition-all duration-700"
        style={{
          backgroundSize: `${16 / config.particleDensity}px ${16 / config.particleDensity}px`,
        }}
      />

      {/* Section-Specific Color Grade Overlay */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          opacity: 0.05,
          background: config.colorTemperature === 'warm' 
            ? 'linear-gradient(45deg, rgba(212,175,55,0.1), rgba(230,199,102,0.05))'
            : config.colorTemperature === 'cool'
            ? 'linear-gradient(45deg, rgba(26,26,46,0.1), rgba(50,50,80,0.05))'
            : 'transparent',
        }}
      />
    </div>
  );
};
