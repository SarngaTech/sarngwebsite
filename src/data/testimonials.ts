/**
 * Add only genuine testimonials with the learner's permission.
 * The Testimonials section stays hidden while this list is empty.
 */
export interface Testimonial {
  name: string;
  role?: string;
  quote: string;
}
export const testimonials: Testimonial[] = [];
