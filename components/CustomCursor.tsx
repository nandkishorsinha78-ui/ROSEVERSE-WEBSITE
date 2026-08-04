'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animId: number;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateCursor = () => {
      setPosition((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.65,
        y: prev.y + (targetY - prev.y) * 0.65,
      }));

      setFollowerPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.18,
        y: prev.y + (targetY - prev.y) * 0.18,
      }));

      animId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
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

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor hidden md:block ${isHovered ? 'scale-150 bg-gold-accent shadow-[0_0_20px_rgba(244,211,140,0.6)]' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className={`cursor-follower hidden md:block ${isHovered ? 'scale-125 border-crimson-rose bg-crimson-rose/10' : ''}`}
        style={{
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
        }}
      />
    </>
  );
}
