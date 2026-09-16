import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions } from '../../store/slices/submissionSlice';
import EmptyState from '../common/EmptyState';
import StudyMasteryWheel from '../common/StudyMasteryWheel';
import SubmissionForm from './SubmissionForm';
import SubmissionScoreGauge from './SubmissionScoreGauge';
import submissionService from '../../services/submissionService';

const SubmissionList = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.submissions
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showModal, setShowModal] = useState(false);

  // Grading state
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState('');

  useEffect(() => {
    dispatch(
      fetchSubmissions({
        page: 0,
        size: 20
      })
    );
  }, [dispatch]);

  const canGrade =
    user?.role === 'MENTOR' ||
    user?.role === 'LEARNING_MANAGER';

  const isStudent = user?.role === 'STUDENT';

  const openGradeModal = (submission) => {
    setSelectedSubmission(submission);
    setScore('');
    setGradeError('');
    setShowGradeModal(true);
  };

  const closeGradeModal = () => {
    setShowGradeModal(false);
    setSelectedSubmission(null);
    setScore('');
    setGradeError('');
  };

  const handleGrade = async (e) => {
    e.preventDefault();

    if (score === '' || Number(score) < 0 || Number(score) > 100) {
      setGradeError('Score must be between 0 and 100.');
      return;
    }

    setGrading(true);
    setGradeError('');

    try {
      await submissionService.grade(selectedSubmission.id, {
        score: Number(score)
      });

      alert('Submission graded successfully!');
      closeGradeModal();
      dispatch(
        fetchSubmissions({
          page: 0,
          size: 20
        })
      );
    } catch (error) {
      setGradeError(
        error.response?.data?.message ||
        'Failed to grade submission'
      );
    } finally {
      setGrading(false);
    }
  };

  const openSubmissionLink = (url) => {
    if (!url) {
      alert('No submission link available.');
      return;
    }

    let finalUrl = url.trim();

    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const getSubmissionUrl = (submission) => {
    return submission?.contentUrl || submission?.url || '';
  };

  const passedCount = items.filter(s => s.status === 'PASSED').length;
  const pendingCount = items.filter(s => s.status === 'PENDING').length;
  const scoredItems = items.filter(s => s.score !== null && s.score !== undefined);
  const avgScore = scoredItems.length > 0
    ? Math.round(scoredItems.reduce((sum, s) => sum + Number(s.score), 0) / scoredItems.length)
    : 'N/A';

  return (
    <div className="page-container submissions-page">
      {/* Universal Optimistic Quote Banner */}
      <div className="page-quote-banner">
        <div className="page-quote-content">
          <div className="page-quote-icon">💡</div>
          <div>
            <div className="page-quote-text">
              "Feedback is the breakfast of champions. Build with purpose, submit your deliverables, and iterate towards mastery."
            </div>
            <span className="page-quote-author">— Ken Blanchard • Evaluation & Growth</span>
          </div>
        </div>
        <div className="page-quote-tag">⚡ Milestone Review</div>
      </div>

      {/* Evaluation Process Metrics Bar */}
      <div className="process-metric-bar">
        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            📁
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Total Submissions</span>
            <span className="process-metric-val">{items.length}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            ✓
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Graded & Passed</span>
            <span className="process-metric-val">{passedCount}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            ⏳
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Pending Review</span>
            <span className="process-metric-val">{pendingCount}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple-accent)' }}>
            🌟
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Average Score</span>
            <span className="process-metric-val">{avgScore}{avgScore !== 'N/A' ? '/100' : ''}</span>
          </div>
        </div>
      </div>

      <div className="card">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Submissions</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.875rem' }}>
              Review milestone deliverables, track feedback, and assign evaluation scores.
            </p>
          </div>

          {isStudent && (
            <button
              className="btn-primary"
              onClick={() => setShowModal(true)}
            >
              + New Submission
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading submissions...
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            entityName="Submissions"
            message="No submissions found."
            onAction={isStudent ? () => setShowModal(true) : null}
          />
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '130px' }}>Enrollment ID</th>
                  <th style={{ width: '130px' }}>Milestone</th>
                  <th>Submission Link</th>
                  <th style={{ width: '140px' }}>Status</th>
                  <th style={{ width: '110px' }}>Score</th>
                  {canGrade && <th style={{ width: '130px' }}>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {items.map((sub) => {
                  const submissionUrl = getSubmissionUrl(sub);

                  return (
                    <tr key={sub.id}>
                      {/* Enrollment ID */}
                      <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>
                        #{sub.enrollmentId}
                      </td>

                      {/* Milestone */}
                      <td>
                        <strong style={{ color: 'var(--text-dark)' }}>
                          Milestone #{sub.milestoneId ?? 'N/A'}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Submission #{sub.id}
                        </div>
                      </td>

                      {/* Submission Link */}
                      <td>
                        {submissionUrl ? (
                          <button
                            type="button"
                            onClick={() => openSubmissionLink(submissionUrl)}
                            style={{
                              border: 'none',
                              background: 'var(--primary-light)',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              color: 'var(--primary)',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '0.8125rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              transition: 'all 0.15s ease'
                            }}
                            title={submissionUrl}
                          >
                            🔗 View Submission
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                            No link provided
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={
                            sub.status === 'PASSED'
                              ? 'status-badge status-passed'
                              : sub.status === 'REJECTED' || sub.status === 'FAILED'
                              ? 'status-badge status-rejected'
                              : 'status-badge status-pending'
                          }
                        >
                          {sub.status}
                        </span>
                      </td>

                      {/* Score */}
                      <td>
                        {sub.score !== null && sub.score !== undefined ? (
                          <SubmissionScoreGauge score={sub.score} passingScore={50} />
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            N/A
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      {canGrade && (
                        <td>
                          {sub.status === 'PENDING' ? (
                            <button
                              className="btn-primary"
                              style={{
                                padding: '4px 12px',
                                fontSize: '0.8125rem'
                              }}
                              onClick={() => openGradeModal(sub)}
                            >
                              Grade
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                              Evaluated
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Interactive Evaluation Orbit Showcase Card (Placed Down) */}
      <div
        className="card"
        style={{
          marginTop: '1.75rem',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.96) 60%, rgba(30, 27, 75, 0.94) 100%)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 16px 36px -8px rgba(11, 19, 43, 0.35)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.35rem' }}>⚡</span>
            <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem' }}>
              Interactive Milestone Evaluation Engine
            </h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Every deliverable passes through automated & mentor evaluation stages. Write clean code, submit repository links, receive rapid grading feedback, and unlock advanced milestone badges.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <strong style={{ display: 'block', color: '#38bdf8', fontSize: '0.8rem' }}>1. Build & Code</strong>
              <span style={{ color: '#94a3b8', fontSize: '0.725rem' }}>Implement task</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <strong style={{ display: 'block', color: '#818cf8', fontSize: '0.8rem' }}>2. Submit Link</strong>
              <span style={{ color: '#94a3b8', fontSize: '0.725rem' }}>Git / demo URL</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <strong style={{ display: 'block', color: '#c084fc', fontSize: '0.8rem' }}>3. Mentor Review</strong>
              <span style={{ color: '#94a3b8', fontSize: '0.725rem' }}>{pendingCount} in queue</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <strong style={{ display: 'block', color: '#34d399', fontSize: '0.8rem' }}>4. Verified Score</strong>
              <span style={{ color: '#94a3b8', fontSize: '0.725rem' }}>{avgScore}% avg score</span>
            </div>
          </div>
        </div>

        {/* Rotating Evaluation Wheel in Bottom Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <StudyMasteryWheel variant="submission" size={190} speed={20} />
          <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93c5fd' }}>
            Evaluation Orbit
          </span>
        </div>
      </div>

      {/* Student New Submission Modal */}
      {showModal && (
        <SubmissionForm
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            dispatch(fetchSubmissions({ page: 0, size: 20 }));
          }}
        />
      )}

      {/* Mentor Grade Submission Modal */}
      {showGradeModal && selectedSubmission && (
        <div className="modern-modal-overlay">
          <div className="modern-modal" style={{ maxWidth: '480px' }}>
            <div className="modern-modal-header">
              <div className="modern-modal-title-area">
                <div className="modern-modal-icon">
                  📝
                </div>
                <div>
                  <h2>Grade Submission</h2>
                  <p>Assign score and evaluate milestone work</p>
                </div>
              </div>

              <button
                type="button"
                className="modern-modal-close"
                onClick={closeGradeModal}
              >
                ×
              </button>
            </div>

            {gradeError && (
              <div className="login-error" style={{ marginBottom: '1.25rem' }}>
                {gradeError}
              </div>
            )}

            <div
              style={{
                padding: '1rem',
                background: 'var(--surface-alt)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Submission ID:</span>
                <strong>#{selectedSubmission.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Milestone ID:</span>
                <strong>#{selectedSubmission.milestoneId}</strong>
              </div>
              {getSubmissionUrl(selectedSubmission) && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Deliverable:</span>
                  <button
                    type="button"
                    onClick={() => openSubmissionLink(getSubmissionUrl(selectedSubmission))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      padding: 0
                    }}
                  >
                    Open Link ↗
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleGrade} className="modern-modal-form">
              <div className="modern-form-group">
                <label>
                  Score (0 - 100) <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g. 85"
                  required
                />
                <small>Learners score 50 or above to achieve a passing evaluation.</small>
              </div>

              <div className="modern-modal-actions">
                <button
                  type="button"
                  className="modern-cancel-btn"
                  onClick={closeGradeModal}
                  disabled={grading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modern-submit-btn"
                  disabled={grading}
                >
                  {grading ? 'Submitting...' : 'Submit Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionList;