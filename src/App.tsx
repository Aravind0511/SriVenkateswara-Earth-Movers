import { useState } from 'react';
import { EQUIPMENT_LIST } from './data/equipmentData';
import { INITIAL_BOOKINGS } from './data/initialBookings';
import type { EquipmentItem, Booking, ServiceItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EquipmentSection } from './components/EquipmentSection';
import { EquipmentModal } from './components/EquipmentModal';
import { BookingSection } from './components/BookingSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkAndReviewsSection } from './components/WorkAndReviewsSection';
import { ContactSection } from './components/ContactSection';
import { FooterCTA } from './components/FooterCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';

export function App() {
  const [equipmentList] = useState<EquipmentItem[]>(EQUIPMENT_LIST);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('jcb-3dx');

  // Modal States
  const [activeEquipmentModal, setActiveEquipmentModal] = useState<EquipmentItem | null>(null);
  const [activeBookingConfirmation, setActiveBookingConfirmation] = useState<Booking | null>(null);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEquipment = () => {
    const el = document.getElementById('equipment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = (item: EquipmentItem) => {
    setSelectedEquipmentId(item.id);
    scrollToBooking();
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleBookingSuccess = (booking: Booking) => {
    setActiveBookingConfirmation(booking);
  };

  const handleSelectService = (service: ServiceItem) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-select service in form
      const selectElem = document.getElementById('enquiryService') as HTMLSelectElement;
      if (selectElem) {
        selectElem.value = service.title;
      }
    }
  };

  return (
    <div className="svem-app">
      {/* Sticky Header with Navigation */}
      <Header onOpenBooking={scrollToBooking} />

      {/* Main Content */}
      <main>
        {/* Full-width Hero Section inspired by Reference Mockup */}
        <Hero
          onViewEquipment={scrollToEquipment}
          onBookNow={scrollToBooking}
        />

        {/* Equipment Catalogue Section */}
        <EquipmentSection
          equipmentList={equipmentList}
          onViewDetails={(item) => setActiveEquipmentModal(item)}
          onBookNow={handleBookNow}
        />

        {/* Core Booking Section with Interactive Availability Calendar & Why Choose Us */}
        <BookingSection
          equipmentList={equipmentList}
          selectedEquipmentId={selectedEquipmentId}
          onSelectEquipmentId={setSelectedEquipmentId}
          bookings={bookings}
          onAddBooking={handleAddBooking}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 5 Core Earth-Moving Services */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Worksite Gallery & Customer Reviews Side-by-Side */}
        <WorkAndReviewsSection />

        {/* Contact Yard Details & Message Form */}
        <ContactSection />

        {/* Dark Footer Action Bar */}
        <FooterCTA onOpenBooking={scrollToBooking} />
      </main>

      {/* Complete Footer */}
      <Footer />

      {/* Floating Bottom-Right WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Dedicated Equipment Details Modal */}
      <EquipmentModal
        equipment={activeEquipmentModal}
        onClose={() => setActiveEquipmentModal(null)}
        onBookNow={handleBookNow}
      />

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        booking={activeBookingConfirmation}
        onClose={() => setActiveBookingConfirmation(null)}
      />
    </div>
  );
}

export default App;
