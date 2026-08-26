import React from 'react';

const StatusDistributionDonut = () => {
  return (
    <div className="card" style={{ flex: 1, minWidth: '300px' }}>
      <h3>Status Distribution</h3>
      <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(#10b981 0% 50%, #f59e0b 50% 80%, #ef4444 80% 100%)', margin: '20px auto' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <span style={{color: '#10b981'}}>● Completed</span>
        <span style={{color: '#f59e0b'}}>● Active</span>
        <span style={{color: '#ef4444'}}>● Dropped</span>
      </div>
    </div>
  );
};

export default StatusDistributionDonut;