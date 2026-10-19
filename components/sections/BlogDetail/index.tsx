'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BlogDetailData } from '../../types';

interface BlogDetailProps {
  data: BlogDetailData;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function BlogDetail({ data }: BlogDetailProps) {
  if (!data) return null;

  return (
    <article className="w-full bg-white text-[#0c1f17] selection:bg-[#f59e0b] selection:text-white">
      {/* Main Content Area */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        
        {/* Two-Column Grid: Left Article & Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-8 lg:gap-10 xl:gap-12">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: Main Blog Post Content (col-span-8)     */}
          {/* ==================================================== */}
          <div className="lg:col-span-8">
            
            {/* 1. Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-2.5 mb-2.5"
            >
              <span className="h-[2px] w-6 bg-[#f5a623] shrink-0" />
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#556961]">
                {data.tag || 'BLOG'}
              </span>
            </motion.div>

            {/* 2. Main Title with Two-Tone Highlights */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.14] tracking-tight text-[#0c1f17]"
            >
              <span>{data.title_line1} </span>
              <span className="text-[#f5a623]">{data.title_highlight} </span>
              {data.title_line2 && <span>{data.title_line2}</span>}
            </motion.h1>

            {/* 3. Published Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-2.5 mb-4 sm:mb-5 text-[11.5px] sm:text-[12px] font-bold uppercase tracking-wider text-[#64748b]"
            >
              {data.date}
            </motion.div>

            {/* 4. Featured Banner Image (No border-radius, tuned height, uncut) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="group relative w-full overflow-hidden rounded-none bg-[#f2efe9]"
            >
              <div className="relative w-full overflow-hidden flex items-center justify-center max-h-[350px] sm:max-h-[390px] lg:max-h-[410px]">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-auto max-h-[350px] sm:max-h-[390px] lg:max-h-[410px] object-cover transition-transform duration-700 ease-out group-hover:scale-102 select-none"
                />
              </div>
            </motion.div>

            {/* 5. Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] leading-[1.68] text-[#556961] font-normal"
            >
              {data.intro}
            </motion.p>

            {/* 6. Five Key Benefits List with Compact & Balanced Spacing */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-5 sm:mt-6 space-y-4 sm:space-y-4.5"
            >
              {data.benefits && data.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="border-b border-[#e9ede9] pb-4 sm:pb-4.5 last:border-b-0 last:pb-0"
                >
                  {/* Benefit Title with Leading Orange Dash */}
                  <div className="flex items-center gap-2.5">
                    <span className="h-[2px] w-6 bg-[#f5a623] shrink-0" />
                    <h3 className="text-[17px] sm:text-[18.5px] lg:text-[19px] font-extrabold tracking-tight text-[#0c1f17]">
                      {benefit.title}
                    </h3>
                  </div>

                  {/* Benefit Description */}
                  <p className="mt-1.5 text-[13.5px] sm:text-[14px] leading-[1.6] text-[#556961]">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: Sidebar (Desktop Only, Sticky)         */}
          {/* ==================================================== */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 self-start">
            <SidebarWidgets sidebar={data.sidebar} />
          </aside>

        </div>

      </div>

      {/* ==================================================== */}
      {/* 3. CONCLUSION SECTION (Matches exact screenshot)     */}
      {/* Compact height & tuned font-size to prevent wrapping */}
      {/* ==================================================== */}
      {data.conclusion && (
        <section className="relative w-full overflow-hidden border-t border-[#e8ece8] bg-[#faf6f3] mt-6 sm:mt-8">
          {/* Desktop Right Side Full-Bleed Image with Seamless Sky Blend */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[42%] xl:w-[46%] 2xl:w-[48%] overflow-hidden pointer-events-none select-none">
            <img
              src={data.conclusion.image || '/blogs/conclusion-solar.webp'}
              alt={data.conclusion.title_line1}
              className="h-full w-full object-cover object-left"
            />
            {/* Seamless gradient blend between #faf6f3 background and sunset sky */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 xl:w-32 bg-gradient-to-r from-[#faf6f3] via-[#faf6f3]/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7">
            <div className="w-full lg:max-w-[660px] xl:max-w-[720px]">
              
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex items-center gap-2.5 mb-1.5 sm:mb-2"
              >
                <span className="h-[2px] w-6 bg-[#f5a623] shrink-0" />
                <span className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  {data.conclusion.tag || 'CONCLUSION'}
                </span>
              </motion.div>

              {/* Title - Compact size to fit comfortably on one line */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-[20px] sm:text-[24px] md:text-[27px] lg:text-[29px] xl:text-[31px] font-black leading-[1.2] tracking-tight text-[#0c1f17]"
              >
                <span>{data.conclusion.title_line1} </span>
                <span className="text-[#f5a623]">{data.conclusion.title_highlight}</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 sm:mt-2.5 text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.62] text-[#556961] font-normal max-w-[600px]"
              >
                {data.conclusion.description}
              </motion.p>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================== */}
      {/* 4. MOBILE SIDEBAR: Appears at the very end on mobile */}
      {/* ==================================================== */}
      <section className="block lg:hidden w-full bg-white py-8 sm:py-10 border-t border-[#edf0ee]">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
          <SidebarWidgets sidebar={data.sidebar} />
        </div>
      </section>

    </article>
  );
}

function SidebarWidgets({ sidebar }: { sidebar: BlogDetailData['sidebar'] }) {
  if (!sidebar) return null;

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Widget 1: RECENT BLOGS (Matches exact screenshot with soft light bg & dividers) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[8px] bg-[#fbfaf8] border border-[#eaedea] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.015)]"
      >
        {/* Eyebrow Header: Orange Dash + RECENT BLOGS */}
        <div className="flex items-center gap-3 mb-4.5 sm:mb-5">
          <span className="h-[2.5px] w-8 sm:w-9 bg-[#f5a623] shrink-0" />
          <h4 className="text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#6b7b75]">
            {sidebar.recent_title || 'RECENT BLOGS'}
          </h4>
        </div>

        {/* Recent Blog Items List with Full-Width Subtle Dividers */}
        <div className="divide-y divide-[#e8ece8]">
          {sidebar.recent_blogs && sidebar.recent_blogs.map((post) => (
            <div key={post.id || post.slug} className="py-4 sm:py-4.5 first:pt-0 last:pb-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-3.5 sm:gap-4 transition-all duration-200"
              >
                {/* Thumbnail Image matching screenshot ~4:3 with crisp small radius */}
                <div className="relative h-[78px] w-[114px] sm:h-[84px] sm:w-[120px] shrink-0 overflow-hidden rounded-[3px] bg-[#ebe9e4]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-104 select-none"
                  />
                </div>

                {/* Title & Date */}
                <div className="flex flex-col justify-start min-w-0 flex-1 pt-0.5">
                  <h5 className="text-[14px] sm:text-[14.5px] font-extrabold leading-[1.3] text-[#0c1f17] line-clamp-3 transition-colors duration-200 group-hover:text-[#f5a623]">
                    {post.title}
                  </h5>
                  <span className="mt-2 sm:mt-2.5 text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#82908a]">
                    {post.date}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Widget 2: CTA Card ("Get in Touch with Our Experts") */}
      {sidebar.cta && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[8px] bg-[#0c2018] p-6 sm:p-7 text-white shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
        >
          {/* Background Ambient Flare & Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen bg-cover bg-right-bottom"
            style={{ backgroundImage: `url('/img/footer-bg.webp')` }}
          />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[#f59e0b]/25 blur-3xl" />
          <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-2xl" />

          {/* Content */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-5 bg-[#f5a623] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4ded8]">
                {sidebar.cta.tag}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-[24px] sm:text-[27px] font-black leading-[1.15] text-white">
              <span>{sidebar.cta.title_line1} </span>
              <span className="block text-[#f5a623]">{sidebar.cta.title_highlight}</span>
            </h4>

            {/* Description */}
            <p className="mt-3 text-[13px] sm:text-[13.5px] leading-relaxed text-[#b5c7bd]">
              {sidebar.cta.description}
            </p>

            {/* CTA Button */}
            <div className="mt-6">
              <Link
                href={sidebar.cta.button_link || '/contact'}
                className="group inline-flex items-center gap-3 rounded-[3px] bg-[#f5a623] px-5 py-3 text-[12px] sm:text-[12.5px] font-black uppercase tracking-wider text-[#0c1f17] shadow-sm transition-all duration-300 hover:bg-[#e0961b] hover:shadow-md active:scale-95"
              >
                <span>{sidebar.cta.button_text}</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
