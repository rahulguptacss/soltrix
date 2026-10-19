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
  // Triplicate items for infinite smooth looping
  const extendedItems = [...items, ...items, ...items];
  const totalOriginal = items.length;

  const [currentIndex, setCurrentIndex] = useState(totalOriginal);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Seamless looping when reaching ends
  const handleAnimationComplete = () => {
    if (currentIndex >= totalOriginal * 2) {
      setCurrentIndex(currentIndex - totalOriginal);
    } else if (currentIndex < totalOriginal) {
      setCurrentIndex(currentIndex + totalOriginal);
    }
  };

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || totalOriginal <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, totalOriginal, nextSlide]);

  // Touch gesture support for mobile swiping
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const gap = 10;
  const cardWidth =
    containerWidth > 0
      ? (containerWidth - (visibleCards - 1) * gap) / visibleCards
      : 300;

  const currentTranslateX = currentIndex * (cardWidth + gap);
  const activeOriginalIndex = ((currentIndex % totalOriginal) + totalOriginal) % totalOriginal;

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 lg:py-28">
      {/* Decorative ambient background blur lights */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#06261c]/5 blur-3xl" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 xl:gap-14">
          
          {/* Left Column: Eyebrow, Animated Title, Description, Slider Controls */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0"
          >
            {/* Eyebrow with expanding line */}
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-[2.5px] w-7 origin-left rounded-full bg-[#f5a623]"
              />
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#64748b]"
              >
                {data.eyebrow || 'TESTIMONIALS'}
              </motion.p>
            </div>

            {/* Headline with staged reveal */}
            <h2 className="mt-4 text-[42px] sm:text-[52px] lg:text-[60px] leading-[1.04] tracking-tight text-[#06261c]">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block font-black"
              >
                {data.title_line1 || 'What Our'}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block font-light text-[#06261c]"
              >
                <span className="font-black text-[#f5a623]">{data.title_highlight || 'Customers'}</span>{' '}
                {data.title_line2 || 'Say'}
              </motion.span>
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 max-w-[340px] text-[15px] sm:text-[15.5px] leading-relaxed text-[#64748b]"
            >
              {data.description}
            </motion.p>

            {/* Prev / Next Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex items-center gap-3.5"
            >
              {/* Prev Button */}
              <motion.button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.06, backgroundColor: '#f9fafb' }}
                whileTap={{ scale: 0.92 }}
                className="group flex h-12 w-12 items-center justify-center rounded-[3px] border border-gray-300 bg-white text-[#1f2937] shadow-sm transition-shadow duration-300 hover:shadow-md hover:border-gray-400 active:scale-95"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
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
                whileHover={{ scale: 1.06, backgroundColor: '#e0961b' }}
                whileTap={{ scale: 0.92 }}
                className="group flex h-12 w-12 items-center justify-center rounded-[3px] bg-[#f5a623] text-[#111827] shadow-sm transition-shadow duration-300 hover:shadow-md active:scale-95"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Pagination Indicators */}
            <div className="mt-6 flex items-center gap-1.5">
              {items.map((_, dotIdx) => {
                const isActive = dotIdx === activeOriginalIndex;
                return (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      const diff = dotIdx - activeOriginalIndex;
                      setCurrentIndex((prev) => prev + diff);
                    }}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className="group py-1 focus:outline-none"
                  >
                    <motion.div
                      animate={{
                        width: isActive ? 24 : 8,
                        backgroundColor: isActive ? '#f5a623' : '#d1d5db',
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-2 rounded-full transition-colors group-hover:bg-[#f5a623]"
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Sliding Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            ref={containerRef}
            className="flex-1 min-w-0 overflow-hidden py-12 -my-12"
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
                stiffness: 220,
                damping: 28,
                mass: 0.85,
              }}
              onAnimationComplete={handleAnimationComplete}
              style={{ gap: `${gap}px` }}
            >
              {extendedItems.map((item, idx) => {
                const isCenter =
                  visibleCards === 3
                    ? idx === currentIndex + 1
                    : idx === currentIndex;

                return (
                  <motion.div
                    key={`${item.name}-${idx}`}
                    style={{
                      width: `${cardWidth}px`,
                      minWidth: `${cardWidth}px`,
                    }}
                    animate={{
                      y: isCenter ? (visibleCards === 3 ? -22 : -8) : 0,
                      scale: isCenter ? 1.025 : 0.985,
                      boxShadow: isCenter
                        ? '0 28px 65px -15px rgba(0, 0, 0, 0.14), 0 10px 30px -10px rgba(0, 0, 0, 0.06)'
                        : '0 4px 20px rgba(0, 0, 0, 0.04)',
                    }}
                    whileHover={{
                      y: isCenter ? -26 : -6,
                      transition: { duration: 0.25 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`group relative flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 min-h-[465px] transition-colors ${
                      isCenter
                        ? 'ring-1 ring-black/[0.04] z-20'
                        : 'border border-gray-100/90 z-10'
                    }`}
                  >
                    <div>
                      {/* Avatar */}
                      <div className="flex justify-center mb-6">
                        <div className="relative h-[86px] w-[86px] overflow-hidden rounded-full ring-4 ring-[#fafafa] shadow-inner transition-transform duration-500 group-hover:scale-105">
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-[#f3efe9] flex items-center justify-center font-bold text-[#f5a623] text-2xl">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Double Quote mark */}
                      <motion.div
                        animate={{ scale: isCenter ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 text-[#f5a623] select-none"
                      >
                        <svg
                          className="h-7 w-7 fill-[#f5a623]"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.593 3.6-4.593 5.485.45-.164.96-.286 1.54-.286 2.12 0 3.708 1.48 3.708 3.52 0 2.12-1.708 3.72-3.878 3.72-.88 0-1.63-.33-2.117-.899zm10.584 0C14.137 16.227 13.584 15 13.584 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.593 3.6-4.593 5.485.45-.164.96-.286 1.54-.286 2.12 0 3.708 1.48 3.708 3.52 0 2.12-1.708 3.72-3.878 3.72-.88 0-1.63-.33-2.117-.899z" />
                        </svg>
                      </motion.div>

                      {/* Quote Text */}
                      <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#556070]">
                        &ldquo;{item.quote.replace(/^[“"']+|[”"']+$/g, '')}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Author Section */}
                    <div className="mt-8 pt-2">
                      <motion.div
                        initial={false}
                        animate={{
                          width: isCenter ? 36 : 0,
                          opacity: isCenter ? 1 : 0,
                        }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="h-[2.5px] bg-[#f5a623] mb-2.5 rounded-full overflow-hidden"
                      />

                      <h4 className="text-[17px] font-bold tracking-tight text-[#111827]">
                        {item.name}
                      </h4>
                      <p className="text-[13px] font-normal text-[#9ca3af] mt-0.5">
                        {item.role}
                      </p>

                      {/* 5 Rating Stars */}
                      <div className="mt-3 flex items-center gap-1">
                        {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                          <motion.svg
                            key={starIdx}
                            initial={false}
                            animate={{
                              scale: isCenter ? [1, 1.25, 1] : 1,
                            }}
                            transition={{
                              delay: isCenter ? starIdx * 0.05 : 0,
                              duration: 0.3,
                            }}
                            className="h-4 w-4 fill-[#f5a623] text-[#f5a623]"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
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
