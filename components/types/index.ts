import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
  active?: boolean;
}

export interface HeaderData {
  logo: string;
  white_logo?: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text: string;
  button_link: string;
}

export interface FooterData {
  logo: string;
  background: string;
  logo_text: string;
  logo_subtext: string;
  description: string;
  quick_links: LinkType[];
  our_services: LinkType[];
  headings: { quick_links: string; our_services: string; contact: string };
  contact: {
    address: string;
    email: string;
    phone: string;
    phone_secondary?: string;
    hours?: string;
    hours_secondary?: string;
  };
  copyright: string;
  socials: { name: string; href: string }[];
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  primary_button: { text: string; href: string };
  image_leaves: string;
  image_solar: string;
}

export interface AboutFeature {
  icon: string;
  label: string;
}

export interface AboutStatItem {
  value: string;
  label: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  description: string;
  image: string;
  features: AboutFeature[];
  stats_image?: string;
  stats?: AboutStatItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  button_text: string;
  href: string;
  accent_color?: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: ServiceItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  column?: 'left' | 'right' | string;
  layout?: 'wide' | 'compact' | 'tall' | string;
}

export interface ProjectsSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  items: ProjectItem[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  avatar?: string;
  quote: string;
  rating?: number;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  description: string;
  layout?: 'slider' | 'grid';
  items: TestimonialItem[];
}

export interface BlogItem {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  date: string;
  image: string;
  excerpt: string;
  author?: string;
  button_text?: string;
}

export interface BlogsSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2?: string;
  title_line3?: string;
  title_highlight: string;
  page_title_line1?: string;
  page_title_highlight?: string;
  page_description?: string;
  description: string;
  button: { text: string; href: string };
  items: BlogItem[];
}

export interface ContactFormField {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  options?: string[];
  required?: boolean;
}

export interface ContactHoursRow {
  days: string;
  time: string;
}

export interface ContactSectionData {
  eyebrow?: string;
  subtitle?: string;
  title_line1: string;
  title_with?: string;
  title_highlight: string;
  description: string;
  form?: {
    eyebrow: string;
    title_prefix: string;
    title_highlight: string;
    description: string;
    fields: {
      fullName: ContactFormField;
      phone: ContactFormField;
      email: ContactFormField;
      subject: ContactFormField;
      message: ContactFormField;
    };
    submit_button: {
      text: string;
    };
  };
  info?: {
    eyebrow: string;
    title_line1: string;
    title_line2_prefix: string;
    title_highlight: string;
    description: string;
    phone: {
      label: string;
      value: string;
      href: string;
    };
    email: {
      label: string;
      value: string;
      href: string;
    };
    office: {
      label: string;
      value: string;
    };
    hours: {
      label: string;
      schedule: ContactHoursRow[];
    };
  };
  location?: {
    eyebrow: string;
    title_prefix: string;
    title_highlight: string;
    description: string;
    map_embed_url?: string;
    map_image?: string;
    pin: {
      title: string;
      subtitle: string;
      address?: string;
      map_url?: string;
    };
  };
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

export interface QuoteFormField {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  options?: string[];
  required?: boolean;
}

export interface QuoteFeatureItem {
  title: string;
  description: string;
}

export interface QuoteSectionData {
  form: {
    bg_color?: string;
    eyebrow: string;
    title_prefix: string;
    title_highlight: string;
    description: string;
    fields: {
      fullName: QuoteFormField;
      phone: QuoteFormField;
      email: QuoteFormField;
      propertyType: QuoteFormField;
      city: QuoteFormField;
      requirements: QuoteFormField;
    };
    submit_button: {
      text: string;
    };
    success_message?: string;
  };
  info: {
    image: string;
    eyebrow: string;
    title_line1: string;
    title_prefix2?: string;
    title_highlight: string;
    description: string;
    features: QuoteFeatureItem[];
  };
}

export interface ServiceDetailStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceDetailFeature {
  number: string;
  title: string;
  description: string;
}

export interface ServiceDetailData {
  slug: string;
  title: string;
  breadcrumb_title: string;
  hero: {
    tag: string;
    title_line1: string;
    title_line2: string;
    description: string;
    button_text: string;
    button_link: string;
    image: string;
  };
  overview: {
    tag: string;
    title_part1: string;
    title_for: string;
    title_highlight: string;
    paragraphs: string[];
    features: ServiceDetailFeature[];
  };
  process: {
    tag: string;
    title_line1: string;
    title_part1: string;
    title_highlight: string;
    description: string;
    image: string;
    steps: ServiceDetailStep[];
  };
  benefits: {
    tag: string;
    title_part1: string;
    title_for: string;
    title_highlight: string;
    lead: string;
    items: string[];
  };
}

export interface BlogDetailBenefit {
  title: string;
  description: string;
}

export interface RecentBlogItem {
  id?: string;
  slug: string;
  title: string;
  date: string;
  image: string;
}

export interface BlogDetailCTA {
  tag: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
}

export interface BlogDetailSidebar {
  recent_title: string;
  recent_blogs: RecentBlogItem[];
  cta: BlogDetailCTA;
}

export interface BlogDetailConclusion {
  tag: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
}

export interface BlogDetailData {
  slug: string;
  title: string;
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  breadcrumb_title?: string;
  tag: string;
  date: string;
  image: string;
  intro: string;
  benefits: BlogDetailBenefit[];
  conclusion: BlogDetailConclusion;
  sidebar: BlogDetailSidebar;
}

export interface BreadcrumbData {
  title: string;
  items: LinkType[];
  icon?: string;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: { title: string; description?: string };
  components: PageComponent[];
  breadcrumb?: BreadcrumbData;
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.SolarEnergy.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getServiceBySlug(slug: string): ServiceDetailData | undefined {
  const normalized = toSlug(slug);
  const list: ServiceDetailData[] = (sections as unknown as { service_details?: ServiceDetailData[] }).service_details || [];
  return (
    list.find(
      (s) =>
        s.slug === slug ||
        toSlug(s.slug) === normalized ||
        toSlug(s.title) === normalized
    ) || (sections as unknown as { service_detail?: ServiceDetailData }).service_detail
  );
}

export function getBlogBySlug(slug: string): BlogDetailData | undefined {
  const normalized = toSlug(slug);
  const list: BlogDetailData[] = (sections as unknown as { blog_details?: BlogDetailData[] }).blog_details || [];
  return (
    list.find(
      (b) =>
        b.slug === slug ||
        toSlug(b.slug) === normalized ||
        toSlug(b.title) === normalized
    ) || (sections as unknown as { blog_detail?: BlogDetailData }).blog_detail
  );
}
