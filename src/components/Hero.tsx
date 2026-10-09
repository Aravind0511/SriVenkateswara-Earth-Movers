import React from 'react';
import { ArrowRight, Calendar, Settings, ShieldCheck, Zap, Clock } from 'lucide-react';

interface HeroProps {
  onViewEquipment: () => void;
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewEquipment, onBookNow }) => {
  return (
    <section id="home" className="svem-hero">
      {/* Background machinery photography with atmospheric industrial grading */}
      <div className="svem-hero-bg-overlay" />
      <div className="svem-hero-bg-image" />

      <div className="svem-hero-content-container">
        <div className="svem-hero-text-block">
          {/* Eyebrow tag */}
          <div className="svem-hero-tag">
            <span>RENT</span>
            <span className="svem-hero-tag-sep">|</span>
            <span>BUILD</span>
            <span className="svem-hero-tag-sep">|</span>
            <span>MOVE</span>
            <span className="svem-hero-tag-sep">|</span>
            <span>DEVELOP</span>
          </div>

          {/* Headline */}
          <h1 className="svem-hero-title">
            Reliable Earth Moving{' '}
            <span className="svem-hero-title-accent">Equipment for Your Project</span>
          </h1>

          {/* Subtitle */}
          <p className="svem-hero-description">
            Quality machinery. On-time service. Ready when you need it. Heavy excavators, JCBs, tippers, and road rollers available with skilled operators for seamless site execution.
          </p>

          {/* Action Buttons */}
          <div className="svem-hero-actions">
            <button
              type="button"
              className="svem-btn-primary svem-hero-btn-primary"
              onClick={onViewEquipment}
            >
              <span>View Equipment</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="svem-hero-btn-secondary"
              onClick={onBookNow}
            >
              <Calendar size={18} />
              <span>Book Now</span>
            </button>
          </div>
        </div>

        {/* 4 Trust Points Bar directly integrated in the Hero (Matching Reference Image) */}
        <div className="svem-trust-bar">
          <div className="svem-trust-item">
            <div className="svem-trust-icon-box">
              <Settings size={22} />
            </div>
            <div className="svem-trust-text">
              <span className="svem-trust-title">Well-Maintained</span>
              <span className="svem-trust-subtitle">Machinery</span>
            </div>
          </div>

          <div className="svem-trust-item">
            <div className="svem-trust-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div className="svem-trust-text">
              <span className="svem-trust-title">Reliable &amp; Safe</span>
              <span className="svem-trust-subtitle">Operation</span>
            </div>
          </div>

          <div className="svem-trust-item">
            <div className="svem-trust-icon-box">
              <Zap size={22} />
            </div>
            <div className="svem-trust-text">
              <span className="svem-trust-title">Flexible Rental</span>
              <span className="svem-trust-subtitle">Options</span>
            </div>
          </div>

          <div className="svem-trust-item">
            <div className="svem-trust-icon-box">
              <Clock size={22} />
            </div>
            <div className="svem-trust-text">
              <span className="svem-trust-title">Quick Availability</span>
              <span className="svem-trust-subtitle">&amp; Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
