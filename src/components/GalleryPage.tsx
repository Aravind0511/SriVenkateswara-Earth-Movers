import React, { useState, useMemo } from 'react';
import { Maximize2, MapPin, Filter, Phone, MessageSquare, Calendar } from 'lucide-react';
import type { AppPage } from '../types';
import { GALLERY_ITEMS } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';
import {
  getWhatsAppUrl,
} from '../config/businessInfo';
import './GalleryPage.css';

interface GalleryPageProps {
  onNavigate: (page: AppPage, sectionId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'Excavation', label: 'Deep Excavation' },
    { key: 'Hauling', label: 'Tipper Hauling' },
    { key: 'Backhoe Operations', label: 'JCB Backhoe' },
    { key: 'Road Work', label: 'Road Compaction' },
    { key: 'Land Development', label: 'Land Leveling' },
  ];

  const filteredItems = useMemo(() => {
    if (selectedFilter === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedFilter);
  }, [selectedFilter]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div className="svem-gallery-page">
      {/* ------------------------------------------------------------------ */}
      {/* Hero Section */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-galpage-hero">
        <div className="svem-container">
          <nav className="svem-galpage-breadcrumb" aria-label="Breadcrumb">
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
            <span className="svem-breadcrumb-current">Worksite Gallery</span>
          </nav>

          <h1 className="svem-galpage-hero-title">
            Our Worksite <span className="text-amber-500">Project Gallery</span>
          </h1>
          <p className="svem-galpage-hero-subtitle">
            Take a look inside our real-world construction sites, highway infrastructure projects, and bulk earthworks across Salem, Namakkal, and surrounding districts.
          </p>

          <div className="svem-galpage-hero-stats">
            <div className="svem-stat-chip">
              <span className="svem-stat-val">250+</span>
              <span className="svem-stat-lbl">Projects Completed</span>
            </div>
            <div className="svem-stat-chip">
              <span className="svem-stat-val">15+</span>
              <span className="svem-stat-lbl">Years Fleet Track Record</span>
            </div>
            <div className="svem-stat-chip">
              <span className="svem-stat-val">100%</span>
              <span className="svem-stat-lbl">Real Worksite Captures</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Category Filter Chips */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-galpage-filter-section">
        <div className="svem-container">
          <div className="svem-galpage-filter-bar">
            <div className="svem-galpage-filter-label">
              <Filter size={16} />
              <span>Project Type:</span>
            </div>
            <div className="svem-galpage-chips">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`svem-galpage-chip ${
                    selectedFilter === cat.key ? 'svem-galpage-chip-active' : ''
                  }`}
                  onClick={() => setSelectedFilter(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Gallery Cards Grid */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-galpage-grid-section">
        <div className="svem-container">
          <div className="svem-galpage-cards-grid">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="svem-galpage-card"
                onClick={() => handleOpenLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenLightbox(idx);
                }}
              >
                <div className="svem-galpage-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="svem-galpage-img"
                    loading="lazy"
                  />
                  <div className="svem-galpage-hover-overlay">
                    <span className="svem-galpage-zoom-btn">
                      <Maximize2 size={20} />
                    </span>
                    <span className="svem-galpage-hover-text">Click to Enlarge</span>
                  </div>
                  <span className="svem-galpage-cat-badge">{item.category}</span>
                </div>

                <div className="svem-galpage-card-body">
                  <div className="svem-galpage-location-row">
                    <MapPin size={14} className="text-amber-500" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="svem-galpage-card-title">{item.title}</h3>
                  <p className="svem-galpage-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Interactive Lightbox Modal */}
      {/* ------------------------------------------------------------------ */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA Banner */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-cta-banner svem-mt-4">
        <div className="svem-container">
          <div className="svem-cta-banner-inner">
            <div className="svem-cta-banner-left">
              <div className="svem-cta-banner-icon-box">
                <Phone size={24} />
              </div>
              <div className="svem-cta-banner-text">
                <h3 className="svem-cta-banner-heading">Ready to Mobilize Equipment to Your Site?</h3>
                <p className="svem-cta-banner-sub">
                  Book directly online or chat on WhatsApp with our fleet coordinator.
                </p>
              </div>
            </div>

            <div className="svem-cta-banner-actions">
              <button
                type="button"
                className="svem-btn-primary"
                onClick={() => onNavigate('booking')}
              >
                <Calendar size={18} />
                <span>Book Equipment Now</span>
              </button>

              <a
                href={getWhatsAppUrl("Hello, I saw your project gallery and would like to discuss my project requirements.")}
                target="_blank"
                rel="noopener noreferrer"
                className="svem-btn-banner-wa"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
