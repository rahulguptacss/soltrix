'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import type { AboutSectionData } from '../../types';

function StatCounterItem({
  stat,
  idx,
}: {
  stat: { value: string; label: string };
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  // Extract numeric digits and symbol suffix (+, %, etc.)
  const match = stat.value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isInView || target === 0) return;

    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
      onComplete: () => {
        setCount(target);
      },
    });

    return () => controls.stop();
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
      className="flex flex-col items-start"
    >
      {/* Big Animated Counter Number */}
      <span className="text-[46px] sm:text-[54px] lg:text-[62px] font-black leading-none tracking-tight text-[#081f17]">
        {target > 0 ? (isInView ? count : 0) : stat.value}
        {target > 0 && suffix}
      </span>

      {/* Orange Accent Dash */}
      <span className="mt-2 mb-1.5 h-[2.5px] w-8 rounded-full bg-[#f5a623]" />

      {/* Stat Description */}
      <span className="text-[14px] sm:text-[15.5px] font-medium leading-snug text-[#475569] max-w-[210px]">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function Stats({ data }: { data: AboutSectionData }) {
  const stats = data.stats || [
    { value: '10+', label: 'Years of Experience' },
    { value: '250+', label: 'Projects Completed' },
    { value: '100%', label: 'Commitment to Clean Energy' },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 xl:gap-16">
          
          {/* Left Column: Solar Farm Image with Decorative Offset Backdrop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="relative pl-4 pt-4 sm:pl-7 sm:pt-7 max-w-[620px] mx-auto lg:mx-0">
              {/* Offset decorative backdrop box */}
              <div className="absolute top-0 left-0 h-[82%] w-[82%] rounded-[2px] bg-[#e4ebe4]" />

              {/* Main Photo */}
              <div className="relative z-10 overflow-hidden rounded-[2px] shadow-sm">
                <img
                  src={data.stats_image || '/img/solar-field.webp'}
                  alt="Solar Panels Farm"
                  className="h-[240px] xs:h-[280px] sm:h-[340px] lg:h-[390px] w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Numerical Stats with Reduced Gapping & Counter Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 sm:gap-4 lg:gap-0 lg:space-y-5 pl-1 sm:pl-4 max-w-[620px] mx-auto lg:mx-0 w-full"
          >
            {stats.map((stat, idx) => (
              <StatCounterItem key={stat.label} stat={stat} idx={idx} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
