import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import StatCards from './StatCards';
import StatusDistributionDonut from './StatusDistributionDonut';
import RecentActivity from './RecentActivity';

import { fetchRoadmaps } from '../../store/slices/roadmapSlice';
import { fetchEnrollments } from '../../store/slices/enrollmentSlice';
import { fetchSubmissions } from '../../store/slices/submissionSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const { items: roadmaps } = useSelector(
    (state) => state.roadmaps
  );

  const { items: enrollments } = useSelector(
    (state) => state.enrollments
  );

  const { items: submissions } = useSelector(
    (state) => state.submissions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchRoadmaps({
        page: 0,
        size: 100
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      dispatch(
        fetchEnrollments({
          page: 0,
          size: 100
        })
      );

      dispatch(
        fetchSubmissions({
          page: 0,
          size: 100
        })
      );
    }
  }, [dispatch, user]);

  const activeRoadmaps = roadmaps.filter(
    (r) => r.status === 'PUBLISHED'
  ).length;

  const completedEnrollments = enrollments.filter(
    (e) => e.status === 'COMPLETED'
  ).length;

  const activeEnrollment = enrollments.find(
    (e) => e.status === 'ACTIVE'
  );

  const averageScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce(
            (total, submission) =>
              total + Number(submission.score || 0),
            0
          ) / submissions.length
        )
      : 0;

  const recentSubmissions = [...submissions]
    .filter(
      (submission) =>
        submission.score !== null &&
        submission.score !== undefined
    )
    .slice(-3)
    .reverse();

  return (
    <div className="page-container dashboard-page">

      {/* Decorative background elements */}
      <div className="dashboard-decoration dashboard-decoration-one"></div>
      <div className="dashboard-decoration dashboard-decoration-two"></div>
      <div className="dashboard-decoration dashboard-decoration-three"></div>

      {/* Small learning notes */}
      <div className="dashboard-note dashboard-note-left">
        Learn
        <br />
        Build
        <br />
        Grow
        <span>↗</span>
      </div>

      <div className="dashboard-note dashboard-note-right">
        Small
        <br />
        Steps
        <br />
        Big Progress
        <span>↗</span>
      </div>

      {/* =====================================================
          WELCOME SECTION
          ===================================================== */}

      <div
        className="card dashboard-hero"
        style={{
          marginBottom: '2rem'
        }}
      >

        <div className="dashboard-hero-content">

          <div className="dashboard-hero-badge">
            <span>S</span>
          </div>

          <div className="dashboard-hero-text">

            <h1>
              Welcome back, {user?.role}!
            </h1>

            <p
              style={{
                marginTop: '0.5rem',
                opacity: 0.9
              }}
            >
              Here's what's happening with your
              learning roadmaps today.
            </p>

            <Link
              to="/roadmaps"
              className="btn-primary dashboard-explore-btn"
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                color: 'var(--primary)',
                marginTop: '1rem',
                textDecoration: 'none'
              }}
            >
              Explore Roadmaps
              <span className="dashboard-btn-arrow">
                →
              </span>
            </Link>

          </div>

        </div>

        {/* Hero decorative artwork */}

        <div className="dashboard-hero-circle hero-circle-one"></div>
        <div className="dashboard-hero-circle hero-circle-two"></div>

        <div className="dashboard-mountains">
          <div className="dashboard-mountain mountain-one"></div>
          <div className="dashboard-mountain mountain-two"></div>
          <div className="dashboard-mountain mountain-three"></div>

          <div className="dashboard-learning-path"></div>
        </div>

        <div className="dashboard-quote">
          <span>"</span>
          Progress is a series
          <br />
          of small wins.
          <div></div>
        </div>

      </div>


      {/* =====================================================
          STUDENT DASHBOARD
          ===================================================== */}

      {user?.role === 'STUDENT' && (
        <>

          {/* =================================================
              STATISTICS
              ================================================= */}

          <div
            className="dashboard-stats"
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >

            <StatCards
              title="My Enrollments"
              value={enrollments.length}
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


          {/* =================================================
              LEARNING PROGRESS
              ================================================= */}

          <div
            className="card dashboard-section-card"
            style={{
              marginBottom: '2rem'
            }}
          >

            <div className="dashboard-section-heading">

              <div>
                <div className="section-icon">
                  ✦
                </div>

                <h2
                  style={{
                    marginBottom: '0.4rem'
                  }}
                >
                  Your Learning Progress
                </h2>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem'
                  }}
                >
                  Track your progress across enrolled
                  roadmaps.
                </p>
              </div>

            </div>


            {enrollments.length === 0 ? (

              <div
                className="dashboard-empty"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'var(--text-muted)'
                }}
              >

                <div className="dashboard-empty-icon">
                  ○
                </div>

                <p>
                  You haven't enrolled in any
                  roadmaps yet.
                </p>

                <Link
                  to="/roadmaps"
                  className="btn-primary"
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  Explore Roadmaps
                </Link>

              </div>

            ) : (

              enrollments.map((enrollment) => {

                const progress = Math.min(
                  100,
                  Math.max(
                    0,
                    Number(
                      enrollment.progressPercentage || 0
                    )
                  )
                );

                return (
                  <div
                    key={enrollment.id}
                    className="dashboard-progress-item"
                    style={{
                      marginBottom: '1.25rem'
                    }}
                  >

                    <div
                      className="dashboard-progress-header"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}
                    >

                      <div>

                        <strong>
                          Roadmap #{enrollment.roadmapId}
                        </strong>

                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            marginTop: '2px'
                          }}
                        >
                          {enrollment.status}
                        </div>

                      </div>

                      <strong
                        style={{
                          color:
                            progress === 100
                              ? '#059669'
                              : 'var(--text-dark)'
                        }}
                      >
                        {progress}%
                      </strong>

                    </div>


                    <div
                      className="dashboard-progress-track"
                      style={{
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#e5e7eb',
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
                          backgroundColor:
                            progress === 100
                              ? '#10b981'
                              : '#3b82f6',
                          borderRadius: '999px',
                          transition: 'width 0.4s ease'
                        }}
                      />

                    </div>

                  </div>
                );
              })

            )}

          </div>


          {/* =================================================
              BOTTOM SECTIONS
              Existing order preserved
              ================================================= */}

          <div
            className="dashboard-bottom-sections"
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >

            {/* =================================================
                CONTINUE LEARNING
                ================================================= */}

            <div
              className="card dashboard-feature-card"
              style={{
                flex: '1',
                minWidth: '300px'
              }}
            >

              <div className="feature-card-top">
                <div className="feature-icon">
                  ▶
                </div>
              </div>

              <h2>
                Continue Learning
              </h2>

              <p
                style={{
                  color: 'var(--text-muted)',
                  marginTop: '6px',
                  marginBottom: '1.5rem'
                }}
              >
                Pick up where you left off.
              </p>


              {activeEnrollment ? (

                <>

                  <div
                    className="continue-roadmap-box"
                    style={{
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border:
                        '1px solid var(--border)'
                    }}
                  >

                    <strong
                      style={{
                        fontSize: '1.05rem'
                      }}
                    >
                      Roadmap #
                      {activeEnrollment.roadmapId}
                    </strong>

                    <p
                      style={{
                        marginTop: '6px',
                        color: 'var(--text-muted)'
                      }}
                    >
                      Progress:{' '}
                      {Number(
                        activeEnrollment.progressPercentage || 0
                      )}
                      %
                    </p>

                  </div>


                  <Link
                    to="/enrollments"
                    className="btn-primary"
                    style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                      textDecoration: 'none'
                    }}
                  >
                    View Enrollments →
                  </Link>

                </>

              ) : (

                <div
                  style={{
                    color: 'var(--text-muted)',
                    padding: '1rem 0'
                  }}
                >
                  No active roadmap right now.
                </div>

              )}

            </div>


            {/* =================================================
                RECENT PERFORMANCE
                ================================================= */}

            <div
              className="card dashboard-feature-card"
              style={{
                flex: '1',
                minWidth: '300px'
              }}
            >

              <div className="feature-card-top">
                <div className="feature-icon score-icon">
                  ★
                </div>
              </div>

              <h2>
                Recent Performance
              </h2>

              <p
                style={{
                  color: 'var(--text-muted)',
                  marginTop: '6px',
                  marginBottom: '1rem'
                }}
              >
                Your latest graded submissions.
              </p>


              {recentSubmissions.length === 0 ? (

                <div
                  style={{
                    color: 'var(--text-muted)',
                    padding: '1rem 0'
                  }}
                >
                  No graded submissions yet.
                </div>

              ) : (

                recentSubmissions.map(
                  (submission) => (

                    <div
                      key={submission.id}
                      className="performance-item"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.8rem 0',
                        borderBottom:
                          '1px solid var(--border)'
                      }}
                    >

                      <div>

                        <strong>
                          Milestone #
                          {submission.milestoneId}
                        </strong>

                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            marginTop: '2px'
                          }}
                        >
                          Submission #
                          {submission.id}
                        </div>

                      </div>


                      <strong
                        className="performance-score"
                        style={{
                          color:
                            Number(
                              submission.score
                            ) >= 50
                              ? '#059669'
                              : '#dc2626'
                        }}
                      >
                        {submission.score}/100
                      </strong>

                    </div>

                  )
                )

              )}


              <Link
                to="/submissions"
                className="dashboard-view-link"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem'
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

      {(user?.role === 'LEARNING_MANAGER' ||
        user?.role === 'MENTOR') && (
        <>

          <div
            className="dashboard-stats"
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >

            <StatCards
              title="Total Roadmaps"
              value={roadmaps.length}
            />

            <StatCards
              title="Active Published"
              value={activeRoadmaps}
              color="#10b981"
            />

            <StatCards
              title="Pending Grading"
              value="12"
              color="#f59e0b"
            />

          </div>


          <div
            className="dashboard-manager-bottom"
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >

            <StatusDistributionDonut />

            <RecentActivity />

          </div>

        </>
      )}

    </div>
  );
};

export default Dashboard;