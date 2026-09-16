import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * TaskMilestoneVisualizer
 * Interactive task & curriculum visualizer built with real Redux data
 */
const TaskMilestoneVisualizer = ({ roadmaps = [], enrollments = [], submissions = [], userRole }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'capacity'

  const isStudent = userRole === 'STUDENT';

  // Real data metrics
  const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING');
  const activeEnrollments = enrollments.filter((e) => e.status === 'ACTIVE');
  const publishedRoadmaps = roadmaps.filter((r) => r.status === 'PUBLISHED');

  return (
    <div className="card task-visualizer-card" style={{ marginBottom: '2rem' }}>
      {/* Visualizer Header with Interactive Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--purple-accent) 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
          >
            📊
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
              {isStudent ? 'Interactive Study Tasks & Velocity' : 'Curriculum Operations & Task Pipeline'}
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Real-time interactive process visualizer powered by live platform data
            </p>
          </div>
        </div>

        {/* Interactive Tab Toggle */}
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(241, 245, 249, 0.9)',
            padding: '3px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            style={{
              border: 'none',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'tasks' ? '#ffffff' : 'transparent',
              color: activeTab === 'tasks' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.8rem',
              boxShadow: activeTab === 'tasks' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isStudent ? 'Active Tasks' : 'Action Items'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('capacity')}
            style={{
              border: 'none',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'capacity' ? '#ffffff' : 'transparent',
              color: activeTab === 'capacity' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.8rem',
              boxShadow: activeTab === 'capacity' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isStudent ? 'Track Progress' : 'Cohort Utilization'}
          </button>
        </div>
      </div>

      {/* Tab 1: Tasks / Action Items Visualizer */}
      {activeTab === 'tasks' && (
        <div>
          {isStudent ? (
            <div>
              {activeEnrollments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📖</span>
                  No active learning tracks right now. Explore our catalog to enroll in a roadmap!
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {activeEnrollments.map((enroll) => {
                    const prog = Number(enroll.progressPercentage || 0);
                    return (
                      <div
                        key={enroll.id}
                        style={{
                          background: 'rgba(248, 250, 255, 0.8)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>
                              Track #{enroll.roadmapId}
                            </span>
                            <h4 style={{ margin: '4px 0 0', fontSize: '1rem' }}>
                              {enroll.roadmapTitle || `Enrolled Roadmap #${enroll.roadmapId}`}
                            </h4>
                          </div>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              background: prog === 100 ? 'var(--success-light)' : 'var(--primary-light)',
                              color: prog === 100 ? 'var(--success-dark)' : 'var(--primary-dark)',
                              fontSize: '0.75rem',
                              fontWeight: '700'
                            }}
                          >
                            {prog}% Done
                          </span>
                        </div>

                        {/* Visual Progress Meter */}
                        <div>
                          <div
                            style={{
                              height: '8px',
                              background: '#e2e8f0',
                              borderRadius: '999px',
                              overflow: 'hidden',
                              marginTop: '4px'
                            }}
                          >
                            <div
                              style={{
                                width: `${prog}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #2563eb, #8b5cf6)',
                                borderRadius: '999px',
                                transition: 'width 0.4s ease'
                              }}
                            />
                          </div>
                        </div>

                        <button
                          className="btn-primary"
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.8rem',
                            alignSelf: 'flex-start',
                            marginTop: '0.25rem'
                          }}
                          onClick={() => navigate(`/roadmaps/${enroll.roadmapId}`)}
                        >
                          Continue Learning →
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Mentor Action Pipeline */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {/* Pending Grading Queue */}
                <div
                  style={{
                    background: 'rgba(254, 243, 199, 0.4)',
                    border: '1px solid #fde68a',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#92400e' }}>
                      ⏳ Submissions Awaiting Grading
                    </h4>
                    <span
                      style={{
                        background: '#f59e0b',
                        color: '#ffffff',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '800'
                      }}
                    >
                      {pendingSubmissions.length}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.825rem', color: '#78350f' }}>
                    {pendingSubmissions.length > 0
                      ? 'Student deliverables are waiting for your evaluation and feedback score.'
                      : 'All student submissions have been evaluated. Great job!'}
                  </p>
                  <button
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => navigate('/submissions')}
                  >
                    View Submission Queue →
                  </button>
                </div>

                {/* Published Roadmaps Summary */}
                <div
                  style={{
                    background: 'rgba(239, 246, 255, 0.6)',
                    border: '1px solid #bfdbfe',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#1e40af' }}>
                      🚀 Live Published Tracks
                    </h4>
                    <span
                      style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '800'
                      }}
                    >
                      {publishedRoadmaps.length}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.825rem', color: '#1e3a8a' }}>
                    Active curricula open for learner enrollments and milestone progression.
                  </p>
                  <button
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => navigate('/roadmaps')}
                  >
                    Manage Curricula →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Capacity & Utilization Process Bar Chart */}
      {activeTab === 'capacity' && (
        <div>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Curriculum Cohort Capacity & Fill Rate (Real Data)
          </h4>

          {publishedRoadmaps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No published roadmaps available yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {publishedRoadmaps.map((r) => {
                const max = Number(r.maxCapacity) || 1;
                const current = Number(r.currentEnrollmentCount) || 0;
                const fillPercent = Math.min(100, Math.round((current / max) * 100));

                return (
                  <div
                    key={r.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>
                        #{r.id} {r.title}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {current} / {max} Enrolled ({fillPercent}%)
                      </span>
                    </div>

                    <div
                      style={{
                        height: '10px',
                        background: '#e2e8f0',
                        borderRadius: '999px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${fillPercent}%`,
                          height: '100%',
                          background:
                            fillPercent >= 90
                              ? '#ef4444'
                              : fillPercent >= 70
                              ? '#f59e0b'
                              : '#10b981',
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
      )}
    </div>
  );
};

export default TaskMilestoneVisualizer;
