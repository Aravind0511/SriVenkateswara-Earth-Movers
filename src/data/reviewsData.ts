import type { ReviewItem } from '../types';

/**
 * CLIENT PLACEHOLDERS: Customer reviews and testimonials.
 * These are marked placeholders to demonstrate layout and review rating widget.
 */
export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ramesh Kumar',
    location: 'Erode',
    projectType: 'Industrial Plot Development',
    rating: 5,
    comment: 'Very good service. Equipment was well maintained and delivered on time. Highly recommended for construction work.',
    date: 'October 2026'
  },
  {
    id: 'rev-2',
    name: 'S. Murugesan',
    location: 'Salem',
    projectType: 'Commercial Foundation Trenching',
    rating: 5,
    comment: 'Hired the JCB 3DX with operator for our warehouse foundation pits. Operator was skilled and finished 3 days of work in 2 days. Reasonable rental tariff.',
    date: 'September 2026'
  },
  {
    id: 'rev-3',
    name: 'P. Balasubramanian',
    location: 'Namakkal',
    projectType: 'Highway Sub-base Compaction',
    rating: 5,
    comment: 'The 11-ton vibratory road roller was in immaculate condition with zero breakdown during 2 weeks of continuous road rolling. Excellent cooperation from SV Earth Movers.',
    date: 'August 2026'
  },
  {
    id: 'rev-4',
    name: 'K. Rajasekaran',
    location: 'Coimbatore',
    projectType: 'Mass Earth Excavation & Tipper Hauling',
    rating: 5,
    comment: 'Arranged two 20T excavators and five tipper lorries on 24-hour notice. Great fleet management and completely transparent billing with log sheets.',
    date: 'July 2026'
  }
];
