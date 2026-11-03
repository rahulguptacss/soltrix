'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { TestimonialsSectionData } from '../../types';

interface TestimonialsProps {
  data: TestimonialsSectionData;
  layout?: 'slider' | 'grid';
}

export default function Testimonials({ data, layout }: TestimonialsProps) {
  const currentLayout = layout || data.layout || 'slider';

  if (currentLayout === 'grid') {
    return <TestimonialsGrid data={data} />;
  }

  return <TestimonialsSlider data={data} />;
}

/* =========================================================================
   GRID LAYOUT (Exact 2-Column Sharp Style from Screenshot)
   ========================================================================= */
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const gridCardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function TestimonialsGrid({ data }: { data: TestimonialsSectionData }) {
  const items = data.items || [];

  return (
    <section className="relative overflow-hidden bg-white py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Left Eyebrow & Title, Right Description */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-2">
          {/* Left Column: Eyebrow & Heading */}
          <div className="flex-1">
            {/* Eyebrow with animated horizontal orange dash */}
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-[#f5a623] shrink-0"
              />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                {data.eyebrow}
              </span>
            </div>

            {/* Heading: What Our / Customers Say */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2.5 sm:mt-3 text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px] font-black tracking-tight text-[#081d16] leading-[1.1] sm:leading-[1.08]"
            >
              {data.title_line1}
              <br />
              <span className="text-[#f5a623]">{data.title_highlight}</span>{' '}
              {data.title_line2 && <span>{data.title_line2}</span>}
            </motion.h2>
          </div>

          {/* Right Column: Subtitle Description */}
          {data.description && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:max-w-[440px] lg:pb-3"
            >
              <p className="text-[13.5px] sm:text-[15px] lg:text-[15.5px] leading-relaxed text-[#64748b]">
                {data.description}
              </p>
            </motion.div>
          )}
        </div>

        {/* 2-Column Testimonial Cards Grid with Staggered Motion */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-6 sm:mt-7 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-3.5 lg:gap-4"
        >
          {items.map((item, idx) => (
            <motion.div
              key={`${item.name}-${idx}`}
              variants={gridCardVariants}
              whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="group relative flex flex-col justify-between bg-[#faf8f5] p-5 sm:p-7 md:p-8 lg:p-10 transition-colors duration-200 hover:bg-[#f6f2ec] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.07)]"
            >
              {/* Top: Pale Amber Quote Icon + Body */}
              <div>
                {/* Stylized Double Quote mark with hover micro-interaction */}
                <div className="mb-3.5 sm:mb-5 select-none text-[#f6b447] transition-transform duration-300 group-hover:scale-110 origin-left">
                  <svg className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 fill-[#f6b447]" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.593 3.6-4.593 5.485.45-.164.96-.286 1.54-.286 2.12 0 3.708 1.48 3.708 3.52 0 2.12-1.708 3.72-3.878 3.72-.88 0-1.63-.33-2.117-.899zm10.584 0C14.137 16.227 13.584 15 13.584 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.593 3.6-4.593 5.485.45-.164.96-.286 1.54-.286 2.12 0 3.708 1.48 3.708 3.52 0 2.12-1.708 3.72-3.878 3.72-.88 0-1.63-.33-2.117-.899z" />
                  </svg>
                </div>

                {/* Quote text with readable responsive font size */}
                <p className="text-[14.5px] sm:text-[16px] lg:text-[17.5px] leading-[1.65] sm:leading-[1.72] text-[#334155]">
                  &ldquo;{item.quote.replace(/^[“"']+|[”"']+$/g, '')}&rdquo;
                </p>
              </div>

              {/* Bottom: Orange accent dash + Author & Role/Location */}
              <div className="mt-6 sm:mt-8 lg:mt-10">
                <div className="h-[2.5px] w-8 bg-[#f5a623] mb-2.5 sm:mb-3 transition-all duration-300 group-hover:w-12 group-hover:bg-[#f59e0b]" />
                <h4 className="text-[16px] sm:text-[17.5px] font-bold tracking-tight text-[#081d16]">
                  {item.name}
                </h4>
                <p className="mt-0.5 text-[12.5px] sm:text-[13.5px] font-normal text-[#64748b]">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* =========================================================================
   SLIDER LAYOUT (Interactive Carousel Mode)
   ========================================================================= */
function TestimonialsSlider({ data }: { data: TestimonialsSectionData }) {
  const items = data.items || [];
  // Repeat items 6 times so rapid navigation always has adjacent buffers
  const extendedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  const totalOriginal = items.length;

  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Controls (arrows & pagination) only show when > 3 testimonials on desktop or > 1 on mobile
  const isMobile = visibleCards === 1;
  const showControls = isMobile ? totalOriginal > 1 : totalOriginal > 3;

  const [currentIndex, setCurrentIndex] = useState(() => (totalOriginal > 3 ? totalOriginal * 2 : 0));

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const lastClickTimeRef = useRef(0);

  // Measure container width and responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }

      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, []);

  // Reset/normalize currentIndex if controls toggle
  useEffect(() => {
    if (showControls) {
      setCurrentIndex((prev) => {
        if (prev < totalOriginal * 2 || prev >= totalOriginal * 4) {
          return totalOriginal * 2;
        }
        return prev;
      });
    } else {
      setCurrentIndex(0);
    }
  }, [showControls, totalOriginal]);

  const nextSlide = useCallback(() => {
    if (!showControls) return;
    const now = Date.now();
    if (now - lastClickTimeRef.current < 260) return;
    lastClickTimeRef.current = now;

    setCurrentIndex((prev) => {
      // Loop protection: if approaching upper bounds, safely normalize
      if (prev >= totalOriginal * 4) {
        return prev - totalOriginal * 2 + 1;
      }
      return prev + 1;
    });
  }, [showControls, totalOriginal]);

  const prevSlide = useCallback(() => {
    if (!showControls) return;
    const now = Date.now();
    if (now - lastClickTimeRef.current < 260) return;
    lastClickTimeRef.current = now;

    setCurrentIndex((prev) => {
      // Loop protection: if approaching lower bounds, safely normalize
      if (prev <= totalOriginal) {
        return prev + totalOriginal * 2 - 1;
      }
      return prev - 1;
    });
  }, [showControls, totalOriginal]);

  // Seamless looping when reaching ends
  const handleAnimationComplete = () => {
    if (!showControls) return;
    setCurrentIndex((curr) => {
      if (curr >= totalOriginal * 4) {
        return curr - totalOriginal * 2;
      } else if (curr < totalOriginal * 2) {
        return curr + totalOriginal * 2;
      }
      return curr;
    });
  };

  // Autoplay with pause on hover (only active when controls are shown)
  useEffect(() => {
    if (isPaused || !showControls) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, showControls, nextSlide]);

  // Touch gesture support for mobile swiping
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !showControls) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const gap = 12;
  const cardWidth =
    containerWidth > 0
      ? (containerWidth - (visibleCards - 1) * gap) / visibleCards
      : 300;

  const renderItems = showControls ? extendedItems : items;
  const currentTranslateX = showControls ? currentIndex * (cardWidth + gap) : 0;
  const activeOriginalIndex = totalOriginal > 0 ? ((currentIndex % totalOriginal) + totalOriginal) % totalOriginal : 0;

  return (
    <section className="relative z-20 overflow-hidden bg-[#fafafa] py-10 sm:py-14 lg:py-16 shadow-[0_-20px_40px_rgba(0,0,0,0.04)]">
      {/* Decorative ambient background blur lights */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#06261c]/5 blur-3xl" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          
          {/* Left Column: Eyebrow, Animated Title, Description, Slider Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-[2px] w-6 origin-left rounded-full bg-[#f5a623]"
              />
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#64748b]"
              >
                {data.eyebrow || 'TESTIMONIALS'}
              </motion.p>
            </div>

            {/* Headline */}
            <h2 className="mt-3 text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.08] tracking-tight text-[#06261c]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="block font-black"
              >
                {data.title_line1 || 'What Our'}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="block font-light text-[#06261c]"
              >
                <span className="font-black text-[#f5a623]">{data.title_highlight || 'Customers'}</span>{' '}
                {data.title_line2 || 'Say'}
              </motion.span>
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-3 sm:mt-4 max-w-[320px] text-[13.5px] sm:text-[14px] leading-relaxed text-[#64748b]"
            >
              {data.description}
            </motion.p>

            {/* Prev / Next Navigation Buttons - Show ONLY when > 3 on desktop or > 1 on mobile (No active locking) */}
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-6 sm:mt-8 flex items-center gap-3"
              >
                {/* Prev Button */}
                <motion.button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-[#1f2937] shadow-sm transition-all duration-200 hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#081d16] active:scale-95 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </motion.button>

                {/* Next Button */}
                <motion.button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-[#1f2937] shadow-sm transition-all duration-200 hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#081d16] active:scale-95 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </motion.div>
            )}

            {/* Pagination Indicators - Show ONLY when > 3 on desktop or > 1 on mobile */}
            {showControls && (
              <div className="mt-4 sm:mt-5 flex items-center gap-1.5">
                {items.map((_, dotIdx) => {
                  const isActive = dotIdx === activeOriginalIndex;
                  return (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        const now = Date.now();
                        if (now - lastClickTimeRef.current < 260) return;
                        lastClickTimeRef.current = now;

                        const diff = dotIdx - activeOriginalIndex;
                        setCurrentIndex((prev) => prev + diff);
                      }}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className="group py-1 focus:outline-none cursor-pointer"
                    >
                      <motion.div
                        animate={{
                          width: isActive ? 20 : 6,
                          backgroundColor: isActive ? '#f5a623' : '#d1d5db',
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="h-1.5 rounded-full transition-colors group-hover:bg-[#f5a623]"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Right Column: Sliding Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            ref={containerRef}
            className="flex-1 min-w-0 overflow-hidden py-4 sm:py-6 -my-4 sm:-my-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: -currentTranslateX }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 30,
                mass: 0.8,
              }}
              onAnimationComplete={handleAnimationComplete}
              style={{ gap: `${gap}px` }}
            >
              {renderItems.map((item, idx) => {
                const isCenter =
                  visibleCards === 3
                    ? idx === currentIndex + 1
                    : visibleCards === 2
                      ? idx === currentIndex
                      : idx === currentIndex;

                return (
                  <motion.div
                    key={`${item.name}-${idx}`}
                    style={{
                      width: `${cardWidth}px`,
                      minWidth: `${cardWidth}px`,
                    }}
                    onClick={() => {
                      if (!showControls) return;
                      const now = Date.now();
                      if (now - lastClickTimeRef.current < 260) return;
                      lastClickTimeRef.current = now;

                      const centerOffset = visibleCards === 3 ? 1 : 0;
                      const targetIdx = currentIndex + centerOffset;
                      const diff = idx - targetIdx;
                      if (diff !== 0) {
                        setCurrentIndex((prev) => prev + diff);
                      }
                    }}
                    animate={{
                      y: isCenter && visibleCards > 1 ? -8 : 0,
                      scale: isCenter && visibleCards > 1 ? 1.015 : 1,
                      boxShadow: isCenter && visibleCards > 1
                        ? '0 16px 36px -10px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.04)'
                        : '0 2px 10px rgba(0, 0, 0, 0.03)',
                    }}
                    whileHover={{
                      y: isCenter && visibleCards > 1 ? -12 : -4,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 26,
                    }}
                    className={`group relative flex flex-col justify-between rounded-xl bg-white p-4 sm:p-5 lg:p-6 min-h-[300px] sm:min-h-[320px] lg:min-h-[340px] transition-colors cursor-pointer ${
                      isCenter && visibleCards > 1
                        ? 'ring-2 ring-[#f5a623]/25 border-transparent z-20'
                        : 'border border-gray-100/90 z-10'
                    }`}
                  >
                    <div>
                      {/* Avatar */}
                      <div className="flex justify-center mb-3 sm:mb-3.5">
                        <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full ring-2 ring-gray-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-[#f3efe9] flex items-center justify-center font-bold text-[#f5a623] text-lg">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Double Quote mark */}
                      <div className="mb-2 sm:mb-2.5 text-[#f5a623] select-none">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 fill-[#f5a623]"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.593 3.6-4.593 5.485.45-.164.96-.286 1.54-.286 2.12 0 3.708 1.48 3.708 3.52 0 2.12-1.708 3.72-3.878 3.72-.88 0-1.63-.33-2.117-.899zm10.584 0C14.137 16.227 13.584 15 13.584 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.593 3.6-4.593 5.485.45-.164.96-.286 1.54-.286 2.12 0 3.708 1.48 3.708 3.52 0 2.12-1.708 3.72-3.878 3.72-.88 0-1.63-.33-2.117-.899z" />
                        </svg>
                      </div>

                      {/* Quote Text */}
                      <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed text-[#556070] line-clamp-4 sm:line-clamp-5">
                        &ldquo;{item.quote.replace(/^[“"']+|[”"']+$/g, '')}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Author Section */}
                    <div className="mt-3 sm:mt-4 pt-2">
                      <div className="h-[2px] w-6 bg-[#f5a623] mb-2 rounded-full" />

                      <h4 className="text-[14px] sm:text-[15px] font-bold tracking-tight text-[#111827]">
                        {item.name}
                      </h4>
                      <p className="text-[11.5px] sm:text-[12px] font-normal text-[#9ca3af] mt-0.5">
                        {item.role}
                      </p>

                      {/* 5 Rating Stars */}
                      <div className="mt-1.5 sm:mt-2 flex items-center gap-1">
                        {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                          <svg
                            key={starIdx}
                            className="h-3.5 w-3.5 fill-[#f5a623] text-[#f5a623]"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
