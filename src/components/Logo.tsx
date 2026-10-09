import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', size = 'md' }) => {
  const isLight = variant === 'light';

  return (
    <a
      href="#home"
      className={`svem-logo svem-logo-${size} ${className}`}
      aria-label="Sri Venkateshwara Earth Movers Home"
    >
      {/* Official Business Logo Badge */}
      <div className="svem-logo-icon-wrapper">
        <img
          src="/logo.jpg"
          alt="Sri Venkateshwara Earth Movers"
          className="svem-logo-img"
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      <div className="svem-logo-text-block">
        <span className={`svem-logo-title ${isLight ? 'text-white' : 'text-dark'}`}>
          SRI VENKATESWARA
        </span>
        <span className="svem-logo-subtitle">
          EARTH MOVERS
        </span>
      </div>
    </a>
  );
};
