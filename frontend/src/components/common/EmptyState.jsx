import React from 'react';

const EmptyState = ({ entityName, message, onAction }) => {
  const getIcon = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('roadmap')) return '🗺️';
    if (n.includes('enrollment')) return '📚';
    if (n.includes('submission')) return '📤';
    if (n.includes('milestone')) return '🎯';
    return '📋';
  };

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {getIcon(entityName)}
      </div>
      <h3>No {entityName} Found</h3>
      <p>{message || `There are currently no ${entityName?.toLowerCase()} available in this view.`}</p>
      {onAction && (
        <button
          className="btn-primary"
          onClick={onAction}
          style={{ marginTop: '0.5rem' }}
        >
          {entityName === 'Enrollments' ? 'Enroll Now' : `Create ${entityName}`}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
