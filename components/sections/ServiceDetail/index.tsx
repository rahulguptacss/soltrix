'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import type { ServiceDetailData } from '../../types';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function ServiceDetail({ data }: { data: ServiceDetailData }) {
  return (
    <div className="w-full">
      
      {/* 1. Hero Section ("RESIDENTIAL SOLAR SOLUTIONS") -> Pure Crisp White */}
      <section className="relative overflow-hidden bg-white py-4 sm:py-5 lg:py-6">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            
            {/* Left Column: Heading, description & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              {/* Category Tag with Animated Expanding Bar */}
              <div className="mb-2 flex items-center gap-2">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-[2.5px] bg-[#f5a623] shrink-0"
                />
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.18em] text-[#081d16]">
                  {data.hero.tag}
                </span>
              </div>

              {/* Bold / Light Two-Tone Title */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[32px] sm:text-[38px] lg:text-[42px] font-black uppercase tracking-tight text-[#081d16] leading-[1.05]"
              >
                <span className="block font-black">{data.hero.title_line1}</span>
                <span className="block font-light text-[#081d16] mt-0.5 tracking-tight">
                  {data.hero.title_line2}
                </span>
              </motion.h2>

              {/* Description Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2.5 text-[13.5px] sm:text-[14px] leading-relaxed text-[#64748b] max-w-[520px]"
              >
                {data.hero.description}
              </motion.p>

              {/* Action Button (No border-radius) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 sm:mt-5"
              >
                <Link
                  href={data.hero.button_link}
                  className="group inline-flex items-center gap-2.5 bg-[#f5a623] px-5 py-2.5 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#081d16] shadow-sm transition-all duration-300 hover:bg-[#e69818] hover:shadow-md"
                >
                  <span>{data.hero.button_text}</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-[14px] font-black"
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Clean Sharp Photo (No border-radius, No overlay badge) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative w-full"
            >
              <div className="relative overflow-hidden shadow-sm ring-1 ring-black/5 group">
                <img
                  src={data.hero.image}
                  alt={data.hero.title_line1}
                  className="h-[230px] sm:h-[270px] lg:h-[300px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Overview Section ("Clean Energy for a Better Tomorrow") -> Warm Sand / Cream Tint */}
      <section className="relative overflow-hidden bg-[#f7f5f2] py-4 sm:py-5 lg:py-6 border-t border-[#eae5dd]">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-12">
            
            {/* Left Column: Heading and 2 Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start pr-0 lg:pr-4"
            >
              {/* Tag with Animated Line */}
              <div className="mb-2 flex items-center gap-2">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-[2.5px] bg-[#f5a623] shrink-0"
                />
                <span className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  {data.overview.tag}
                </span>
              </div>

              {/* Title with Highlight */}
              <h3 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-tight text-[#081d16] leading-[1.08]">
                <span className="block">{data.overview.title_part1}</span>
                <span className="block mt-0.5">
                  <span className="font-normal text-[#081d16]">{data.overview.title_for}</span>{' '}
                  <span className="text-[#f5a623] font-bold">{data.overview.title_highlight}</span>
                </span>
              </h3>

              {/* Paragraphs */}
              <div className="mt-2.5 space-y-2 text-[13px] sm:text-[13.5px] leading-[1.6] text-[#64748b]">
                {data.overview.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 * idx }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Crisp White Sharp Card (No border-radius) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-4 sm:p-5 lg:p-6 shadow-sm border border-[#e5e1d8] transition-shadow duration-300 hover:shadow-md"
            >
              <div className="space-y-3 sm:space-y-3.5">
                {data.overview.features.map((feat, idx) => (
                  <motion.div
                    key={feat.number}
                    variants={fadeIn}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className={`group flex items-start gap-3 sm:gap-4 p-1.5 -mx-1.5 transition-colors duration-200 hover:bg-[#faf8f5] ${
                      idx < data.overview.features.length - 1
                        ? 'border-b border-[#e5e2dc] pb-3 sm:pb-3.5'
                        : ''
                    }`}
                  >
                    {/* Big Soft Number with Hover Highlight */}
                    <span className="text-[22px] sm:text-[24px] font-bold text-[#8c9ba5] transition-colors duration-200 group-hover:text-[#f5a623] leading-none shrink-0 w-7 pt-0.5">
                      {feat.number}
                    </span>

                    {/* Thin Vertical Divider Line */}
                    <span className="h-7 w-[1.5px] bg-[#e2ded7] transition-colors duration-200 group-hover:bg-[#f5a623] shrink-0" />

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#081d16] leading-snug transition-colors duration-200 group-hover:text-[#081d16]">
                        {feat.title}
                      </h4>
                      <p className="mt-0.5 text-[12px] sm:text-[12.5px] leading-relaxed text-[#64748b]">
                        {feat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Process Section ("How It Works / Simple Steps to Solar") -> Pure Crisp White */}
      <section className="relative overflow-hidden bg-white py-4 sm:py-5 lg:py-6 border-t border-[#eae5dd]">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Left Intro & Right Image */}
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            
            {/* Left Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              <div className="mb-2 flex items-center gap-2">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-[2.5px] bg-[#f5a623] shrink-0"
                />
                <span className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  {data.process.tag}
                </span>
              </div>

              <h3 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-tight text-[#081d16] leading-[1.08]">
                <span className="block">{data.process.title_line1}</span>
                <span className="block mt-0.5">
                  <span className="font-normal text-[#081d16]">{data.process.title_part1}</span>{' '}
                  <span className="text-[#f5a623] font-bold">{data.process.title_highlight}</span>
                </span>
              </h3>

              <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.6] text-[#64748b] max-w-[460px]">
                {data.process.description}
              </p>
            </motion.div>

            {/* Right Roof Image (No border-radius, No overlay badge) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-end"
            >
              <div className="relative overflow-hidden shadow-sm w-full max-w-[520px] group">
                <img
                  src={data.process.image}
                  alt={data.process.title_line1}
                  className="h-[190px] sm:h-[220px] lg:h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>

          </div>

          {/* Bottom Row: 3 Horizontal Steps with Sharp Rectangular Card (No border-radius) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-5 bg-[#edf4ee] border border-[#d6e4d6] py-3 px-4 sm:py-3.5 sm:px-6 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3.5 lg:gap-5 xl:gap-7">
              {data.process.steps.map((stepItem, idx) => (
                <div key={stepItem.step} className="contents">
                  {/* Step Item */}
                  <motion.div
                    whileHover={{ y: -2, scale: 1.015 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-3 sm:gap-3.5 p-1.5 transition-colors duration-200 hover:bg-white/70 cursor-default"
                  >
                    {/* Step Number */}
                    <span className="text-[22px] sm:text-[24px] font-bold text-[#64748b] transition-colors duration-200 group-hover:text-[#f5a623] leading-none shrink-0 tracking-tight select-none">
                      {stepItem.step}
                    </span>

                    {/* Vertical Orange Accent Bar */}
                    <span className="h-[32px] sm:h-[34px] w-[2px] bg-[#f5a623] transition-all duration-200 group-hover:scale-y-110 shrink-0" />

                    {/* Text */}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#081d16] leading-tight">
                        {stepItem.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] sm:text-[11.5px] leading-snug text-[#64748b] max-w-[210px] sm:max-w-[220px]">
                        {stepItem.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Animated Arrow Connector between steps */}
                  {idx < data.process.steps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                      className="hidden md:flex items-center justify-center px-1 sm:px-2"
                    >
                      <svg
                        className="w-4 h-4 text-[#64748b]/75 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 12h15m-5-5l5 5-5 5"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Benefits Section ("A Smarter Choice for Your Home") -> Soft Eco-Green Tint */}
      <section className="relative overflow-hidden bg-[#f4f7f4] py-4 sm:py-5 lg:py-6 border-t border-[#dce7dc]">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            
            {/* Left Column: Heading */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              <div className="mb-2 flex items-center gap-2">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-[2.5px] bg-[#f5a623] shrink-0"
                />
                <span className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#081d16]">
                  {data.benefits.tag}
                </span>
              </div>

              <h3 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-tight text-[#081d16] leading-[1.08]">
                <span className="block">{data.benefits.title_part1}</span>
                <span className="block mt-0.5">
                  <span className="font-normal text-[#081d16]">{data.benefits.title_for}</span>{' '}
                  <span className="text-[#f5a623] font-bold">{data.benefits.title_highlight}</span>
                </span>
              </h3>
            </motion.div>

            {/* Right Column: Clean White Sharp Card (No border-radius) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-4 sm:p-5 lg:p-6 shadow-sm border border-[#e0eae0] transition-shadow duration-300 hover:shadow-md"
            >
              {/* Lead sentence */}
              <p className="text-[13.5px] sm:text-[14px] font-semibold text-[#081d16] leading-relaxed mb-2.5">
                {data.benefits.lead}
              </p>

              {/* Bullet Points with Square Accents (No border-radius) */}
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2 text-[12.5px] sm:text-[13px] text-[#475569]"
              >
                {data.benefits.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeIn}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-2.5 cursor-default"
                  >
                    <span className="text-[#f5a623] font-black text-sm shrink-0 leading-none">
                      ✓
                    </span>
                    <span className="font-medium text-[#334155] transition-colors duration-200 group-hover:text-[#081d16]">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
