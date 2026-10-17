'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ServicesSectionData } from '../../types';

// Register GSAP ScrollTrigger plugin safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services({ data }: { data: ServicesSectionData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Accessibility: respects user preference for reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const panels = gsap.utils.toArray<HTMLElement>('.service-panel');
      if (panels.length === 0) return;

      // GSAP Pinned Panels with Overscroll Pattern:
      // Exclude the last panel from pinning so normal scrolling resumes into the next section
      const panelsToAnimate = panels.slice(0, -1);

      panelsToAnimate.forEach((panel) => {
        const innerPanel = panel.querySelector<HTMLElement>('.panel-content');
        const panelHeight = innerPanel ? innerPanel.offsetHeight : panel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;

        // Smooth timeline with 1-second scrub inertia damping
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'bottom bottom',
            end: () => (difference > 0 ? `+=${difference + 100}` : `+=${window.innerHeight * 1.05}`),
            pin: true,
            pinSpacing: false,
            scrub: 1, // Ultra-smooth inertia interpolation
            invalidateOnRefresh: true,
            onRefresh: () => {
              gsap.set(panel, {
                transformOrigin: `center ${panel.offsetHeight - window.innerHeight / 2}px`,
              });
            },
          },
        });

        if (difference > 0 && innerPanel) {
          // Overscroll Solution: scrub inner content smoothly if taller than viewport
          tl.to(innerPanel, {
            y: -difference - 24,
            ease: 'none',
          });
        }

        // Tactile depth: as the next panel slides over, softly scale & dim the pinned card
        if (innerPanel) {
          tl.to(
            innerPanel,
            {
              scale: 0.96,
              opacity: 0.45,
              ease: 'power1.out',
            },
            difference > 0 ? '+=0.05' : 0
          );
        }
      });

      // Recalculate ScrollTrigger on window load to ensure images are accounted for
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-white pt-6 sm:pt-10 lg:pt-14"
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* Section Header: Title on Left, Description on Right */}
        <div className="grid items-end gap-6 pb-12 sm:pb-16 lg:grid-cols-[1.4fr_0.6fr] xl:grid-cols-[1.45fr_0.55fr] lg:gap-14 sm:pl-6 lg:pl-10 xl:pl-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[3px] w-8 sm:w-9 shrink-0 bg-[#fab526]" />
              <p className="text-[13px] sm:text-[14px] md:text-[15px] font-bold uppercase tracking-[0.18em] text-[#64748b]">
                {data.eyebrow}
              </p>
            </div>
            <h2 className="text-[48px] sm:text-[64px] md:text-[76px] lg:text-[88px] xl:text-[98px] 2xl:text-[106px] font-black uppercase tracking-tight text-[#081d16] leading-[0.93]">
              <span className="block tracking-[-0.03em] sm:whitespace-nowrap">{data.title_line1}</span>
              <span className="block font-light text-[#081d16] mt-1.5 sm:mt-2 tracking-[-0.02em] sm:whitespace-nowrap">
                {data.title_highlight}
              </span>
            </h2>
          </div>

          <div className="flex items-center pb-2">
            <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-relaxed text-[#64748b] max-w-[440px]">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Pinned Panels Container (GSAP ScrollTrigger Stacking Deck) */}
      <div ref={panelsContainerRef} className="relative w-full">
        {data.items.map((item, index) => {
          const isEven = index % 2 === 1; // 0: Left image, 1: Right image, 2: Left image, 3: Right image

          return (
            <div
              key={item.id}
              className={`service-panel relative w-full min-h-screen flex items-center justify-center border-t border-black/[0.08] shadow-[0_-20px_50px_rgba(0,0,0,0.06)] will-change-transform ${
                index % 2 === 1 ? 'bg-[#fafaf8]' : 'bg-white'
              }`}
              style={{ zIndex: 10 + index }}
            >
              <div className="panel-content w-full max-w-[1340px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
                <div
                  className={`grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20 ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image Column with Decorative Offset Backdrop */}
                  <div
                    className={`relative ${
                      isEven ? 'lg:col-start-2' : 'lg:col-start-1'
                    }`}
                  >
                    {/* Decorative Offset Backdrop Block (Sharp Corners - rounded-none) */}
                    {item.accent_color && (
                      <div
                        className={`pointer-events-none absolute h-full w-full rounded-none transition-transform duration-500 ${
                          isEven
                            ? '-top-4 -right-4 sm:-top-7 sm:-right-7'
                            : '-top-4 -left-4 sm:-top-7 sm:-left-7'
                        }`}
                        style={{ backgroundColor: item.accent_color }}
                      />
                    )}

                    {/* Main Image (Sharp Corners - rounded-none) */}
                    <div className="relative z-10 overflow-hidden rounded-none bg-gray-100 shadow-md ring-1 ring-black/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        onLoad={() => ScrollTrigger.refresh()}
                        className="w-full h-[240px] sm:h-[300px] lg:h-[330px] xl:h-[360px] object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content Column with Watermark in Background */}
                  <div
                    className={`relative flex flex-col justify-center ${
                      isEven
                        ? 'lg:col-start-1 lg:pr-8 xl:pr-14'
                        : 'lg:col-start-2 lg:pl-8 xl:pl-14'
                    }`}
                  >
                    {/* Subtle Number Watermark on RIGHT of Content */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute select-none text-[64px] sm:text-[80px] lg:text-[96px] font-black leading-none text-[#e2e8f0] z-0 -top-4 sm:-top-6 lg:-top-8 right-2 sm:right-6 lg:right-10 tracking-tighter"
                    >
                      {item.id}
                    </div>

                    {/* Content in Front (z-10) */}
                    <div className="relative z-10">
                      {/* Yellow Accent Bar */}
                      <div className="mb-3.5">
                        <span className="block h-[2.5px] w-7 bg-[#fab526]" />
                      </div>

                      {/* Card Title */}
                      <h3 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-tight text-[#081d16] leading-[1.12] max-w-[420px]">
                        {item.title}
                      </h3>

                      {/* Description Subtitle */}
                      <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#64748b] max-w-[420px]">
                        {item.description}
                      </p>

                      {/* Circular Gold Button with Arrow + LEARN MORE */}
                      <div className="mt-7 sm:mt-8">
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-3.5 transition-colors"
                        >
                          {/* Gold Outline Circle */}
                          <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#fab526] text-[#081d16] transition-all duration-300 group-hover:bg-[#fab526] group-hover:scale-105 group-hover:shadow-sm">
                            <span className="text-[17px] sm:text-[18px] leading-none font-bold transition-transform duration-300 group-hover:translate-x-0.5">
                              →
                            </span>
                          </span>

                          {/* LEARN MORE text */}
                          <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.14em] text-[#64748b] transition-colors duration-300 group-hover:text-[#081d16]">
                            {item.button_text || 'LEARN MORE'}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
