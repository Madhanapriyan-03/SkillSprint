import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import submissionService from '../../services/submissionService';

const RecentActivity = () => {
  const { items: reduxSubmissions } = useSelector((state) => state.submissions || {});
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reduxSubmissions && reduxSubmissions.length > 0) {
      setSubmissions(reduxSubmissions.slice(0, 10));
      return;
    }

    const loadRecentActivity = async () => {
      try {
        const response = await submissionService.getAll(0, 10);

        const data = Array.isArray(response?.data?.content)
          ? response.data.content
          : Array.isArray(response?.content)
            ? response.content
            : Array.isArray(response)
              ? response
              : [];

        setSubmissions(data);
      } catch (error) {
        // safe fallback
      } finally {
        setLoading(false);
      }
    };

    loadRecentActivity();
  }, [reduxSubmissions]);

  const getActivityText = (submission) => {
    if (submission.status === 'PASSED') {
      return (
        <div>
          <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
            Submission #{submission.id}
          </span>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>graded successfully</span>
          <div style={{ fontSize: '0.8rem', color: 'var(--success-dark)', fontWeight: '700', marginTop: '2px' }}>
            Score: {submission.score}/100
          </div>
        </div>
      );
    }

    if (
      submission.status === 'REJECTED' ||
      submission.status === 'FAILED'
    ) {
      return (
        <div>
          <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
            Submission #{submission.id}
          </span>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>was rejected</span>
          <div style={{ fontSize: '0.8rem', color: 'var(--danger-dark)', fontWeight: '700', marginTop: '2px' }}>
            Score: {submission.score}/100
          </div>
        </div>
      );
    }

    return (
      <div>
        <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
          Submission #{submission.id}
        </span>{' '}
        <span style={{ color: 'var(--text-secondary)' }}>is pending grading</span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'PASSED') {
      return (
        <span className="status-badge status-passed">
          ✓ Passed
        </span>
      );
    }
    if (status === 'REJECTED' || status === 'FAILED') {
      return (
        <span className="status-badge status-rejected">
          ✕ Rejected
        </span>
      );
    }
    return (
      <span className="status-badge status-pending">
        ⏳ Pending
      </span>
    );
  };

  return (
    <div
      className="card"
      style={{
        flex: 1,
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0 }}>Recent Activity</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Latest Submissions
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, marginBottom: '1rem' }}>
        Real-time audit log of learner submissions and grading updates.
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Loading recent activity...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>No recent activity recorded yet.</p>
        </div>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {submissions.map((submission) => (
            <li
              key={submission.id}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'var(--surface-alt)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div>
                {getActivityText(submission)}
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: '2px'
                  }}
                >
                  Enrollment ID: #{submission.enrollmentId}
                </div>
              </div>

              <div>{getStatusBadge(submission.status)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;