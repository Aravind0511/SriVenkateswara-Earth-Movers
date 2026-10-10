import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  Phone,
  MessageSquare,
  Wrench,
  Fuel,
  ShieldCheck,
  Check,
  Calendar,
} from 'lucide-react';
import type { EquipmentItem, AppPage } from '../types';
import {
  BUSINESS_INFO,
  getCallUrl,
  getWhatsAppUrl,
  getEquipmentTariffWhatsAppUrl,
} from '../config/businessInfo';
import './EquipmentPage.css';

interface EquipmentPageProps {
  equipmentList: EquipmentItem[];
  onBookNow: (item: EquipmentItem) => void;
  onViewDetails: (item: EquipmentItem) => void;
  onNavigate: (page: AppPage, sectionId?: string) => void;
}

export const EquipmentPage: React.FC<EquipmentPageProps> = ({
  equipmentList,
  onBookNow,
  onViewDetails,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { key: 'all', label: 'All Fleet (6)' },
    { key: 'Backhoe', label: 'Backhoe (JCB)' },
    { key: 'Excavator', label: 'Crawler Excavator' },
    { key: 'Tractor', label: 'Utility Tractor' },
    { key: 'Tipper', label: 'Tipper Lorry' },
    { key: 'Bulldozer', label: 'Crawler Bulldozer' },
    { key: 'Road Roller', label: 'Soil Compactor Roller' },
  ];

  const filteredItems = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'all' || item.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [equipmentList, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="svem-equipment-page">
      {/* ------------------------------------------------------------------ */}
      {/* Hero Section */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-eqpage-hero">
        <div className="svem-container">
          <nav className="svem-eqpage-breadcrumb" aria-label="Breadcrumb">
            <span
              role="link"
              tabIndex={0}
              className="svem-breadcrumb-link"
              onClick={() => onNavigate('home')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate('home');
              }}
            >
              Home
            </span>
            <span className="svem-breadcrumb-sep">&gt;</span>
            <span className="svem-breadcrumb-current">Equipment Fleet</span>
          </nav>

          <h1 className="svem-eqpage-hero-title">
            Our Heavy <span className="text-amber-500">Equipment Fleet</span>
          </h1>
          <p className="svem-eqpage-hero-subtitle">
            Reliable, well-maintained earth-moving machinery with certified operators. Ready for immediate project deployment across South India.
          </p>

          <div className="svem-eqpage-hero-stats">
            <div className="svem-stat-chip">
              <span className="svem-stat-val">6+</span>
              <span className="svem-stat-lbl">Core Machinery Types</span>
            </div>
            <div className="svem-stat-chip">
              <span className="svem-stat-val">100%</span>
              <span className="svem-stat-lbl">Experienced Operators</span>
            </div>
            <div className="svem-stat-chip">
              <span className="svem-stat-val">24/7</span>
              <span className="svem-stat-lbl">On-Site Support</span>
            </div>
            <div className="svem-stat-chip">
              <span className="svem-stat-val">0</span>
              <span className="svem-stat-lbl">Hidden Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Search and Filters Bar */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-eqpage-filter-section">
        <div className="svem-container">
          <div className="svem-eqpage-filter-card">
            {/* Search Input */}
            <div className="svem-eqpage-search-wrap">
              <Search size={18} className="svem-eqpage-search-icon" />
              <input
                type="text"
                className="svem-eqpage-search-input"
                placeholder="Search equipment by name, model, application..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="svem-eqpage-clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="svem-eqpage-chips-row">
              <div className="svem-eqpage-chips-label">
                <Filter size={16} />
                <span>Category:</span>
              </div>
              <div className="svem-eqpage-chips-list">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={`svem-eqpage-chip ${
                      selectedCategory === cat.key ? 'svem-eqpage-chip-active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter Tabs */}
            <div className="svem-eqpage-status-tabs">
              <span className="svem-eqpage-chips-label">Availability:</span>
              <div className="svem-status-btn-group">
                <button
                  type="button"
                  className={`svem-status-tab-btn ${
                    selectedStatus === 'all' ? 'svem-status-tab-active' : ''
                  }`}
                  onClick={() => setSelectedStatus('all')}
                >
                  All Status
                </button>
                <button
                  type="button"
                  className={`svem-status-tab-btn ${
                    selectedStatus === 'available' ? 'svem-status-tab-active' : ''
                  }`}
                  onClick={() => setSelectedStatus('available')}
                >
                  Available Now
                </button>
                <button
                  type="button"
                  className={`svem-status-tab-btn ${
                    selectedStatus === 'rented' ? 'svem-status-tab-active' : ''
                  }`}
                  onClick={() => setSelectedStatus('rented')}
                >
                  Currently Rented
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Fleet Grid */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-eqpage-catalogue-section">
        <div className="svem-container">
          <div className="svem-eqpage-results-meta">
            <span className="svem-results-count">
              Showing <strong>{filteredItems.length}</strong> of <strong>{equipmentList.length}</strong> vehicles
            </span>
          </div>

          <div className="svem-eqpage-cards-grid">
            {filteredItems.map((item) => {
              const isAvailable = item.status === 'available';

              return (
                <div key={item.id} className="svem-eqpage-card">
                  {/* Image & Status Badge */}
                  <div className="svem-eqpage-card-media">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="svem-eqpage-card-img"
                      loading="lazy"
                    />
                    <div
                      className={`svem-eqpage-status-badge ${
                        isAvailable ? 'svem-badge-available' : 'svem-badge-rented'
                      }`}
                    >
                      <span className="svem-badge-indicator" />
                      <span>{item.statusText}</span>
                    </div>

                    <div className="svem-eqpage-category-tag">
                      {item.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="svem-eqpage-card-body">
                    <div className="svem-eqpage-card-header">
                      <h2 className="svem-eqpage-title">{item.name}</h2>
                      <span className="svem-eqpage-model">{item.model}</span>
                    </div>

                    <p className="svem-eqpage-desc">{item.shortDesc}</p>

                    {/* Key Technical Specifications */}
                    <div className="svem-eqpage-specs-table">
                      {item.specs.operatingWeight && (
                        <div className="svem-eqpage-spec-cell">
                          <span className="svem-spec-cell-label">Operating Weight</span>
                          <span className="svem-spec-cell-val">{item.specs.operatingWeight}</span>
                        </div>
                      )}
                      {item.specs.enginePower && (
                        <div className="svem-eqpage-spec-cell">
                          <span className="svem-spec-cell-label">Engine Power</span>
                          <span className="svem-spec-cell-val">{item.specs.enginePower}</span>
                        </div>
                      )}
                      {item.specs.bucketCapacity && (
                        <div className="svem-eqpage-spec-cell">
                          <span className="svem-spec-cell-label">Bucket Capacity</span>
                          <span className="svem-spec-cell-val">{item.specs.bucketCapacity}</span>
                        </div>
                      )}
                      {item.specs.payloadCapacity && (
                        <div className="svem-eqpage-spec-cell">
                          <span className="svem-spec-cell-label">Payload Capacity</span>
                          <span className="svem-spec-cell-val">{item.specs.payloadCapacity}</span>
                        </div>
                      )}
                      {item.specs.diggingDepth && (
                        <div className="svem-eqpage-spec-cell">
                          <span className="svem-spec-cell-label">Digging Depth</span>
                          <span className="svem-spec-cell-val">{item.specs.diggingDepth}</span>
                        </div>
                      )}
                      {item.specs.drumWidth && (
                        <div className="svem-eqpage-spec-cell">
                          <span className="svem-spec-cell-label">Drum Width</span>
                          <span className="svem-spec-cell-val">{item.specs.drumWidth}</span>
                        </div>
                      )}
                    </div>

                    {/* Common Applications */}
                    <div className="svem-eqpage-applications-wrap">
                      <span className="svem-apps-heading">Best Suited For:</span>
                      <div className="svem-apps-tags">
                        {item.applications.map((app, idx) => (
                          <span key={idx} className="svem-app-tag">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Operator Policy & Zero Monetary Tariff Display */}
                    <div className="svem-eqpage-rate-bar">
                      <div className="svem-rate-text-group">
                        <span className="svem-rate-title">Rental Rate</span>
                        <span className="svem-rate-tariff-label">
                          {item.rates.daily || 'Tariff on Request'}
                        </span>
                      </div>

                      <div className="svem-operator-tag">
                        <Check size={14} className="text-emerald-600" />
                        <span>Operator Included</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="svem-eqpage-actions-grid">
                      <button
                        type="button"
                        className="svem-btn-primary svem-btn-eq-book"
                        onClick={() => onBookNow(item)}
                      >
                        <Calendar size={16} />
                        <span>Book Now</span>
                      </button>

                      <button
                        type="button"
                        className="svem-btn-outline-dark svem-btn-eq-specs"
                        onClick={() => onViewDetails(item)}
                      >
                        <span>View Specs</span>
                        <ArrowRight size={14} />
                      </button>

                      <a
                        href={getEquipmentTariffWhatsAppUrl(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="svem-btn-wa-icon"
                        title={`Inquire tariff on WhatsApp for ${item.name}`}
                      >
                        <MessageSquare size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Fleet Comparison Matrix */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-eqpage-comparison-section">
        <div className="svem-container">
          <div className="svem-comparison-header">
            <h2 className="svem-comparison-title">Fleet Specification Comparison</h2>
            <p className="svem-comparison-desc">
              Compare operating weight, engine capacity, and core capabilities across our vehicle range.
            </p>
          </div>

          <div className="svem-comparison-table-wrap">
            <table className="svem-comparison-table">
              <thead>
                <tr>
                  <th>Vehicle Name</th>
                  <th>Category</th>
                  <th>Operating Weight</th>
                  <th>Engine Power</th>
                  <th>Key Feature / Capacity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {equipmentList.map((eq) => (
                  <tr key={eq.id}>
                    <td className="font-bold text-slate-900">{eq.name}</td>
                    <td>{eq.category}</td>
                    <td>{eq.specs.operatingWeight || 'N/A'}</td>
                    <td>{eq.specs.enginePower || 'N/A'}</td>
                    <td>{eq.specs.bucketCapacity || eq.specs.payloadCapacity || eq.specs.drumWidth || 'Standard'}</td>
                    <td>
                      <span
                        className={`svem-table-status-pill ${
                          eq.status === 'available' ? 'svem-pill-green' : 'svem-pill-amber'
                        }`}
                      >
                        {eq.status === 'available' ? 'Available' : 'Rented'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="svem-table-book-link"
                        onClick={() => onBookNow(eq)}
                      >
                        Book &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Quality & Maintenance Guarantee */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-eqpage-trust-section">
        <div className="svem-container">
          <div className="svem-trust-grid">
            <div className="svem-trust-card">
              <div className="svem-trust-icon-wrap">
                <ShieldCheck size={26} />
              </div>
              <h3 className="svem-trust-card-title">Rigorous Pre-Rental Inspection</h3>
              <p className="svem-trust-card-desc">
                Every machine undergoes hydraulic pressure tests, fluid checks, and track tension adjustments before moving out of our Namakkal yard.
              </p>
            </div>

            <div className="svem-trust-card">
              <div className="svem-trust-icon-wrap">
                <Wrench size={26} />
              </div>
              <h3 className="svem-trust-card-title">On-Site Breakdown Support</h3>
              <p className="svem-trust-card-desc">
                Mobile technician service vans equipped with replacement hoses, filters, and tooling dispatched within hours to minimize project downtime.
              </p>
            </div>

            <div className="svem-trust-card">
              <div className="svem-trust-icon-wrap">
                <Fuel size={26} />
              </div>
              <h3 className="svem-trust-card-title">Fuel &amp; Shift Transparency</h3>
              <p className="svem-trust-card-desc">
                Clear logbooks for operating hours and fuel usage, with options for client-supplied diesel or all-inclusive contract terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA Banner */}
      {/* ------------------------------------------------------------------ */}
      <section className="svem-booking-cta-banner svem-mt-4">
        <div className="svem-container">
          <div className="svem-cta-banner-inner">
            <div className="svem-cta-banner-left">
              <div className="svem-cta-banner-icon-box">
                <Phone size={24} />
              </div>
              <div className="svem-cta-banner-text">
                <h3 className="svem-cta-banner-heading">Need Customized Machinery or Bulk Fleet?</h3>
                <p className="svem-cta-banner-sub">
                  Speak directly with our yard dispatcher at {BUSINESS_INFO.phone}.
                </p>
              </div>
            </div>

            <div className="svem-cta-banner-actions">
              <a
                href={getWhatsAppUrl("Hello, I would like to inquire about multi-vehicle fleet rental for my project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="svem-btn-banner-wa"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Fleet Query</span>
              </a>

              <a href={getCallUrl()} className="svem-btn-banner-call">
                <Phone size={18} />
                <span>Call Fleet Manager</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
