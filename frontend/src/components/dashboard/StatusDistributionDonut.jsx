import React from 'react';

const StatusDistributionDonut = ({
  completed = 0,
  active = 0,
  dropped = 0
}) => {

  const total =
    completed +
    active +
    dropped;


  const completedPercent =
    total > 0
      ? (completed / total) * 100
      : 0;

  const activePercent =
    total > 0
      ? (active / total) * 100
      : 0;


  const completedEnd =
    completedPercent;

  const activeEnd =
    completedPercent +
    activePercent;


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

      <h3>
        Status Distribution
      </h3>


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
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: '#fff',
              top: '40px',
              left: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: '#172033'
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
          flexWrap: 'wrap',
          fontSize: '0.9rem'
        }}
      >

        <span
          style={{
            color: '#10b981'
          }}
        >
          ● Completed ({completed})
        </span>


        <span
          style={{
            color: '#f59e0b'
          }}
        >
          ● Active ({active})
        </span>


        <span
          style={{
            color: '#ef4444'
          }}
        >
          ● Dropped ({dropped})
        </span>

      </div>

    </div>
  );
};

export default StatusDistributionDonut;