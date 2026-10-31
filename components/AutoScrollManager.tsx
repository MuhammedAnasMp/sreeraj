'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AutoScrollManagerProps {
  isInvitationOpened?: boolean;
  inactivityDelayMs?: number; // default 3000ms (3 sec)
  speedPxPerSecond?: number;  // default 70px/sec
}

export default function AutoScrollManager({
  isInvitationOpened = false,
  inactivityDelayMs = 3000,
  speedPxPerSecond = 70,
}: AutoScrollManagerProps) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isUserDisabled, setIsUserDisabled] = useState(false);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isInputFocusedRef = useRef(false);
  const isScrollingRef = useRef(false);

  // Stop auto-scrolling
  const stopAutoScroll = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    lastTimeRef.current = null;
    if (isScrollingRef.current) {
      isScrollingRef.current = false;
      setIsAutoScrolling(false);
    }
  };

  // Helper to check if invitation gate is open
  const isGateOpen = () => {
    if (typeof document === 'undefined') return false;
    return isInvitationOpened || document.body.style.overflow !== 'hidden';
  };

  // Start auto-scrolling
  const startAutoScroll = () => {
    if (isUserDisabled) return;
    if (!isGateOpen()) return;
    if (isInputFocusedRef.current) return;
    if (typeof window === 'undefined') return;

    // Check if reached bottom already
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
    if (isAtBottom) return;

    stopAutoScroll();
    isScrollingRef.current = true;
    setIsAutoScrolling(true);
    lastTimeRef.current = performance.now();

    const scrollStep = (now: number) => {
      if (!isScrollingRef.current) return;

      if (lastTimeRef.current !== null) {
        const deltaMs = now - lastTimeRef.current;
        const pixelsToScroll = (speedPxPerSecond * deltaMs) / 1000;

        if (pixelsToScroll > 0) {
          window.scrollBy({ top: pixelsToScroll, behavior: 'auto' });
        }

        // Check if reached bottom
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
        if (atBottom) {
          stopAutoScroll();
          return;
        }
      }

      lastTimeRef.current = now;
      animFrameIdRef.current = requestAnimationFrame(scrollStep);
    };

    animFrameIdRef.current = requestAnimationFrame(scrollStep);
  };

  // Reset inactivity countdown
  const resetInactivityTimer = () => {
    stopAutoScroll();

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    if (isUserDisabled || !isGateOpen()) return;
    if (isInputFocusedRef.current) return;

    inactivityTimerRef.current = setTimeout(() => {
      startAutoScroll();
    }, inactivityDelayMs);
  };

  useEffect(() => {
    if (isUserDisabled) {
      stopAutoScroll();
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      return;
    }

    // Start timer when invitation opens
    resetInactivityTimer();

    // User activity listeners
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        isInputFocusedRef.current = true;
        stopAutoScroll();
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
      }
    };

    const handleFocusOut = () => {
      isInputFocusedRef.current = false;
      resetInactivityTimer();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        resetInactivityTimer();
      }
    };

    window.addEventListener('mousemove', handleUserActivity, { passive: true });
    window.addEventListener('mousedown', handleUserActivity, { passive: true });
    window.addEventListener('touchstart', handleUserActivity, { passive: true });
    window.addEventListener('touchmove', handleUserActivity, { passive: true });
    window.addEventListener('wheel', handleUserActivity, { passive: true });
    window.addEventListener('keydown', handleUserActivity, { passive: true });
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAutoScroll();
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('touchmove', handleUserActivity);
      window.removeEventListener('wheel', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInvitationOpened, isUserDisabled, inactivityDelayMs, speedPxPerSecond]);

  if (!isAutoScrolling || isUserDisabled) {
    return null;
  }

  return (
    <aside
      aria-label="Auto-scroll active"
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3.5 py-1.5 bg-white/85 backdrop-blur-md border border-[#D4AF37]/50 rounded-full shadow-[0_4px_16px_rgba(156,20,72,0.15)] text-[#9C1448] text-xs font-medium animate-fade-in pointer-events-auto"
    >
      <span className="w-2 h-2 rounded-full bg-[#C2185B] animate-ping" />
      <span className="tracking-wide">Auto-scrolling</span>
      <button
        type="button"
        onClick={() => {
          setIsUserDisabled(true);
          stopAutoScroll();
        }}
        title="Turn off auto-scroll"
        className="ml-1 text-[11px] px-1.5 py-0.5 rounded-full bg-[#9C1448]/10 hover:bg-[#9C1448]/20 text-[#9C1448] font-bold cursor-pointer transition-colors"
      >
        ✕
      </button>
    </aside>
  );
}