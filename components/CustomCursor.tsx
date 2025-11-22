
import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        // Main dot follows instantly
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Follower has a slight delay via CSS transition, we just set position
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.cursor-pointer');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-itso-primary rounded-full pointer-events-none z-[9999] mix-blend-multiply transition-transform duration-75 ease-out -mt-1.5 -ml-1.5 hidden md:block"
      />
      
      {/* Follower Ring */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-itso-secondary rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out -mt-4 -ml-4 hidden md:block ${
          isHovering ? 'scale-[2.5] bg-itso-secondary/10 border-itso-primary/50' : 'scale-100 opacity-50'
        }`}
      />
    </>
  );
};
