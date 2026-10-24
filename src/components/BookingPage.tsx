import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Phone,
  MessageSquare,
  Truck,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Info,
  Clock,
  MapPin,
  User,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { EquipmentItem, Booking, RentalType, AppPage } from '../types';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { findConflictingBooking, formatDateDisplay } from '../utils/dateUtils';
import {
  BUSINESS_INFO,
  getCallUrl,
  getEquipmentBookingWhatsAppUrl,
} from '../config/businessInfo';
import { getAssetUrl } from '../utils/assets';
import './BookingPage.css';

interface BookingPageProps {
  equipmentList: EquipmentItem[];
  selectedEquipmentId: string;
  onSelectEquipmentId: (id: string) => void;
  bookings: Booking[];
  onAddBooking: (newBooking: Booking) => void;
  onBookingSuccess: (booking: Booking) => void;
  onViewEquipmentDetails: (item: EquipmentItem) => void;
  onNavigate: (page: AppPage, sectionId?: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  equipmentList,
  selectedEquipmentId,
  onSelectEquipmentId,
  bookings,
  onAddBooking,
  onBookingSuccess,
  onViewEquipmentDetails,
  onNavigate,
}) => {
  // Simple form state - 3 core fields + optional note
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [rentalType, setRentalType] = useState<RentalType>('Daily');

  // Dates: Default to Oct 12, 2026 to Oct 14, 2026
  const [startDate, setStartDate] = useState('2026-10-12');
  const [endDate, setEndDate] = useState('2026-10-14');

  // Alert and validation state
  const [formError, setFormError] = useState<string | null>(null);
  const [manualWarning, setManualWarning] = useState<string | null>(null);

  // Active equipment object
  const activeEquipment = useMemo(() => {
    return (
      equipmentList.find((eq) => eq.id === selectedEquipmentId) ||
      equipmentList[0] || {
        id: 'jcb-3dx',
        name: 'JCB 3DX',
        type: 'Backhoe Loader',
        category: 'Backhoe',
        model: 'JCB 3DX Super EcoMAX',
        shortDesc: 'Heavy-duty all-rounder for excavation, trenching, and loading.',
        fullDesc: 'The JCB 3DX is the most trusted workhorse for Indian infrastructure.',
        status: 'available' as const,
        statusText: 'Available',
        image: getAssetUrl('/equipment/jcb-3dx.jpg'),
        specs: {
          fuelCapacity: '128 Litres',
          operatingWeight: '7,460 kg',
        },
        rates: {
          hourly: 'Available on Call',
          daily: 'Tariff on Request',
          weekly: 'Custom Weekly Tariff',
          project: 'Custom Contract Quote',
        },
        applications: ['Excavation', 'Construction', 'Land Development'],
        operatorIncluded: true,
        minRentalHours: 4,
      }
    );
  }, [equipmentList, selectedEquipmentId]);

  // Total duration in days
  const totalDays = useMemo(() => {
    if (!startDate) return 1;
    const finalEnd = endDate || startDate;
    const startD = new Date(startDate);
    const endD = new Date(finalEnd);
    const diffTime = Math.abs(endD.getTime() - startD.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  // Derived conflict checking
  const conflictingBooking = useMemo(() => {
    if (!startDate) return null;
    const finalEnd = endDate || startDate;
    return findConflictingBooking(
      activeEquipment.id,
      startDate,
      finalEnd,
      bookings
    );
  }, [activeEquipment.id, startDate, endDate, bookings]);

  const isAvailable = !conflictingBooking && !manualWarning;

  const handleSelectDateRange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setFormError(null);
    setManualWarning(null);
  };

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
    setFormError(null);
    setManualWarning(null);
  };

  const handleUnavailableDateSelected = (_dateStr: string, warnMsg: string) => {
    setManualWarning(warnMsg);
    setFormError(null);
  };

  const handleEquipmentChange = (newEquipmentId: string) => {
    onSelectEquipmentId(newEquipmentId);
    setManualWarning(null);
    setFormError(null);
  };

  const currentWhatsAppUrl = getEquipmentBookingWhatsAppUrl(
    activeEquipment.name,
    startDate || '2026-10-12',
    endDate || startDate || '2026-10-14'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate 3 essential fields
    if (!customerName.trim()) {
      setFormError('Please enter your full name or company name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setFormError('Please enter a valid phone number (mobile or WhatsApp).');
      return;
    }
    if (!projectLocation.trim()) {
      setFormError('Please enter the project or worksite location (City / Area).');
      return;
    }
    if (!startDate) {
      setFormError('Please select rental dates from the calendar.');
      return;
    }

    const finalEndDate = endDate || startDate;
    if (finalEndDate < startDate) {
      setFormError('End date cannot be earlier than start date.');
      return;
    }

    if (conflictingBooking) {
      setFormError(
        `Selected dates conflict with an existing booking for ${activeEquipment.name}. Please pick available dates.`
      );
      return;
    }

    // Create new booking request
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `SVEM-2026-${randomSuffix}`,
      equipmentId: activeEquipment.id,
      equipmentName: activeEquipment.name,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      rentalType,
      projectLocation: projectLocation.trim(),
      startDate,
      endDate: finalEndDate,
      additionalRequirements: projectNote.trim() || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    onBookingSuccess(newBooking);
  };

  return (
    <div className="svem-booking-page">
      {/* ------------------------------------------------------------------ */}
      {/* Streamlined Hero Banner */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-simple-hero">
        <div className="svem-container">
          <nav className="svem-booking-breadcrumb" aria-label="Breadcrumb">
            <span
              role="link"
              tabIndex={0}
              className="svem-breadcrumb-link"
              onClick={() => onNavigate('home')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('home');
              }}
            >
              Home
            </span>
            <span className="svem-breadcrumb-sep">&gt;</span>
            <span className="svem-breadcrumb-current">Book Machinery</span>
          </nav>

          <h1 className="svem-booking-hero-title">
            Book Heavy <span className="svem-booking-hero-accent">Machinery</span>
          </h1>
          <p className="svem-booking-hero-desc">
            Choose your vehicle, select rental dates on the interactive calendar, and reserve directly with the owner in seconds.
          </p>

          <div className="svem-booking-coverage-tag">
            <MapPin size={15} />
            <span>Serving Tamil Nadu, Kerala, Andhra Pradesh &amp; Karnataka</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Streamlined 2-Column Booking Section */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-main-section">
        <div className="svem-container">
          <div className="svem-booking-simple-layout">
            {/* ============================================================ */}
            {/* LEFT COLUMN: Machine Picker & Enhanced Calendar */}
            {/* ============================================================ */}
            <div className="svem-booking-left-col">
              {/* Step 1: Vehicle Selector */}
              <div className="svem-simple-card">
                <div className="svem-card-header">
                  <div className="svem-step-badge">1</div>
                  <div>
                    <h2 className="svem-card-title">Select Machinery</h2>
                    <p className="svem-card-subtitle">Pick the equipment for your project</p>
                  </div>
                </div>

                <div className="svem-eq-dropdown-wrap">
                  <label htmlFor="equipmentSelect" className="svem-input-label">
                    Choose Equipment / Package
                  </label>
                  <select
                    id="equipmentSelect"
                    className="svem-select-input"
                    value={activeEquipment.id}
                    onChange={(e) => handleEquipmentChange(e.target.value)}
                  >
                    {equipmentList.map((eq) => (
                      <option key={eq.id} value={eq.id}>
                        {eq.id === 'all-vehicles-fleet' ? '⭐ ' : ''}
                        {eq.name} ({eq.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Highlight for All Vehicles Fleet */}
                {activeEquipment.id === 'all-vehicles-fleet' && (
                  <div className="svem-fleet-highlight-box">
                    <div className="svem-fleet-highlight-badge">
                      <Sparkles size={14} />
                      <span>Complete Fleet Package (All 8 Vehicles)</span>
                    </div>
                    <p className="svem-fleet-highlight-text">
                      Includes Hitachi 140, Robex 215L, Hitachi 220, 50ft Long Reach, Rock Breaker, BharatBenz 10W Tipper, Compressor &amp; Blasting, and JCB 3DX with certified operators.
                    </p>
                  </div>
                )}

                {/* Selected Machine Snapshot Card */}
                <div className="svem-machinery-preview-card">
                  <img
                    src={activeEquipment.image}
                    alt={activeEquipment.name}
                    className="svem-preview-thumbnail"
                  />
                  <div className="svem-preview-info">
                    <h3 className="svem-preview-title">{activeEquipment.name}</h3>
                    <p className="svem-preview-desc">{activeEquipment.shortDesc}</p>
                    <div className="svem-preview-tags">
                      <span className="svem-preview-tag">
                        <Truck size={12} /> {activeEquipment.category}
                      </span>
                      <span className="svem-preview-tag svem-preview-tag-operator">
                        <ShieldCheck size={12} /> Operator Included
                      </span>
                    </div>
                  </div>
                </div>

                <div className="svem-preview-actions">
                  <button
                    type="button"
                    className="svem-btn-view-details"
                    onClick={() => onViewEquipmentDetails(activeEquipment)}
                  >
                    <span>View Technical Specs &amp; Rates</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Step 2: Enhanced Availability Calendar */}
              <div className="svem-simple-card">
                <div className="svem-card-header">
                  <div className="svem-step-badge">2</div>
                  <div>
                    <h2 className="svem-card-title">Select Rental Dates</h2>
                    <p className="svem-card-subtitle">
                      Click any date on the calendar to set your start and end dates
                    </p>
                  </div>
                </div>

                {/* The Enhanced Availability Calendar */}
                <div className="svem-calendar-embed-wrap">
                  <AvailabilityCalendar
                    equipmentId={activeEquipment.id}
                    equipmentName={activeEquipment.name}
                    bookings={bookings}
                    startDate={startDate}
                    endDate={endDate}
                    onSelectDateRange={handleSelectDateRange}
                    onUnavailableDateSelected={handleUnavailableDateSelected}
                    onClearDates={handleClearDates}
                  />
                </div>

                {/* Quick Date Inputs for manual adjustment */}
                <div className="svem-date-inputs-grid">
                  <div className="svem-date-field">
                    <label htmlFor="calStartDate" className="svem-input-label">
                      Start Date
                    </label>
                    <input
                      id="calStartDate"
                      type="date"
                      className="svem-date-input"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setManualWarning(null);
                        setFormError(null);
                        if (!endDate || e.target.value > endDate) {
                          setEndDate(e.target.value);
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="svem-date-field">
                    <label htmlFor="calEndDate" className="svem-input-label">
                      End Date
                    </label>
                    <input
                      id="calEndDate"
                      type="date"
                      className="svem-date-input"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setManualWarning(null);
                        setFormError(null);
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Live Availability Status */}
                <div className="svem-live-availability-status">
                  {isAvailable ? (
                    <div className="svem-avail-banner svem-avail-banner-yes">
                      <CheckCircle2 size={18} className="svem-avail-icon" />
                      <div>
                        <strong>Selected Dates Available</strong>
                        <p>
                          {formatDateDisplay(startDate)} &rarr;{' '}
                          {formatDateDisplay(endDate || startDate)} ({totalDays}{' '}
                          day{totalDays > 1 ? 's' : ''})
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="svem-avail-banner svem-avail-banner-no">
                      <XCircle size={18} className="svem-avail-icon" />
                      <div>
                        <strong>Dates Not Available</strong>
                        <p>
                          {manualWarning ||
                            `This machine is booked on the selected dates. Please choose alternate dates or call us.`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Simple 3-Field Booking & Direct Owner Contact */}
            {/* ============================================================ */}
            <div className="svem-booking-right-col">
              {/* Card 1: Fast 3-Field Booking Form */}
              <div className="svem-simple-card svem-card-primary-form">
                <div className="svem-card-header">
                  <div className="svem-step-badge">3</div>
                  <div>
                    <h2 className="svem-card-title">Instant Booking Request</h2>
                    <p className="svem-card-subtitle">
                      Enter contact info. Zero upfront fees required.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="svem-streamlined-form">
                  {/* Field 1: Full Name */}
                  <div className="svem-form-group">
                    <label htmlFor="custName" className="svem-input-label">
                      <User size={14} className="svem-label-icon" />
                      <span>Full Name / Contractor Name</span>
                      <span className="svem-req">*</span>
                    </label>
                    <input
                      id="custName"
                      type="text"
                      className="svem-text-input"
                      placeholder="e.g. Ramesh Kumar / ABC Infrastructure"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Field 2: Phone Number */}
                  <div className="svem-form-group">
                    <label htmlFor="custPhone" className="svem-input-label">
                      <Phone size={14} className="svem-label-icon" />
                      <span>Phone Number (WhatsApp)</span>
                      <span className="svem-req">*</span>
                    </label>
                    <input
                      id="custPhone"
                      type="tel"
                      className="svem-text-input"
                      placeholder="e.g. 9944745410"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  {/* Field 3: Project Location */}
                  <div className="svem-form-group">
                    <label htmlFor="custLoc" className="svem-input-label">
                      <MapPin size={14} className="svem-label-icon" />
                      <span>Project Location (City / Area)</span>
                      <span className="svem-req">*</span>
                    </label>
                    <input
                      id="custLoc"
                      type="text"
                      className="svem-text-input"
                      placeholder="e.g. Salem, Namakkal, Dharmapuri..."
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      required
                    />
                  </div>

                  {/* Rental Duration Shift Selector */}
                  <div className="svem-form-group">
                    <label className="svem-input-label">
                      <Clock size={14} className="svem-label-icon" />
                      <span>Rental Duration Shift</span>
                    </label>
                    <div className="svem-rental-type-pills">
                      {(['Daily', 'Hourly', 'Weekly', 'Project Based'] as RentalType[]).map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            className={`svem-rental-type-pill ${
                              rentalType === type ? 'svem-type-pill-active' : ''
                            }`}
                            onClick={() => setRentalType(type)}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Optional Short Note */}
                  <div className="svem-form-group">
                    <label htmlFor="custNote" className="svem-input-label">
                      <span>Project Work Details (Optional)</span>
                    </label>
                    <input
                      id="custNote"
                      type="text"
                      className="svem-text-input"
                      placeholder="e.g. Earth excavation, canal trenching, building demolition..."
                      value={projectNote}
                      onChange={(e) => setProjectNote(e.target.value)}
                    />
                  </div>

                  {/* Error Banner */}
                  {formError && (
                    <div className="svem-form-error-alert" role="alert">
                      <AlertCircle size={16} />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    className={`svem-btn-primary-submit ${
                      !isAvailable ? 'svem-btn-disabled' : ''
                    }`}
                    disabled={!isAvailable}
                  >
                    <span>Submit Booking Request</span>
                    <ArrowRight size={18} />
                  </button>
                </form>

                {/* Direct Action Divider */}
                <div className="svem-direct-actions-divider">
                  <span>OR BOOK INSTANTLY VIA DIRECT CHAT / CALL</span>
                </div>

                {/* Instant Actions (WhatsApp + Call) */}
                <div className="svem-instant-actions-grid">
                  <a
                    href={currentWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="svem-btn-action-wa"
                  >
                    <MessageSquare size={18} />
                    <span>Book on WhatsApp</span>
                  </a>

                  <a href={getCallUrl()} className="svem-btn-action-call">
                    <Phone size={18} />
                    <span>Call Yard (+91 {BUSINESS_INFO.phone.replace('+91 ', '')})</span>
                  </a>
                </div>
              </div>

              {/* Card 2: SVEM Trust Guarantees */}
              <div className="svem-simple-card svem-trust-card">
                <h3 className="svem-trust-card-title">
                  <ShieldCheck size={18} className="text-amber-600" />
                  <span>Why Rent from Sri Venkateshwara?</span>
                </h3>
                <ul className="svem-trust-list">
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>
                      <strong>Direct Owner Rates:</strong> Zero agent or broker commissions.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>
                      <strong>Seasoned Operators:</strong> Safety-certified machine drivers included.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>
                      <strong>Inter-State Mobilization:</strong> Fast transport across Tamil Nadu, Kerala, Karnataka &amp; AP.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>
                      <strong>Reliable Fleets:</strong> High-uptime Hitachi, JCB &amp; BharatBenz machinery.
                    </span>
                  </li>
                </ul>

                <div className="svem-tariff-notice">
                  <Info size={15} />
                  <span>
                    Official tariff &amp; mobilization costs confirmed directly based on your site requirements.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
