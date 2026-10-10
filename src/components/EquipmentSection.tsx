import React, { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import type { EquipmentItem } from '../types';
import { EquipmentCard } from './EquipmentCard';

interface EquipmentSectionProps {
  equipmentList: EquipmentItem[];
  onViewDetails: (item: EquipmentItem) => void;
  onBookNow: (item: EquipmentItem) => void;
  onViewAll?: () => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  equipmentList,
  onViewDetails,
  onBookNow,
  onViewAll,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Equipment' },
    { key: 'Backhoe', label: 'Backhoe (JCB)' },
    { key: 'Excavator', label: 'Excavator' },
    { key: 'Tractor', label: 'Tractor' },
    { key: 'Tipper', label: 'Tipper Lorry' },
    { key: 'Bulldozer', label: 'Bulldozer' },
    { key: 'Road Roller', label: 'Road Roller' }
  ];

  const filteredEquipment =
    selectedFilter === 'all'
      ? equipmentList
      : equipmentList.filter((item) => item.category === selectedFilter);

  return (
    <section id="equipment" className="svem-section svem-equipment-section">
      <div className="svem-container">
        {/* Section Header with Industrial Accent Pill */}
        <div className="svem-section-header-row">
          <div className="svem-section-title-wrap">
            <div className="svem-title-with-pill">
              <span className="svem-accent-pill" />
              <h2 className="svem-section-title">Our Equipment</h2>
            </div>
            <p className="svem-section-subtitle">
              Wide range of earth moving vehicles for all types of construction and development work.
            </p>
          </div>

          <div className="svem-section-header-action">
            <button
              type="button"
              className="svem-link-btn"
              onClick={() => {
                if (onViewAll) {
                  onViewAll();
                } else {
                  setSelectedFilter('all');
                }
              }}
            >
              <span>View All Equipment</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="svem-filter-bar">
          <span className="svem-filter-label">
            <Filter size={16} />
            <span>Filter:</span>
          </span>
          <div className="svem-filter-chips">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`svem-filter-chip ${
                  selectedFilter === cat.key ? 'svem-filter-chip-active' : ''
                }`}
                onClick={() => setSelectedFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="svem-eq-grid">
          {filteredEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
