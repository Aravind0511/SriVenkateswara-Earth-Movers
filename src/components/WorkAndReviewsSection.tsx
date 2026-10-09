import React from 'react';
import { GallerySection } from './GallerySection';
import { ReviewsSection } from './ReviewsSection';

export const WorkAndReviewsSection: React.FC = () => {
  return (
    <section className="svem-section svem-work-reviews-section">
      <div className="svem-container">
        <div className="svem-work-reviews-grid">
          <div className="svem-work-col">
            <GallerySection />
          </div>
          <div className="svem-reviews-col">
            <ReviewsSection />
          </div>
        </div>
      </div>
    </section>
  );
};
