'use client';

import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import type { FooterData } from '../../types';

function SocialIcon({ name }: { name: string }) {
  const n = name.toLowerCase();

  if (n === 'instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  if (n === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }

  if (n === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  // Default: Facebook ('f')
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  // Use /logo/logo-w.png as requested by user
  const logoSrc = data.logo || '/logo/logo-w.png';
  const bgSrc = data.background || '/img/footer-bg.jpg';

  return (
    <footer className="relative overflow-hidden bg-[#0d1315] text-white">
      {/* Background Solar Horizon Panoramic Sunset Image */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <img
          src={bgSrc}
          alt="Solar Sunset"
          className="h-full w-full object-cover object-right"
        />
        {/* Deep dark gradient overlay: solid/dark on left, exposing sunset and solar panels on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1315] via-[#0d1315]/92 md:via-[#0d1315]/80 via-55% to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1340px] px-6 sm:px-8 lg:px-12 pt-10 sm:pt-12 lg:pt-14 pb-5 sm:pb-6">
        {/* Main Footer Row: 3 Columns with Vertical Dividers */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-0">
          {/* Column 1: Logo, Tagline, Socials */}
          <div className="flex-1 lg:max-w-[450px]">
            <Link href="/" className="inline-block">
              <img
                src={logoSrc}
                alt={data.logo_text || 'SOLTRIX'}
                className="h-24 sm:h-28 lg:h-32 xl:h-[135px] w-auto max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] object-contain object-left"
              />
            </Link>

            {/* Tagline */}
            <p className="mt-3.5 text-[15px] sm:text-[16px] leading-relaxed text-[#cbd5e1] font-normal max-w-[320px] whitespace-pre-line">
              {data.description || 'Clean energy solutions\nfor a brighter tomorrow.'}
            </p>

            {/* Social Icons with Orange Vertical Line */}
            <div className="mt-4 sm:mt-5 flex items-center gap-5">
              <span className="h-4 w-[2px] bg-[#fab526] shrink-0" />
              <div className="flex items-center gap-5 text-white">
                {data.socials &&
                  data.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="text-white/90 transition-colors duration-300 hover:text-[#fab526]"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="hidden lg:block h-24 sm:h-28 w-[1px] bg-white/15 mx-8 xl:mx-12 shrink-0" />

          {/* Column 2: Navigation Links */}
          <div className="shrink-0 lg:min-w-[160px]">
            <nav className="flex flex-col space-y-2.5 sm:space-y-3">
              {data.quick_links &&
                data.quick_links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-colors duration-300 hover:text-[#fab526]"
                  >
                    {link.name}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Vertical Divider 2 */}
          <div className="hidden lg:block h-24 sm:h-28 w-[1px] bg-white/15 mx-8 xl:mx-12 shrink-0" />

          {/* Column 3: Contact Info (Call Us & Email Us with Orange Outline Boxes) */}
          <div className="flex-1 lg:max-w-[360px] flex flex-col space-y-4 sm:space-y-5">
            {/* Call Us */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-none border border-[#fab526] bg-transparent">
                <Phone className="h-5 w-5 text-[#fab526]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
                  CALL US
                </p>
                <a
                  href={`tel:${data.contact.phone.replace(/[^\d+]/g, '')}`}
                  className="text-[16px] sm:text-[17px] font-bold tracking-wide text-white transition-colors duration-300 hover:text-[#fab526]"
                >
                  {data.contact.phone}
                </a>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-none border border-[#fab526] bg-transparent">
                <Mail className="h-5 w-5 text-[#fab526]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
                  EMAIL US
                </p>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="text-[16px] sm:text-[17px] font-bold tracking-wide text-white transition-colors duration-300 hover:text-[#fab526]"
                >
                  {data.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Horizontal Divider & Left-aligned Copyright */}
        <div className="mt-8 sm:mt-10 border-t border-white/10 pt-4 sm:pt-5">
          <p className="text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
            {data.copyright || '© 2024 SOLTRIX. ALL RIGHTS RESERVED.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
