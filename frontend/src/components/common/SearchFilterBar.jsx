import React from 'react';

const SearchFilterBar = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
        <span
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            pointerEvents: 'none'
          }}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder={placeholder || 'Search...'}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: '0.6rem 0.9rem 0.6rem 2.25rem',
            width: '100%',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem'
          }}
        />
      </div>
    </div>
  );
};

export default SearchFilterBar;
