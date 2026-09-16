import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import SubmissionForm from '../submission/SubmissionForm';
import MilestoneList from './milestone/MilestoneList';
import MilestoneConstellation from './MilestoneConstellation';

const RoadmapDetails = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { items: enrollments } = useSelector(
    (state) => state.enrollments
  );

  const [roadmap, setRoadmap] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Milestone manager modal
  const [showMilestoneManager, setShowMilestoneManager] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        const roadmapResponse = await api.get(`/roadmaps/${id}`);
        setRoadmap(roadmapResponse.data);

        const milestoneResponse = await api.get(
          `/milestones?roadmapId=${id}&page=0&size=100`
        );

        const milestoneData =
          milestoneResponse.data?.content ||
          milestoneResponse.data ||
          [];

        setMilestones(milestoneData);
      } catch (err) {
        console.error('Failed to load roadmap:', err);
        setError(
          err.response?.data?.message ||
          'Failed to load roadmap details'
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const currentEnrollment = enrollments?.find(
    (enrollment) => Number(enrollment.roadmapId) === Number(id)
  );

  const isStudent = user?.role === 'STUDENT';
  const isAdmin =
    user?.role === 'MENTOR' ||
    user?.role === 'LEARNING_MANAGER';
  const canSubmit = isStudent && !!currentEnrollment;

  if (loading) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Loading roadmap details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>Roadmap</h2>
          <p style={{ color: 'var(--danger-dark)', marginTop: '1rem' }}>{error}</p>
          <Link
            to="/roadmaps"
            className="btn-primary"
            style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}
          >
            ← Back to Roadmaps
          </Link>
        </div>
      </div>
    );
  }

  const totalDays = milestones.reduce((sum, m) => sum + (Number(m.expectedDurationDays) || 0), 0);
  const avgPassingScore = milestones.length > 0
    ? Math.round(milestones.reduce((sum, m) => sum + (Number(m.passingScore) || 0), 0) / milestones.length)
    : 0;

  return (
    <div className="page-container roadmap-details-page">
      {/* Universal Optimistic Quote Banner */}
      <div className="page-quote-banner">
        <div className="page-quote-content">
          <div className="page-quote-icon">🎯</div>
          <div>
            <div className="page-quote-text">
              "A journey of a thousand miles begins with a single step. Follow the learning path, submit your deliverables, and achieve true excellence."
            </div>
            <span className="page-quote-author">— Lao Tzu • Milestone Acceleration</span>
          </div>
        </div>
        <div className="page-quote-tag">🏁 {milestones.length} Milestones</div>
      </div>

      {/* Journey Process Metrics Bar */}
      <div className="process-metric-bar">
        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            🚩
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Total Milestones</span>
            <span className="process-metric-val">{milestones.length}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple-accent)' }}>
            ⏱️
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Estimated Days</span>
            <span className="process-metric-val">{totalDays} Days</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            🏆
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Avg Passing Score</span>
            <span className="process-metric-val">{avgPassingScore}/100</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            👥
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Enrolled Cohort</span>
            <span className="process-metric-val">{roadmap?.currentEnrollmentCount || 0}/{roadmap?.maxCapacity || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Roadmap Hero Header Card */}
      <div className="card roadmap-details-card" style={{ marginBottom: '1.5rem' }}>
        {/* Back Link */}
        <Link
          to="/roadmaps"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '1.25rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          ← Back to Roadmaps
        </Link>

        {/* Header Content */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  fontSize: '0.85rem'
                }}
              >
                #{roadmap?.id}
              </span>
              <h1 style={{ margin: 0, fontSize: '1.75rem' }}>{roadmap?.title}</h1>
            </div>

            <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '650px', fontSize: '0.95rem' }}>
              {roadmap?.description || 'Curated skill development roadmap.'}
            </p>
          </div>

          {/* Header Badges & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {isAdmin && roadmap?.status === 'DRAFT' && (
              <button
                className="btn-primary"
                onClick={() => setShowMilestoneManager(true)}
              >
                + Manage Milestones
              </button>
            )}

            <span
              className={
                roadmap?.status === 'PUBLISHED'
                  ? 'status-badge status-published'
                  : 'status-badge status-draft'
              }
            >
              {roadmap?.status}
            </span>
          </div>
        </div>

        {/* Info Metric Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--surface-alt)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Roadmap ID
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-dark)', marginTop: '4px' }}>
              #{roadmap?.id}
            </div>
          </div>

          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--surface-alt)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Max Capacity
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-dark)', marginTop: '4px' }}>
              {roadmap?.maxCapacity || 'N/A'} <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>learners</span>
            </div>
          </div>

          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--surface-alt)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Milestones
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-dark)', marginTop: '4px' }}>
              {milestones.length} <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>stages</span>
            </div>
          </div>
        </div>

        {/* Student Enrollment Status Callout */}
        {canSubmit && (
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--primary-light)',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🎓</span>
              <div>
                <strong style={{ color: 'var(--primary-dark)', fontSize: '0.925rem' }}>
                  You are enrolled in this roadmap.
                </strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1px' }}>
                  Enrollment ID: #{currentEnrollment.id}
                </div>
              </div>
            </div>
            <span className="status-badge status-active">Active Learner</span>
          </div>
        )}
      </div>

      {/* Interactive Gamified Skill Constellation Graph */}
      <MilestoneConstellation milestones={milestones} />

      {/* =====================================================
          VERTICAL LEARNING JOURNEY TIMELINE
          ===================================================== */}
      <div className="card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ marginBottom: '0.35rem' }}>Learning Milestones</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
            Complete each milestone stage in sequence to master this domain and earn verification.
          </p>
        </div>

        {milestones.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--text-muted)',
              background: 'var(--surface-alt)'
            }}
          >
            <div style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>⛳</div>
            <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
              No Milestones Configured Yet
            </h3>
            <p style={{ maxWidth: '420px', margin: '0 auto 1rem', fontSize: '0.875rem' }}>
              This roadmap is currently in preparation. Check back soon or contact the roadmap mentor.
            </p>
            {isAdmin && roadmap?.status === 'DRAFT' && (
              <button
                className="btn-primary"
                onClick={() => setShowMilestoneManager(true)}
              >
                + Manage Milestones
              </button>
            )}
          </div>
        ) : (
          <div className="journey-timeline">
            {milestones.map((milestone, index) => {
              const stepNumber = String(index + 1).padStart(2, '0');

              return (
                <div key={milestone.id} className="journey-step">
                  <div className="journey-step-marker">
                    {stepNumber}
                  </div>

                  <div className="journey-card">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                            {index + 1}. {milestone.title}
                          </h3>
                        </div>

                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                          Milestone ID: #{milestone.id}
                        </p>
                      </div>

                      {/* Submit Milestone Button for Enrolled Student */}
                      {canSubmit && (
                        <button
                          className="btn-primary"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
                          onClick={() => setSelectedMilestone(milestone)}
                        >
                          Submit Milestone
                        </button>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        marginTop: '1rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border-light)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                        <strong>Duration:</strong> {milestone.expectedDurationDays || 'N/A'} days
                      </span>

                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                        <strong>Passing Score:</strong> {milestone.passingScore || 'N/A'}/100
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Milestone Management Modal */}
      {showMilestoneManager && roadmap && (
        <MilestoneList
          roadmapId={roadmap.id}
          roadmapTitle={roadmap.title}
          roadmapStatus={roadmap.status}
          onClose={() => setShowMilestoneManager(false)}
        />
      )}

      {/* Submission Modal */}
      {selectedMilestone && currentEnrollment && (
        <SubmissionForm
          item={{
            enrollmentId: currentEnrollment.id,
            milestoneId: selectedMilestone.id,
            contentUrl: ''
          }}
          onClose={() => setSelectedMilestone(null)}
          onSuccess={() => setSelectedMilestone(null)}
        />
      )}
    </div>
  );
};

export default RoadmapDetails;