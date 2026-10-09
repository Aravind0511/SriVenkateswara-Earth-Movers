import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO, getCallUrl } from '../config/businessInfo';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#why-choose-us' },
    { name: 'Equipment', href: '#equipment' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className={`svem-header ${isScrolled ? 'svem-header-scrolled' : ''}`}>
      <div className="svem-header-container">
        {/* Left: Brand Logo & Name */}
        <Logo size="md" />

        {/* Center: Desktop Navigation Links */}
        <nav className="svem-nav-desktop" aria-label="Main Navigation">
          <ul className="svem-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="svem-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Phone Action & Get a Quote / Book Now CTA */}
        <div className="svem-header-actions">
          {/* Quick Call Button */}
          <a
            href={getCallUrl()}
            className="svem-btn-call"
            title={`Call Owner: ${BUSINESS_INFO.phone}`}
            aria-label="Call Owner"
          >
            <span className="svem-btn-call-icon">
              <Phone size={16} />
            </span>
            <span className="svem-btn-call-text">{BUSINESS_INFO.phone}</span>
          </a>

          {/* Primary CTA */}
          <button
            type="button"
            className="svem-btn-primary svem-btn-quote"
            onClick={onOpenBooking}
          >
            <span>Get a Quote</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="svem-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`svem-mobile-drawer ${mobileMenuOpen ? 'svem-mobile-drawer-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="svem-mobile-drawer-inner">
          <div className="svem-mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="svem-mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="svem-mobile-drawer-ctas">
            <a
              href={getCallUrl()}
              className="svem-btn-mobile-call"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone size={18} />
              <span>Call Owner ({BUSINESS_INFO.phone})</span>
            </a>

            <button
              type="button"
              className="svem-btn-primary svem-btn-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
            >
              <span>Book Equipment Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
