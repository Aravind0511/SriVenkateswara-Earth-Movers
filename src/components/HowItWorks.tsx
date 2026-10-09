import React from 'react';
import { Search, Calendar, CheckCircle2, Truck, ChevronRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: '1. Select Equipment',
      desc: 'Choose the vehicle you need',
      icon: Search
    },
    {
      num: 2,
      title: '2. Check Availability',
      desc: 'Select your dates and submit request',
      icon: Calendar
    },
    {
      num: 3,
      title: '3. Confirm Booking',
      desc: 'We will confirm availability',
      icon: CheckCircle2
    },
    {
      num: 4,
      title: '4. Equipment Ready',
      desc: 'Get your equipment on time',
      icon: Truck
    }
  ];

  return (
    <div className="svem-how-card">
      <div className="svem-how-header">
        <div className="svem-how-badge-icon">
          <Truck size={20} />
        </div>
        <div>
          <h3 className="svem-how-title">How It Works</h3>
          <p className="svem-how-subtitle">Simple steps to book your equipment</p>
        </div>
      </div>

      <div className="svem-how-steps">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.num}>
              <div className="svem-how-step-item">
                <div className="svem-how-step-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="svem-how-step-text">
                  <h4 className="svem-how-step-title">{step.title}</h4>
                  <p className="svem-how-step-desc">{step.desc}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="svem-how-step-arrow" aria-hidden="true">
                  <ChevronRight size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
