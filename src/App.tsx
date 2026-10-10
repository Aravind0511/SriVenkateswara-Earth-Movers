import { useState, useEffect } from 'react';
import { EQUIPMENT_LIST } from './data/equipmentData';
import { INITIAL_BOOKINGS } from './data/initialBookings';
import type { EquipmentItem, Booking, ServiceItem, AppPage } from './types';
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
import { AboutPage } from './components/AboutPage';
import { EquipmentPage } from './components/EquipmentPage';
import { ServicesPage } from './components/ServicesPage';
import { GalleryPage } from './components/GalleryPage';
import { BookingPage } from './components/BookingPage';
import { ContactPage } from './components/ContactPage';
import { parseRoute } from './utils/routeUtils';

export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== 'undefined') {
      return parseRoute(window.location.hash);
    }
    return 'home';
  });

  const [equipmentList] = useState<EquipmentItem[]>(EQUIPMENT_LIST);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/[?&](?:equipment|eq)=([^&]+)/);
      if (match) {
        const found = EQUIPMENT_LIST.find((e) => e.id === match[1]);
        if (found) return found.id;
      }
    }
    return 'jcb-3dx';
  });

  // Modal States
  const [activeEquipmentModal, setActiveEquipmentModal] = useState<EquipmentItem | null>(null);
  const [activeBookingConfirmation, setActiveBookingConfirmation] = useState<Booking | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const page = parseRoute(window.location.hash);
      setCurrentPage(page);

      const match = window.location.hash.match(/[?&](?:equipment|eq)=([^&]+)/);
      if (match) {
        const found = EQUIPMENT_LIST.find((e) => e.id === match[1]);
        if (found) setSelectedEquipmentId(found.id);
      }

      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppPage, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        const scrollTarget = (attempts = 0) => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else if (attempts < 6) {
            setTimeout(() => scrollTarget(attempts + 1), 60);
          }
        };
        requestAnimationFrame(() => scrollTarget());
      } else {
        window.location.hash = '#/';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.hash = `#/${page}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookNow = (item: EquipmentItem) => {
    setSelectedEquipmentId(item.id);
    setActiveEquipmentModal(null);
    navigateTo('booking');
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleBookingSuccess = (booking: Booking) => {
    setActiveBookingConfirmation(booking);
  };

  const handleSelectService = (_service: ServiceItem) => {
    navigateTo('services');
  };

  return (
    <div className="svem-app">
      {/* Sticky Header with Navigation and Active State across all 7 routes */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenBooking={() => navigateTo('booking')}
      />

      {/* Main Content Router */}
      <main>
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenBooking={() => navigateTo('booking')}
          />
        )}

        {currentPage === 'equipment' && (
          <>
            <EquipmentPage
              equipmentList={equipmentList}
              onBookNow={handleBookNow}
              onViewDetails={(item) => setActiveEquipmentModal(item)}
              onNavigate={navigateTo}
            />
            <Footer onNavigate={navigateTo} />
          </>
        )}

        {currentPage === 'services' && (
          <>
            <ServicesPage
              onNavigate={navigateTo}
              onSelectEquipmentToBook={(eqId) => {
                setSelectedEquipmentId(eqId);
              }}
            />
            <Footer onNavigate={navigateTo} />
          </>
        )}

        {currentPage === 'gallery' && (
          <>
            <GalleryPage onNavigate={navigateTo} />
            <Footer onNavigate={navigateTo} />
          </>
        )}

        {currentPage === 'booking' && (
          <>
            <BookingPage
              equipmentList={equipmentList}
              selectedEquipmentId={selectedEquipmentId}
              onSelectEquipmentId={setSelectedEquipmentId}
              bookings={bookings}
              onAddBooking={handleAddBooking}
              onBookingSuccess={handleBookingSuccess}
              onViewEquipmentDetails={(item) => setActiveEquipmentModal(item)}
              onNavigate={navigateTo}
            />
            <Footer onNavigate={navigateTo} />
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <ContactPage onNavigate={navigateTo} />
            <Footer onNavigate={navigateTo} />
          </>
        )}

        {currentPage === 'home' && (
          <>
            {/* Full-width Hero Section */}
            <Hero
              onViewEquipment={() => navigateTo('equipment')}
              onBookNow={() => navigateTo('booking')}
            />

            {/* Equipment Catalogue Section */}
            <EquipmentSection
              equipmentList={equipmentList}
              onViewDetails={(item) => setActiveEquipmentModal(item)}
              onBookNow={handleBookNow}
              onViewAll={() => navigateTo('equipment')}
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
            <FooterCTA onOpenBooking={() => navigateTo('booking')} />

            {/* Complete Home Footer */}
            <Footer onNavigate={navigateTo} />
          </>
        )}
      </main>

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
