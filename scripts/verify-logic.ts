import { INITIAL_BOOKINGS } from '../src/data/initialBookings.ts';
import { EQUIPMENT_LIST } from '../src/data/equipmentData.ts';
import {
  isDateBooked,
  findConflictingBooking,
  generateMonthGrid,
  formatDateISO,
  formatDateDisplay,
  isDateBetween
} from '../src/utils/dateUtils.ts';

console.log('=== RUNNING VERIFICATION SUITE FOR SRI VENKATESHWARA EARTH MOVERS ===\n');

let failedTests = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    failedTests++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// 1. Verify Equipment Data
assert(EQUIPMENT_LIST.length === 6, 'Equipment list has exactly 6 items');
const jcb = EQUIPMENT_LIST.find(e => e.id === 'jcb-3dx');
assert(jcb && jcb.status === 'available', 'JCB 3DX is available');
const dozer = EQUIPMENT_LIST.find(e => e.id === 'bulldozer');
assert(dozer && dozer.status === 'rented', 'Bulldozer is marked as currently rented');

// 2. Verify Initial Bookings & Availability on Oct 14, 2026 (Mockup requirement)
assert(
  isDateBooked('jcb-3dx', '2026-10-14', INITIAL_BOOKINGS),
  'JCB 3DX is booked on 2026-10-14 (matching reference UI)'
);
assert(
  !isDateBooked('jcb-3dx', '2026-10-12', INITIAL_BOOKINGS),
  'JCB 3DX is available on 2026-10-12'
);
assert(
  !isDateBooked('jcb-3dx', '2026-10-13', INITIAL_BOOKINGS),
  'JCB 3DX is available on 2026-10-13'
);

// 3. Verify Range Conflict Detection
const conflict1 = findConflictingBooking('jcb-3dx', '2026-10-12', '2026-10-14', INITIAL_BOOKINGS);
assert(
  conflict1 !== null && conflict1.startDate === '2026-10-14',
  'Range 2026-10-12 to 2026-10-14 conflicts with Oct 14 booking'
);

const conflict2 = findConflictingBooking('jcb-3dx', '2026-10-11', '2026-10-13', INITIAL_BOOKINGS);
assert(
  conflict2 === null,
  'Range 2026-10-11 to 2026-10-13 is completely available with zero conflicts'
);

// 4. Verify Overlap Spanning Across a Booked Date
const conflict3 = findConflictingBooking('jcb-3dx', '2026-10-13', '2026-10-15', INITIAL_BOOKINGS);
assert(
  conflict3 !== null,
  'Range 2026-10-13 to 2026-10-15 detects booked date on Oct 14 in the middle'
);

// 5. Verify Calendar Grid Generation for October 2026
// Month index 9 = October
const grid = generateMonthGrid(2026, 9, 'jcb-3dx', INITIAL_BOOKINGS, '2026-10-12', '2026-10-14');
assert(grid.length === 35 || grid.length === 42, `Calendar grid contains ${grid.length} day cells`);

const oct14Cell = grid.find(c => c.dateString === '2026-10-14');
assert(oct14Cell && oct14Cell.isBooked === true, 'Oct 14 cell is correctly flagged as isBooked = true');

const oct12Cell = grid.find(c => c.dateString === '2026-10-12');
assert(oct12Cell && oct12Cell.isSelected === true, 'Oct 12 cell is marked as isSelected = true');

// 6. Verify Date Formatter
assert(formatDateISO(new Date(2026, 9, 14)) === '2026-10-14', 'formatDateISO converts Date to YYYY-MM-DD');
assert(formatDateDisplay('2026-10-14') === 'Oct 14, 2026', 'formatDateDisplay converts YYYY-MM-DD to Oct 14, 2026');
assert(isDateBetween('2026-10-13', '2026-10-12', '2026-10-14') === true, 'isDateBetween checks inclusivity');

// 7. Verify About Page Assets & Configuration Integrity
import fs from 'node:fs';
import path from 'node:path';
import { BUSINESS_INFO, getCallUrl, getWhatsAppUrl } from '../src/config/businessInfo.ts';

const aboutImages = [
  'who-we-are.jpg',
  'earth-excavation.jpg',
  'earth-filling.jpg',
  'road-work.jpg',
  'land-development.jpg',
  'project-needs.jpg',
  'hero-bg-clean.jpg',
  'logo-mark.png',
];

for (const imgName of aboutImages) {
  const filePath = path.resolve('public/about', imgName);
  const exists = fs.existsSync(filePath);
  assert(exists, `About page asset ${imgName} exists in public/about`);
  if (exists) {
    const stat = fs.statSync(filePath);
    assert(stat.size > 1024, `About page asset ${imgName} is non-empty (${stat.size} bytes)`);
  }
}

assert(BUSINESS_INFO.phone.length > 5, 'Business phone is configured');
assert(getCallUrl().startsWith('tel:'), 'Call URL is formatted correctly');
assert(getWhatsAppUrl().startsWith('https://wa.me/'), 'WhatsApp URL is formatted correctly');

// 8. Verify No Monetary Amounts in Equipment Rates & Local Equipment Assets Exist
const equipmentImages = [
  'jcb-3dx.jpg',
  'excavator.jpg',
  'tractor.jpg',
  'tipper.jpg',
  'bulldozer.jpg',
  'road-roller.jpg'
];

for (const eqImg of equipmentImages) {
  const eqPath = path.resolve('public/equipment', eqImg);
  const exists = fs.existsSync(eqPath);
  assert(exists, `Local equipment image ${eqImg} exists in public/equipment`);
  if (exists) {
    const stat = fs.statSync(eqPath);
    assert(stat.size > 5000, `Equipment image ${eqImg} is non-empty (${stat.size} bytes)`);
  }
}

for (const item of EQUIPMENT_LIST) {
  assert(!item.rates.daily.includes('₹'), `No monetary currency symbol in ${item.name} daily rate`);
  assert(!item.rates.hourly.includes('₹'), `No monetary currency symbol in ${item.name} hourly rate`);
  assert(!item.rates.weekly.includes('₹'), `No monetary currency symbol in ${item.name} weekly rate`);
  assert(!item.rates.project.includes('₹'), `No monetary currency symbol in ${item.name} project rate`);
  assert(!item.rates.daily.includes('Rs'), `No Rs in ${item.name} daily rate`);
  assert(!item.rates.daily.includes('INR'), `No INR in ${item.name} daily rate`);
}

// 9. Verify All 7 Dedicated Routes & Route Parsing
import { parseRoute, getRouteHash, VALID_ROUTES } from '../src/utils/routeUtils.ts';
import { SERVICES_LIST } from '../src/data/servicesData.ts';

assert(VALID_ROUTES.length === 7, 'Exactly 7 dedicated routes configured');
assert(VALID_ROUTES.includes('home'), 'Route home exists');
assert(VALID_ROUTES.includes('about'), 'Route about exists');
assert(VALID_ROUTES.includes('equipment'), 'Route equipment exists');
assert(VALID_ROUTES.includes('services'), 'Route services exists');
assert(VALID_ROUTES.includes('gallery'), 'Route gallery exists');
assert(VALID_ROUTES.includes('booking'), 'Route booking exists');
assert(VALID_ROUTES.includes('contact'), 'Route contact exists');

// Route parsing assertions
assert(parseRoute('#/') === 'home', 'Parse #/ maps to home');
assert(parseRoute('') === 'home', 'Parse empty hash maps to home');
assert(parseRoute('#home') === 'home', 'Parse #home maps to home');
assert(parseRoute('#/about') === 'about', 'Parse #/about maps to about');
assert(parseRoute('#/equipment') === 'equipment', 'Parse #/equipment maps to equipment');
assert(parseRoute('#/services') === 'services', 'Parse #/services maps to services');
assert(parseRoute('#/gallery') === 'gallery', 'Parse #/gallery maps to gallery');
assert(parseRoute('#/booking') === 'booking', 'Parse #/booking maps to booking');
assert(parseRoute('#/contact') === 'contact', 'Parse #/contact maps to contact');

// Route hash generator assertions
assert(getRouteHash('home') === '#/', 'getRouteHash for home returns #/');
assert(getRouteHash('about') === '#/about', 'getRouteHash for about returns #/about');
assert(getRouteHash('equipment') === '#/equipment', 'getRouteHash for equipment returns #/equipment');
assert(getRouteHash('services') === '#/services', 'getRouteHash for services returns #/services');
assert(getRouteHash('gallery') === '#/gallery', 'getRouteHash for gallery returns #/gallery');
assert(getRouteHash('booking') === '#/booking', 'getRouteHash for booking returns #/booking');
assert(getRouteHash('contact') === '#/contact', 'getRouteHash for contact returns #/contact');

// Verify 5 Services in SERVICES_LIST
assert(SERVICES_LIST.length === 5, 'Services list contains 5 core earthwork services');
const excavationServ = SERVICES_LIST.find(s => s.id === 'earth-excavation');
assert(excavationServ && excavationServ.suitableEquipment.length > 0, 'Earth excavation has assigned machinery');
const fillingServ = SERVICES_LIST.find(s => s.id === 'earth-filling');
assert(fillingServ && fillingServ.suitableEquipment.length > 0, 'Earth filling has assigned machinery');
const roadServ = SERVICES_LIST.find(s => s.id === 'road-work');
assert(roadServ && roadServ.suitableEquipment.length > 0, 'Road work has assigned machinery');
const demoServ = SERVICES_LIST.find(s => s.id === 'demolition-work');
assert(demoServ && demoServ.suitableEquipment.length > 0, 'Demolition work has assigned machinery');
const landServ = SERVICES_LIST.find(s => s.id === 'land-development');
assert(landServ && landServ.suitableEquipment.length > 0, 'Land development has assigned machinery');

// 10. Verify Default Booking Range Availability & Query Parameter Parsing
const defaultConflict = findConflictingBooking('jcb-3dx', '2026-10-12', '2026-10-13', INITIAL_BOOKINGS);
assert(defaultConflict === null, 'Default booking range 2026-10-12 to 2026-10-13 has zero conflicts for JCB 3DX');

const queryHash1 = '#/booking?equipment=excavator-20t';
assert(parseRoute(queryHash1) === 'booking', 'parseRoute handles hash with equipment query param');

const queryHash2 = '#/equipment?search=jcb';
assert(parseRoute(queryHash2) === 'equipment', 'parseRoute handles hash with search query param');

const queryMatch = queryHash1.match(/[?&](?:equipment|eq)=([^&]+)/);
assert(queryMatch !== null && queryMatch[1] === 'excavator-20t', 'Query param extraction correctly extracts excavator-20t');

if (failedTests > 0) {
  console.error(`\n❌ Total test failures: ${failedTests}`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
}
