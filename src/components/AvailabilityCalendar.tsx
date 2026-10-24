import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { Booking } from '../types';
import {
  generateMonthGrid,
  findConflictingBooking,
  formatDateDisplay,
} from '../utils/dateUtils';
import './AvailabilityCalendar.css';

export interface AvailabilityCalendarProps {
  equipmentId: string;
  equipmentName: string;
  bookings: Booking[];
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  onSelectDateRange: (start: string, end: string) => void;
  onUnavailableDateSelected?: (dateStr: string, message: string) => void;
  onClearDates?: () => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  equipmentId,
  equipmentName,
  bookings,
  startDate,
  endDate,
  onSelectDateRange,
  onUnavailableDateSelected,
  onClearDates,
}) => {
  // Default to October 2026 to match reference UI (0-indexed: 9 = October)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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

  const handleJumpToActiveMonth = () => {
    if (startDate) {
      const parts = startDate.split('-');
      if (parts.length === 3) {
        setCurrentYear(parseInt(parts[0], 10));
        setCurrentMonth(parseInt(parts[1], 10) - 1);
        return;
      }
    }
    setCurrentYear(2026);
    setCurrentMonth(9);
  };

  const handleClear = () => {
    if (onClearDates) {
      onClearDates();
    } else {
      onSelectDateRange('', '');
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

  // Compute selected duration in days
  const totalDays = useMemo(() => {
    if (!startDate) return 0;
    const finalEnd = endDate || startDate;
    const startD = new Date(startDate);
    const endD = new Date(finalEnd);
    const diffTime = Math.abs(endD.getTime() - startD.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 1;
  }, [startDate, endDate]);

  // Check if current selection has any conflict
  const conflict = useMemo(() => {
    if (!startDate) return null;
    return findConflictingBooking(
      equipmentId,
      startDate,
      endDate || startDate,
      bookings
    );
  }, [equipmentId, startDate, endDate, bookings]);

  const handleDayClick = (
    dateStr: string,
    isBooked: boolean,
    isPast: boolean
  ) => {
    if (isPast) {
      if (onUnavailableDateSelected) {
        onUnavailableDateSelected(
          dateStr,
          'Cannot select dates in the past. Please select an upcoming date.'
        );
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
        const rangeConflict = findConflictingBooking(
          equipmentId,
          startDate,
          dateStr,
          bookings
        );
        if (rangeConflict) {
          onSelectDateRange(startDate, dateStr);
          if (onUnavailableDateSelected) {
            onUnavailableDateSelected(
              dateStr,
              `This date range includes booked dates (${formatDateDisplay(rangeConflict.startDate)}) for ${equipmentName}. Please select an available range.`
            );
          }
          return;
        }
        onSelectDateRange(startDate, dateStr);
      }
    }
  };

  const isDifferentFromActiveMonth =
    currentYear !== 2026 || currentMonth !== 9;

  return (
    <div className="svem-calendar-widget" aria-label="Interactive Equipment Availability Calendar">
      {/* Enhanced Date Range Status Pill */}
      <div className="svem-cal-status-pill">
        <div className="svem-cal-status-content">
          <CalendarIcon size={16} className="svem-cal-status-icon" />
          {startDate ? (
            <span className="svem-cal-status-text">
              <strong>{formatDateDisplay(startDate)}</strong>
              {endDate && endDate !== startDate ? (
                <>
                  {' '}
                  to <strong>{formatDateDisplay(endDate)}</strong> ({totalDays}{' '}
                  days)
                </>
              ) : (
                ' (1 day selected)'
              )}
            </span>
          ) : (
            <span className="svem-cal-status-placeholder">
              Tap a date below to choose start date
            </span>
          )}
        </div>

        {startDate && (
          <button
            type="button"
            onClick={handleClear}
            className="svem-cal-clear-btn"
            title="Reset selected dates"
            aria-label="Reset selected dates"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

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

        <div className="svem-cal-title-wrap">
          <span className="svem-cal-title">
            {monthNames[currentMonth]} {currentYear}
          </span>
          {isDifferentFromActiveMonth && (
            <button
              type="button"
              onClick={handleJumpToActiveMonth}
              className="svem-cal-jump-btn"
              title="Return to October 2026"
            >
              Current
            </button>
          )}
        </div>

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
      <div className="svem-cal-grid" role="grid">
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
              onClick={() =>
                handleDayClick(day.dateString, day.isBooked, day.isPast)
              }
              title={
                day.isBooked
                  ? `Already Booked for ${equipmentName}`
                  : day.isSelected
                  ? 'Selected rental date'
                  : 'Available for rental'
              }
              aria-label={`${day.dateString} ${
                day.isBooked ? 'Booked' : 'Available'
              }`}
            >
              <span className="svem-cal-day-num">{day.dayNumber}</span>
              {day.isBooked && (
                <span className="svem-cal-dot-booked" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Live Availability Feedback Banner */}
      {startDate && (
        <div
          className={`svem-cal-avail-alert ${
            conflict ? 'svem-cal-avail-conflict' : 'svem-cal-avail-success'
          }`}
          role="status"
        >
          {conflict ? (
            <>
              <AlertCircle size={15} className="svem-cal-alert-icon" />
              <span>
                <strong>Booked:</strong> Date overlaps with existing booking.
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 size={15} className="svem-cal-alert-icon" />
              <span>
                <strong>Available:</strong> Machine is ready for selected dates!
              </span>
            </>
          )}
        </div>
      )}

      {/* Calendar Legend */}
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
