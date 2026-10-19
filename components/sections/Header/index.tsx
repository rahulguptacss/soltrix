'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollOffset = 80;
    let lastScrollY = window.scrollY;
    let scrollDistance = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);

      // At top of page, always keep full menu expanded
      if (currentScrollY <= 20) {
        scrollDistance = 0;
        setIsCollapsed(false);
        lastScrollY = currentScrollY;
        return;
      }

      const step = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (!step) return;

      const sameDirection = Math.sign(step) === Math.sign(scrollDistance);
      scrollDistance = sameDirection ? scrollDistance + step : step;

      // When user scrolls down by 80px -> collapse links and stop exactly at Get a Quote button
      if (scrollDistance >= scrollOffset) {
        setIsCollapsed(true);
        scrollDistance = 0;
      }
      // When user scrolls up by 80px -> expand links back
      if (scrollDistance <= -scrollOffset) {
        setIsCollapsed(false);
        scrollDistance = 0;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shouldCollapse = isCollapsed && !isHovered;

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-gray-100 py-1'
          : 'border-b border-transparent py-1 sm:py-1.5'
      }`}
    >
      <div className="mx-auto flex h-[62px] sm:h-[66px] max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src={data.logo}
            alt={data.logo_text}
            className="h-11 sm:h-13 lg:h-[54px] w-auto max-w-[280px] object-contain transition-transform duration-300 hover:scale-102"
          />
        </Link>

        {/* Desktop Nav Bar - Collapses smoothly down to the full Get a Quote button */}
        <nav
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative hidden items-center rounded-[11px] bg-[#22272b] p-1 shadow-sm lg:flex transition-all duration-300 overflow-hidden"
        >
          {/* Animated Collapsible Links: shrinks to 0 smoothly, stopping cleanly at the button */}
          <motion.div
            initial={false}
            animate={{
              width: shouldCollapse ? 0 : 'auto',
              opacity: shouldCollapse ? 0 : 1,
            }}
            transition={{
              width: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.28 },
            }}
            className="overflow-hidden flex items-center"
          >
            <ul className="flex items-center gap-4 sm:gap-5 pl-4 pr-3 whitespace-nowrap">
              {data.links.map((link, idx) => {
                const active = pathname === link.href;

                return (
                  <motion.li
                    key={link.name + link.href}
                    initial={false}
                    animate={{
                      opacity: shouldCollapse ? 0 : 1,
                      x: shouldCollapse ? -12 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: shouldCollapse
                        ? idx * 0.025
                        : (data.links.length - 1 - idx) * 0.025,
                    }}
                    className="relative py-0.5"
                  >
                    <Link
                      href={link.href}
                      className={`text-[13.5px] font-medium transition-colors ${
                        active
                          ? 'text-[#f59e0b] font-semibold'
                          : 'text-white/90 hover:text-[#f59e0b]'
                      }`}
                    >
                      {link.name}
                    </Link>

                    {/* Active bottom orange line indicator on Home */}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full rounded-full bg-[#f59e0b]" />
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Get a Quote Button - Compact & Sleek */}
          <Link
            href={data.button_link}
            className="shrink-0 flex items-center gap-1.5 rounded-[8px] bg-[#f59e0b] px-4 py-2 text-[13px] font-bold text-[#1f2427] whitespace-nowrap shadow-xs transition-all duration-200 hover:bg-[#e0961b] active:scale-95"
          >
            <span>{data.button_text}</span>
            <svg
              className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-gray-200 bg-[#22272b] text-white shadow-sm transition hover:bg-[#181d20] lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-gray-200 bg-white px-4 py-3 lg:hidden"
          >
            <div className="rounded-[14px] bg-[#22272b] p-4 text-white">
              <div className="flex flex-col space-y-1">
                {data.links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name + link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-[15px] font-medium transition ${
                        active
                          ? 'bg-white/10 text-[#f59e0b] font-semibold'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                      )}
                    </Link>
                  );
                })}
                <div className="pt-3">
                  <Link
                    href={data.button_link}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#f5a623] py-2.5 text-center text-[15px] font-bold text-[#1f2427] transition hover:bg-[#e0961b] active:scale-95"
                  >
                    <span>{data.button_text}</span>
                    <svg
                      className="h-4 w-4 stroke-[2.2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
