'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Top Header Row with Arrow Controls on Left and Cards on Right */}
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-14">
          {/* Left Column: Eyebrow, Title, Description, Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#f59e0b]" />
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                {data.eyebrow}
              </p>
            </div>

            <h2 className="text-[40px] font-black uppercase tracking-tight text-[#0c1713] sm:text-[52px] leading-[1.04]">
              {data.title_line1}
              <br />
              <span className="text-outline-dark">{data.title_highlight}</span>
            </h2>

            <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-[#475569]">
              {data.description}
            </p>

            {/* Prev / Next Arrow Buttons */}
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f59e0b] text-white shadow-sm transition hover:bg-[#d97706] active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Testimonial Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, idx) => {
              const isMiddle = idx === 1;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`flex flex-col justify-between rounded-2xl bg-white p-7 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl ${
                    isMiddle ? 'lg:-translate-y-3 lg:ring-2 lg:ring-[#f59e0b]/30' : ''
                  }`}
                >
                  <div>
                    {/* Avatar Photo */}
                    <div className="flex items-center justify-between">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#f59e0b]/40">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {/* Quote mark symbol */}
                      <span className="text-3xl font-serif font-black text-[#f59e0b]">
                        ““
                      </span>
                    </div>

                    {/* Quote text */}
                    <p className="mt-5 text-[14px] leading-relaxed text-[#475569]">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-[16px] font-bold text-[#0c1713]">
                      {item.name}
                    </h4>
                    <p className="text-[13px] text-[#64748b]">{item.role}</p>

                    {/* Stars */}
                    <div className="mt-2 flex items-center gap-1 text-[#f59e0b]">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#f59e0b]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
