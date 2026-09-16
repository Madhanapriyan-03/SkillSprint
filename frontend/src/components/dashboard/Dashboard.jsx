import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import StatCards from './StatCards';
import StatusDistributionDonut from './StatusDistributionDonut';
import RecentActivity from './RecentActivity';
import TaskMilestoneVisualizer from './TaskMilestoneVisualizer';
import SkillVelocityChart from './SkillVelocityChart';
import AdaptiveTimeGreeting from './AdaptiveTimeGreeting';

import { fetchRoadmaps } from '../../store/slices/roadmapSlice';
import { fetchEnrollments } from '../../store/slices/enrollmentSlice';
import { fetchSubmissions } from '../../store/slices/submissionSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: roadmaps } = useSelector((state) => state.roadmaps);
  const { items: enrollments } = useSelector((state) => state.enrollments);
  const { items: submissions } = useSelector((state) => state.submissions);

  const dispatch = useDispatch();

  // Load Roadmaps
  useEffect(() => {
    dispatch(fetchRoadmaps({ page: 0, size: 100 }));
  }, [dispatch]);

  // Load Student Data
  useEffect(() => {
    if (user?.role === 'STUDENT') {
      dispatch(fetchEnrollments({ page: 0, size: 100 }));
      dispatch(fetchSubmissions({ page: 0, size: 100 }));
    }
  }, [dispatch, user]);

  // Load Mentor/Manager Submissions
  useEffect(() => {
    if (user?.role === 'MENTOR' || user?.role === 'LEARNING_MANAGER') {
      dispatch(fetchSubmissions({ page: 0, size: 100 }));
    }
  }, [dispatch, user]);

  // Roadmap Metrics
  const activeRoadmaps = roadmaps.filter((r) => r.status === 'PUBLISHED').length;

  // Student Metrics
  const completedEnrollments = enrollments.filter((e) => e.status === 'COMPLETED').length;
  const activeEnrollment = enrollments.find((e) => e.status === 'ACTIVE');

  // Overall Average Progress for Student
  const overallProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((sum, e) => sum + Number(e.progressPercentage || 0), 0) /
            enrollments.length
        )
      : 0;

  // Average Score
  const averageScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce((total, s) => total + Number(s.score || 0), 0) / submissions.length
        )
      : 0;

  // Pending Grading
  const pendingGrading = submissions.filter((s) => s.status === 'PENDING').length;

  // Recent Graded Submissions
  const recentSubmissions = [...submissions]
    .filter((s) => s.score !== null && s.score !== undefined)
    .slice(-3)
    .reverse();

  return (
    <div className="page-container dashboard-page">
      {/* =====================================================
          WELCOME COMMAND CENTER HERO
          ===================================================== */}
      <div className="card dashboard-hero" style={{ marginBottom: '2rem' }}>
        <div className="dashboard-hero-content">
          <div className="dashboard-hero-badge">
            <span>S</span>
          </div>

          <div className="dashboard-hero-text">
            <AdaptiveTimeGreeting userRole={user?.role} />

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <Link
                to="/roadmaps"
                className="btn-primary dashboard-explore-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none'
                }}
              >
                <span>Explore Roadmaps</span>
                <span className="dashboard-btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="dashboard-quote">
          "Progress is a series of small wins."
          <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '2px' }}>SkillSprint Growth Engine</div>
        </div>
      </div>

      {/* Universal Optimistic Quote Banner */}
      <div className="page-quote-banner">
        <div className="page-quote-content">
          <div className="page-quote-icon">🌱</div>
          <div>
            <div className="page-quote-text">
              "An investment in knowledge pays the best interest. Step by step, continuous effort turns curiosity into mastery."
            </div>
            <span className="page-quote-author">— Benjamin Franklin • Study & Mastery Mindset</span>
          </div>
        </div>
        <div className="page-quote-tag">🎓 Continuous Learning</div>
      </div>

      {/* =====================================================
          STUDENT DASHBOARD
          ===================================================== */}
      {user?.role === 'STUDENT' && (
        <>
          {/* Top KPI Metric Cards */}
          <div
            className="dashboard-stats"
            style={{
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >
            <StatCards
              title="My Enrollments"
              value={enrollments.length}
              color="var(--primary)"
            />
            <StatCards
              title="Completed"
              value={completedEnrollments}
              color="#10b981"
            />
            <StatCards
              title="Average Score"
              value={`${averageScore}%`}
              color="#8b5cf6"
            />
          </div>

          {/* Interactive Study Task Visualizer */}
          <TaskMilestoneVisualizer
            roadmaps={roadmaps}
            enrollments={enrollments}
            submissions={submissions}
            userRole={user?.role}
          />

          {/* Learning Progress Section with Circular Ring & Milestone Bars */}
          <div className="card dashboard-section-card" style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '1rem'
              }}
            >
              <div>
                <h2 style={{ marginBottom: '0.35rem' }}>Your Learning Progress</h2>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                  Track your progress across enrolled roadmaps.
                </p>
              </div>

              {enrollments.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--surface-alt)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    Overall Completion:
                  </span>
                  <strong style={{ color: overallProgress === 100 ? '#059669' : 'var(--primary)' }}>
                    {overallProgress}%
                  </strong>
                </div>
              )}
            </div>

            {enrollments.length === 0 ? (
              <div
                className="dashboard-empty"
                style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  color: 'var(--text-muted)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🗺️</div>
                <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                  No Active Enrollments
                </h3>
                <p style={{ maxWidth: '400px', margin: '0 auto 1.25rem' }}>
                  You haven't enrolled in any roadmaps yet. Choose a roadmap and start leveling up!
                </p>
                <Link to="/roadmaps" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Explore Roadmaps
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {enrollments.map((enrollment) => {
                  const progress = Math.min(
                    100,
                    Math.max(0, Number(enrollment.progressPercentage || 0))
                  );

                  return (
                    <div
                      key={enrollment.id}
                      className="dashboard-progress-item"
                      style={{
                        padding: '1.15rem 1.25rem',
                        background: 'var(--surface-alt)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      <div
                        className="dashboard-progress-header"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'var(--primary-light)',
                              color: 'var(--primary)',
                              fontWeight: '700',
                              fontSize: '0.75rem'
                            }}
                          >
                            #{enrollment.roadmapId}
                          </span>
                          <div>
                            <strong style={{ fontSize: '0.95rem' }}>
                              Roadmap #{enrollment.roadmapId}
                            </strong>
                            <span
                              style={{
                                marginLeft: '8px',
                                fontSize: '0.75rem',
                                padding: '2px 8px',
                                borderRadius: '999px',
                                background:
                                  enrollment.status === 'COMPLETED'
                                    ? 'var(--success-light)'
                                    : enrollment.status === 'ACTIVE'
                                    ? 'var(--primary-light)'
                                    : 'var(--danger-light)',
                                color:
                                  enrollment.status === 'COMPLETED'
                                    ? 'var(--success-dark)'
                                    : enrollment.status === 'ACTIVE'
                                    ? 'var(--primary-dark)'
                                    : 'var(--danger-dark)',
                                fontWeight: '700'
                              }}
                            >
                              {enrollment.status}
                            </span>
                          </div>
                        </div>

                        <strong
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem',
                            color: progress === 100 ? '#059669' : 'var(--text-dark)'
                          }}
                        >
                          {progress}%
                        </strong>
                      </div>

                      <div
                        className="dashboard-progress-track"
                        style={{
                          width: '100%',
                          height: '9px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '999px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          className={
                            progress === 100
                              ? 'dashboard-progress-fill completed'
                              : 'dashboard-progress-fill'
                          }
                          style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: progress === 100 ? '#10b981' : '#3b82f6',
                            borderRadius: '999px',
                            transition: 'width 0.4s ease'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Student Feature Cards */}
          <div
            className="dashboard-bottom-sections"
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Continue Learning Card */}
            <div
              className="card dashboard-feature-card"
              style={{
                flex: '1',
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>▶️</span>
                  <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Continue Learning</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                  Pick up where you left off and keep your streak alive.
                </p>

                {activeEnrollment ? (
                  <div
                    className="continue-roadmap-box"
                    style={{
                      padding: '1.15rem',
                      backgroundColor: 'var(--surface-alt)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-dark)' }}>
                        Roadmap #{activeEnrollment.roadmapId}
                      </strong>
                      <span className="status-badge status-active">Active</span>
                    </div>

                    <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      Progress: {Number(activeEnrollment.progressPercentage || 0)}%
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      color: 'var(--text-muted)',
                      padding: '1.5rem 0',
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    No active roadmap right now.
                  </div>
                )}
              </div>

              {activeEnrollment ? (
                <Link
                  to="/enrollments"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1.5rem',
                    textDecoration: 'none'
                  }}
                >
                  View Enrollments →
                </Link>
              ) : (
                <Link
                  to="/roadmaps"
                  className="btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1.5rem',
                    textDecoration: 'none'
                  }}
                >
                  Browse Roadmaps
                </Link>
              )}
            </div>

            {/* Recent Performance Card */}
            <div
              className="card dashboard-feature-card"
              style={{
                flex: '1',
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>⭐</span>
                  <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Recent Performance</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Your latest graded milestone submissions.
                </p>

                {recentSubmissions.length === 0 ? (
                  <div
                    style={{
                      color: 'var(--text-muted)',
                      padding: '1.5rem 0',
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    No graded submissions yet.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {recentSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="performance-item"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem 1rem',
                          background: 'var(--surface-alt)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                            Milestone #{submission.milestoneId}
                          </strong>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--text-muted)',
                              marginTop: '2px'
                            }}
                          >
                            Submission #{submission.id}
                          </div>
                        </div>

                        <strong
                          className="performance-score"
                          style={{
                            fontSize: '0.95rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background:
                              Number(submission.score) >= 50
                                ? 'var(--success-light)'
                                : 'var(--danger-light)',
                            color:
                              Number(submission.score) >= 50 ? '#059669' : '#dc2626'
                          }}
                        >
                          {submission.score}/100
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/submissions"
                className="dashboard-view-link btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1.5rem',
                  textDecoration: 'none'
                }}
              >
                View All Submissions →
              </Link>
            </div>
          </div>
        </>
      )}

      {/* =====================================================
          MANAGER / MENTOR DASHBOARD
          ===================================================== */}
      {(user?.role === 'LEARNING_MANAGER' || user?.role === 'MENTOR') && (
        <>
          {/* Manager / Mentor Statistics */}
          <div
            className="dashboard-stats"
            style={{
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >
            <StatCards
              title="Total Roadmaps"
              value={roadmaps.length}
              color="var(--primary)"
            />
            <StatCards
              title="Active Published"
              value={activeRoadmaps}
              color="#10b981"
            />
            <StatCards
              title="Pending Grading"
              value={pendingGrading}
              color="#f59e0b"
            />
          </div>

          {/* Interactive Curriculum Operations & Tasks Matrix */}
          <TaskMilestoneVisualizer
            roadmaps={roadmaps}
            enrollments={enrollments}
            submissions={submissions}
            userRole={user?.role}
          />

          {/* Manager / Mentor Bottom Visualizations */}
          <div
            className="dashboard-manager-bottom"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            <StatusDistributionDonut />
            <SkillVelocityChart submissions={submissions} />
            <RecentActivity />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;