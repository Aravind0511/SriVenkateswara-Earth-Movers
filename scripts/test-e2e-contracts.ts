import fs from 'node:fs';
import path from 'node:path';
import { VALID_ROUTES, parseRoute, getRouteHash } from '../src/utils/routeUtils.ts';
import { BUSINESS_INFO, getCallUrl, getWhatsAppUrl, getEquipmentBookingWhatsAppUrl, getEquipmentTariffWhatsAppUrl } from '../src/config/businessInfo.ts';
import { EQUIPMENT_LIST } from '../src/data/equipmentData.ts';
import {
  findConflictingBooking,
  generateMonthGrid,
  formatDateISO,
  formatDateDisplay,
  isDateBetween
} from '../src/utils/dateUtils.ts';

console.log('=== END-TO-END CONTRACT & LOGIC VALIDATION SUITE ===\n');

let failures = 0;
let passed = 0;

function assert(condition: boolean, desc: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${desc}`);
    failures++;
  } else {
    console.log(`✅ PASSED: ${desc}`);
    passed++;
  }
}

// -------------------------------------------------------------
// 1. Route Contracts
// -------------------------------------------------------------
const expectedRoutes = ['home', 'about', 'equipment', 'services', 'gallery', 'booking', 'contact'];
assert(VALID_ROUTES.length === expectedRoutes.length, `Expected ${expectedRoutes.length} valid routes`);
for (const r of expectedRoutes) {
  assert(VALID_ROUTES.includes(r as any), `Route '${r}' is registered`);
  assert(getRouteHash(r as any).startsWith('#'), `getRouteHash('${r}') produces valid hash`);
}

// Hash parsing edge cases
assert(parseRoute('') === 'home', 'Empty string parses to home');
assert(parseRoute('#') === 'home', 'Single # parses to home');
assert(parseRoute('#/') === 'home', '#/ parses to home');
assert(parseRoute('#/unknown-page-route') === 'home', 'Unknown route safely falls back to home');
assert(parseRoute('#/booking?equipment=hitachi-140') === 'booking', 'Route with query parameters correctly parses base page');

// -------------------------------------------------------------
// 2. Business Info & Official Links Contract
// -------------------------------------------------------------
assert(BUSINESS_INFO.phone === '+91 9944745410', 'Phone matches owner number: +91 9944745410');
assert(BUSINESS_INFO.whatsapp === '+91 9944745410', 'WhatsApp matches owner number: +91 9944745410');

const callUrl = getCallUrl();
assert(callUrl === 'tel:+919944745410', `getCallUrl() formatted correctly: ${callUrl}`);

const defaultWa = getWhatsAppUrl();
assert(defaultWa.startsWith('https://wa.me/919944745410?text='), 'Default WhatsApp URL uses clean phone prefix');

const bookingWaSingle = getEquipmentBookingWhatsAppUrl('Hitachi 140 Excavator', '2026-10-15', '2026-10-15');
assert(bookingWaSingle.includes('Hitachi%20140%20Excavator'), 'Booking WhatsApp URL encodes equipment name');
assert(bookingWaSingle.includes('Oct%2015%2C%202026'), 'Booking WhatsApp URL includes formatted date');

const bookingWaRange = getEquipmentBookingWhatsAppUrl('50 Feet Long Reach Hitachi Excavator', '2026-11-01', '2026-11-05');
assert(bookingWaRange.includes('Nov%201%2C%202026%20to%20Nov%205%2C%202026'), 'Booking WhatsApp URL encodes multi-day range');

const tariffWa = getEquipmentTariffWhatsAppUrl('BharatBenz Heavy Tipper Lorry');
assert(tariffWa.includes('tariff'), 'Tariff WhatsApp URL contains inquiry for rental rates');

// -------------------------------------------------------------
// 3. Operational Coverage Invariants
// -------------------------------------------------------------
const requiredStates = ['Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Karnataka'];
for (const state of requiredStates) {
  assert(BUSINESS_INFO.serviceStates.includes(state), `Service state list contains ${state}`);
  assert(BUSINESS_INFO.serviceArea.includes(state), `Service area summary contains ${state}`);
}

// -------------------------------------------------------------
// 4. Equipment Invariants (Zero Pricing Policy & Fleet Completeness)
// -------------------------------------------------------------
assert(EQUIPMENT_LIST.length === 9, 'Fleet contains 9 units including Complete Fleet Package');
const fullFleet = EQUIPMENT_LIST.find(e => e.id === 'all-vehicles-fleet');
assert(Boolean(fullFleet), 'Complete Fleet Package (All Vehicles) item exists');
assert(fullFleet?.name === 'Complete Fleet Package (All Vehicles)', 'Fleet package has official title');

for (const eq of EQUIPMENT_LIST) {
  assert(Boolean(eq.id && eq.name && eq.category && eq.shortDesc && eq.fullDesc), `Equipment ${eq.id} has complete core info`);
  assert(eq.specs && Object.keys(eq.specs).length > 0, `Equipment ${eq.id} contains technical specs`);
  assert(eq.applications && eq.applications.length >= 3, `Equipment ${eq.id} lists at least 3 practical applications`);

  // Zero currency invariant
  const rates = Object.values(eq.rates);
  for (const r of rates) {
    assert(!r.includes('₹'), `No ₹ currency symbol in rate "${r}" for ${eq.name}`);
    assert(!r.toLowerCase().includes('inr'), `No INR currency in rate "${r}" for ${eq.name}`);
    assert(!/\bRs\.?\b/i.test(r), `No Rs in rate "${r}" for ${eq.name}`);
  }
}

// -------------------------------------------------------------
// 5. Booking Availability & Calendar Mathematical Edge Cases
// -------------------------------------------------------------
// Date ISO & Display
assert(formatDateISO(new Date(2026, 0, 1)) === '2026-01-01', 'formatDateISO works on Jan 1');
assert(formatDateISO(new Date(2028, 1, 29)) === '2028-02-29', 'formatDateISO works on Leap Day');
assert(formatDateDisplay('2028-02-29') === 'Feb 29, 2028', 'formatDateDisplay works on Leap Day');

// Inclusivity checks
assert(isDateBetween('2026-10-10', '2026-10-10', '2026-10-15') === true, 'isDateBetween includes start boundary');
assert(isDateBetween('2026-10-15', '2026-10-10', '2026-10-15') === true, 'isDateBetween includes end boundary');
assert(isDateBetween('2026-10-12', '2026-10-10', '2026-10-15') === true, 'isDateBetween includes middle date');
assert(isDateBetween('2026-10-09', '2026-10-10', '2026-10-15') === false, 'isDateBetween excludes date before range');
assert(isDateBetween('2026-10-16', '2026-10-10', '2026-10-15') === false, 'isDateBetween excludes date after range');

// Conflict detection logic
const testBookings = [
  {
    id: 'test-1',
    equipmentId: 'hitachi-140',
    equipmentName: 'Hitachi 140',
    customerName: 'Test Client',
    phoneNumber: '9999999999',
    rentalType: 'Daily' as const,
    projectLocation: 'Site A',
    startDate: '2026-10-20',
    endDate: '2026-10-22',
    status: 'Confirmed' as const,
    createdAt: '2026-10-01'
  }
];

assert(findConflictingBooking('hitachi-140', '2026-10-18', '2026-10-19', testBookings) === null, 'No conflict before booking');
assert(findConflictingBooking('hitachi-140', '2026-10-23', '2026-10-25', testBookings) === null, 'No conflict after booking');
assert(findConflictingBooking('hitachi-140', '2026-10-19', '2026-10-20', testBookings) !== null, 'Conflict on start overlap');
assert(findConflictingBooking('hitachi-140', '2026-10-22', '2026-10-24', testBookings) !== null, 'Conflict on end overlap');
assert(findConflictingBooking('hitachi-140', '2026-10-15', '2026-10-25', testBookings) !== null, 'Conflict on range enveloping booked dates');
assert(findConflictingBooking('hitachi-140', '2026-10-21', '2026-10-21', testBookings) !== null, 'Conflict on single date inside booked range');

// Different equipment has no conflict
assert(findConflictingBooking('hitachi-215', '2026-10-20', '2026-10-22', testBookings) === null, 'Different equipment has no conflict');

// Month grid generator checks
const oct2026Grid = generateMonthGrid(2026, 9, 'hitachi-140', testBookings);
assert(oct2026Grid.length === 35 || oct2026Grid.length === 42, `Month grid generates standard calendar cells: ${oct2026Grid.length}`);
const day20 = oct2026Grid.find(c => c.dateString === '2026-10-20');
assert(day20?.isBooked === true, 'Booked day 2026-10-20 is correctly marked isBooked = true');

// -------------------------------------------------------------
// 6. Production Build Artifacts Integrity
// -------------------------------------------------------------
const distIndex = path.resolve('dist/index.html');
assert(fs.existsSync(distIndex), 'dist/index.html exists');
const distHtml = fs.readFileSync(distIndex, 'utf8');
assert(distHtml.includes('<div id="root"></div>'), 'dist/index.html contains #root mount point');
assert(distHtml.includes('<meta name="viewport"'), 'dist/index.html contains responsive viewport meta tag');
assert(distHtml.includes('<title>'), 'dist/index.html contains title tag');

const dist404 = path.resolve('dist/404.html');
assert(fs.existsSync(dist404), 'dist/404.html exists for GitHub Pages SPA routing fallback');
const dist404Html = fs.readFileSync(dist404, 'utf8');
assert(dist404Html.includes('<div id="root"></div>'), 'dist/404.html contains SPA #root mount point');

console.log(`\nEnd-to-End Contract Summary: ${passed} passed, ${failures} failed.`);
if (failures > 0) {
  process.exit(1);
}
