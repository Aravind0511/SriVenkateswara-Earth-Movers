import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Booking } from '../types';
import { generateMonthGrid, findConflictingBooking, formatDateDisplay } from '../utils/dateUtils';

interface AvailabilityCalendarProps {
  equipmentId: string;
  equipmentName: string;
  bookings: Booking[];
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  onSelectDateRange: (start: string, end: string) => void;
  onUnavailableDateSelected?: (dateStr: string, message: string) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  equipmentId,
  equipmentName,
  bookings,
  startDate,
  endDate,
  onSelectDateRange,
  onUnavailableDateSelected
}) => {
  // Default to October 2026 to match reference image UI!
  // (Month is 0-indexed: 9 = October)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // October

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysGrid = generateMonthGrid(
    currentYear,
    currentMonth,
    equipmentId,
    bookings,
    startDate,
    endDate
  );

  const handleDayClick = (dateStr: string, isBooked: boolean, isPast: boolean) => {
    if (isPast) {
      if (onUnavailableDateSelected) {
        onUnavailableDateSelected(dateStr, 'Cannot select dates in the past. Please select an upcoming date.');
      }
      return;
    }

    // If date is already booked:
    if (isBooked) {
      onSelectDateRange(dateStr, dateStr);
      if (onUnavailableDateSelected) {
        onUnavailableDateSelected(
          dateStr,
          `This date is already booked for ${equipmentName}. Please select another date.`
        );
      }
      return;
    }

    // User clicked an available date:
    // If no start date or both start and end dates are already set to different dates, start fresh
    if (!startDate || (startDate && endDate && startDate !== endDate)) {
      onSelectDateRange(dateStr, dateStr);
    } else if (startDate && (!endDate || startDate === endDate)) {
      // User is picking the end date
      if (dateStr < startDate) {
        // If clicked date is before start date, make this the new start date
        onSelectDateRange(dateStr, dateStr);
      } else {
        // Check if any date in the range is booked
        const conflict = findConflictingBooking(equipmentId, startDate, dateStr, bookings);
        if (conflict) {
          onSelectDateRange(startDate, dateStr);
          if (onUnavailableDateSelected) {
            onUnavailableDateSelected(
              dateStr,
              `This date range includes booked dates (${formatDateDisplay(conflict.startDate)}) for ${equipmentName}. Please select an available range.`
            );
          }
          return;
        }
        onSelectDateRange(startDate, dateStr);
      }
    }
  };

  return (
    <div className="svem-calendar-widget">
      {/* Calendar Header with Navigation */}
      <div className="svem-cal-header">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="svem-cal-nav-btn"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="svem-cal-title">
          {monthNames[currentMonth]} {currentYear}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          className="svem-cal-nav-btn"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday Names Header */}
      <div className="svem-cal-weekdays">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="svem-cal-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="svem-cal-grid">
        {daysGrid.map((day, idx) => {
          let dayClass = 'svem-cal-day';
          if (!day.isCurrentMonth) dayClass += ' svem-cal-day-other-month';
          if (day.isPast) dayClass += ' svem-cal-day-past';
          if (day.isBooked) dayClass += ' svem-cal-day-booked';
          if (day.isSelected) dayClass += ' svem-cal-day-selected';
          if (day.isRangeStart) dayClass += ' svem-cal-day-range-start';
          if (day.isRangeEnd) dayClass += ' svem-cal-day-range-end';
          if (day.isInRange && !day.isRangeStart && !day.isRangeEnd) {
            dayClass += ' svem-cal-day-in-range';
          }

          return (
            <button
              key={`${day.dateString}-${idx}`}
              type="button"
              className={dayClass}
              onClick={() => handleDayClick(day.dateString, day.isBooked, day.isPast)}
              title={
                day.isBooked
                  ? `Booked for ${equipmentName}`
                  : day.isSelected
                  ? 'Selected date'
                  : 'Available'
              }
              aria-label={`${day.dateString} ${day.isBooked ? 'Booked' : 'Available'}`}
            >
              <span className="svem-cal-day-num">{day.dayNumber}</span>
              {day.isBooked && <span className="svem-cal-dot-booked" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Calendar Legend (Matching Reference Image) */}
      <div className="svem-cal-legend">
        <div className="svem-legend-item">
          <span className="svem-legend-box svem-legend-box-available" />
          <span>Available</span>
        </div>
        <div className="svem-legend-item">
          <span className="svem-legend-box svem-legend-box-booked" />
          <span>Not Available</span>
        </div>
        <div className="svem-legend-item">
          <span className="svem-legend-box svem-legend-box-selected" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};
