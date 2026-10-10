import type { AppPage } from '../types';

export const VALID_ROUTES: AppPage[] = [
  'home',
  'about',
  'equipment',
  'services',
  'gallery',
  'booking',
  'contact',
];

export function parseRoute(hash: string): AppPage {
  const clean = hash.replace(/^#\/?/, '').toLowerCase().split('?')[0];
  switch (clean) {
    case 'about':
      return 'about';
    case 'equipment':
      return 'equipment';
    case 'services':
      return 'services';
    case 'gallery':
      return 'gallery';
    case 'booking':
      return 'booking';
    case 'contact':
      return 'contact';
    case 'home':
    case '':
    default:
      return 'home';
  }
}

export function getRouteHash(page: AppPage): string {
  if (page === 'home') return '#/';
  return `#/${page}`;
}
