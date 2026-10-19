import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import Stats from '../../components/sections/Stats';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = {
  title: pages.about.metadata.title,
  description: pages.about.metadata.description,
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.about.breadcrumb!} />
        <About data={sections.about} />
        <Stats data={sections.about} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
