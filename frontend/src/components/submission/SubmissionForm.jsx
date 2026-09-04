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

      <div className="modern-modal submission-modal">

        {/* Header */}
        <div className="modern-modal-header">

          <div className="modern-modal-title-area">

            <div className="modern-modal-icon submission-icon">
              ↗
            </div>

            <div>
              <h2>Submit Milestone</h2>

              <p>
                Submit your completed milestone work
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

        {/* Error */}
        {errorMsg && (
          <div className="modern-form-error">
            <span>!</span>
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="modern-modal-form"
        >

          {/* Enrollment ID */}
          <div className="modern-form-group">

            <label>
              Enrollment ID
              <span>*</span>
            </label>

            <input
              type="number"
              min="1"
              value={formData.enrollmentId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  enrollmentId:
                    parseInt(e.target.value)
                })
              }
              placeholder="e.g. 1"
              required
            />

            <small>
              Enter the enrollment associated with this milestone.
            </small>

          </div>

          {/* Milestone ID */}
          <div className="modern-form-group">

            <label>
              Milestone ID
              <span>*</span>
            </label>

            <input
              type="number"
              min="1"
              value={formData.milestoneId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  milestoneId:
                    parseInt(e.target.value)
                })
              }
              placeholder="e.g. 1"
              required
            />

            <small>
              Enter the milestone you have completed.
            </small>

          </div>

          {/* Content URL */}
          <div className="modern-form-group">

            <label>
              Submission URL
              <span>*</span>
            </label>

            <div className="url-input-wrapper">

              <span className="url-icon">
                🔗
              </span>

              <input
                type="url"
                value={formData.contentUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contentUrl:
                      e.target.value
                  })
                }
                placeholder="https://github.com/..."
                required
              />

            </div>

            <small>
              Add the URL containing your milestone work.
            </small>

          </div>

          {/* Info */}
          <div className="submission-info-box">

            <div className="submission-info-icon">
              i
            </div>

            <div>
              <strong>Before submitting</strong>

              <p>
                Make sure your submission link is
                accessible to your mentor.
              </p>
            </div>

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
              className="modern-submit-btn submission-submit-btn"
              disabled={loading}
            >
              {loading
                ? 'Submitting...'
                : 'Submit Milestone'}

              {!loading && (
                <span>→</span>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default SubmissionForm;