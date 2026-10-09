import React from 'react';
import { Award, Users, RefreshCw, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Quality Equipment',
      desc: 'Well maintained and reliable',
      icon: Award
    },
    {
      title: 'Experienced Service',
      desc: 'Suitable for all project needs',
      icon: Users
    },
    {
      title: 'Flexible Rental',
      desc: 'Hourly, daily or project-based',
      icon: RefreshCw
    },
    {
      title: 'Local Support',
      desc: 'Quick communication and service',
      icon: Headphones
    }
  ];

  return (
    <div id="why-choose-us" className="svem-why-card">
      <div className="svem-why-overlay" />
      <div className="svem-why-content">
        <h3 className="svem-why-title">Why Choose Us?</h3>

        <div className="svem-why-list">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="svem-why-item">
                <div className="svem-why-icon-box">
                  <Icon size={20} />
                </div>
                <div className="svem-why-item-text">
                  <h4 className="svem-why-item-title">{point.title}</h4>
                  <p className="svem-why-item-desc">{point.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Integrated heavy excavator machinery visual */}
      <div className="svem-why-machine-img" />
    </div>
  );
};
