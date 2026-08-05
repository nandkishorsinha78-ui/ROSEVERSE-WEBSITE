'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currX = -100;
    let currY = -100;
    let folX = -100;
    let folY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateCursor = () => {
      currX += (targetX - currX) * 0.65;
      currY += (targetY - currY) * 0.65;

      folX += (targetX - folX) * 0.18;
      folY += (targetY - folY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${folX}px, ${folY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, input, select, textarea, .interactive-hover, [role="button"]'
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor hidden md:block ${isHovered ? 'scale-150 bg-gold-accent shadow-[0_0_20px_rgba(244,211,140,0.6)]' : ''}`}
      />
      <div
        ref={followerRef}
        className={`cursor-follower hidden md:block ${isHovered ? 'scale-125 border-crimson-rose bg-crimson-rose/10' : ''}`}
      />
    </>
  );
}

