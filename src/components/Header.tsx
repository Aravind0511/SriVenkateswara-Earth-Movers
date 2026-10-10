import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO, getCallUrl } from '../config/businessInfo';

interface HeaderProps {
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about', sectionId?: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenBooking,
}) => {
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
    { name: 'Home', href: '#/', page: 'home' as const, sectionId: '' },
    { name: 'About Us', href: '#/about', page: 'about' as const, sectionId: '' },
    { name: 'Equipment', href: '#equipment', page: 'home' as const, sectionId: 'equipment' },
    { name: 'Services', href: '#services', page: 'home' as const, sectionId: 'services' },
    { name: 'Gallery', href: '#gallery', page: 'home' as const, sectionId: 'gallery' },
    { name: 'Contact Us', href: '#contact', page: 'home' as const, sectionId: 'contact' },
  ];

  const handleNavClick = (
    e: React.MouseEvent,
    link: (typeof navLinks)[number]
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (!onNavigate) {
      if (link.sectionId) {
        const el = document.getElementById(link.sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (link.page === 'about') {
      onNavigate('about');
    } else if (link.page === 'home') {
      onNavigate('home', link.sectionId);
    }
  };

  return (
    <header className={`svem-header ${isScrolled ? 'svem-header-scrolled' : ''}`}>
      <div className="svem-header-container">
        {/* Left: Brand Logo & Name */}
        <Logo
          size="md"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) {
              onNavigate('home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />

        {/* Center: Desktop Navigation Links */}
        <nav className="svem-nav-desktop" aria-label="Main Navigation">
          <ul className="svem-nav-list">
            {navLinks.map((link) => {
              const isActive =
                (link.page === 'about' && currentPage === 'about') ||
                (link.name === 'Home' && currentPage === 'home');

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`svem-nav-link ${isActive ? 'svem-nav-link-active' : ''}`}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Phone Action & Get a Quote / Book Now CTA */}
        <div className="svem-header-actions">
          {/* Yellow Phone Icon Button (Exact Template Design) */}
          <a
            href={getCallUrl()}
            className="svem-header-phone-btn"
            title={`Call Owner: ${BUSINESS_INFO.phone}`}
            aria-label={`Call Owner at ${BUSINESS_INFO.phone}`}
          >
            <Phone size={18} />
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
            {navLinks.map((link) => {
              const isActive =
                (link.page === 'about' && currentPage === 'about') ||
                (link.name === 'Home' && currentPage === 'home');

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`svem-mobile-nav-link ${isActive ? 'svem-mobile-nav-link-active' : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.name}
                </a>
              );
            })}
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
