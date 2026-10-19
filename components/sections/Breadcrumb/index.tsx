'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BreadcrumbData } from '../../types';

export default function Breadcrumb({ data }: { data: BreadcrumbData }) {
  return (
    <section className="relative overflow-hidden bg-[#edf4ee] py-6 sm:py-9 lg:py-12 min-h-[120px] sm:min-h-[155px] lg:min-h-[180px] flex items-center">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Left: Page Title & Breadcrumb Trail */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center min-w-0"
        >
          <h1 className="text-[28px] sm:text-[40px] lg:text-[50px] font-black tracking-tight text-[#0c1f17] leading-tight">
            {data.title}
          </h1>

          {/* Breadcrumb path */}
          {data.items && data.items.length > 1 && (
            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13.5px] font-medium text-[#64748b]">
              {data.items.map((item, index) => {
                const isLast = index === data.items.length - 1;
                return (
                  <span key={item.href} className="inline-flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />}
                    <Link
                      href={item.href}
                      className={
                        isLast
                          ? 'font-bold text-[#f59e0b]'
                          : 'text-[#64748b] transition hover:text-[#0c1f17]'
                      }
                    >
                      {item.name}
                    </Link>
                  </span>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Right: Exact Windmill Icon Image (/img/breadcrumbicon.webp) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.1, ease: 'easeOut' },
            scale: { duration: 0.6, delay: 0.1, ease: 'easeOut' },
            y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative flex items-center justify-end shrink-0 pr-1 sm:pr-4"
        >
          <img
            src={data.icon || '/img/breadcrumbicon.webp'}
            alt="Windmill"
            className="h-[80px] sm:h-[125px] lg:h-[165px] w-auto object-contain transition-transform duration-500 hover:scale-105 select-none"
          />
        </motion.div>

      </div>
    </section>
  );
}
