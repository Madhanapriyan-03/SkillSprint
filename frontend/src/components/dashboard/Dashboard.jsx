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


  // =====================================================
  // LOAD ROADMAPS
  // =====================================================

  useEffect(() => {
    dispatch(
      fetchRoadmaps({
        page: 0,
        size: 100
      })
    );
  }, [dispatch]);


  // =====================================================
  // LOAD ENROLLMENTS + SUBMISSIONS
  // FOR ALL AUTHENTICATED USERS
  // =====================================================

  useEffect(() => {
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
  }, [dispatch]);


  // =====================================================
  // ROADMAP STATISTICS
  // =====================================================

  const activeRoadmaps = roadmaps.filter(
    (roadmap) =>
      roadmap.status === 'PUBLISHED'
  ).length;


  // =====================================================
  // ENROLLMENT STATISTICS
  // =====================================================

  const completedEnrollments =
    enrollments.filter(
      (enrollment) =>
        enrollment.status === 'COMPLETED'
    ).length;

  const activeEnrollments =
    enrollments.filter(
      (enrollment) =>
        enrollment.status === 'ACTIVE'
    ).length;

  const droppedEnrollments =
    enrollments.filter(
      (enrollment) =>
        enrollment.status === 'DROPPED'
    ).length;


  // =====================================================
  // PENDING GRADING
  // =====================================================

  const pendingGrading =
    submissions.filter(
      (submission) =>
        submission.status === 'PENDING'
    ).length;


  // =====================================================
  // AVERAGE SCORE
  // =====================================================

  const gradedSubmissions =
    submissions.filter(
      (submission) =>
        submission.score !== null &&
        submission.score !== undefined
    );

  const averageScore =
    gradedSubmissions.length > 0
      ? Math.round(
          gradedSubmissions.reduce(
            (total, submission) =>
              total +
              Number(
                submission.score || 0
              ),
            0
          ) /
          gradedSubmissions.length
        )
      : 0;


  // =====================================================
  // RECENT SUBMISSIONS
  // =====================================================

  const recentSubmissions =
    [...submissions]
      .filter(
        (submission) =>
          submission.score !== null &&
          submission.score !== undefined
      )
      .slice(-3)
      .reverse();


  // =====================================================
  // RECENT ACTIVITY
  // =====================================================

  const recentActivities =
    [...submissions]
      .slice(-5)
      .reverse();


  // =====================================================
  // STUDENT ACTIVE ENROLLMENT
  // =====================================================

  const activeEnrollment =
    enrollments.find(
      (enrollment) =>
        enrollment.status === 'ACTIVE'
    );


  return (
    <div className="page-container">

      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <div
        className="card dashboard-hero"
        style={{
          marginBottom: '2rem'
        }}
      >

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
          className="btn-primary"
          style={{
            display: 'inline-block',
            backgroundColor: 'white',
            color: 'var(--primary)',
            marginTop: '1rem',
            textDecoration: 'none'
          }}
        >
          Explore Roadmaps →
        </Link>

      </div>


      {/* =================================================
          STUDENT DASHBOARD
      ================================================= */}

      {user?.role === 'STUDENT' && (

        <>

          {/* Statistics */}

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


          {/* Learning Progress */}

          <div
            className="card"
            style={{
              marginBottom: '2rem'
            }}
          >

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
              Track your progress across
              enrolled roadmaps.
            </p>


            {enrollments.length === 0 ? (

              <div
                style={{
                  color: 'var(--text-muted)',
                  padding: '1rem 0'
                }}
              >
                No enrollments yet.
              </div>

            ) : (

              enrollments.map(
                (enrollment) => {

                  const progress = Math.min(
                    100,
                    Math.max(
                      0,
                      Number(
                        enrollment
                          .progressPercentage || 0
                      )
                    )
                  );

                  return (

                    <div
                      key={enrollment.id}
                      style={{
                        marginBottom: '1.25rem'
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',
                          justifyContent:
                            'space-between',
                          marginBottom: '6px'
                        }}
                      >

                        <div>

                          <strong>
                            Roadmap #
                            {enrollment.roadmapId}
                          </strong>

                          <div
                            style={{
                              fontSize: '0.8rem',
                              color:
                                'var(--text-muted)',
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
                        style={{
                          width: '100%',
                          height: '10px',
                          backgroundColor:
                            '#e5e7eb',
                          borderRadius: '999px',
                          overflow: 'hidden'
                        }}
                      >

                        <div
                          style={{
                            width:
                              `${progress}%`,
                            height: '100%',
                            backgroundColor:
                              progress === 100
                                ? '#10b981'
                                : '#3b82f6',
                            borderRadius: '999px',
                            transition:
                              'width 0.4s ease'
                          }}
                        />

                      </div>

                    </div>

                  );
                }
              )

            )}

          </div>


          {/* Bottom Sections */}

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >

            {/* Continue Learning */}

            <div
              className="card"
              style={{
                flex: '1',
                minWidth: '300px'
              }}
            >

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
                    style={{
                      padding: '1rem',
                      backgroundColor:
                        '#f8fafc',
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
                      {
                        activeEnrollment
                          .roadmapId
                      }
                    </strong>

                    <p
                      style={{
                        marginTop: '6px',
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      Progress:{' '}
                      {Number(
                        activeEnrollment
                          .progressPercentage ||
                        0
                      )}
                      %
                    </p>

                  </div>

                  <Link
                    to="/enrollments"
                    className="btn-primary"
                    style={{
                      display:
                        'inline-block',
                      marginTop: '1rem',
                      textDecoration:
                        'none'
                    }}
                  >
                    View Enrollments
                  </Link>

                </>

              ) : (

                <div
                  style={{
                    color:
                      'var(--text-muted)',
                    padding: '1rem 0'
                  }}
                >
                  No active roadmap right now.
                </div>

              )}

            </div>


            {/* Recent Performance */}

            <div
              className="card"
              style={{
                flex: '1',
                minWidth: '300px'
              }}
            >

              <h2>
                Recent Performance
              </h2>

              <p
                style={{
                  color:
                    'var(--text-muted)',
                  marginTop: '6px',
                  marginBottom: '1rem'
                }}
              >
                Your latest graded submissions.
              </p>


              {recentSubmissions.length === 0 ? (

                <div
                  style={{
                    color:
                      'var(--text-muted)',
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
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
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
                            color:
                              'var(--text-muted)',
                            marginTop: '2px'
                          }}
                        >
                          Submission #
                          {submission.id}
                        </div>

                      </div>

                      <strong
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


      {/* =================================================
          MANAGER / MENTOR DASHBOARD
      ================================================= */}

      {(user?.role === 'LEARNING_MANAGER' ||
        user?.role === 'MENTOR') && (

        <>

          {/* Statistics */}

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
              value={pendingGrading}
              color="#f59e0b"
            />

          </div>


          {/* Dashboard Analytics */}

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >

            <StatusDistributionDonut
              completed={completedEnrollments}
              active={activeEnrollments}
              dropped={droppedEnrollments}
            />

            <RecentActivity
              activities={recentActivities}
            />

          </div>

        </>

      )}

    </div>
  );
};

export default Dashboard;