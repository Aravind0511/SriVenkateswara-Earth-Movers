import type { Booking, CalendarDay } from '../types';

/**
 * Format Date to YYYY-MM-DD string
 */
export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format YYYY-MM-DD to human readable string (e.g. "Oct 12, 2026")
 */
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Check if a date string is between start and end inclusive
 */
export function isDateBetween(dateStr: string, startStr: string, endStr: string): boolean {
  if (!dateStr || !startStr || !endStr) return false;
  const minDate = startStr <= endStr ? startStr : endStr;
  const maxDate = startStr <= endStr ? endStr : startStr;
  return dateStr >= minDate && dateStr <= maxDate;
}

/**
 * Check if specific date is booked for equipment
 */
export function isDateBooked(
  equipmentId: string,
  dateStr: string,
  bookings: Booking[]
): boolean {
  return bookings.some(
    (b) =>
      b.equipmentId === equipmentId &&
      b.status !== 'Cancelled' &&
      b.status !== 'Rejected' &&
      dateStr >= b.startDate &&
      dateStr <= b.endDate
  );
}

/**
 * Find conflicting booking for equipment within start and end date range
 */
export function findConflictingBooking(
  equipmentId: string,
  startDateStr: string,
  endDateStr: string,
  bookings: Booking[]
): Booking | null {
  if (!startDateStr || !endDateStr || !equipmentId) return null;
  const normalizedStart = startDateStr <= endDateStr ? startDateStr : endDateStr;
  const normalizedEnd = startDateStr <= endDateStr ? endDateStr : startDateStr;

  const conflict = bookings.find((b) => {
    if (b.equipmentId !== equipmentId) return false;
    if (b.status === 'Cancelled' || b.status === 'Rejected') return false;

    // Overlap condition: startA <= endB && endA >= startB
    return normalizedStart <= b.endDate && normalizedEnd >= b.startDate;
  });

  return conflict || null;
}

/**
 * Generate 35 or 42 calendar grid cells for a given month & year
 */
export function generateMonthGrid(
  year: number,
  month: number, // 0-indexed (0 = Jan, 9 = Oct)
  equipmentId: string,
  bookings: Booking[],
  selectedStart?: string,
  selectedEnd?: string
): CalendarDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = formatDateISO(today);

  const firstDayOfMonth = new Date(year, month, 1, 12, 0, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday...
  const daysInMonth = new Date(year, month + 1, 0, 12, 0, 0).getDate();

  // Days from previous month to fill the first row
  const daysInPrevMonth = new Date(year, month, 0, 12, 0, 0).getDate();
  const days: CalendarDay[] = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const date = new Date(year, month - 1, dayNum, 12, 0, 0);
    const dateISO = formatDateISO(date);
    const inRange = selectedStart && selectedEnd ? isDateBetween(dateISO, selectedStart, selectedEnd) : false;
    const isStart = dateISO === selectedStart;
    const isEnd = dateISO === selectedEnd;

    days.push({
      date,
      dateString: dateISO,
      dayNumber: dayNum,
      isCurrentMonth: false,
      isToday: dateISO === todayISO,
      isPast: dateISO < todayISO,
      isBooked: isDateBooked(equipmentId, dateISO, bookings),
      isSelected: Boolean(isStart || isEnd || inRange),
      isRangeStart: Boolean(isStart),
      isRangeEnd: Boolean(isEnd),
      isInRange: Boolean(inRange)
    });
  }

  // Days of current month
  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const date = new Date(year, month, dayNum, 12, 0, 0);
    const dateISO = formatDateISO(date);
    const booked = isDateBooked(equipmentId, dateISO, bookings);
    const isStart = dateISO === selectedStart;
    const isEnd = dateISO === selectedEnd;
    const inRange =
      selectedStart && selectedEnd
        ? isDateBetween(dateISO, selectedStart, selectedEnd)
        : isStart || isEnd;

    days.push({
      date,
      dateString: dateISO,
      dayNumber: dayNum,
      isCurrentMonth: true,
      isToday: dateISO === todayISO,
      isPast: dateISO < todayISO,
      isBooked: booked,
      isSelected: Boolean(isStart || isEnd || inRange),
      isRangeStart: Boolean(isStart),
      isRangeEnd: Boolean(isEnd),
      isInRange: Boolean(inRange)
    });
  }

  // Days from next month to complete standard 35 or 42 grid
  const targetTotal = days.length <= 35 ? 35 : 42;
  const daysToAdd = targetTotal - days.length;

  for (let dayNum = 1; dayNum <= daysToAdd; dayNum++) {
    const date = new Date(year, month + 1, dayNum, 12, 0, 0);
    const dateISO = formatDateISO(date);
    const inRange = selectedStart && selectedEnd ? isDateBetween(dateISO, selectedStart, selectedEnd) : false;
    const isStart = dateISO === selectedStart;
    const isEnd = dateISO === selectedEnd;

    days.push({
      date,
      dateString: dateISO,
      dayNumber: dayNum,
      isCurrentMonth: false,
      isToday: dateISO === todayISO,
      isPast: dateISO < todayISO,
      isBooked: isDateBooked(equipmentId, dateISO, bookings),
      isSelected: Boolean(isStart || isEnd || inRange),
      isRangeStart: Boolean(isStart),
      isRangeEnd: Boolean(isEnd),
      isInRange: Boolean(inRange)
    });
  }

  return days;
}
