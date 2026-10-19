import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Projects from '../../components/sections/Projects';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = {
  title: pages.projects.metadata.title,
  description: pages.projects.metadata.description,
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.projects.breadcrumb!} />
        <Projects data={sections.projects} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
