import React, { useEffect, useState } from 'react';
import submissionService from '../../services/submissionService';

const RecentActivity = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentActivity = async () => {
      try {
        const response = await submissionService.getAll(0, 10);

        const data = Array.isArray(response?.content)
          ? response.content
          : Array.isArray(response)
            ? response
            : [];

        setSubmissions(data);
      } catch (error) {
        console.error(
          'Failed to load recent activity:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecentActivity();
  }, []);

  const getActivityText = (submission) => {
    if (submission.status === 'PASSED') {
      return (
        <>
          Submission #{submission.id} graded successfully
          <br />
          <strong>Score: {submission.score}</strong>
        </>
      );
    }

    if (
      submission.status === 'REJECTED' ||
      submission.status === 'FAILED'
    ) {
      return (
        <>
          Submission #{submission.id} was rejected
          <br />
          <strong>Score: {submission.score}</strong>
        </>
      );
    }

    return (
      <>
        New submission #{submission.id} is pending grading
      </>
    );
  };

  const getStatusStyle = (status) => {
    if (status === 'PASSED') {
      return {
        color: '#16a34a',
        background: '#dcfce7'
      };
    }

    if (
      status === 'REJECTED' ||
      status === 'FAILED'
    ) {
      return {
        color: '#dc2626',
        background: '#fee2e2'
      };
    }

    return {
      color: '#d97706',
      background: '#fef3c7'
    };
  };

  return (
    <div
      className="card"
      style={{
        flex: 1,
        minWidth: '300px'
      }}
    >
      <h3>Recent Activity</h3>

      {loading ? (
        <p
          style={{
            marginTop: '1rem',
            color: 'var(--text-muted)'
          }}
        >
          Loading recent activity...
        </p>
      ) : submissions.length === 0 ? (
        <p
          style={{
            marginTop: '1rem',
            color: 'var(--text-muted)'
          }}
        >
          No recent activity.
        </p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '1rem'
          }}
        >
          {submissions.map((submission) => {
            const statusStyle = getStatusStyle(
              submission.status
            );

            return (
              <li
                key={submission.id}
                style={{
                  padding: '12px 0',
                  borderBottom:
                    '1px solid var(--border)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.95rem'
                      }}
                    >
                      {getActivityText(submission)}
                    </div>

                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '4px'
                      }}
                    >
                      Enrollment ID:{' '}
                      {submission.enrollmentId}
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      color: statusStyle.color,
                      backgroundColor:
                        statusStyle.background
                    }}
                  >
                    {submission.status}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;