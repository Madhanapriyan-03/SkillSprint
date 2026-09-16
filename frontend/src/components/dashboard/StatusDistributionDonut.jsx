import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrollments } from '../../store/slices/enrollmentSlice';

const StatusDistributionDonut = () => {
  const dispatch = useDispatch();

  const { items: enrollments } = useSelector(
    (state) => state.enrollments
  );

  useEffect(() => {
    dispatch(
      fetchEnrollments({
        page: 0,
        size: 100
      })
    );
  }, [dispatch]);

  const completed = enrollments.filter(
    (e) => e.status === 'COMPLETED'
  ).length;

  const active = enrollments.filter(
    (e) => e.status === 'ACTIVE'
  ).length;

  const dropped = enrollments.filter(
    (e) => e.status === 'DROPPED'
  ).length;

  const total = completed + active + dropped;

  let background = '#e2e8f0';

  if (total > 0) {
    const completedPercent = (completed / total) * 100;
    const activePercent = (active / total) * 100;

    const completedEnd = completedPercent;
    const activeEnd = completedPercent + activePercent;

    background = `conic-gradient(
      #10b981 0% ${completedEnd}%,
      #3b82f6 ${completedEnd}% ${activeEnd}%,
      #ef4444 ${activeEnd}% 100%
    )`;
  }

  return (
    <div
      className="card"
      style={{
        flex: 1,
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>Enrollment Distribution</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            Real-time Status
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
          Distribution of student enrollments across all statuses.
        </p>
      </div>

      {total === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>No enrollment data recorded yet.</p>
        </div>
      ) : (
        <>
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: background,
              margin: '1.5rem auto',
              position: 'relative',
              boxShadow: '0 4px 18px rgba(15, 23, 42, 0.08)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '104px',
                height: '104px',
                borderRadius: '50%',
                background: '#ffffff',
                top: '28px',
                left: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              <strong
                style={{
                  fontSize: '1.65rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-dark)',
                  lineHeight: 1
                }}
              >
                {total}
              </strong>
              <span
                style={{
                  fontSize: '0.725rem',
                  color: 'var(--text-muted)',
                  fontWeight: '700',
                  marginTop: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                Enrollments
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-light)'
            }}
          >
            <div style={{ textAlign: 'center', padding: '6px 4px', background: 'var(--success-light)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: '700' }}>Completed</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--success-dark)', marginTop: '2px' }}>{completed}</div>
            </div>

            <div style={{ textAlign: 'center', padding: '6px 4px', background: 'var(--primary-light)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>Active</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginTop: '2px' }}>{active}</div>
            </div>

            <div style={{ textAlign: 'center', padding: '6px 4px', background: 'var(--danger-light)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--danger-dark)', fontWeight: '700' }}>Dropped</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--danger-dark)', marginTop: '2px' }}>{dropped}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDistributionDonut;