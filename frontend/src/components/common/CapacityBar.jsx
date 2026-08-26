import React from 'react';

const CapacityBar = ({ current, max }) => {
  const percentage = Math.min((current / max) * 100, 100);
  let color = '#10b981'; // green
  if (percentage >= 90) color = '#ef4444'; // red
  else if (percentage >= 70) color = '#f59e0b'; // amber

  return (
    <div style={{ width: '100px' }}>
      <div style={{ fontSize: '0.75rem', marginBottom: '2px', textAlign: 'right' }}>
        {current} / {max}
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: color, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
};

export default CapacityBar;