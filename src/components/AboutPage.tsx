import React from 'react';
import {
  ArrowRight,
  Calendar,
  Settings,
  Users,
  Headphones,
  ShieldCheck,
  Wrench,
  FileText,
  Target,
  Check,
  Search,
  CheckCircle2,
  Truck,
  ChevronRight,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
} from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO, getCallUrl, getWhatsAppUrl } from '../config/businessInfo';
import './AboutPage.css';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about', sectionId?: string) => void;
  onOpenBooking: () => void;
}

const CURRENT_YEAR = 2026;

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {

  return (
    <div className="about-page">
      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero Section with breadcrumbs, title, subtitle & CTAs */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-hero" aria-label="About Us Hero">
        <div className="svem-container">
          <div className="about-hero-inner">
            {/* Breadcrumb: Home / About Us */}
            <nav className="about-breadcrumb" aria-label="Breadcrumb">
              <span
                role="link"
                tabIndex={0}
                className="about-breadcrumb-link"
                onClick={() => onNavigate('home')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onNavigate('home');
                }}
              >
                Home
              </span>
              <span className="about-breadcrumb-sep">/</span>
              <span className="about-breadcrumb-current">About Us</span>
            </nav>

            {/* Main Hero Headline */}
            <h1 className="about-hero-title">
              About
              <br />
              Sri Venkateshwara
              <span className="about-hero-title-accent">Earth Movers</span>
            </h1>

            {/* Subtitle */}
            <p className="about-hero-subtitle">
              Reliable machinery. Practical solutions. Support for every project.
            </p>

            {/* Action CTA Buttons */}
            <div className="about-hero-actions">
              <button
                type="button"
                className="about-btn-primary"
                onClick={() => onNavigate('home', 'equipment')}
              >
                <span>Explore Our Equipment</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="about-btn-secondary"
                onClick={() => onNavigate('home', 'contact')}
              >
                <Calendar size={18} />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. WHO WE ARE - Supporting Your Work on the Ground */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-who-section" aria-labelledby="who-we-are-heading">
        <div className="svem-container">
          <div className="about-who-grid">
            {/* Left Column: Excavator Digging Photo */}
            <div className="about-who-image-wrap">
              <img
                src="/about/who-we-are.jpg"
                alt="Sri Venkateshwara Heavy Excavator on Construction Site"
                className="about-who-img"
                loading="eager"
              />
            </div>

            {/* Right Column: Narrative & 3 Feature Highlights */}
            <div className="about-who-content">
              <div className="about-eyebrow-row">
                <span className="about-accent-bar" aria-hidden="true" />
                <span className="about-eyebrow-text">WHO WE ARE</span>
              </div>

              <h2 id="who-we-are-heading" className="about-section-heading">
                Supporting Your Work on the Ground
              </h2>

              <p className="about-who-desc">
                Sri Venkateshwara Earth Movers provides earth-moving equipment rental and
                support for construction, excavation, road work and land development
                projects.
              </p>
              <p className="about-who-desc" style={{ marginTop: '0.65rem' }}>
                We aim to make it easy for our customers to get the right machinery for
                their project with clear communication, flexible rental options and reliable
                service.
              </p>

              {/* 3 Core Points */}
              <div className="about-who-features">
                {/* 1. Reliable Equipment */}
                <div className="about-who-feature-item">
                  <div className="about-feature-icon-badge" aria-hidden="true">
                    <Settings size={22} />
                  </div>
                  <div className="about-feature-info">
                    <h3 className="about-feature-title">Reliable Equipment</h3>
                    <p className="about-feature-desc">
                      Well-maintained machinery suited for different project needs.
                    </p>
                  </div>
                </div>

                {/* 2. Clear Communication */}
                <div className="about-who-feature-item">
                  <div className="about-feature-icon-badge" aria-hidden="true">
                    <Users size={22} />
                  </div>
                  <div className="about-feature-info">
                    <h3 className="about-feature-title">Clear Communication</h3>
                    <p className="about-feature-desc">
                      Quick response and transparent coordination.
                    </p>
                  </div>
                </div>

                {/* 3. Project-Focused Support */}
                <div className="about-who-feature-item">
                  <div className="about-feature-icon-badge" aria-hidden="true">
                    <Headphones size={22} />
                  </div>
                  <div className="about-feature-info">
                    <h3 className="about-feature-title">Project-Focused Support</h3>
                    <p className="about-feature-desc">
                      Helping you find the right equipment for your specific requirement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. 4-Point Dark Badge Bar */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-dark-bar-wrap" aria-label="Trust Highlights">
        <div className="svem-container">
          <div className="about-dark-bar">
            {/* Item 1: Safety-Minded Work */}
            <div className="about-dark-item">
              <ShieldCheck size={26} className="about-dark-icon" />
              <div className="about-dark-text-block">
                <span className="about-dark-title">Safety-Minded Work</span>
                <span className="about-dark-sub">Focus on safe and efficient operations.</span>
              </div>
            </div>

            {/* Item 2: Well-Maintained Machinery */}
            <div className="about-dark-item">
              <Wrench size={26} className="about-dark-icon" />
              <div className="about-dark-text-block">
                <span className="about-dark-title">Well-Maintained Machinery</span>
                <span className="about-dark-sub">Regularly serviced for better performance.</span>
              </div>
            </div>

            {/* Item 3: Flexible Rental Enquiries */}
            <div className="about-dark-item">
              <FileText size={26} className="about-dark-icon" />
              <div className="about-dark-text-block">
                <span className="about-dark-title">Flexible Rental Enquiries</span>
                <span className="about-dark-sub">Hourly, daily or project-based rental options.</span>
              </div>
            </div>

            {/* Item 4: Responsive Support */}
            <div className="about-dark-item">
              <Headphones size={26} className="about-dark-icon" />
              <div className="about-dark-text-block">
                <span className="about-dark-title">Responsive Support</span>
                <span className="about-dark-sub">Quick communication and assistance.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Side-by-side highlight cards ("Our Mission" and "Our Approach") */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-highlights-wrap" aria-label="Our Mission and Approach">
        <div className="svem-container">
          <div className="about-highlights-grid">
            {/* Card 1: Our Mission */}
            <div className="about-highlight-card">
              <div className="about-highlight-icon-badge" aria-hidden="true">
                <Target size={28} />
              </div>
              <div className="about-highlight-content">
                <h3 className="about-highlight-title">Our Mission</h3>
                <p className="about-highlight-text">
                  To provide reliable earth-moving equipment and support that helps our
                  customers complete their construction, excavation and land development
                  projects efficiently.
                </p>
              </div>
            </div>

            {/* Card 2: Our Approach */}
            <div className="about-highlight-card">
              <div className="about-highlight-icon-badge" aria-hidden="true">
                <Users size={28} />
              </div>
              <div className="about-highlight-content">
                <h3 className="about-highlight-title">Our Approach</h3>
                <p className="about-highlight-text">
                  We focus on understanding your project requirements, providing suitable
                  machinery and ensuring a smooth rental experience with clear coordination
                  and dedicated support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. What We Support (4 Photo Cards) */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-services-section" aria-labelledby="what-we-support-heading">
        <div className="svem-container">
          <div className="about-services-header">
            <div className="about-eyebrow-row">
              <span className="about-accent-bar" aria-hidden="true" />
              <h2 id="what-we-support-heading" className="about-section-heading">
                What We Support
              </h2>
            </div>
            <p className="about-section-subheading">
              Wide range of services with the right equipment for your project.
            </p>
          </div>

          <div className="about-services-grid">
            {/* Card 1: Earth Excavation */}
            <div
              className="about-service-card"
              onClick={() => onNavigate('home', 'services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('home', 'services');
              }}
            >
              <div className="about-service-img-wrap">
                <img
                  src="/about/earth-excavation.jpg"
                  alt="Earth Excavation Work"
                  className="about-service-img"
                  loading="lazy"
                />
              </div>
              <div className="about-service-body">
                <h3 className="about-service-card-title">Earth Excavation</h3>
                <p className="about-service-card-desc">
                  Excavation for building construction, pipeline, footing, pits and more.
                </p>
              </div>
            </div>

            {/* Card 2: Earth Filling */}
            <div
              className="about-service-card"
              onClick={() => onNavigate('home', 'services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('home', 'services');
              }}
            >
              <div className="about-service-img-wrap">
                <img
                  src="/about/earth-filling.jpg"
                  alt="Earth Filling Work"
                  className="about-service-img"
                  loading="lazy"
                />
              </div>
              <div className="about-service-body">
                <h3 className="about-service-card-title">Earth Filling</h3>
                <p className="about-service-card-desc">
                  Mass earth filling and site development work.
                </p>
              </div>
            </div>

            {/* Card 3: Road Work */}
            <div
              className="about-service-card"
              onClick={() => onNavigate('home', 'services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('home', 'services');
              }}
            >
              <div className="about-service-img-wrap">
                <img
                  src="/about/road-work.jpg"
                  alt="Road Construction Work"
                  className="about-service-img"
                  loading="lazy"
                />
              </div>
              <div className="about-service-body">
                <h3 className="about-service-card-title">Road Work</h3>
                <p className="about-service-card-desc">
                  All types of road construction and related work.
                </p>
              </div>
            </div>

            {/* Card 4: Land Development */}
            <div
              className="about-service-card"
              onClick={() => onNavigate('home', 'services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('home', 'services');
              }}
            >
              <div className="about-service-img-wrap">
                <img
                  src="/about/land-development.jpg"
                  alt="Land Development Work"
                  className="about-service-img"
                  loading="lazy"
                />
              </div>
              <div className="about-service-body">
                <h3 className="about-service-card-title">Land Development</h3>
                <p className="about-service-card-desc">
                  Site leveling, land preparation and development support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Built Around Your Project Needs Section */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-needs-section" aria-labelledby="project-needs-heading">
        <div className="svem-container">
          <div className="about-needs-grid">
            {/* Left Column: Mountain Excavator Panoramic Banner */}
            <div className="about-needs-img-wrap">
              <img
                src="/about/project-needs.jpg"
                alt="Excavator at project landscape"
                className="about-needs-img"
                loading="lazy"
              />
            </div>

            {/* Right Column: Title, Description, Checklist & CTA */}
            <div className="about-needs-content">
              <div className="about-eyebrow-row">
                <span className="about-accent-bar" aria-hidden="true" />
                <h2 id="project-needs-heading" className="about-section-heading">
                  Built Around Your Project Needs
                </h2>
              </div>

              <p className="about-needs-desc">
                We provide earth-moving equipment on rental to support a variety of
                construction and development projects. Our focus is to make the equipment
                rental process simple, reliable and convenient for our customers.
              </p>

              {/* 3 Checklist Items */}
              <div className="about-checklist">
                <div className="about-checklist-item">
                  <span className="about-check-badge">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>Equipment suited to the job</span>
                </div>

                <div className="about-checklist-item">
                  <span className="about-check-badge">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>Easy booking enquiry</span>
                </div>

                <div className="about-checklist-item">
                  <span className="about-check-badge">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>Direct contact with our team</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="about-needs-cta-wrap">
                <button
                  type="button"
                  className="about-btn-primary"
                  onClick={onOpenBooking}
                >
                  <span>Book Equipment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. A Simple Way to Get Started (4-Step Process) */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-process-section" aria-labelledby="get-started-heading">
        <div className="svem-container">
          <div className="about-process-header">
            <div className="about-eyebrow-row">
              <span className="about-accent-bar" aria-hidden="true" />
              <h2 id="get-started-heading" className="about-section-heading">
                A Simple Way to Get Started
              </h2>
            </div>
            <p className="about-section-subheading">
              Follow these steps to book the equipment your project.
            </p>
          </div>

          <div className="about-process-row">
            {/* Step 1 */}
            <div className="about-step-card">
              <div className="about-step-circle-badge" aria-hidden="true">
                <Search size={22} />
              </div>
              <div className="about-step-info">
                <span className="about-step-name">1. Tell Us What You Need</span>
                <span className="about-step-hint">Share your project requirements.</span>
              </div>
            </div>

            <ChevronRight size={20} className="about-step-chevron" aria-hidden="true" />

            {/* Step 2 */}
            <div className="about-step-card">
              <div className="about-step-circle-badge" aria-hidden="true">
                <Calendar size={22} />
              </div>
              <div className="about-step-info">
                <span className="about-step-name">2. Choose Equipment &amp; Dates</span>
                <span className="about-step-hint">Select the equipment and preferred dates.</span>
              </div>
            </div>

            <ChevronRight size={20} className="about-step-chevron" aria-hidden="true" />

            {/* Step 3 */}
            <div className="about-step-card">
              <div className="about-step-circle-badge" aria-hidden="true">
                <CheckCircle2 size={22} />
              </div>
              <div className="about-step-info">
                <span className="about-step-name">3. Confirm Availability</span>
                <span className="about-step-hint">We will check and confirm the availability.</span>
              </div>
            </div>

            <ChevronRight size={20} className="about-step-chevron" aria-hidden="true" />

            {/* Step 4 */}
            <div className="about-step-card">
              <div className="about-step-circle-badge" aria-hidden="true">
                <Truck size={22} />
              </div>
              <div className="about-step-info">
                <span className="about-step-name">4. Coordinate Your Rental</span>
                <span className="about-step-hint">Get the equipment on time for your project.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. Dark CTA Banner ("Have a Project Coming Up?") */}
      {/* ------------------------------------------------------------------ */}
      <section className="about-cta-banner-wrap" aria-label="Project Consultation CTA">
        <div className="svem-container">
          <div className="about-cta-banner">
            {/* Left side: Icon + Text */}
            <div className="about-cta-left">
              <div className="about-cta-icon-box" aria-hidden="true">
                <Phone size={24} />
              </div>
              <div className="about-cta-text-block">
                <h3 className="about-cta-title">Have a Project Coming Up?</h3>
                <p className="about-cta-desc">
                  Let&apos;s discuss the equipment and rental period you need.
                </p>
              </div>
            </div>

            {/* Right side: WhatsApp & Call Buttons */}
            <div className="about-cta-buttons">
              <a
                href={getWhatsAppUrl(
                  "Hello Sri Venkateshwara Earth Movers, I have an upcoming construction project and would like to discuss equipment availability and rental rates."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn-wa"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Us</span>
              </a>

              <a href={getCallUrl()} className="about-btn-call">
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. Complete Footer matching the design template */}
      {/* ------------------------------------------------------------------ */}
      <footer className="about-footer">
        <div className="svem-container">
          <div className="about-footer-top">
            <div className="about-footer-grid">
              {/* Left Column: Brand Logo */}
              <div className="about-footer-brand">
                <Logo
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                />
              </div>

              {/* Center Column: Quick Navigation Links */}
              <div className="about-footer-nav">
                <ul className="about-footer-nav-list">
                  <li>
                    <span
                      role="link"
                      tabIndex={0}
                      className="about-footer-nav-link"
                      onClick={() => onNavigate('home')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') onNavigate('home');
                      }}
                    >
                      Home
                    </span>
                  </li>
                  <li>
                    <span
                      role="link"
                      tabIndex={0}
                      className="about-footer-nav-link"
                      style={{ color: 'var(--svem-primary-hover)', fontWeight: 700 }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      About Us
                    </span>
                  </li>
                  <li>
                    <span
                      role="link"
                      tabIndex={0}
                      className="about-footer-nav-link"
                      onClick={() => onNavigate('home', 'equipment')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          onNavigate('home', 'equipment');
                      }}
                    >
                      Equipment
                    </span>
                  </li>
                  <li>
                    <span
                      role="link"
                      tabIndex={0}
                      className="about-footer-nav-link"
                      onClick={() => onNavigate('home', 'services')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          onNavigate('home', 'services');
                      }}
                    >
                      Services
                    </span>
                  </li>
                  <li>
                    <span
                      role="link"
                      tabIndex={0}
                      className="about-footer-nav-link"
                      onClick={() => onNavigate('home', 'gallery')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          onNavigate('home', 'gallery');
                      }}
                    >
                      Gallery
                    </span>
                  </li>
                  <li>
                    <span
                      role="link"
                      tabIndex={0}
                      className="about-footer-nav-link"
                      onClick={() => onNavigate('home', 'contact')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          onNavigate('home', 'contact');
                      }}
                    >
                      Contact Us
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Column: Contact Details with Icons */}
              <div className="about-footer-contact-list">
                <div className="about-footer-contact-item">
                  <Phone size={15} className="about-footer-contact-icon" />
                  <a href={getCallUrl()}>{BUSINESS_INFO.phone}</a>
                </div>

                <div className="about-footer-contact-item">
                  <MessageSquare size={15} className="about-footer-contact-icon" />
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {BUSINESS_INFO.whatsapp}
                  </a>
                </div>

                <div className="about-footer-contact-item">
                  <Mail size={15} className="about-footer-contact-icon" />
                  <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
                </div>

                <div className="about-footer-contact-item">
                  <MapPin size={15} className="about-footer-contact-icon" />
                  <span>
                    {BUSINESS_INFO.address.split(',')[0]}, {BUSINESS_INFO.city},{' '}
                    {BUSINESS_INFO.state}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Dark Bottom Bar */}
        <div className="about-footer-bottom">
          <div className="svem-container">
            <div className="about-footer-bottom-inner">
              <p className="about-footer-copy">
                &copy; {CURRENT_YEAR} Sri Venkateshwara Earth Movers. All rights reserved.
              </p>

              <div className="about-footer-legal-links">
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      'Sri Venkateshwara Earth Movers Privacy Notice: Your enquiry information and contact details are kept strictly confidential and used solely for vehicle rental coordination.'
                    );
                  }}
                >
                  Privacy Policy
                </a>
                <span>|</span>
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      'Sri Venkateshwara Earth Movers Terms & Conditions: Machinery rentals require valid verification, standard site security protocols, and agreed hourly/daily operational schedules.'
                    );
                  }}
                >
                  Terms &amp; Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
