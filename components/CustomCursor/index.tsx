'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Exact mouse position for inner dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring for outer follower ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on devices that support hover / fine pointer (desktops & laptops)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], [data-cursor-hover], label'
          )
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? '#f5a623' : 'rgba(245, 166, 35, 0.45)',
          backgroundColor: isHovered
            ? 'rgba(245, 166, 35, 0.12)'
            : 'rgba(245, 166, 35, 0.04)',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 350 },
          borderColor: { duration: 0.18 },
          backgroundColor: { duration: 0.18 },
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[#f5a623] pointer-events-none shadow-[0_0_8px_rgba(245,166,35,0.6)] will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 7,
          height: 7,
        }}
        animate={{
          scale: isClicked ? 1.4 : isHovered ? 0.45 : 1,
          opacity: isHovered ? 0.7 : 1,
        }}
        transition={{
          scale: { type: 'spring', damping: 22, stiffness: 400 },
          opacity: { duration: 0.15 },
        }}
      />
    </div>
  );
}
