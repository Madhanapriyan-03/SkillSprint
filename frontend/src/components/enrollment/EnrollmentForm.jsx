import React, { useState } from 'react';
import enrollmentService from '../../services/enrollmentService';

const EnrollmentForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { roadmapId: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enrollmentService.create(formData);
      onSuccess();
    } catch (error) {
      alert('Error creating enrollment');
    }
    setLoading(false);
  };

  return (
    <div className="modern-modal-overlay">
      <div className="modern-modal" style={{ maxWidth: '440px' }}>
        <div className="modern-modal-header">
          <div className="modern-modal-title-area">
            <div className="modern-modal-icon">
              📚
            </div>
            <div>
              <h2>Enroll in Roadmap</h2>
              <p>Join a curated learning track</p>
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

        <form onSubmit={handleSubmit} className="modern-modal-form">
          <div className="modern-form-group">
            <label>
              Roadmap ID <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="number"
              value={formData.roadmapId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  roadmapId: parseInt(e.target.value) || ''
                })
              }
              placeholder="e.g. 1"
              required
            />
            <small>Enter the numeric ID of the roadmap to enroll.</small>
          </div>

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
              {loading ? 'Enrolling...' : 'Enroll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;
