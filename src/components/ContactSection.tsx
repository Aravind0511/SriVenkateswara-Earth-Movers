import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, getCallUrl, getWhatsAppUrl } from '../config/businessInfo';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('Earth Excavation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="svem-section svem-contact-section">
      <div className="svem-container">
        {/* Section Header */}
        <div className="svem-section-header-row">
          <div className="svem-section-title-wrap">
            <div className="svem-title-with-pill">
              <span className="svem-accent-pill" />
              <h2 className="svem-section-title">Contact &amp; Site Inquiries</h2>
            </div>
            <p className="svem-section-subtitle">
              Speak directly with our fleet manager or submit an inquiry for rapid site assessment.
            </p>
          </div>
        </div>

        <div className="svem-contact-grid">
          {/* Left Column: Business Details & Map */}
          <div className="svem-contact-info-col">
            <div className="svem-contact-info-card">
              <h3 className="svem-contact-info-title">Head Office &amp; Equipment Yard</h3>

              <div className="svem-contact-details-list">
                {/* Address */}
                <div className="svem-contact-item">
                  <div className="svem-contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="svem-contact-text">
                    <span className="svem-contact-label">Business Yard Address</span>
                    <p className="svem-contact-val">{BUSINESS_INFO.address}</p>
                    <span className="svem-placeholder-tag">Service coverage: {BUSINESS_INFO.serviceArea}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="svem-contact-item">
                  <div className="svem-contact-icon-box">
                    <Phone size={20} />
                  </div>
                  <div className="svem-contact-text">
                    <span className="svem-contact-label">Call Directly (Owner / Yard)</span>
                    <a href={getCallUrl()} className="svem-contact-val svem-contact-link">
                      {BUSINESS_INFO.phone}
                    </a>
                    <span className="svem-contact-subval">Secondary: {BUSINESS_INFO.phoneSecondary}</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="svem-contact-item">
                  <div className="svem-contact-icon-box">
                    <MessageSquare size={20} />
                  </div>
                  <div className="svem-contact-text">
                    <span className="svem-contact-label">WhatsApp Fleet Inquiries</span>
                    <a
                      href={getWhatsAppUrl("Hello, I would like to enquire about renting earth-moving vehicles.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="svem-contact-val svem-contact-link text-emerald-600"
                    >
                      {BUSINESS_INFO.whatsapp} (Instant Chat)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="svem-contact-item">
                  <div className="svem-contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div className="svem-contact-text">
                    <span className="svem-contact-label">Official Email</span>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="svem-contact-val svem-contact-link">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="svem-contact-item">
                  <div className="svem-contact-icon-box">
                    <Clock size={20} />
                  </div>
                  <div className="svem-contact-text">
                    <span className="svem-contact-label">Operational Working Hours</span>
                    <p className="svem-contact-val">{BUSINESS_INFO.workingHours}</p>
                    <span className="svem-contact-subval text-amber-700 font-semibold">
                      {BUSINESS_INFO.emergencySupport}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Embed Preview Card */}
              <div className="svem-map-card">
                <iframe
                  title="Sri Venkateshwara Earth Movers Location Map"
                  src={BUSINESS_INFO.mapEmbedUrl}
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: General Enquiry Form */}
          <div className="svem-contact-form-col">
            <div className="svem-contact-form-card">
              <h3 className="svem-form-card-title">Send a Quick Message</h3>
              <p className="svem-form-card-subtitle">
                Have a customized project specification or require bulk machinery tenders? Leave your message below.
              </p>

              {submitted ? (
                <div className="svem-enquiry-success" role="status">
                  <CheckCircle2 size={48} className="text-emerald-500 mb-3" />
                  <h4>Message Sent Successfully</h4>
                  <p>
                    Thank you, {name}. Our fleet manager will reach out via {phone} shortly.
                  </p>
                  <button
                    type="button"
                    className="svem-btn-outline-dark mt-4"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="svem-general-form">
                  <div className="svem-form-group">
                    <label htmlFor="enquiryName" className="svem-form-label">
                      Full Name <span className="svem-req">*</span>
                    </label>
                    <input
                      id="enquiryName"
                      type="text"
                      className="svem-form-input"
                      placeholder="Your name or company name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="svem-form-grid-2">
                    <div className="svem-form-group">
                      <label htmlFor="enquiryPhone" className="svem-form-label">
                        Phone Number <span className="svem-req">*</span>
                      </label>
                      <input
                        id="enquiryPhone"
                        type="tel"
                        className="svem-form-input"
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="svem-form-group">
                      <label htmlFor="enquiryEmail" className="svem-form-label">
                        Email Address
                      </label>
                      <input
                        id="enquiryEmail"
                        type="email"
                        className="svem-form-input"
                        placeholder="your@email.com (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="svem-form-group">
                    <label htmlFor="enquiryService" className="svem-form-label">
                      Service Interested In
                    </label>
                    <select
                      id="enquiryService"
                      className="svem-form-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="Earth Excavation">Earth Excavation</option>
                      <option value="Earth Filling">Earth Filling &amp; Leveling</option>
                      <option value="Road Work">Road Work &amp; Compaction</option>
                      <option value="Demolition Work">Building Demolition</option>
                      <option value="Land Development">Layout Land Development</option>
                      <option value="Multiple Machinery Rental">Multiple Machinery Fleet Rental</option>
                    </select>
                  </div>

                  <div className="svem-form-group">
                    <label htmlFor="enquiryMessage" className="svem-form-label">
                      Project Details / Message
                    </label>
                    <textarea
                      id="enquiryMessage"
                      className="svem-form-textarea"
                      rows={4}
                      placeholder="Tell us about your project location, estimated timeline, machinery needed, etc..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="svem-btn-primary svem-btn-full">
                    <span>Submit Enquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
