import React, { useEffect, useState } from 'react';
import enrollmentService from '../../services/enrollmentService';

const StatusDistributionDonut = () => {
  const [counts, setCounts] = useState({
    COMPLETED: 0,
    ACTIVE: 0,
    DROPPED: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const response = await enrollmentService.getAll(0, 1000);

        const enrollments = Array.isArray(response?.content)
          ? response.content
          : Array.isArray(response)
            ? response
            : [];

        setCounts({
          COMPLETED: enrollments.filter(
            (item) => item.status === 'COMPLETED'
          ).length,

          ACTIVE: enrollments.filter(
            (item) => item.status === 'ACTIVE'
          ).length,

          DROPPED: enrollments.filter(
            (item) => item.status === 'DROPPED'
          ).length
        });
      } catch (error) {
        console.error(
          'Failed to load enrollment statistics:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  const total =
    counts.COMPLETED +
    counts.ACTIVE +
    counts.DROPPED;

  const completedPercent =
    total > 0 ? (counts.COMPLETED / total) * 100 : 0;

  const activePercent =
    total > 0 ? (counts.ACTIVE / total) * 100 : 0;

  const completedEnd = completedPercent;

  const activeEnd =
    completedPercent + activePercent;

  const background =
    total === 0
      ? '#e5e7eb'
      : `conic-gradient(
          #10b981 0% ${completedEnd}%,
          #f59e0b ${completedEnd}% ${activeEnd}%,
          #ef4444 ${activeEnd}% 100%
        )`;

  return (
    <div
      className="card"
      style={{
        flex: 1,
        minWidth: '300px'
      }}
    >
      <h3>Status Distribution</h3>

      {loading ? (
        <p
          style={{
            textAlign: 'center',
            margin: '50px 0'
          }}
        >
          Loading...
        </p>
      ) : (
        <>
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background,
              margin: '20px auto',
              position: 'relative'
            }}
          >
            {total > 0 && (
              <div
                style={{
                  position: 'absolute',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'white',
                  top: '30px',
                  left: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                {total}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ color: '#10b981' }}>
              ● Completed ({counts.COMPLETED})
            </span>

            <span style={{ color: '#f59e0b' }}>
              ● Active ({counts.ACTIVE})
            </span>

            <span style={{ color: '#ef4444' }}>
              ● Dropped ({counts.DROPPED})
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDistributionDonut;