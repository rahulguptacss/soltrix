import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Contact from '../../components/sections/Contact';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = {
  title: pages.contact.metadata.title,
  description: pages.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.contact.breadcrumb!} />
        <Contact data={sections.contact} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
