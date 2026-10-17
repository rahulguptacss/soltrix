'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogsSectionData } from '../../types';

export default function Blogs({
  data,
  limit,
}: {
  data: BlogsSectionData;
  limit?: number;
}) {
  const posts = limit ? data.items.slice(0, limit) : data.items;

  return (
    <section id="blog" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[2fr_1fr] lg:gap-14">
          {/* Left Column: 3 Blog Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg hover:ring-[#f59e0b]/40"
              >
                <div>
                  {/* Post Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Post Metadata & Content */}
                  <div className="p-5">
                    <p className="text-[12px] font-semibold text-[#f59e0b]">
                      {post.date} • {post.category}
                    </p>

                    <h3 className="mt-2 text-[16px] font-black leading-snug text-[#0c1713] transition-colors group-hover:text-[#f59e0b]">
                      <Link href={`/blog#${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-[13px] leading-relaxed text-[#64748b] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 p-5 pt-3">
                  <Link
                    href={`/blog#${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0c1713] transition-colors group-hover:text-[#f59e0b]"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Right Column: Section Header Block with Outline Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start lg:pl-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#f59e0b]" />
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                {data.eyebrow}
              </p>
            </div>

            <h2 className="text-[38px] font-black uppercase tracking-tight text-[#0c1713] sm:text-[48px] lg:text-[54px] leading-[1.04]">
              {data.title_line1}
              <br />
              {data.title_line2}
              <br />
              {data.title_line3}
              <br />
              <span className="text-outline-dark">{data.title_highlight}</span>
            </h2>

            <p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-[#475569]">
              {data.description}
            </p>

            <div className="mt-8">
              <Link
                href={data.button.href}
                className="group inline-flex items-center gap-3 rounded-full bg-[#f59e0b] px-6 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#d97706]"
              >
                <span>{data.button.text}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
