import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { validateEmail } from '../utils/helpers';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', program: '', message: '' });
      setIsSubmitting(false);

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      style={formStyles.form}
    >
      <div style={formStyles.grid}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="John Doe"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="john@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+998 90 123 45 67"
          />
        </div>

        <div className="form-group">
          <label htmlFor="program" className="form-label">Program of Interest</label>
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select a program or service</option>
            <optgroup label="AIS Academy">
              <option value="ai-practitioners">AI Practitioners (1.5 months)</option>
              <option value="data-science">Data Science Foundation (3 months)</option>
              <option value="machine-learning">Machine Learning (3 months)</option>
              <option value="deep-learning">Deep Learning (3 months)</option>
              <option value="nlp">NLP (10 months)</option>
              <option value="computer-vision">Computer Vision (10 months)</option>
            </optgroup>
            <optgroup label="Specialized Bootcamps">
              <option value="ai-fintech">AI with Fintech</option>
              <option value="ai-medics">AI with Medics</option>
              <option value="ai-teaching">AI in Teaching</option>
              <option value="vibe-coding">Vibe Coding A to Z</option>
              <option value="executive-ai">Executive AI Education</option>
            </optgroup>
            <optgroup label="AIS Studio">
              <option value="aipreneurship">AIpreneurship Program</option>
              <option value="incubation">Incubation Program</option>
              <option value="acceleration">Acceleration Program</option>
            </optgroup>
            <optgroup label="Corporate Innovation">
              <option value="hybrid-bootcamp">Hybrid Bootcamp</option>
              <option value="digital-sprint">Digital Sprint</option>
              <option value="offline-immersion">Offline Immersion</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Tell us about your goals and how we can help you..."
          rows="5"
        ></textarea>
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
        style={{ width: '100%', marginTop: 'var(--space-2)' }}
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <span className="loading"></span>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={formStyles.successMessage}
        >
          ✅ Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}
    </motion.form>
  );
};

const formStyles = {
  form: {
    background: 'var(--bg-primary)',
    padding: 'var(--space-6)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-3)'
  },
  successMessage: {
    marginTop: 'var(--space-3)',
    padding: 'var(--space-3)',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid var(--secondary-emerald)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--secondary-emerald)',
    textAlign: 'center'
  }
};

// Responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 768px) {
    .contact-form-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default ContactForm;
