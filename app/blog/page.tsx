import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Blogs from '../../components/sections/Blogs';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = {
  title: pages.blog.metadata.title,
  description: pages.blog.metadata.description,
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.blog.breadcrumb!} />
        <Blogs data={sections.blogs} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
