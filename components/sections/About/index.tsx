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
      className="relative overflow-hidden bg-white pt-0 sm:pt-2 lg:pt-4 pb-4 sm:pb-6 lg:pb-8"
    >
      <div className="w-full pr-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.25fr_0.95fr] lg:gap-8 xl:gap-12">
          {/* Left Column: Eyebrow, Main Heading, Description, 2x2 Features Grid */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-24 2xl:pl-32 pr-4 sm:pr-6 lg:pr-8 xl:pr-10"
          >
            {/* Eyebrow: Yellow Dash + Tagline */}
            {data.eyebrow && (
              <div className="mb-3.5 flex items-center gap-2.5">
                <span
                  ref={yellowBarRef}
                  className="h-[2.5px] w-7 shrink-0 bg-[#fab526] will-change-transform"
                />
                <p
                  ref={eyebrowTextRef}
                  className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#64748b] will-change-transform"
                >
                  {data.eyebrow}
                </p>
              </div>
            )}

            {/* Giant Main Heading:
                Line 1: CLEAN ENERGY (Heavy)
                Line 2: FOR A BRIGHTER (Heavy)
                Line 3: TOMORROW (Light) */}
            <div className="mb-5 uppercase tracking-tight text-[#081d16]">
              <h2 className="uppercase text-[#081d16]">
                {/* Line 1 */}
                <span className="block overflow-hidden py-0.5">
                  <span
                    ref={titleLine1Ref}
                    className="block text-[38px] sm:text-[48px] lg:text-[56px] xl:text-[64px] font-black leading-[0.98] tracking-[-0.03em] sm:whitespace-nowrap will-change-transform"
                  >
                    {data.title_line1}
                  </span>
                </span>

                {/* Line 2 */}
                {data.title_line2 && (
                  <span className="block overflow-hidden py-0.5 mt-0.5 sm:mt-1">
                    <span
                      ref={titleLine2Ref}
                      className="block text-[38px] sm:text-[48px] lg:text-[56px] xl:text-[64px] font-black leading-[0.98] tracking-[-0.03em] sm:whitespace-nowrap will-change-transform"
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
                      className="block text-[38px] sm:text-[48px] lg:text-[56px] xl:text-[64px] font-light leading-[0.98] tracking-[-0.02em] text-[#081d16] sm:whitespace-nowrap will-change-transform"
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
              className="text-[17px] sm:text-[19px] lg:text-[20px] leading-relaxed text-[#64748b] max-w-[500px] will-change-transform"
            >
              {data.description}
            </p>

            {/* 2x2 Feature Items Grid with Yellow Accents */}
            <div
              ref={featuresGridRef}
              className="mt-6 sm:mt-7 lg:mt-8 grid grid-cols-2 gap-x-12 sm:gap-x-16 lg:gap-x-20 xl:gap-x-24 gap-y-10 sm:gap-y-12 lg:gap-y-14 w-full max-w-[580px]"
            >
              {data.features.map((feature) => {
                const Icon = iconMap[feature.icon] || Sun;
                const words = feature.label.split(' ');

                return (
                  <div
                    key={feature.label}
                    className="group flex flex-col items-start will-change-transform"
                  >
                    {/* Circular Icon Container */}
                    <div className="flex h-[68px] w-[68px] sm:h-[76px] sm:w-[76px] lg:h-[82px] lg:w-[82px] items-center justify-center rounded-full bg-[#f4f5f7] text-[#081d16] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#081d16] group-hover:text-white group-hover:shadow-md">
                      <Icon className="h-8 w-8 sm:h-9 sm:w-9 stroke-[2]" />
                    </div>

                    {/* Short Yellow Accent Line */}
                    <span className="mt-4 h-[3px] w-8 sm:w-10 shrink-0 bg-[#fab526] transition-all duration-300 group-hover:w-12" />

                    {/* 2-Line Label */}
                    <span className="mt-3 text-[18px] sm:text-[20px] lg:text-[22px] font-bold leading-[1.22] text-[#081d16]">
                      {words.map((word, wIdx) => (
                        <span key={wIdx} className="block">
                          {word}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tall Sunset Solar Rooftop Photo (Sharp Corners & Flush to Right) */}
          <div className="w-full">
            <div
              ref={imgCardRef}
              className="relative w-full overflow-hidden rounded-none bg-gray-50 shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <img
                ref={imgRef}
                src={data.image || '/img/about.webp'}
                alt={data.title_line1}
                className="w-full h-[520px] sm:h-[660px] lg:h-[760px] xl:h-[840px] object-cover object-right transition-transform duration-700 will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
