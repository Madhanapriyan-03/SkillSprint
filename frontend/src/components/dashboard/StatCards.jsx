import React from 'react';

const StatCards = ({ title, value, color }) => {
  const accentColor = color || 'var(--primary)';

  const getIcon = (t) => {
    const text = (t || '').toLowerCase();
    if (text.includes('enrollment')) return '📚';
    if (text.includes('completed')) return '🏆';
    if (text.includes('score')) return '🎯';
    if (text.includes('roadmap')) return '🗺️';
    if (text.includes('published') || text.includes('active')) return '🚀';
    if (text.includes('grading') || text.includes('pending')) return '⏳';
    return '📊';
  };

  return (
    <div
      className="card stat-card-wrapper"
      style={{
        flex: '1',
        minWidth: '220px',
        borderTop: `3px solid ${accentColor}`,
        background: '#ffffff'
      }}
    >
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <span style={{ fontSize: '1.25rem', opacity: 0.85 }}>{getIcon(title)}</span>
      </div>
      <div className="stat-card-value" style={{ color: 'var(--text-dark)' }}>
        {value}
      </div>
      <div
        style={{
          width: '100%',
          height: '3px',
          background: 'var(--border-light)',
          borderRadius: '999px',
          marginTop: '12px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '45%',
            height: '100%',
            background: accentColor,
            borderRadius: '999px'
          }}
        />
      </div>
    </div>
  );
};

export default StatCards;
