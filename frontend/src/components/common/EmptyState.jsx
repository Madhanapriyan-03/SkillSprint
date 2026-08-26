import React from 'react';

const EmptyState = ({ entityName, message, onAction }) => (
  <div className="empty-state">
    <div style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}>📋</div>
    <h3>No {entityName} Found</h3>
    <p>{message || `There are currently no ${entityName.toLowerCase()} available.`}</p>
    {onAction && (
      <button className="btn-primary" onClick={onAction} style={{ marginTop: '1.5rem' }}>
        {entityName === 'Enrollments' ? 'Enroll Now' : `Create ${entityName}`}
      </button>
    )}
  </div>
);

export default EmptyState;
