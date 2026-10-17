import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import Blogs from '../components/sections/Blogs';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections } from '../components/types';

export const metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Hero data={sections.hero} />
        <About data={sections.about} />
        <Services data={sections.services} />
        <Testimonials data={sections.testimonials} />
        <Blogs data={sections.blogs} limit={3} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
