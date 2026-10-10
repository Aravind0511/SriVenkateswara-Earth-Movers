import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent) => void;
  iconSrc?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  onClick,
  iconSrc = '/about/logo-mark.png',
}) => {
  const isLight = variant === 'light';

  return (
    <a
      href="#home"
      onClick={onClick}
      className={`svem-logo svem-logo-${size} ${className}`}
      aria-label="Sri Venkateshwara Earth Movers Home"
    >
      {/* Official Business Logo Badge */}
      <div className="svem-logo-icon-wrapper">
        <img
          src={iconSrc}
          alt="Sri Venkateshwara Earth Movers"
          className="svem-logo-img"
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      <div className="svem-logo-text-block">
        <span className={`svem-logo-title ${isLight ? 'text-white' : 'text-dark'}`}>
          SRI VENKATESHWARA
        </span>
        <span className="svem-logo-subtitle">
          EARTH MOVERS
        </span>
      </div>
    </a>
  );
};
