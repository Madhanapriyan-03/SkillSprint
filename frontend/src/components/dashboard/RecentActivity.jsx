import React from 'react';

const RecentActivity = () => {
  return (
    <div className="card" style={{ flex: 1, minWidth: '300px' }}>
      <h3>Recent Activity</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>2 hours ago</span>
          <div>New submission by Student 1 for "React Basics"</div>
        </li>
      </ul>
    </div>
  );
};

export default RecentActivity;