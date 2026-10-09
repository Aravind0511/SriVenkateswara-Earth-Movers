import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { REVIEWS_LIST } from '../data/reviewsData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS_LIST.length) % REVIEWS_LIST.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_LIST.length);
  };

  const currentReview = REVIEWS_LIST[currentIndex];

  return (
    <div className="svem-reviews-block">
      {/* Block Header with navigation arrows matching reference image */}
      <div className="svem-reviews-header">
        <div className="svem-title-with-pill">
          <span className="svem-accent-pill" />
          <h3 className="svem-subheading">Customer Reviews</h3>
        </div>

        <div className="svem-reviews-nav">
          <button
            type="button"
            className="svem-reviews-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="svem-reviews-arrow-btn"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Review Card */}
      <div className="svem-review-card">
        {/* Large Yellow Quote Icon matching reference photo */}
        <div className="svem-review-quote-icon">
          <Quote size={28} />
        </div>

        {/* Comment Text */}
        <p className="svem-review-text">
          "{currentReview.comment}"
        </p>

        {/* Stars Rating */}
        <div className="svem-review-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`svem-star ${
                i < currentReview.rating ? 'svem-star-filled' : 'svem-star-empty'
              }`}
            />
          ))}
        </div>

        {/* Reviewer Details */}
        <div className="svem-review-author">
          <span className="svem-author-name">{currentReview.name}</span>
          <span className="svem-author-location">{currentReview.location} &bull; {currentReview.projectType}</span>
        </div>

        {/* Placeholder badge for transparency */}
        <div className="svem-review-disclaimer">
          <span>* Client feedback placeholder demonstration</span>
        </div>
      </div>
    </div>
  );
};
