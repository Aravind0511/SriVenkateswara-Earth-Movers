import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { EquipmentItem } from '../types';

interface EquipmentCardProps {
  equipment: EquipmentItem;
  onViewDetails: (item: EquipmentItem) => void;
  onBookNow: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onViewDetails,
  onBookNow
}) => {
  const isAvailable = equipment.status === 'available';

  return (
    <div className="svem-eq-card">
      {/* Machinery Image Header */}
      <div className="svem-eq-img-wrapper">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="svem-eq-img"
          loading="lazy"
        />
        <div className="svem-eq-badge-category">
          {equipment.type}
        </div>
      </div>

      {/* Equipment Card Body */}
      <div className="svem-eq-content">
        <div className="svem-eq-header-row">
          <h3 className="svem-eq-title">{equipment.name}</h3>
          <p className="svem-eq-type">{equipment.type}</p>
        </div>

        {/* Availability Status Indicator (Green for Available, Red for Currently Rented) */}
        <div className="svem-eq-status-row">
          <span
            className={`svem-status-indicator ${
              isAvailable ? 'svem-status-available' : 'svem-status-rented'
            }`}
          >
            <span className="svem-status-dot" />
            {isAvailable ? (
              <span className="svem-status-label">Available</span>
            ) : (
              <span className="svem-status-label">Currently Rented</span>
            )}
          </span>

          <span className="svem-eq-rate-tag">{equipment.rates.daily}</span>
        </div>

        <p className="svem-eq-desc">{equipment.shortDesc}</p>

        {/* Action Buttons */}
        <div className="svem-eq-actions">
          <button
            type="button"
            className="svem-btn-primary svem-btn-eq-action"
            onClick={() => onViewDetails(equipment)}
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="svem-btn-outline-dark svem-btn-eq-book"
            onClick={() => onBookNow(equipment)}
            title={`Book ${equipment.name}`}
          >
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
