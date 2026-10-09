import React from 'react';
import { Shovel, Truck, Construction, Hammer, Mountain, ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import type { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'excavation':
        return <Shovel size={28} />;
      case 'filling':
        return <Truck size={28} />;
      case 'road':
        return <Construction size={28} />;
      case 'demolition':
        return <Hammer size={28} />;
      case 'development':
        return <Mountain size={28} />;
      default:
        return <Construction size={28} />;
    }
  };

  return (
    <section id="services" className="svem-section svem-services-section">
      <div className="svem-container">
        {/* Section Header */}
        <div className="svem-section-header-row">
          <div className="svem-section-title-wrap">
            <div className="svem-title-with-pill">
              <span className="svem-accent-pill" />
              <h2 className="svem-section-title">Our Services</h2>
            </div>
            <p className="svem-section-subtitle">
              Expert site execution, earthworks, and heavy equipment contracting across commercial and residential sectors.
            </p>
          </div>

          <div className="svem-section-header-action">
            <a href="#contact" className="svem-link-btn">
              <span>View All Services</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="svem-services-grid">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="svem-service-card"
              onClick={() => onSelectService(service)}
            >
              <div className="svem-service-icon-box">
                {getServiceIcon(service.iconName)}
              </div>
              <h3 className="svem-service-card-title">{service.title}</h3>
              <p className="svem-service-card-desc">{service.shortDesc}</p>

              <div className="svem-service-card-footer">
                <span className="svem-service-enquire-link">
                  <span>Enquire Service</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
