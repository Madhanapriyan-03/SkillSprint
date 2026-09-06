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

  let background = '#e5e7eb';

  if (total > 0) {
    const completedPercent = (completed / total) * 100;
    const activePercent =
      (active / total) * 100;

    const completedEnd = completedPercent;
    const activeEnd =
      completedPercent + activePercent;

    background = `conic-gradient(
      #10b981 0% ${completedEnd}%,
      #f59e0b ${completedEnd}% ${activeEnd}%,
      #ef4444 ${activeEnd}% 100%
    )`;
  }

  return (
    <div
      className="card"
      style={{
        flex: 1,
        minWidth: '300px'
      }}
    >
      <h3>Status Distribution</h3>

      <div
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: background,
          margin: '20px auto',
          position: 'relative'
        }}
      >
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
            flexDirection: 'column'
          }}
        >
          <strong
            style={{
              fontSize: '24px'
            }}
          >
            {total}
          </strong>

          <span
            style={{
              fontSize: '11px',
              color: '#64748b'
            }}
          >
            Enrollments
          </span>
        </div>
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
          ● Completed {completed}
        </span>

        <span style={{ color: '#f59e0b' }}>
          ● Active {active}
        </span>

        <span style={{ color: '#ef4444' }}>
          ● Dropped {dropped}
        </span>
      </div>
    </div>
  );
};

export default StatusDistributionDonut;