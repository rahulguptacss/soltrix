import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import ServiceDetail from '../../../components/sections/ServiceDetail';
import BackToTop from '../../../components/ui/BackToTop';
import { common, sections, getServiceBySlug, ServiceDetailData } from '../../../components/types';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const serviceDetail = (sections as unknown as { service_detail?: ServiceDetailData }).service_detail;
  const list = (sections as unknown as { service_details?: ServiceDetailData[] }).service_details || [];
  const allSlugs = list.map((s) => ({ slug: s.slug }));
  if (serviceDetail && !allSlugs.some((s) => s.slug === serviceDetail.slug)) {
    allSlugs.push({ slug: serviceDetail.slug });
  }
  if (sections.services && sections.services.items) {
    sections.services.items.forEach((item) => {
      const slug = item.href ? item.href.replace(/^\/services\//, '') : '';
      if (slug && !allSlugs.some((s) => s.slug === slug)) {
        allSlugs.push({ slug });
      }
    });
  }
  if (allSlugs.length === 0) {
    allSlugs.push({ slug: 'residential-solar-solutions' });
  }
  return allSlugs;
}

export async function generateMetadata({ params }: PageProps) {
  const resolved = await params;
  const service = getServiceBySlug(resolved.slug);
  if (!service) {
    return {
      title: 'Services Details | SOLTRIX Renewable Energy',
      description: 'Solar energy engineering solutions by SOLTRIX.',
    };
  }
  return {
    title: `${service.title} | SOLTRIX Renewable Energy`,
    description: service.hero.description,
  };
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const resolved = await params;
  const service = getServiceBySlug(resolved.slug);

  if (!service) {
    notFound();
  }

  const breadcrumbData = {
    title: service.breadcrumb_title || 'Services Details',
    items: [
      { name: 'Home', href: '/' },
      { name: service.title, href: `/services/${service.slug}` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={breadcrumbData} />
        <ServiceDetail data={service} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
