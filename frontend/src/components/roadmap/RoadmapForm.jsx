import React, { useState, useEffect, useRef } from 'react';
import roadmapService from '../../services/roadmapService';

const RoadmapForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    maxCapacity: item?.maxCapacity || 10,
    status: item?.status || 'DRAFT'
  });

  const [loading, setLoading] = useState(false);

  const titleInputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }

    if (
      cardRef.current &&
      typeof cardRef.current.scrollIntoView === 'function'
    ) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item?.id) {
        await roadmapService.update(item.id, formData);
      } else {
        await roadmapService.create(formData);
      }

      onSuccess();
    } catch (error) {
      alert('Error saving roadmap');
    }

    setLoading(false);
  };

  return (
    <div className="modern-modal-overlay">
      <div
        ref={cardRef}
        className="modern-modal roadmap-modal"
      >
        {/* Header */}
        <div className="modern-modal-header">
          <div className="modern-modal-title-area">
            <div className="modern-modal-icon roadmap-icon">
              🗺️
            </div>
            <div>
              <h2>
                {item
                  ? 'Edit Roadmap'
                  : 'Create New Roadmap'}
              </h2>
              <p>
                {item
                  ? 'Update your roadmap details'
                  : 'Create a structured learning path'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="modern-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="modern-modal-form"
        >
          {/* Title */}
          <div className="modern-form-group">
            <label>
              Roadmap Title <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              ref={titleInputRef}
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }
              placeholder="e.g. Frontend Masterclass"
              required
            />
            <small>
              Give your learning roadmap a clear, descriptive title.
            </small>
          </div>

          {/* Description */}
          <div className="modern-form-group">
            <label>Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
              placeholder="Detailed course description..."
              rows="3"
            />
            <small>
              Explain what learners can expect from this roadmap.
            </small>
          </div>

          {/* Capacity */}
          <div className="modern-form-group">
            <label>
              Maximum Capacity <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="number"
                min="1"
                value={formData.maxCapacity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxCapacity: parseInt(e.target.value) || 1
                  })
                }
                required
              />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                learners
              </span>
            </div>
            <small>
              Maximum number of learners who can enroll simultaneously.
            </small>
          </div>

          {/* Status info */}
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--surface-alt)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              Current Status:
            </span>
            <span
              className={
                formData.status === 'PUBLISHED'
                  ? 'status-badge status-published'
                  : 'status-badge status-draft'
              }
            >
              {formData.status}
            </span>
          </div>

          {/* Actions */}
          <div className="modern-modal-actions">
            <button
              type="button"
              className="modern-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modern-submit-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Roadmap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoadmapForm;