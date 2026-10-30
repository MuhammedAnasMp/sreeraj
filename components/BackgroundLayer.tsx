'use client';

import React, { useEffect, useState } from 'react';

export default function BackgroundLayer() {
  const [blurAmount, setBlurAmount] = useState<number>(0);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          // In first viewport (scrollPos <= 70px): 0px blur
          const blur = Math.min(Math.max((scrollPos - 70) / 45, 0), 6);
          setBlurAmount(blur);

          // Overlay opacity: 0 on landing, fades in gently behind cards
          const opacity = Math.min(Math.max((scrollPos - 80) / 180, 0), 0.7);
          setOverlayOpacity(opacity);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
      {/* Static background image - perfectly fixed, no movement */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat transition-[filter] duration-300 ease-out"
        style={{
          backgroundImage: "url('/assets/couple.jpeg')",
          backgroundPosition: 'center 8%',
          filter: blurAmount > 0 ? `blur(${blurAmount.toFixed(1)}px)` : 'none',
        }}
      />

      {/* Gentle gradient overlay that only fades in as user scrolls down */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[#FDF5F0]/45 to-[#F5E6F0]/80 transition-opacity duration-300 ease-out pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

