import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbData } from '../../types';

export default function Breadcrumb({ data }: { data: BreadcrumbData }) {
  return (
    <section className="relative overflow-hidden bg-[#0c1417] px-4 py-16 text-center text-white sm:py-20">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <h1 className="text-[36px] font-black uppercase tracking-tight sm:text-[48px]">
          {data.title}
        </h1>
        <div className="mt-3 flex items-center justify-center gap-2 text-[14px]">
          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;
            return (
              <span key={item.href} className="inline-flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                <Link
                  href={item.href}
                  className={
                    isLast
                      ? 'font-bold text-[#f59e0b]'
                      : 'text-gray-300 transition hover:text-white'
                  }
                >
                  {item.name}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
