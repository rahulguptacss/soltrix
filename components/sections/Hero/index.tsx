'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { HeroSectionData } from '../../types';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ data }: { data: HeroSectionData }) {
  const heroRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const yellowBarRef = useRef<HTMLSpanElement>(null);
  const eyebrowTextRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // Image Cards & Inner Images
  const ecoCardRef = useRef<HTMLDivElement>(null);
  const ecoImgRef = useRef<HTMLImageElement>(null);
  const solarCardRef = useRef<HTMLDivElement>(null);
  const solarImgRef = useRef<HTMLImageElement>(null);

  // Interactive Magnetic & Floating Mouse Parallax Handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || window.innerWidth < 1024) return;

    const bounds = heroRef.current.getBoundingClientRect();
    const relX = (e.clientX - bounds.left) / bounds.width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - bounds.top) / bounds.height - 0.5;

    // Subtle 3D multi-plane depth tilt & translate
    if (solarCardRef.current) {
      gsap.to(solarCardRef.current, {
        x: relX * -18,
        y: relY * -14,
        rotateY: relX * 2,
        rotateX: -relY * 2,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (ecoCardRef.current) {
      gsap.to(ecoCardRef.current, {
        x: relX * 14,
        y: relY * 12,
        rotateY: -relX * 2,
        rotateX: relY * 2,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: relX * 35,
        y: relY * 30,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (titleWrapRef.current) {
      gsap.to(titleWrapRef.current, {
        x: relX * -6,
        y: relY * -4,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth < 1024) return;

    if (solarCardRef.current) {
      gsap.to(solarCardRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    if (ecoCardRef.current) {
      gsap.to(ecoCardRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: 0,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
      });
    }

    if (titleWrapRef.current) {
      gsap.to(titleWrapRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, []);

  // CTA Button Magnetic Pull
  const handleButtonMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 4,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleButtonMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

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
            descRef.current,
            btnWrapRef.current,
            ecoCardRef.current,
            ecoImgRef.current,
            solarCardRef.current,
            solarImgRef.current,
            glowRef.current,
            contentWrapperRef.current,
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

      // 2. Desktop: Awwwards-Tier Kinetic Reveals + Editorial Curtain Wipes + Scrubbed Parallax
      mm.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 1024px)',
        () => {
          // Master Entrance Timeline
          const master = gsap.timeline({
            defaults: { ease: 'power4.out' },
          });

          // Soft Ambient Solar Bloom Entrance
          if (glowRef.current) {
            master.fromTo(
              glowRef.current,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
              0
            );
          }

          // Awwwards Eyebrow Draw Animation: Line expands, text slides up
          if (yellowBarRef.current && eyebrowTextRef.current) {
            master.fromTo(
              yellowBarRef.current,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.7, ease: 'power3.out' },
              0.1
            );

            master.fromTo(
              eyebrowTextRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
              0.2
            );
          }

          // Kinetic Masked Typography:
          // "RENEWABLE" and "ENERGY SOLUTIONS" rise from beneath masked overflow containers
          if (titleLine1Ref.current) {
            master.fromTo(
              titleLine1Ref.current,
              { yPercent: 120, rotateZ: 1.5, skewY: 1.5, opacity: 0 },
              {
                yPercent: 0,
                rotateZ: 0,
                skewY: 0,
                opacity: 1,
                duration: 1.05,
                ease: 'power4.out',
              },
              0.25
            );
          }

          if (titleLine2Ref.current) {
            master.fromTo(
              titleLine2Ref.current,
              { yPercent: 120, rotateZ: 1.5, skewY: 1.5, opacity: 0 },
              {
                yPercent: 0,
                rotateZ: 0,
                skewY: 0,
                opacity: 1,
                duration: 1.1,
                ease: 'power4.out',
              },
              0.38
            );
          }

          // Editorial Image Reveal: Solar Panel Array (Curtain bottom-up wipe + counter-zoom)
          if (solarCardRef.current && solarImgRef.current) {
            master.fromTo(
              solarCardRef.current,
              {
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                y: 30,
              },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                y: 0,
                duration: 1.35,
                ease: 'power3.inOut',
              },
              0.4
            );

            master.fromTo(
              solarImgRef.current,
              { scale: 1.22 },
              {
                scale: 1,
                duration: 1.4,
                ease: 'power3.out',
              },
              0.4
            );
          }

          // Editorial Image Reveal: Eco Hands Card (Diagonal/bottom-up wipe + subtle float)
          if (ecoCardRef.current && ecoImgRef.current) {
            master.fromTo(
              ecoCardRef.current,
              {
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                x: -25,
              },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                x: 0,
                duration: 1.25,
                ease: 'power3.inOut',
              },
              0.55
            );

            master.fromTo(
              ecoImgRef.current,
              { scale: 1.2 },
              {
                scale: 1,
                duration: 1.35,
                ease: 'power3.out',
              },
              0.55
            );
          }

          // Description & CTA Button Stagger
          if (descRef.current) {
            master.fromTo(
              descRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
              0.65
            );
          }

          if (btnWrapRef.current) {
            master.fromTo(
              btnWrapRef.current,
              { opacity: 0, y: 20, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.4)' },
              0.75
            );
          }

          // --- Continuous Scroll-Triggered Parallax Scrub ---
          if (heroRef.current) {
            // Solar Panel Card & Image: high-speed multi-layer drift
            if (solarCardRef.current && solarImgRef.current) {
              gsap.to(solarCardRef.current, {
                yPercent: -14,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              });

              gsap.to(solarImgRef.current, {
                scale: 1.08,
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              });
            }

            // Eco Hands Card: lower speed parallax (creates realistic focal depth)
            if (ecoCardRef.current && ecoImgRef.current) {
              gsap.to(ecoCardRef.current, {
                yPercent: -6,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              });

              gsap.to(ecoImgRef.current, {
                scale: 1.04,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              });
            }

            // Headline & Text subtle drift upward
            if (titleWrapRef.current) {
              gsap.to(titleWrapRef.current, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              });
            }

            // Hero Exit Transition: gracefully softens & lifts as next section arrives
            if (contentWrapperRef.current) {
              gsap.to(contentWrapperRef.current, {
                opacity: 0.3,
                y: -35,
                ease: 'power1.out',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: '60% top',
                  end: 'bottom top',
                  scrub: 1,
                },
              });
            }
          }
        }
      );

      // 3. Mobile / Tablet (< 1024px): Fast, responsive, fluid kinetic entrance
      mm.add(
        '(prefers-reduced-motion: no-preference) and (max-width: 1023px)',
        () => {
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
          });

          if (yellowBarRef.current && eyebrowTextRef.current) {
            tl.fromTo(
              yellowBarRef.current,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.5 }
            ).fromTo(
              eyebrowTextRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5 },
              '-=0.3'
            );
          }

          if (titleLine1Ref.current && titleLine2Ref.current) {
            tl.fromTo(
              [titleLine1Ref.current, titleLine2Ref.current],
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power4.out',
              },
              '-=0.3'
            );
          }

          if (descRef.current) {
            tl.fromTo(
              descRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6 },
              '-=0.4'
            );
          }

          if (btnWrapRef.current) {
            tl.fromTo(
              btnWrapRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6 },
              '-=0.4'
            );
          }

          if (ecoCardRef.current) {
            tl.fromTo(
              ecoCardRef.current,
              { opacity: 0, y: 20, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.7 },
              '-=0.4'
            );
          }

          if (solarCardRef.current) {
            tl.fromTo(
              solarCardRef.current,
              { opacity: 0, y: 25, scale: 0.98 },
              { opacity: 1, y: 0, scale: 1, duration: 0.75 },
              '-=0.45'
            );
          }

          // Gentle mobile scroll scrub
          if (solarImgRef.current && heroRef.current) {
            gsap.to(solarImgRef.current, {
              scale: 1.04,
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            });
          }
        }
      );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-white pb-2 pt-4 sm:pb-4 sm:pt-8"
      style={{ perspective: 1200 }}
    >
      {/* Subtle Ambient Solar Atmosphere Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#fab526]/12 via-[#fab526]/4 to-transparent blur-3xl will-change-transform"
      />

      <div
        ref={contentWrapperRef}
        className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        {/* Eyebrow */}
        {data.eyebrow && (
          <div className="mb-3 flex items-center gap-2.5 sm:pl-6 lg:pl-10 xl:pl-12">
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

        {/* Giant Kinetic Masked Main Title: Heavy RENEWABLE + Light ENERGY SOLUTIONS */}
        <div
          ref={titleWrapRef}
          className="mb-6 sm:mb-8 sm:pl-6 lg:pl-10 xl:pl-12 will-change-transform"
        >
          <h1 className="uppercase tracking-tight text-[#081d16]">
            {/* Masked Line 1 */}
            <span className="block overflow-hidden py-1">
              <span
                ref={titleLine1Ref}
                className="block text-[54px] sm:text-[76px] lg:text-[96px] font-black leading-[0.96] tracking-[-0.03em] will-change-transform"
              >
                {data.title_line1}
              </span>
            </span>

            {/* Masked Line 2 */}
            <span className="block overflow-hidden py-1 mt-0.5 sm:mt-1">
              <span
                ref={titleLine2Ref}
                className="block text-[54px] sm:text-[76px] lg:text-[96px] font-light leading-[0.96] tracking-[-0.02em] text-[#081d16] will-change-transform"
              >
                {data.title_line2}
              </span>
            </span>
          </h1>
        </div>

        {/* Two Columns Layout directly underneath the Title */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-8">
          {/* Left Column: Subtext + Button + Hands with Leaves Image */}
          <div className="flex flex-col items-start sm:pl-6 lg:pl-10 xl:pl-12">
            {/* Description Subtitle */}
            <p
              ref={descRef}
              className="text-[15px] sm:text-[16px] leading-relaxed text-[#64748b] max-w-[360px] will-change-transform"
            >
              {data.description}
            </p>

            {/* Magnetic CTA Button */}
            <div ref={btnWrapRef} className="mt-6 mb-7 will-change-transform">
              <Link
                ref={btnRef}
                href={data.primary_button.href}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-none bg-[#fab526] px-7 py-3 text-[14px] font-bold uppercase tracking-wider text-[#081d16] shadow-sm transition-shadow duration-300 hover:shadow-md will-change-transform"
              >
                {/* Subtle Fluid Hover Shimmer */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">{data.primary_button.text}</span>
                <span
                  ref={arrowRef}
                  className="relative z-10 text-lg leading-none font-bold will-change-transform transition-transform duration-200"
                >
                  →
                </span>
              </Link>
            </div>

            {/* Hands with Leaves Image Card (Editorial Reveal + Hover Depth) */}
            <div
              ref={ecoCardRef}
              className="w-full max-w-[340px] sm:max-w-[370px] overflow-hidden rounded-none bg-[#ebeee7] shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <img
                ref={ecoImgRef}
                src={data.image_leaves || '/img/b2.webp'}
                alt="Renewable green energy"
                className="w-full h-[240px] sm:h-[270px] object-cover object-bottom will-change-transform"
              />
            </div>
          </div>

          {/* Right Column: Solar Farm Array under Sun (Editorial Curtain Wipe + Zoom) */}
          <div className="w-full lg:pt-1">
            <div
              ref={solarCardRef}
              className="w-full overflow-hidden rounded-none bg-gray-50 shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <img
                ref={solarImgRef}
                src={data.image_solar || '/img/b1.webp'}
                alt="Solar panels array in sunlight"
                className="w-full h-auto aspect-[1844/853] object-cover will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
