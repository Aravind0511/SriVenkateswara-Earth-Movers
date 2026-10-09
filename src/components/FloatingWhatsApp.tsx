import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '../config/businessInfo';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const defaultMessage = `Hello Sri Venkateshwara Earth Movers, I need equipment rental support for my construction project. Could you please share machine availability and tariff rates?`;
  const waUrl = getWhatsAppUrl(defaultMessage);

  return (
    <div className="svem-floating-wa-container">
      {/* Tooltip speech bubble */}
      {!tooltipDismissed && (
        <div className="svem-wa-tooltip" role="tooltip">
          <button
            type="button"
            className="svem-wa-tooltip-close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipDismissed(true);
            }}
            aria-label="Dismiss chat tooltip"
          >
            <X size={12} />
          </button>
          <p className="svem-wa-tooltip-title">Need Earth Movers?</p>
          <p className="svem-wa-tooltip-text">Chat with owner on WhatsApp for fast response.</p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="svem-floating-wa-btn"
        aria-label="Chat with owner on WhatsApp"
        title="WhatsApp Sri Venkateshwara Earth Movers"
      >
        <span className="svem-wa-pulse" />
        <MessageCircle size={28} />
      </a>
    </div>
  );
};
