import React, { useEffect, useRef, useState } from 'react';

interface HeroVideoEngineProps {
  className?: string;
  overlayOpacity?: number;
}

export const HeroVideoEngine: React.FC<HeroVideoEngineProps> = ({
  className = '',
  overlayOpacity = 0.75,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay policy fallback handling
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

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background Poster & Image Canvas Fallback */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-40' : 'opacity-100'
        }`}
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop")',
        }}
      />

      {/* Cinematic Hero Video Canvas */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop"
          className={`w-full h-full object-cover transition-opacity duration-1000 filter grayscale contrast-125 ${
            isVideoLoaded ? 'opacity-35' : 'opacity-0'
          }`}
        >
          {/* Local Video Files */}
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
          
          {/* Online Cinematic Fallbacks */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-and-black-3d-lines-41238-large.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Reusable Dark Luxury Overlay Canvas - Adapts automatically to any underlying video */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `linear-gradient(to bottom, rgba(5,5,5,0.92) 0%, rgba(5,5,5,${overlayOpacity}) 50%, rgba(5,5,5,0.98) 100%)`,
        }}
      />

      {/* Radial Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_85%)]" />

      {/* Subtle Noise Texture for Cinematic Depth */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
};
