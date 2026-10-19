'use client';

import { useRef } from 'react';
import { Sun, Leaf, Users, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { AboutSectionData } from '../../types';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ElementType> = {
  Sun,
  Leaf,
  Users,
  ShieldCheck,
};

export default function About({ data }: { data: AboutSectionData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const yellowBarRef = useRef<HTMLSpanElement>(null);
  const eyebrowTextRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleLine3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const imgCardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // 1. Accessibility: prefers-reduced-motion
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            yellowBarRef.current,
            eyebrowTextRef.current,
            titleLine1Ref.current,
            titleLine2Ref.current,
            titleLine3Ref.current,
            descRef.current,
            featuresGridRef.current,
            imgCardRef.current,
            imgRef.current,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clipPath: 'none',
            clearProps: 'all',
          }
        );
      });

      // 2. Desktop: Rich Scroll-Triggered Reveal & Parallax (>= 1024px)
      mm.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 1024px)',
        () => {
          if (!sectionRef.current) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            defaults: { ease: 'power3.out' },
          });

          // Eyebrow Draw
          if (yellowBarRef.current && eyebrowTextRef.current) {
            tl.fromTo(
              yellowBarRef.current,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.6 }
            ).fromTo(
              eyebrowTextRef.current,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5 },
              '-=0.3'
            );
          }

          // Main Heading: Clean Energy (1), For a Brighter (2), Tomorrow (3)
          const titleLines = [
            titleLine1Ref.current,
            titleLine2Ref.current,
            titleLine3Ref.current,
          ].filter(Boolean);

          if (titleLines.length > 0) {
            tl.fromTo(
              titleLines,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.12,
                ease: 'power4.out',
              },
              '-=0.2'
            );
          }

          // Description Paragraph
          if (descRef.current) {
            tl.fromTo(
              descRef.current,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.65 },
              '-=0.45'
            );
          }

          // 2x2 Feature Items (Staggered Entrance)
          if (featuresGridRef.current) {
            const items = featuresGridRef.current.children;
            tl.fromTo(
              items,
              { opacity: 0, y: 22 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
              },
              '-=0.4'
            );
          }

          // Right Column: Tall Sunset Solar Image (Curtain wipe + gentle counter-zoom)
          if (imgCardRef.current && imgRef.current) {
            tl.fromTo(
              imgCardRef.current,
              {
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                y: 30,
              },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                y: 0,
                duration: 1.25,
                ease: 'power3.inOut',
              },
              0.2
            );

            tl.fromTo(
              imgRef.current,
              { scale: 1.18 },
              {
                scale: 1,
                duration: 1.35,
                ease: 'power3.out',
              },
              0.2
            );

            // Subtle continuous scrub parallax while scrolling past section
            gsap.to(imgRef.current, {
              yPercent: -10,
              scale: 1.06,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
          }
        }
      );

      // 3. Mobile / Tablet (< 1024px): Fast, responsive scroll entrance
      mm.add(
        '(prefers-reduced-motion: no-preference) and (max-width: 1023px)',
        () => {
          if (!sectionRef.current) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            defaults: { ease: 'power2.out' },
          });

          if (yellowBarRef.current && eyebrowTextRef.current) {
            tl.fromTo(
              yellowBarRef.current,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.4 }
            ).fromTo(
              eyebrowTextRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4 },
              '-=0.25'
            );
          }

          const titleLines = [
            titleLine1Ref.current,
            titleLine2Ref.current,
            titleLine3Ref.current,
          ].filter(Boolean);

          if (titleLines.length > 0) {
            tl.fromTo(
              titleLines,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
              },
              '-=0.2'
            );
          }

          if (descRef.current) {
            tl.fromTo(
              descRef.current,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.5 },
              '-=0.35'
            );
          }

          if (featuresGridRef.current) {
            tl.fromTo(
              featuresGridRef.current.children,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.08,
              },
              '-=0.3'
            );
          }

          if (imgCardRef.current) {
            tl.fromTo(
              imgCardRef.current,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.75 },
              '-=0.4'
            );
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8 lg:pb-12"
    >
      <div className="w-full pr-0">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.25fr_0.95fr] lg:gap-8 xl:gap-12">
          {/* Left Column: Eyebrow, Main Heading, Description, 2x2 Features Grid */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start px-5 sm:px-8 md:px-12 lg:pl-16 lg:pr-6 xl:pl-24 xl:pr-10 2xl:pl-32 max-w-[720px] lg:max-w-none"
          >
            {/* Eyebrow: Yellow Dash + Tagline */}
            {data.eyebrow && (
              <div className="mb-3 sm:mb-3.5 flex items-center gap-2.5">
                <span
                  ref={yellowBarRef}
                  className="h-[2.5px] w-6 sm:w-7 shrink-0 bg-[#fab526] will-change-transform"
                />
                <p
                  ref={eyebrowTextRef}
                  className="text-[11.5px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#64748b] will-change-transform"
                >
                  {data.eyebrow}
                </p>
              </div>
            )}

            {/* Giant Main Heading:
                Line 1: CLEAN ENERGY (Heavy)
                Line 2: FOR A BRIGHTER (Heavy)
                Line 3: TOMORROW (Light) */}
            <div className="mb-4 sm:mb-5 uppercase tracking-tight text-[#081d16] w-full">
              <h2 className="uppercase text-[#081d16]">
                {/* Line 1 */}
                <span className="block overflow-hidden py-0.5">
                  <span
                    ref={titleLine1Ref}
                    className="block text-[32px] xs:text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] xl:text-[64px] font-black leading-[1.04] sm:leading-[0.98] tracking-[-0.025em] sm:tracking-[-0.03em] will-change-transform lg:whitespace-nowrap"
                  >
                    {data.title_line1}
                  </span>
                </span>

                {/* Line 2 */}
                {data.title_line2 && (
                  <span className="block overflow-hidden py-0.5 mt-0.5 sm:mt-1">
                    <span
                      ref={titleLine2Ref}
                      className="block text-[32px] xs:text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] xl:text-[64px] font-black leading-[1.04] sm:leading-[0.98] tracking-[-0.025em] sm:tracking-[-0.03em] will-change-transform lg:whitespace-nowrap"
                    >
                      {data.title_line2}
                    </span>
                  </span>
                )}

                {/* Line 3: Light weight TOMORROW */}
                {data.title_highlight && (
                  <span className="block overflow-hidden py-0.5 mt-0.5 sm:mt-1">
                    <span
                      ref={titleLine3Ref}
                      className="block text-[32px] xs:text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] xl:text-[64px] font-light leading-[1.04] sm:leading-[0.98] tracking-[-0.02em] text-[#081d16] will-change-transform lg:whitespace-nowrap"
                    >
                      {data.title_highlight}
                    </span>
                  </span>
                )}
              </h2>
            </div>

            {/* Description Subtitle */}
            <p
              ref={descRef}
              className="text-[15px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] leading-relaxed text-[#64748b] max-w-[520px] will-change-transform"
            >
              {data.description}
            </p>

            {/* 2x2 Feature Items Grid with Yellow Accents */}
            <div
              ref={featuresGridRef}
              className="mt-7 sm:mt-9 grid grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-14 lg:gap-x-16 xl:gap-x-20 gap-y-7 sm:gap-y-9 lg:gap-y-12 w-full max-w-[580px]"
            >
              {data.features.map((feature) => {
                const Icon = iconMap[feature.icon] || Sun;

                return (
                  <div
                    key={feature.label}
                    className="group flex flex-col items-start min-w-0 will-change-transform"
                  >
                    {/* Circular Icon Container */}
                    <div className="flex h-13 w-13 sm:h-14 sm:w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-full bg-[#f4f7f5] text-[#081d16] border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#081d16] group-hover:text-white">
                      <Icon className="h-6 w-6 sm:h-6.5 sm:w-6.5 lg:h-7 lg:w-7 stroke-[1.8]" />
                    </div>

                    {/* Short Orange Accent Line on all items */}
                    <span className="mt-3 mb-1.5 h-[2.5px] w-7 sm:w-8 shrink-0 rounded-full bg-[#f5a623] transition-all duration-300 group-hover:w-10" />

                    {/* Feature Label without awkward word-splitting */}
                    <span className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold leading-snug text-[#081d16] break-words">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tall Sunset Solar Rooftop Photo */}
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-0">
            <div
              ref={imgCardRef}
              className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-none bg-gray-50 shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <img
                ref={imgRef}
                src={data.image || '/img/about.webp'}
                alt={data.title_line1}
                className="w-full h-[280px] xs:h-[320px] sm:h-[420px] md:h-[500px] lg:h-[720px] xl:h-[800px] object-cover object-center lg:object-right transition-transform duration-700 will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
