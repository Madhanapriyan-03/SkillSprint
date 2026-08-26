import React from 'react';

const SearchFilterBar = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: '10px 15px',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid var(--border)',
          borderRadius: '6px'
        }}
      />
    </div>
  );
};

export default SearchFilterBar;
