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

export interface AboutSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  description: string;
  image: string;
  features: AboutFeature[];
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

export interface TestimonialItem {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: TestimonialItem[];
}

export interface BlogItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
}

export interface BlogsSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2?: string;
  title_line3?: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  items: BlogItem[];
}

export interface ContactSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface BreadcrumbData {
  title: string;
  items: LinkType[];
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
