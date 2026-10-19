import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import BackToTop from '../../../components/ui/BackToTop';
import { common, sections, getBlogBySlug, BlogDetailData } from '../../../components/types';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const list = (sections as unknown as { blog_details?: BlogDetailData[] }).blog_details || [];
  const single = (sections as unknown as { blog_detail?: BlogDetailData }).blog_detail;
  const slugs = list.map((b) => ({ slug: b.slug }));
  if (single && !slugs.some((s) => s.slug === single.slug)) {
    slugs.push({ slug: single.slug });
  }
  if (sections.blogs && sections.blogs.items) {
    sections.blogs.items.forEach((item) => {
      if (item.slug && !slugs.some((s) => s.slug === item.slug)) {
        slugs.push({ slug: item.slug });
      }
    });
  }
  if (slugs.length === 0) {
    slugs.push({ slug: '5-key-benefits-of-installing-solar-panels-at-home' });
  }
  return slugs;
}

export async function generateMetadata({ params }: PageProps) {
  const resolved = await params;
  const blog = getBlogBySlug(resolved.slug);
  if (!blog) {
    return {
      title: 'Blog Detail | SOLTRIX Renewable Energy',
      description: 'Solar energy insights and benefits by SOLTRIX.',
    };
  }
  return {
    title: `${blog.title} | SOLTRIX Renewable Energy`,
    description: blog.intro,
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const resolved = await params;
  const blog = getBlogBySlug(resolved.slug);

  if (!blog) {
    notFound();
  }

  const breadcrumbData = {
    title: blog.breadcrumb_title || 'Blog Detail',
    items: [],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#f59e0b] selection:text-white">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={breadcrumbData} />
        <BlogDetail data={blog} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
