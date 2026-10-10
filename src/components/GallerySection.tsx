import React, { useState } from 'react';
import { Maximize2, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setLightboxIndex(index);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <div id="gallery" className="svem-gallery-block">
      {/* Block Header */}
      <div className="svem-section-header-row svem-mb-3 flex items-center justify-between">
        <div className="svem-title-with-pill">
          <span className="svem-accent-pill" />
          <h3 className="svem-subheading">Recent Work Gallery</h3>
        </div>
        <a href="#/gallery" className="svem-link-btn" title="View all project photos">
          <span>View All</span>
          <ArrowRight size={14} />
        </a>
      </div>

      {/* 5 Thumbnails Grid matching reference image */}
      <div className="svem-gallery-grid">
        {GALLERY_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="svem-gallery-item"
            onClick={() => handleOpen(idx)}
            title={`View: ${item.title}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="svem-gallery-img"
              loading="lazy"
            />
            <div className="svem-gallery-overlay">
              <span className="svem-gallery-zoom-icon">
                <Maximize2 size={16} />
              </span>
              <span className="svem-gallery-item-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={GALLERY_ITEMS}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
