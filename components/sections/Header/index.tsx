'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

/** Desktop Navigation Item with multi-level dropdown flyout support */
function DesktopNavItem({
  link,
  idx,
  active,
  shouldCollapse,
  totalLinks,
  isActive,
}: {
  link: NavItem;
  idx: number;
  active: boolean;
  shouldCollapse: boolean;
  totalLinks: number;
  isActive: (href: string) => boolean;
}) {
  const hasChildren = Boolean(link.children && link.children.length > 0);

  if (!hasChildren) {
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
            : (totalLinks - 1 - idx) * 0.025,
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

        {active && (
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full rounded-full bg-[#f59e0b]" />
        )}
      </motion.li>
    );
  }

  // With Children (Multi-level Dropdown)
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
          : (totalLinks - 1 - idx) * 0.025,
      }}
      className="group/nav relative py-0.5"
    >
      <Link
        href={link.href}
        className={`inline-flex items-center gap-1.5 text-[13.5px] font-medium transition-colors ${
          active
            ? 'text-[#f59e0b] font-semibold'
            : 'text-white/90 hover:text-[#f59e0b]'
        }`}
      >
        <span>{link.name}</span>
        <ChevronDown className="h-3 w-3 opacity-70 transition-transform duration-200 group-hover/nav:rotate-180 group-hover/nav:text-[#f59e0b]" />
      </Link>

      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full rounded-full bg-[#f59e0b]" />
      )}

      {/* Level 1 Floating Dropdown Card */}
      <div className="pointer-events-none absolute left-0 top-full pt-3 opacity-0 translate-y-2 transition-all duration-200 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:translate-y-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 z-50">
        <div className="min-w-[220px] rounded-xl border border-white/10 bg-[#1e2327]/98 backdrop-blur-xl p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
          <ul className="space-y-0.5">
            {link.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className={`block rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                        isSubActive
                          ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                          : 'text-white/80 hover:bg-white/5 hover:text-[#f59e0b]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2: Nested flyout dropdown (Dropdown inside dropdown)
              return (
                <li key={sub.name} className="group/sub relative">
                  <Link
                    href={sub.href}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      isSubActive
                        ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                        : 'text-white/80 hover:bg-white/5 hover:text-[#f59e0b]'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#f59e0b]" />
                  </Link>

                  {/* Level 2 Sub-Dropdown Card */}
                  <div className="pointer-events-none absolute left-full top-0 pl-2 opacity-0 translate-x-2 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100 group-hover/sub:translate-x-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 z-50">
                    <div className="min-w-[200px] rounded-xl border border-white/10 bg-[#1e2327]/98 backdrop-blur-xl p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
                      <ul className="space-y-0.5">
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              className={`block rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                                isActive(nested.href)
                                  ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                                  : 'text-white/70 hover:bg-white/5 hover:text-[#f59e0b]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

/** Mobile Navigation Item with multi-level accordion support */
function MobileNavItem({
  link,
  active,
  isActive,
  onClose,
}: {
  link: NavItem;
  active: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const hasChildren = Boolean(link.children && link.children.length > 0);

  const toggleSub = (name: string) => {
    setSubExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
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
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between rounded-lg px-4 py-1 text-[15px] font-medium transition hover:bg-white/5">
        <Link
          href={link.href}
          onClick={(e) => {
            if (link.href === '#' || !link.href) {
              e.preventDefault();
              setExpanded((prev) => !prev);
            } else {
              onClose();
            }
          }}
          className={`flex-1 py-1.5 transition ${
            active || expanded ? 'text-[#f59e0b] font-semibold' : 'text-white/80 hover:text-white'
          }`}
        >
          {link.name}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={`Toggle ${link.name} sub-menu`}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
            expanded
              ? 'border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/15'
              : 'border-white/15 text-white/70 hover:border-[#f59e0b] hover:text-[#f59e0b]'
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              expanded ? 'rotate-180 text-[#f59e0b]' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden pl-4 pr-1 my-1 space-y-1 border-l-2 border-[#f59e0b]/40 ml-4"
          >
            {link.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubOpen = Boolean(subExpanded[sub.name]);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className={`block rounded-md px-3 py-1.5 text-[14px] font-medium transition ${
                        isSubActive
                          ? 'text-[#f59e0b]'
                          : 'text-white/75 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2 inside mobile drawer (Dropdown inside dropdown)
              return (
                <li key={sub.name} className="flex flex-col">
                  <div className="flex items-center justify-between rounded-md px-3 py-1 text-[14px] font-medium">
                    <Link
                      href={sub.href}
                      onClick={(e) => {
                        if (sub.href === '#' || !sub.href) {
                          e.preventDefault();
                          toggleSub(sub.name);
                        } else {
                          onClose();
                        }
                      }}
                      className={`flex-1 transition ${
                        isSubActive || isSubOpen ? 'text-[#f59e0b]' : 'text-white/75 hover:text-white'
                      }`}
                    >
                      {sub.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSub(sub.name)}
                      aria-expanded={isSubOpen}
                      aria-label={`Toggle ${sub.name} nested menu`}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all cursor-pointer ${
                        isSubOpen
                          ? 'border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/15'
                          : 'border-white/15 text-white/70 hover:border-[#f59e0b] hover:text-[#f59e0b]'
                      }`}
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180 text-[#f59e0b]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSubOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 pr-1 my-1 space-y-1 border-l border-white/20 ml-3"
                      >
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              onClick={onClose}
                              className={`block rounded-md px-2.5 py-1 text-[13px] font-medium transition ${
                                isActive(nested.href)
                                  ? 'text-[#f59e0b]'
                                  : 'text-white/65 hover:text-white'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

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
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

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
          className={`relative hidden items-center rounded-[11px] bg-[#22272b] p-1 shadow-sm lg:flex transition-all duration-300 ${
            shouldCollapse ? 'overflow-hidden' : 'overflow-visible'
          }`}
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
            className={`${shouldCollapse ? 'overflow-hidden' : 'overflow-visible'} flex items-center`}
          >
            <ul className="flex items-center gap-4 sm:gap-5 pl-4 pr-3 whitespace-nowrap">
              {data.links.map((link, idx) => (
                <DesktopNavItem
                  key={link.name + link.href}
                  link={link}
                  idx={idx}
                  active={isActive(link.href)}
                  shouldCollapse={shouldCollapse}
                  totalLinks={data.links.length}
                  isActive={isActive}
                />
              ))}
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
          className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-gray-200 bg-[#22272b] text-white shadow-sm transition hover:bg-[#181d20] lg:hidden cursor-pointer"
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
                {data.links.map((link) => (
                  <MobileNavItem
                    key={link.name + link.href}
                    link={link}
                    active={isActive(link.href)}
                    isActive={isActive}
                    onClose={() => setOpen(false)}
                  />
                ))}
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
