'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BlogsSectionData } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Blogs({
  data,
  limit,
  layout = 'homepage',
}: {
  data: BlogsSectionData;
  limit?: number;
  layout?: 'homepage' | 'grid';
}) {
  const posts = limit ? data.items.slice(0, limit) : data.items;

  // ==========================================
  // 1. DEDICATED BLOG PAGE LAYOUT ("grid")
  // Matching screenshot: Header row + 2-Column Grid
  // ==========================================
  if (layout === 'grid') {
    return (
      <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
        {/* Subtle ambient blur lights */}
        <div className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-[#081d16]/3 blur-3xl" />

        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          {/* Section Header: Two-tone Title (Left) + Description (Right) */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6 pb-2 sm:pb-3">
            {/* Left: Eyebrow & Two-Tone Title */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 28 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[2px] bg-[#f5a623] shrink-0"
                />
                <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#556961]">
                  {data.eyebrow || 'BLOGS'}
                </span>
              </div>

              {/* Title: Latest (Dark) / Insights (Orange) - Enhanced Large Scale */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3.5 sm:mt-4 text-[48px] sm:text-[64px] md:text-[76px] lg:text-[88px] xl:text-[96px] font-black tracking-[-0.03em] leading-[0.92]"
              >
                <span className="block text-[#081d16]">
                  {data.page_title_line1 || 'Latest'}
                </span>
                <span className="block text-[#f59e0b]">
                  {data.page_title_highlight || 'Insights'}
                </span>
              </motion.h2>
            </div>

            {/* Right: Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:max-w-[390px] xl:max-w-[420px] lg:pb-2.5"
            >
              <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.55] text-[#556961] font-normal">
                {data.page_description || data.description}
              </p>
            </motion.div>
          </div>

          {/* 2-Column Responsive Blog Grid with Compact Sizing & Tight Gap */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 lg:gap-5 mt-7 sm:mt-8"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id || post.slug}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="group flex flex-col justify-between overflow-hidden rounded-[8px] bg-white border border-[#e8ece8] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] cursor-pointer"
              >
                <div>
                  {/* Compact Top Image with Zoom Hover */}
                  <div className="relative w-full aspect-[16/8.6] sm:aspect-[16/8.2] overflow-hidden bg-[#f3efe9]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 select-none"
                    />
                    {/* Subtle Ambient Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Card Body - Compact Padding & Balanced Typography */}
                  <div className="p-4 sm:p-5 lg:p-5.5 pb-1">
                    {/* Date with Trailing Orange Dash */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#64748b]">
                        {post.date}
                      </span>
                      <span className="h-[2px] w-5 bg-[#f5a623]" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-[17px] sm:text-[18.5px] lg:text-[19px] font-extrabold leading-[1.28] text-[#081d16] tracking-tight transition-colors duration-200 group-hover:text-[#f5a623]">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-2 text-[12.5px] sm:text-[13.5px] leading-relaxed text-[#64748b] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read More Link with Underline Accent */}
                <div className="p-4 sm:p-5 lg:p-5.5 pt-1.5 sm:pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/btn inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-extrabold uppercase tracking-wider text-[#081d16] transition-colors"
                  >
                    <span className="border-b-2 border-[#f5a623] pb-0.5 transition-colors duration-200 group-hover/btn:text-[#f5a623]">
                      {post.button_text || 'READ MORE'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] text-[#081d16] transition-transform duration-300 group-hover/btn:translate-x-1.5 group-hover/btn:text-[#f5a623]" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ==========================================
  // 2. HOMEPAGE ASYMMETRICAL LAYOUT ("homepage")
  // Shows the same blogs as the blog page with matching card design
  // ==========================================
  return (
    <section id="blog" className="relative overflow-hidden bg-white py-14 sm:py-18 lg:py-24">
      {/* Decorative ambient background blur lights */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-[#06261c]/5 blur-3xl" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 xl:gap-14">
          
          {/* Left Column: Blog Cards (Same Blogs from blog page) */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <motion.article
                  key={post.id || post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[8px] bg-white border border-[#e8ece8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer"
                >
                  <div>
                    {/* Top Image */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#f3efe9]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 pb-1">
                      {/* Date with trailing orange dash */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#64748b]">
                          {post.date}
                        </span>
                        <span className="h-[2px] w-5 bg-[#f5a623]" />
                      </div>

                      {/* Title */}
                      <h3 className="mt-2 text-[17px] sm:text-[18px] font-bold leading-[1.3] text-[#081d16] tracking-tight transition-colors group-hover:text-[#f5a623]">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2 text-[12.5px] sm:text-[13px] leading-relaxed text-[#64748b] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="p-4 sm:p-5 pt-1.5 sm:pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/btn inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#081d16] transition-colors group-hover:text-[#f5a623]"
                    >
                      <span className="border-b-2 border-[#f5a623] pb-0.5">READ MORE</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right Column: Section Header Block */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-[2.5px] w-7 origin-left rounded-full bg-[#f5a623]"
              />
              <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#64748b]">
                {data.eyebrow || 'BLOGS'}
              </p>
            </div>

            {/* Massive Multi-line Headline */}
            <h2 className="mt-3.5 sm:mt-4 text-[30px] xs:text-[34px] sm:text-[42px] lg:text-[56px] xl:text-[60px] leading-[1.05] sm:leading-[1.02] tracking-tight text-[#06261c]">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block font-black"
              >
                <span className="inline lg:block">{data.title_line1 || 'INSIGHTS'} </span>
                <span className="inline lg:block">{data.title_line2 || 'FOR A'}</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="block font-light text-[#06261c] mt-0.5 sm:mt-1"
              >
                <span className="inline lg:block">{data.title_line3 || 'GREENER'} </span>
                <span className="inline lg:block">{data.title_highlight || 'TOMORROW'}</span>
              </motion.span>
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3.5 max-w-[340px] text-[15px] sm:text-[15.5px] leading-relaxed text-[#64748b]"
            >
              {data.description}
            </motion.p>

            {/* View All Blogs Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 sm:mt-5"
            >
              <Link
                href={data.button?.href || '/blog'}
                className="group inline-flex items-center gap-4 rounded-[2px] bg-[#f5a623] px-7 py-3.5 text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#111827] shadow-sm transition-all duration-300 hover:bg-[#e0961b] hover:shadow-md active:scale-95"
              >
                <span>{data.button?.text || 'VIEW ALL BLOGS'}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
