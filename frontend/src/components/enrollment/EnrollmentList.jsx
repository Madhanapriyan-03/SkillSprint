import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrollments } from '../../store/slices/enrollmentSlice';
import EmptyState from '../common/EmptyState';
import EnrollmentJourneyFlow from '../common/EnrollmentJourneyFlow';

const EnrollmentList = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.enrollments
  );

  const [showModal, setShowModal] = useState(false);
  const [roadmapIdInput, setRoadmapIdInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    dispatch(
      fetchEnrollments({
        page: 0,
        size: 20
      })
    );
  }, [dispatch]);

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!roadmapIdInput) return;

    try {
      const enrollmentService = (
        await import('../../services/enrollmentService')
      ).default;

      await enrollmentService.create({
        roadmapId: parseInt(roadmapIdInput)
      });

      setShowModal(false);
      setRoadmapIdInput('');

      alert('Successfully enrolled!');

      dispatch(
        fetchEnrollments({
          page: 0,
          size: 20
        })
      );
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
        'Failed to enroll'
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'status-badge status-completed';
      case 'ACTIVE':
        return 'status-badge status-active';
      case 'DROPPED':
        return 'status-badge status-dropped';
      default:
        return 'status-badge';
    }
  };

  const getProgress = (enrollment) => {
    const progress = Number(
      enrollment.progressPercentage || 0
    );

    return Math.min(
      100,
      Math.max(0, progress)
    );
  };

  const activeCount = items.filter(e => e.status === 'ACTIVE').length;
  const completedCount = items.filter(e => e.status === 'COMPLETED').length;
  const avgProgress = items.length > 0
    ? Math.round(items.reduce((sum, e) => sum + Number(e.progressPercentage || 0), 0) / items.length)
    : 0;

  return (
    <div className="page-container enrollments-page">
      {/* Universal Optimistic Quote Banner */}
      <div className="page-quote-banner">
        <div className="page-quote-content">
          <div className="page-quote-icon">📚</div>
          <div>
            <div className="page-quote-text">
              "Education is not the learning of facts, but the training of the mind to think. Stay consistent, track your milestones, and master your field."
            </div>
            <span className="page-quote-author">— Albert Einstein • Lifelong Study Mindset</span>
          </div>
        </div>
        <div className="page-quote-tag">🚀 Skill Trajectory</div>
      </div>

      {/* Enrollment Health Process Metrics Bar */}
      <div className="process-metric-bar">
        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            🎯
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Enrolled Paths</span>
            <span className="process-metric-val">{items.length}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            🔥
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Active Learning</span>
            <span className="process-metric-val">{activeCount}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple-accent)' }}>
            🎓
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Completed</span>
            <span className="process-metric-val">{completedCount}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            📊
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Avg Progress</span>
            <span className="process-metric-val">{avgProgress}%</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '0.85rem'
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem' }}>My Enrolled Roadmaps</h2>
            <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Manage active learning paths and track your milestone progress
            </p>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Enroll in Roadmap
          </button>
        </div>

        {/* Enrollment Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 0', color: 'var(--text-muted)' }}>
            <div
              style={{
                display: 'inline-block',
                width: '36px',
                height: '36px',
                border: '3px solid var(--border)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                animation: 'spinOrbitTrack 0.8s linear infinite',
                marginBottom: '1rem'
              }}
            />
            <p style={{ fontWeight: '600' }}>Loading your learning enrollments...</p>
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon="🎓"
            title="No Active Enrollments"
            entityName="Enrollments"
            message="You have not enrolled in any roadmaps yet."
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>Enrollment</th>
                  <th>Roadmap</th>
                  <th style={{ width: '140px' }}>Status</th>
                  <th style={{ minWidth: '220px' }}>Progress</th>
                </tr>
              </thead>

              <tbody>
                {items.map((enroll) => {
                  const progress = getProgress(enroll);

                  return (
                    <tr key={enroll.id}>
                      {/* Enrollment ID */}
                      <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>
                        #{enroll.id}
                      </td>

                      {/* Roadmap */}
                      <td>
                        <div style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                          Roadmap #{enroll.roadmapId}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Skill Development Track
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={getStatusClass(enroll.status)}>
                          {enroll.status}
                        </span>
                      </td>

                      {/* Progress */}
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '6px',
                            fontSize: '0.85rem'
                          }}
                        >
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            Completion
                          </span>
                          <strong
                            style={{
                              color: progress === 100 ? '#059669' : 'var(--text-dark)',
                              fontFamily: 'var(--font-heading)'
                            }}
                          >
                            {progress}%
                          </strong>
                        </div>

                        {/* Progress Bar */}
                        <div
                          style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '999px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              width: `${progress}%`,
                              height: '100%',
                              backgroundColor: progress === 100 ? '#10b981' : '#3b82f6',
                              borderRadius: '999px',
                              transition: 'width 0.4s ease'
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Unique Live Animated Skill Trajectory & Journey Flow */}
      <EnrollmentJourneyFlow enrollments={items} />

      {/* Enroll Modal */}
      {showModal && (
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
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            {errorMsg && (
              <div className="login-error" style={{ marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleEnrollSubmit} className="modern-modal-form">
              <div className="modern-form-group">
                <label>
                  Roadmap ID <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  value={roadmapIdInput}
                  onChange={(e) => setRoadmapIdInput(e.target.value)}
                  placeholder="e.g. 1"
                  required
                />
                <small>Enter the numeric ID of the roadmap you wish to join.</small>
              </div>

              <div className="modern-modal-actions">
                <button
                  type="button"
                  className="modern-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modern-submit-btn">
                  Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;