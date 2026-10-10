import React, { useState, useMemo, useRef } from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Phone,
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Settings,
  Headphones,
  Check,
  ArrowRight,
  FileText,
  Truck,
  ShieldCheck,
  AlertCircle,
  Info,
  Fuel,
  Wrench,
  Layers,
  CalendarRange,
  Sun,
} from 'lucide-react';
import type { EquipmentItem, Booking, RentalType, AppPage } from '../types';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { findConflictingBooking, formatDateDisplay } from '../utils/dateUtils';
import {
  getCallUrl,
  getWhatsAppUrl,
  getEquipmentBookingWhatsAppUrl,
} from '../config/businessInfo';
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
  // Carousel ref & state
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Form state - Defaulting to matching reference template UI dates: Oct 12, 2026 to Oct 16, 2026!
  const [startDate, setStartDate] = useState('2026-10-12');
  const [endDate, setEndDate] = useState('2026-10-16');
  const [rentalDurationType, setRentalDurationType] = useState<RentalType>('Daily');

  // Section 3: Project & Location Details
  const [projectType, setProjectType] = useState('Earth Excavation');
  const [projectLocation, setProjectLocation] = useState('');
  const [workingHours, setWorkingHours] = useState('8 Hours (Standard Shift)');
  const [siteAddress, setSiteAddress] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Section 4: Your Details
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation & alerts
  const [formError, setFormError] = useState<string | null>(null);
  const [manualWarning, setManualWarning] = useState<string | null>(null);

  // Active selected equipment object
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
        image: '/equipment/jcb-3dx.jpg',
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

  // Filtered equipment list for carousel
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesAvail =
        selectedAvailability === 'all' ||
        (selectedAvailability === 'available' && item.status === 'available') ||
        (selectedAvailability === 'rented' && item.status === 'rented');

      return matchesSearch && matchesCat && matchesAvail;
    });
  }, [equipmentList, searchQuery, selectedCategory, selectedAvailability]);

  // Calculate rental duration in days
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

  const handleUnavailableDateSelected = (_dateStr: string, warnMsg: string) => {
    setManualWarning(warnMsg);
    setFormError(null);
  };

  const handleEquipmentChange = (newEquipmentId: string) => {
    onSelectEquipmentId(newEquipmentId);
    setManualWarning(null);
    setFormError(null);
  };

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselTrackRef.current) return;
    const cardWidth = 240;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    carouselTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    if (direction === 'next') {
      setCarouselIndex((prev) => Math.min(prev + 1, filteredEquipment.length - 1));
    } else {
      setCarouselIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const currentWhatsAppUrl = getEquipmentBookingWhatsAppUrl(
    activeEquipment.name,
    startDate,
    endDate || startDate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validations
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setFormError('Please enter a valid phone number with STD/mobile digits.');
      return;
    }
    if (!projectLocation.trim()) {
      setFormError('Please enter your project location (City or Area).');
      return;
    }
    if (!startDate) {
      setFormError('Please select a start date from the calendar.');
      return;
    }

    const finalEndDate = endDate || startDate;
    if (finalEndDate < startDate) {
      setFormError('End date cannot be earlier than start date.');
      return;
    }

    if (!agreedToTerms) {
      setFormError('Please agree to the rental terms and conditions before submitting.');
      return;
    }

    // 2. Check conflicts
    if (conflictingBooking) {
      setFormError(
        `Selected dates conflict with an existing booking for ${activeEquipment.name}. Please select available dates.`
      );
      return;
    }

    // 3. Create Booking Request
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `SVEM-2026-${randomSuffix}`,
      equipmentId: activeEquipment.id,
      equipmentName: activeEquipment.name,
      customerName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || undefined,
      rentalType: rentalDurationType,
      projectLocation: projectLocation.trim(),
      startDate,
      endDate: finalEndDate,
      additionalRequirements: [
        `Project: ${projectType}`,
        `Hours/Day: ${workingHours}`,
        siteAddress ? `Site Address: ${siteAddress.trim()}` : null,
        additionalRequirements ? `Requirements: ${additionalRequirements.trim()}` : null,
        message ? `Message: ${message.trim()}` : null,
      ]
        .filter(Boolean)
        .join(' | '),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    onBookingSuccess(newBooking);
  };

  return (
    <div className="svem-booking-page">
      {/* ------------------------------------------------------------------ */}
      {/* Hero Section matching reference image */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-hero">
        <div className="svem-container">
          {/* Breadcrumb: Home > Booking */}
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
            <span className="svem-breadcrumb-current">Booking</span>
          </nav>

          <h1 className="svem-booking-hero-title">
            Book Your <span className="svem-booking-hero-accent">Equipment</span>
          </h1>
          <p className="svem-booking-hero-tagline">Simple. Fast. Reliable.</p>
          <p className="svem-booking-hero-desc">
            Choose the right equipment, check availability, and request a booking with just a few clicks.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5-Step Progress Bar matching reference image */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-steps-section" aria-label="Booking Process Steps">
        <div className="svem-container">
          <div className="svem-booking-steps-grid">
            {/* Step 1: Select Equipment */}
            <div className="svem-step-item svem-step-active">
              <div className="svem-step-icon-wrap svem-step-icon-primary">
                <Truck size={20} />
              </div>
              <div className="svem-step-content">
                <span className="svem-step-num-title">
                  <span className="svem-step-num">1</span> Select Equipment
                </span>
                <span className="svem-step-sub">Choose the equipment you need</span>
              </div>
            </div>

            <ChevronRight className="svem-step-arrow" size={20} />

            {/* Step 2: Select Dates */}
            <div className="svem-step-item svem-step-active">
              <div className="svem-step-icon-wrap svem-step-icon-secondary">
                <Calendar size={20} />
              </div>
              <div className="svem-step-content">
                <span className="svem-step-num-title">
                  <span className="svem-step-num">2</span> Select Dates
                </span>
                <span className="svem-step-sub">Check real-time availability</span>
              </div>
            </div>

            <ChevronRight className="svem-step-arrow" size={20} />

            {/* Step 3: Fill Details */}
            <div className="svem-step-item">
              <div className="svem-step-icon-wrap svem-step-icon-secondary">
                <FileText size={20} />
              </div>
              <div className="svem-step-content">
                <span className="svem-step-num-title">
                  <span className="svem-step-num">3</span> Fill Details
                </span>
                <span className="svem-step-sub">Provide your project information</span>
              </div>
            </div>

            <ChevronRight className="svem-step-arrow" size={20} />

            {/* Step 4: Review & Confirm */}
            <div className="svem-step-item">
              <div className="svem-step-icon-wrap svem-step-icon-secondary">
                <ShieldCheck size={20} />
              </div>
              <div className="svem-step-content">
                <span className="svem-step-num-title">
                  <span className="svem-step-num">4</span> Review &amp; Confirm
                </span>
                <span className="svem-step-sub">Verify and submit your request</span>
              </div>
            </div>

            <ChevronRight className="svem-step-arrow" size={20} />

            {/* Step 5: Booking Request */}
            <div className="svem-step-item">
              <div className="svem-step-icon-wrap svem-step-icon-secondary">
                <CheckCircle2 size={20} />
              </div>
              <div className="svem-step-content">
                <span className="svem-step-num-title">
                  <span className="svem-step-num">5</span> Booking Request
                </span>
                <span className="svem-step-sub">We will contact you shortly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Main Two-Column Booking Layout */}
      {/* ------------------------------------------------------------------ */}
      <div className="svem-container svem-booking-main-container">
        <div className="svem-booking-grid-wrapper">
          {/* ============================================================== */}
          {/* Left Column: Form & Sections 1, 2, 3, 4 */}
          {/* ============================================================== */}
          <div className="svem-booking-form-column">
            <form onSubmit={handleSubmit} className="svem-booking-complete-form">
              {/* ---------------------------------------------------------- */}
              {/* SECTION 1: Select Equipment */}
              {/* ---------------------------------------------------------- */}
              <section id="section-select-equipment" className="svem-booking-card-section">
                <div className="svem-section-title-bar">
                  <span className="svem-section-accent-bar" />
                  <h2 className="svem-card-section-title">1. Select Equipment</h2>
                </div>

                {/* Filter and Search Bar */}
                <div className="svem-filter-controls-row">
                  <div className="svem-search-input-box">
                    <Search size={18} className="svem-search-icon" />
                    <input
                      type="text"
                      className="svem-search-input"
                      placeholder="Search equipment (e.g., JCB, Excavator, Tractor...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="svem-filter-select-box">
                    <select
                      className="svem-filter-dropdown"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      aria-label="Filter by Category"
                    >
                      <option value="all">All Categories</option>
                      <option value="Backhoe">Backhoe (JCB)</option>
                      <option value="Excavator">Excavator</option>
                      <option value="Tractor">Tractor</option>
                      <option value="Tipper">Tipper Lorry</option>
                      <option value="Bulldozer">Bulldozer</option>
                      <option value="Road Roller">Road Roller</option>
                    </select>
                  </div>

                  <div className="svem-filter-select-box">
                    <select
                      className="svem-filter-dropdown"
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      aria-label="Filter by Availability"
                    >
                      <option value="all">Availability</option>
                      <option value="available">Available Now</option>
                      <option value="rented">Currently Rented</option>
                    </select>
                  </div>
                </div>

                {/* Carousel Card Slider */}
                <div className="svem-equipment-carousel-wrapper">
                  <button
                    type="button"
                    className="svem-carousel-arrow svem-carousel-arrow-prev"
                    onClick={() => scrollCarousel('prev')}
                    aria-label="Previous equipment"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="svem-equipment-carousel-track" ref={carouselTrackRef}>
                    {filteredEquipment.map((item) => {
                      const isSelected = item.id === activeEquipment.id;

                      return (
                        <div
                          key={item.id}
                          className={`svem-carousel-card ${
                            isSelected ? 'svem-carousel-card-selected' : ''
                          }`}
                          onClick={() => handleEquipmentChange(item.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                              handleEquipmentChange(item.id);
                          }}
                        >
                          {isSelected && (
                            <div className="svem-card-check-badge" title="Selected Equipment">
                              <Check size={14} />
                            </div>
                          )}

                          <div className="svem-carousel-card-img-wrap">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="svem-carousel-card-img"
                              loading="lazy"
                            />
                          </div>

                          <div className="svem-carousel-card-info">
                            <h3 className="svem-carousel-card-name">{item.name}</h3>
                            <p className="svem-carousel-card-type">{item.type}</p>

                            <div className="svem-carousel-card-status">
                              <span
                                className={`svem-status-dot ${
                                  item.status === 'available'
                                    ? 'svem-status-dot-green'
                                    : 'svem-status-dot-amber'
                                }`}
                              />
                              <span className="svem-status-text">
                                {item.status === 'available' ? 'Available' : 'Currently Rented'}
                              </span>
                            </div>

                            <button
                              type="button"
                              className={`svem-card-select-btn ${
                                isSelected ? 'svem-card-select-btn-active' : ''
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEquipmentChange(item.id);
                              }}
                            >
                              {isSelected ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="svem-carousel-arrow svem-carousel-arrow-next"
                    onClick={() => scrollCarousel('next')}
                    aria-label="Next equipment"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="svem-carousel-dots">
                  {filteredEquipment.map((eq, i) => (
                    <span
                      key={eq.id}
                      className={`svem-carousel-dot ${
                        i === carouselIndex ? 'svem-carousel-dot-active' : ''
                      }`}
                      onClick={() => {
                        setCarouselIndex(i);
                        if (carouselTrackRef.current) {
                          carouselTrackRef.current.scrollTo({
                            left: i * 240,
                            behavior: 'smooth',
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* ---------------------------------------------------------- */}
              {/* SECTION 2: Select Rental Date & Duration */}
              {/* CRITICAL USER REQUIREMENT: In Section 2, REMOVE the second month selection calendar. */}
              {/* Single interactive availability calendar + start/end inputs + duration cards. */}
              {/* ---------------------------------------------------------- */}
              <section id="section-select-dates" className="svem-booking-card-section">
                <div className="svem-section-title-bar">
                  <span className="svem-section-accent-bar" />
                  <h2 className="svem-card-section-title">2. Select Rental Date &amp; Duration</h2>
                </div>

                {/* Date Inputs Display Row */}
                <div className="svem-dates-input-row">
                  <div className="svem-form-field">
                    <label htmlFor="bookingStartDate" className="svem-field-label">
                      Start Date <span className="svem-req-star">*</span>
                    </label>
                    <div className="svem-date-input-wrap">
                      <input
                        id="bookingStartDate"
                        type="date"
                        className="svem-date-picker-input"
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
                  </div>

                  <div className="svem-form-field">
                    <label htmlFor="bookingEndDate" className="svem-field-label">
                      End Date <span className="svem-req-star">*</span>
                    </label>
                    <div className="svem-date-input-wrap">
                      <input
                        id="bookingEndDate"
                        type="date"
                        className="svem-date-picker-input"
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
                </div>

                {/* Section 2 Grid: Single Calendar on Left, Duration Cards on Right */}
                <div className="svem-section2-body-grid">
                  {/* Left: Single Interactive Availability Calendar */}
                  <div className="svem-section2-calendar-box">
                    <AvailabilityCalendar
                      equipmentId={activeEquipment.id}
                      equipmentName={activeEquipment.name}
                      bookings={bookings}
                      startDate={startDate}
                      endDate={endDate}
                      onSelectDateRange={handleSelectDateRange}
                      onUnavailableDateSelected={handleUnavailableDateSelected}
                    />
                  </div>

                  {/* Right: Rental Duration Cards */}
                  <div className="svem-section2-duration-col">
                    <h3 className="svem-duration-group-title">Rental Duration</h3>

                    <div className="svem-duration-cards-list">
                      {/* Hourly */}
                      <div
                        className={`svem-duration-card ${
                          rentalDurationType === 'Hourly' ? 'svem-duration-card-active' : ''
                        }`}
                        onClick={() => setRentalDurationType('Hourly')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            setRentalDurationType('Hourly');
                        }}
                      >
                        <div className="svem-duration-card-icon-wrap">
                          <Clock size={20} />
                        </div>
                        <div className="svem-duration-card-info">
                          <span className="svem-duration-name">Hourly</span>
                          <span className="svem-duration-desc">Suitable for short work</span>
                        </div>
                        <div className="svem-duration-radio">
                          <div
                            className={`svem-radio-circle ${
                              rentalDurationType === 'Hourly' ? 'svem-radio-circle-checked' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Daily */}
                      <div
                        className={`svem-duration-card ${
                          rentalDurationType === 'Daily' ? 'svem-duration-card-active' : ''
                        }`}
                        onClick={() => setRentalDurationType('Daily')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            setRentalDurationType('Daily');
                        }}
                      >
                        <div className="svem-duration-card-icon-wrap">
                          <Sun size={20} />
                        </div>
                        <div className="svem-duration-card-info">
                          <div className="svem-duration-tag-row">
                            <span className="svem-duration-name">Daily</span>
                            <span className="svem-popular-badge">Most popular</span>
                          </div>
                          <span className="svem-duration-desc">Standard 8-hour shift</span>
                        </div>
                        <div className="svem-duration-radio">
                          <div
                            className={`svem-radio-circle ${
                              rentalDurationType === 'Daily' ? 'svem-radio-circle-checked' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Weekly */}
                      <div
                        className={`svem-duration-card ${
                          rentalDurationType === 'Weekly' ? 'svem-duration-card-active' : ''
                        }`}
                        onClick={() => setRentalDurationType('Weekly')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            setRentalDurationType('Weekly');
                        }}
                      >
                        <div className="svem-duration-card-icon-wrap">
                          <CalendarRange size={20} />
                        </div>
                        <div className="svem-duration-card-info">
                          <span className="svem-duration-name">Weekly</span>
                          <span className="svem-duration-desc">Cost effective for long work</span>
                        </div>
                        <div className="svem-duration-radio">
                          <div
                            className={`svem-radio-circle ${
                              rentalDurationType === 'Weekly' ? 'svem-radio-circle-checked' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Project Based */}
                      <div
                        className={`svem-duration-card ${
                          rentalDurationType === 'Project Based'
                            ? 'svem-duration-card-active'
                            : ''
                        }`}
                        onClick={() => setRentalDurationType('Project Based')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            setRentalDurationType('Project Based');
                        }}
                      >
                        <div className="svem-duration-card-icon-wrap">
                          <Layers size={20} />
                        </div>
                        <div className="svem-duration-card-info">
                          <span className="svem-duration-name">Project Based</span>
                          <span className="svem-duration-desc">Flexible turnkey contract</span>
                        </div>
                        <div className="svem-duration-radio">
                          <div
                            className={`svem-radio-circle ${
                              rentalDurationType === 'Project Based'
                                ? 'svem-radio-circle-checked'
                                : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ---------------------------------------------------------- */}
              {/* SECTION 3: Project & Location Details */}
              {/* ---------------------------------------------------------- */}
              <section id="section-project-details" className="svem-booking-card-section">
                <div className="svem-section-title-bar">
                  <span className="svem-section-accent-bar" />
                  <h2 className="svem-card-section-title">3. Project &amp; Location Details</h2>
                </div>

                <div className="svem-form-row-3">
                  <div className="svem-form-field">
                    <label htmlFor="projectTypeSelect" className="svem-field-label">
                      Project Type <span className="svem-req-star">*</span>
                    </label>
                    <select
                      id="projectTypeSelect"
                      className="svem-form-dropdown"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      required
                    >
                      <option value="Earth Excavation">Earth Excavation</option>
                      <option value="Earth Filling">Earth Filling &amp; Leveling</option>
                      <option value="Road Construction">Road Construction &amp; Compaction</option>
                      <option value="Land Development">Layout Land Development</option>
                      <option value="Demolition">Building Demolition</option>
                      <option value="Pipeline & Drainage">Pipeline &amp; Drainage</option>
                      <option value="Other Heavy Earthwork">Other Heavy Earthwork</option>
                    </select>
                  </div>

                  <div className="svem-form-field">
                    <label htmlFor="projectLocationInput" className="svem-field-label">
                      Project Location <span className="svem-req-star">*</span>
                    </label>
                    <input
                      id="projectLocationInput"
                      type="text"
                      className="svem-form-text-input"
                      placeholder="Enter project location (City, Area)"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="svem-form-field">
                    <label htmlFor="workingHoursSelect" className="svem-field-label">
                      Working Hours (per day)
                    </label>
                    <select
                      id="workingHoursSelect"
                      className="svem-form-dropdown"
                      value={workingHours}
                      onChange={(e) => setWorkingHours(e.target.value)}
                    >
                      <option value="8 Hours (Standard Shift)">8 Hours (Standard Shift)</option>
                      <option value="10 Hours (Extended Shift)">10 Hours (Extended Shift)</option>
                      <option value="12 Hours (High Productivity)">12 Hours (High Productivity)</option>
                      <option value="24 Hours (Double Shift)">24 Hours (Double Shift)</option>
                    </select>
                  </div>
                </div>

                <div className="svem-form-row-2">
                  <div className="svem-form-field">
                    <label htmlFor="siteAddressInput" className="svem-field-label">
                      Site Address
                    </label>
                    <textarea
                      id="siteAddressInput"
                      className="svem-form-textarea"
                      rows={3}
                      placeholder="Enter complete site address"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                    />
                  </div>

                  <div className="svem-form-field">
                    <label htmlFor="additionalRequirementsInput" className="svem-field-label">
                      Additional Requirements
                    </label>
                    <textarea
                      id="additionalRequirementsInput"
                      className="svem-form-textarea"
                      rows={3}
                      placeholder="Any special requirements or notes (e.g., hard rock breaker, operator food/stay, transport)..."
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* ---------------------------------------------------------- */}
              {/* SECTION 4: Your Details */}
              {/* ---------------------------------------------------------- */}
              <section id="section-customer-details" className="svem-booking-card-section">
                <div className="svem-section-title-bar">
                  <span className="svem-section-accent-bar" />
                  <h2 className="svem-card-section-title">4. Your Details</h2>
                </div>

                <div className="svem-form-row-3">
                  <div className="svem-form-field">
                    <label htmlFor="custFullName" className="svem-field-label">
                      Full Name <span className="svem-req-star">*</span>
                    </label>
                    <input
                      id="custFullName"
                      type="text"
                      className="svem-form-text-input"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="svem-form-field">
                    <label htmlFor="custPhone" className="svem-field-label">
                      Phone Number <span className="svem-req-star">*</span>
                    </label>
                    <input
                      id="custPhone"
                      type="tel"
                      className="svem-form-text-input"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="svem-form-field">
                    <label htmlFor="custEmail" className="svem-field-label">
                      Email (Optional)
                    </label>
                    <input
                      id="custEmail"
                      type="email"
                      className="svem-form-text-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="svem-form-field svem-field-full">
                  <label htmlFor="custMessage" className="svem-field-label">
                    Message (Optional)
                  </label>
                  <textarea
                    id="custMessage"
                    className="svem-form-textarea"
                    rows={3}
                    placeholder="Additional message or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Terms agreement checkbox */}
                <div className="svem-terms-checkbox-wrap">
                  <label className="svem-checkbox-label">
                    <input
                      type="checkbox"
                      className="svem-checkbox-input"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      required
                    />
                    <span className="svem-checkbox-text">
                      I agree to the terms and conditions and consent to be contacted regarding this booking.
                    </span>
                  </label>
                </div>

                {/* Form Error Banner */}
                {formError && (
                  <div className="svem-form-error-banner" role="alert">
                    <AlertCircle size={18} />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Big Submit Button */}
                <div className="svem-submit-btn-row">
                  <button
                    type="submit"
                    className={`svem-btn-booking-submit-big ${
                      !isAvailable ? 'svem-btn-disabled' : ''
                    }`}
                    disabled={!isAvailable}
                  >
                    <span>Check Availability &amp; Submit Booking Request</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </section>
            </form>
          </div>

          {/* ============================================================== */}
          {/* Right Column: Sticky Sidebar matching reference template */}
          {/* ============================================================== */}
          <aside className="svem-booking-sidebar-column" aria-label="Booking Summary Sidebar">
            <div className="svem-sidebar-sticky-wrap">
              {/* Card 1: Selected Equipment */}
              <div className="svem-sidebar-card">
                <div className="svem-sidebar-card-header-row">
                  <h3 className="svem-sidebar-card-title">Selected Equipment</h3>
                  <button
                    type="button"
                    className="svem-link-change-eq"
                    onClick={() => {
                      const el = document.getElementById('section-select-equipment');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Change Equipment
                  </button>
                </div>

                <div className="svem-sidebar-eq-preview">
                  <img
                    src={activeEquipment.image}
                    alt={activeEquipment.name}
                    className="svem-sidebar-eq-img"
                  />
                  <div className="svem-sidebar-eq-meta">
                    <h4 className="svem-sidebar-eq-name">{activeEquipment.name}</h4>
                    <span className="svem-sidebar-eq-type">{activeEquipment.type}</span>
                  </div>
                </div>

                <div className="svem-sidebar-specs-list">
                  <div className="svem-sidebar-spec-row">
                    <span className="svem-spec-label">
                      <Truck size={14} className="svem-spec-icon" /> Category
                    </span>
                    <span className="svem-spec-value">: {activeEquipment.category}</span>
                  </div>
                  <div className="svem-sidebar-spec-row">
                    <span className="svem-spec-label">
                      <Wrench size={14} className="svem-spec-icon" /> Model
                    </span>
                    <span className="svem-spec-value">: {activeEquipment.model}</span>
                  </div>
                  <div className="svem-sidebar-spec-row">
                    <span className="svem-spec-label">
                      <Fuel size={14} className="svem-spec-icon" /> Fuel
                    </span>
                    <span className="svem-spec-value">: Diesel</span>
                  </div>
                  <div className="svem-sidebar-spec-row">
                    <span className="svem-spec-label">
                      <Layers size={14} className="svem-spec-icon" /> Suitable For
                    </span>
                    <span className="svem-spec-value">
                      : {activeEquipment.applications.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="svem-sidebar-view-details-btn"
                  onClick={() => onViewEquipmentDetails(activeEquipment)}
                >
                  <span>View Full Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Card 2: Availability Status */}
              <div className="svem-sidebar-card svem-sidebar-card-status">
                <h3 className="svem-sidebar-card-title svem-title-with-icon">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Availability Status</span>
                </h3>

                {isAvailable ? (
                  <div className="svem-status-banner svem-status-banner-available">
                    <div className="svem-status-banner-header">
                      <CheckCircle2 size={18} className="svem-banner-icon" />
                      <span className="svem-banner-title">Selected dates are available!</span>
                    </div>
                    <p className="svem-banner-dates">
                      {formatDateDisplay(startDate)} to {formatDateDisplay(endDate || startDate)} ({totalDays} days)
                    </p>
                    <p className="svem-banner-hint">You can proceed with your booking request.</p>
                  </div>
                ) : (
                  <div className="svem-status-banner svem-status-banner-unavailable">
                    <div className="svem-status-banner-header">
                      <XCircle size={18} className="svem-banner-icon" />
                      <span className="svem-banner-title">Not Available</span>
                    </div>
                    <p className="svem-banner-hint">
                      This equipment is already booked on the selected date. Please choose another date.
                    </p>
                  </div>
                )}
              </div>

              {/* Card 3: Booking Summary (Estimated) */}
              <div className="svem-sidebar-card svem-sidebar-summary-card">
                <h3 className="svem-sidebar-card-title svem-title-with-icon">
                  <FileText size={16} className="text-amber-600" />
                  <span>Booking Summary (Estimated)</span>
                </h3>

                <div className="svem-summary-items-list">
                  <div className="svem-summary-row">
                    <span className="svem-sum-label">Equipment</span>
                    <span className="svem-sum-val">: {activeEquipment.name}</span>
                  </div>
                  <div className="svem-summary-row">
                    <span className="svem-sum-label">Rental Type</span>
                    <span className="svem-sum-val">: {rentalDurationType}</span>
                  </div>
                  <div className="svem-summary-row">
                    <span className="svem-sum-label">Start Date</span>
                    <span className="svem-sum-val">: {formatDateDisplay(startDate)}</span>
                  </div>
                  <div className="svem-summary-row">
                    <span className="svem-sum-label">End Date</span>
                    <span className="svem-sum-val">: {formatDateDisplay(endDate || startDate)}</span>
                  </div>
                  <div className="svem-summary-row">
                    <span className="svem-sum-label">Total Duration</span>
                    <span className="svem-sum-val">: {totalDays} Day{totalDays > 1 ? 's' : ''}</span>
                  </div>
                  <div className="svem-summary-row">
                    <span className="svem-sum-label">Status</span>
                    <span className="svem-sum-val svem-sum-status-val">
                      : <span className="svem-status-dot-inline" /> {isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>
                </div>

                {/* INVARIANT: ZERO MONETARY AMOUNTS - TARIFF ON REQUEST */}
                <div className="svem-summary-tariff-notice">
                  <Info size={16} className="svem-notice-icon" />
                  <p className="svem-notice-text">
                    Actual rental price will be confirmed by the owner based on your requirements.
                  </p>
                </div>
              </div>

              {/* Card 4: Quick Contact Options */}
              <div className="svem-sidebar-card svem-sidebar-contact-card">
                <h3 className="svem-sidebar-card-title svem-title-with-icon">
                  <Settings size={16} className="text-amber-600" />
                  <span>Quick Contact Options</span>
                </h3>

                <div className="svem-sidebar-contact-actions">
                  <a
                    href={currentWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="svem-btn-sidebar-wa"
                  >
                    <MessageSquare size={16} />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a href={getCallUrl()} className="svem-btn-sidebar-call">
                    <Phone size={16} />
                    <span>Call Owner Now</span>
                  </a>

                  <button
                    type="button"
                    className="svem-btn-sidebar-quote"
                    onClick={() => {
                      const el = document.getElementById('custFullName');
                      el?.focus();
                    }}
                  >
                    <FileText size={16} />
                    <span>Request a Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Bottom Activity & Features Row (3 Cards) matching reference image */}
        {/* ------------------------------------------------------------------ */}
        <div className="svem-booking-bottom-cards-grid">
          {/* Card 1: Recent Bookings (Example) */}
          <div className="svem-bottom-card">
            <div className="svem-bottom-card-header">
              <Clock size={20} className="svem-bottom-card-icon" />
              <h3 className="svem-bottom-card-title">Recent Bookings (Example)</h3>
            </div>
            <div className="svem-recent-bookings-list">
              <div className="svem-recent-item">
                <span className="svem-recent-name">Excavator - Oct 10 to Oct 14</span>
                <span className="svem-recent-badge svem-badge-booked">Booked</span>
              </div>
              <div className="svem-recent-item">
                <span className="svem-recent-name">JCB 3DX - Oct 12 to Oct 15</span>
                <span className="svem-recent-badge svem-badge-booked">Booked</span>
              </div>
              <div className="svem-recent-item">
                <span className="svem-recent-name">Tipper Lorry - Oct 18 to Oct 20</span>
                <span className="svem-recent-badge svem-badge-booked">Booked</span>
              </div>
              <div className="svem-recent-item">
                <span className="svem-recent-name">Tractor - Oct 22 to Oct 25</span>
                <span className="svem-recent-badge svem-badge-avail">Available</span>
              </div>
            </div>
          </div>

          {/* Card 2: Advanced Booking Features */}
          <div className="svem-bottom-card">
            <div className="svem-bottom-card-header">
              <Settings size={20} className="svem-bottom-card-icon" />
              <h3 className="svem-bottom-card-title">Advanced Booking Features</h3>
            </div>
            <ul className="svem-adv-features-list">
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Real-time availability check</span>
              </li>
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Date range validation</span>
              </li>
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Prevent double booking</span>
              </li>
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Flexible rental duration (hourly/daily/weekly)</span>
              </li>
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Multiple project location management</span>
              </li>
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Easy contact with owner</span>
              </li>
              <li>
                <Check size={16} className="svem-adv-check" />
                <span>Booking history and tracking (for future)</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Need Help? */}
          <div className="svem-bottom-card svem-help-card">
            <div className="svem-bottom-card-header">
              <Headphones size={20} className="svem-bottom-card-icon" />
              <h3 className="svem-bottom-card-title">Need Help?</h3>
            </div>
            <p className="svem-help-desc">
              If you have any questions or need assistance in choosing the right equipment, feel free to contact us. We are here to help!
            </p>
            <div className="svem-help-btns-row">
              <a href={getCallUrl()} className="svem-btn-help-call">
                <Phone size={16} />
                <span>Call Now</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="svem-btn-help-wa"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA Banner matching reference template */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-cta-banner">
        <div className="svem-container">
          <div className="svem-cta-banner-inner">
            <div className="svem-cta-banner-left">
              <div className="svem-cta-banner-icon-box">
                <Phone size={24} />
              </div>
              <div className="svem-cta-banner-text">
                <h3 className="svem-cta-banner-heading">Need Equipment for Your Next Project?</h3>
                <p className="svem-cta-banner-sub">Contact us now for the best rental solutions.</p>
              </div>
            </div>

            <div className="svem-cta-banner-actions">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="svem-btn-banner-wa"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Us</span>
              </a>

              <a href={getCallUrl()} className="svem-btn-banner-call">
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
