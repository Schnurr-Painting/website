import { getCollection } from './content';

export interface TestimonialData {
  quote: any[];
  person?: string;
  role?: string;
  company?: string;
  companyLogo?: string;
  approvedPublic?: boolean;
  showOn?: string[];
  sortOrder: number;
}

export type TestimonialsPageKey = 'home' | 'about' | 'services' | 'markets' | 'projects';

export async function getTestimonialsForPage(page: TestimonialsPageKey) {
  const allTestimonials = await getCollection<TestimonialData>('testimonials');
  return allTestimonials
    .filter((t) => t.data.approvedPublic && (t.data.showOn || []).includes(page))
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
    .slice(0, 3);
}
