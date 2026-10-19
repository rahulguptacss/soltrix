import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Testimonials from '../../components/sections/Testimonials';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = {
  title: pages.testimonials.metadata.title,
  description: pages.testimonials.metadata.description,
};

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.testimonials.breadcrumb!} />
        <Testimonials data={sections.testimonials} layout="grid" />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
