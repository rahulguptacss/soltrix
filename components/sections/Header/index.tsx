'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent transition-all duration-300">
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-4 sm:h-[78px] sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src={data.logo}
            alt={data.logo_text}
            className="h-12 w-auto max-w-[210px] object-contain sm:h-14 sm:max-w-[250px] lg:h-[58px] lg:max-w-[280px]"
          />
        </Link>

        {/* Desktop Floating Dark Nav Pill Bar */}
        <nav className="hidden items-center rounded-full bg-[#181d20] p-1.5 shadow-lg lg:flex">
          <div className="flex items-center gap-1 px-3">
            {data.links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name + link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                    active
                      ? 'text-[#f59e0b] font-semibold'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Pill CTA Button */}
          <Link
            href={data.button_link}
            className="group ml-2 inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#d97706]"
          >
            <span>{data.button_text}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-3 w-3 text-white" />
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-[#181d20] lg:hidden"
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
            className="overflow-hidden border-b border-gray-200 bg-[#181d20] px-4 py-4 text-white lg:hidden"
          >
            <div className="flex flex-col space-y-1">
              {data.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name + link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                      active
                        ? 'bg-white/10 text-[#f59e0b]'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Link
                  href={data.button_link}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f59e0b] py-3 text-center text-[15px] font-semibold text-white transition hover:bg-[#d97706]"
                >
                  <span>{data.button_text}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
