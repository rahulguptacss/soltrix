import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import GetAQuote from '../../components/sections/GetAQuote';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = {
  title: pages.getAQuote.metadata.title,
  description: pages.getAQuote.metadata.description,
};

export default function GetAQuotePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.getAQuote.breadcrumb} />
        <GetAQuote data={sections.quote} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
