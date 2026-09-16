import React, { useState } from 'react';
import submissionService from '../../services/submissionService';

const SubmissionForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(
    item || {
      enrollmentId: '',
      milestoneId: '',
      contentUrl: ''
    }
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg('');

    try {
      await submissionService.create(formData);
      onSuccess();
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
        'Error creating submission'
      );
    }

    setLoading(false);
  };

  return (
    <div className="modern-modal-overlay">
      <div className="modern-modal submission-modal" style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div className="modern-modal-header">
          <div className="modern-modal-title-area">
            <div className="modern-modal-icon submission-icon">
              🚀
            </div>
            <div>
              <h2>Submit Milestone</h2>
              <p>Submit your completed milestone work for mentor evaluation</p>
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

        {/* Error Alert */}
        {errorMsg && (
          <div className="login-error" style={{ marginBottom: '1.25rem' }}>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="modern-modal-form">
          {/* Enrollment ID */}
          <div className="modern-form-group">
            <label>
              Enrollment ID <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.enrollmentId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  enrollmentId: parseInt(e.target.value) || ''
                })
              }
              placeholder="e.g. 1"
              required
            />
            <small>Enrollment tracking ID for this learning journey.</small>
          </div>

          {/* Milestone ID */}
          <div className="modern-form-group">
            <label>
              Milestone ID <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.milestoneId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  milestoneId: parseInt(e.target.value) || ''
                })
              }
              placeholder="e.g. 1"
              required
            />
            <small>ID of the specific milestone deliverable you completed.</small>
          </div>

          {/* Content URL */}
          <div className="modern-form-group">
            <label>
              Submission URL <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="url"
              value={formData.contentUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contentUrl: e.target.value
                })
              }
              placeholder="https://github.com/your-username/project-repo"
              required
            />
            <small>Public link to your code repository, live demo, or deliverable document.</small>
          </div>

          {/* Info callout */}
          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'var(--surface-alt)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>💡</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Ensure your project repository or live URL is publicly accessible so mentors can evaluate your implementation.
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
              {loading ? 'Submitting...' : 'Submit Milestone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;