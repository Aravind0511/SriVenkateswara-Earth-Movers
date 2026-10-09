import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO, getCallUrl } from '../config/businessInfo';

const CURRENT_YEAR = 2026;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="svem-footer">
      <div className="svem-container">
        <div className="svem-footer-main">
          {/* Col 1: Brand Info */}
          <div className="svem-footer-col svem-footer-col-brand">
            <Logo variant="light" size="lg" />
            <p className="svem-footer-desc">
              Premier earth-moving equipment and heavy construction vehicle rentals in South India. Well-maintained fleet, seasoned operators, and dependable project execution.
            </p>
            <div className="svem-footer-reg-pill">
              <span>Verified Heavy Equipment Fleet Operator</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="svem-footer-col">
            <h4 className="svem-footer-heading">Quick Navigation</h4>
            <ul className="svem-footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#why-choose-us">About Us</a></li>
              <li><a href="#equipment">Our Equipment</a></li>
              <li><a href="#booking">Book Equipment</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Recent Work Gallery</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Fleet Machinery */}
          <div className="svem-footer-col">
            <h4 className="svem-footer-heading">Fleet Machinery</h4>
            <ul className="svem-footer-links">
              <li><a href="#equipment">JCB 3DX Backhoe</a></li>
              <li><a href="#equipment">20T Crawler Excavator</a></li>
              <li><a href="#equipment">16 CBM Heavy Tipper Lorry</a></li>
              <li><a href="#equipment">11-Ton Soil Compactor Roller</a></li>
              <li><a href="#equipment">Heavy Tracked Bulldozer</a></li>
              <li><a href="#equipment">55 HP Utility Tractor Tipper</a></li>
            </ul>
          </div>

          {/* Col 4: Operational Hub */}
          <div className="svem-footer-col">
            <h4 className="svem-footer-heading">Yard Details</h4>
            <div className="svem-footer-contact-items">
              <p className="svem-footer-contact-item">
                <MapPin size={16} className="text-amber-500 shrink-0" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <p className="svem-footer-contact-item">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <a href={getCallUrl()}>{BUSINESS_INFO.phone}</a>
              </p>
              <p className="svem-footer-contact-item">
                <Mail size={16} className="text-amber-500 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
              </p>
              <p className="svem-footer-contact-item">
                <Clock size={16} className="text-amber-500 shrink-0" />
                <span>{BUSINESS_INFO.workingHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="svem-footer-bottom">
          <p className="svem-footer-copy">
            &copy; {CURRENT_YEAR} Sri Venkateshwara Earth Movers. All Rights Reserved.
            <span className="svem-footer-disclaimer">
              [Placeholder website deployment - All rates &amp; contact info subject to final confirmation]
            </span>
          </p>

          <button
            type="button"
            className="svem-btn-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
