import React from 'react';

const CapacityBar = ({ current = 0, max = 10 }) => {
  const safeMax = max > 0 ? max : 1;
  const percentage = Math.min(Math.round((current / safeMax) * 100), 100);
  
  let color = '#10b981'; // green
  if (percentage >= 90) {
    color = '#ef4444'; // red
  } else if (percentage >= 70) {
    color = '#f59e0b'; // amber
  }

  return (
    <div style={{ width: '120px' }}>
      <div
        style={{
          fontSize: '0.75rem',
          marginBottom: '3px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text-secondary)',
          fontWeight: '600'
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{percentage}%</span>
        <span>{current} / {max}</span>
      </div>
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#e2e8f0',
          borderRadius: '999px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: '999px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default CapacityBar;