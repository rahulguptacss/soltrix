'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectsSectionData, ProjectItem } from '../../types';

const columnVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ProjectCard({ item }: { item: ProjectItem }) {
  const isCompact = item.layout === 'compact';
  const isTall = item.layout === 'tall';

  const aspectClass = isTall
    ? 'aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]'
    : isCompact
    ? 'aspect-[16/10]'
    : 'aspect-[16/10] sm:aspect-[16/9.5]';

  const containerClass = isCompact
    ? 'w-full max-w-[88%] sm:max-w-[82%] mx-auto'
    : 'w-full';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`group flex flex-col cursor-pointer ${containerClass}`}
    >
      {/* Image with Sharp Edges & Smooth Zoom on Hover */}
      <div className={`relative overflow-hidden bg-[#f3efe9] ${aspectClass}`}>
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 select-none"
        />

        {/* Subtle Ambient Hover Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Floating Quick Action Arrow on Corner */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5a623] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75 group-hover:translate-y-0 translate-y-2">
          <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
        </div>
      </div>

      {/* Info: Title with Arrow, Orange Dash, Category */}
      <div className="mt-3.5 sm:mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-[#081d16] tracking-tight transition-colors duration-200 group-hover:text-[#f5a623]">
            {item.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 text-[#94a3b8] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f5a623] shrink-0" />
        </div>

        {/* Smooth Dynamic Expanding Orange Horizontal Dash */}
        <div className="h-[2px] w-6 bg-[#f5a623] my-1.5 transition-all duration-300 group-hover:w-12 group-hover:bg-[#f59e0b]" />

        <p className="text-[12.5px] sm:text-[13.5px] font-normal text-[#64748b]">
          {item.category}
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects({ data }: { data: ProjectsSectionData }) {
  const items = data.items || [];
  const leftItems = items.filter((item) => item.column === 'left');
  const rightItems = items.filter((item) => item.column === 'right');

  // Alternating items list for mobile devices
  const mobileOrdered: ProjectItem[] = [];
  const maxLen = Math.max(leftItems.length, rightItems.length);
  for (let i = 0; i < maxLen; i++) {
    if (leftItems[i]) mobileOrdered.push(leftItems[i]);
    if (rightItems[i]) mobileOrdered.push(rightItems[i]);
  }

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-16">
      {/* Decorative subtle ambient blur lights */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/4 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-[#081d16]/3 blur-3xl" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-2 sm:pb-4">
          {/* Left Column: Eyebrow & Two-Tone Typography Title */}
          <div className="flex-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 28 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-[#f5a623] shrink-0"
              />
              <span className="text-[12.5px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#556961]">
                {data.eyebrow}
              </span>
            </div>

            {/* Title: SELECTED (Heavy Font-Black) / PROJECTS (Clean Font-Light) */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-5 text-[48px] sm:text-[66px] md:text-[80px] lg:text-[94px] xl:text-[104px] uppercase text-[#081d16] leading-[0.84]"
            >
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block font-black tracking-[-0.03em] text-[#081d16]"
              >
                {data.title_line1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="block font-[200] font-extralight tracking-[0.015em] text-[#081d16]"
              >
                {data.title_line2}
              </motion.span>
            </motion.h2>
          </div>

          {/* Right Column: Description with exact 3-line proportion */}
          {data.description && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:max-w-[340px] xl:max-w-[365px] lg:pb-3"
            >
              <p className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.5] text-[#556961] font-normal">
                {data.description}
              </p>
            </motion.div>
          )}
        </div>

        {/* Desktop View: Staggered 2-Column Grid (>= 768px) with independent column motion */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 mt-8 sm:mt-12 lg:mt-14">
          {/* Left Column */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="flex flex-col space-y-9 sm:space-y-11 lg:space-y-14"
          >
            {leftItems.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="flex flex-col space-y-9 sm:space-y-11 lg:space-y-14"
          >
            {rightItems.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Mobile View: Single Column Flow (< 768px) */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="flex flex-col space-y-8 mt-7 md:hidden"
        >
          {mobileOrdered.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
