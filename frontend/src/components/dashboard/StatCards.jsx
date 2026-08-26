import React from 'react';

const StatCards = ({ title, value, color }) => (
  <div className="card" style={{ flex: '1', minWidth: '200px', borderLeft: `4px solid ${color || 'var(--primary)'}` }}>
    <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
      {title}
    </div>
    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
      {value}
    </div>
  </div>
);

export default StatCards;
