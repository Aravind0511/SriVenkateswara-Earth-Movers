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

if (failedTests > 0) {
  console.error(`\n❌ Total test failures: ${failedTests}`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
}
