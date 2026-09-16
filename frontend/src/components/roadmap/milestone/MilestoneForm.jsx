import React, { useState, useEffect, useRef } from 'react';
import milestoneService from '../../../services/milestoneService';

const MilestoneForm = ({ roadmapId, item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    roadmapId: roadmapId,
    title: '',
    expectedDurationDays: 1,
    passingScore: 1
  });

  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (item) {
      setFormData({
        roadmapId: roadmapId,
        title: item.title || '',
        expectedDurationDays: item.expectedDurationDays || 1,
        passingScore: item.passingScore || 1
      });
    }

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [item, roadmapId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item?.id) {
        await milestoneService.update(item.id, formData);
      } else {
        await milestoneService.create(formData);
      }

      onSuccess();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Error saving milestone';

      alert(message);
    }

    setLoading(false);
  };

  return (
    <div className="modern-modal-overlay" style={{ zIndex: 10100 }}>
      <div className="modern-modal" style={{ maxWidth: '500px' }}>
        {/* Header */}
        <div className="modern-modal-header">
          <div className="modern-modal-title-area">
            <div className="modern-modal-icon">
              🚩
            </div>
            <div>
              <h2>{item ? 'Edit Milestone' : 'Add Milestone'}</h2>
              <p>Define expectations and passing criteria</p>
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
        <form onSubmit={handleSubmit} className="modern-modal-form">
          <div className="modern-form-group">
            <label>
              Title <span style={{ color: 'var(--danger)' }}>*</span>
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
              required
              placeholder="e.g. Java Basics"
            />
            <small>Clear title for this milestone stage.</small>
          </div>

          <div className="modern-form-group">
            <label>
              Expected Duration (days){' '}
              <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.expectedDurationDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expectedDurationDays: parseInt(e.target.value) || 1
                })
              }
              required
            />
            <small>Estimated days to complete this milestone.</small>
          </div>

          <div className="modern-form-group">
            <label>
              Passing Score <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.passingScore}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passingScore: parseInt(e.target.value) || 1
                })
              }
              required
            />
            <small>Minimum score required to pass evaluation.</small>
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
              {loading
                ? 'Saving...'
                : item
                ? 'Update Milestone'
                : 'Save Milestone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MilestoneForm;