import React, { useState } from 'react';

/**
 * StudyStreakPill
 * Live animated study streak flame badge with interactive 7-day activity heatmap dropdown.
 */
const StudyStreakPill = () => {
  const [showPopover, setShowPopover] = useState(false);

  // 7-day simulated recent activity commit status
  const days = [
    { day: 'Mon', active: true, count: 4 },
    { day: 'Tue', active: true, count: 3 },
    { day: 'Wed', active: true, count: 5 },
    { day: 'Thu', active: true, count: 2 },
    { day: 'Fri', active: true, count: 6 },
    { day: 'Sat', active: true, count: 1 },
    { day: 'Sun', active: false, count: 0 }
  ];

  return (
    <div
      className="study-streak-wrapper"
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}
    >
      {/* Streak Badge in Navbar */}
      <div
        className="study-streak-pill"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 12px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.2) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          color: '#fbbf24',
          fontSize: '0.775rem',
          fontWeight: 800,
          letterSpacing: '0.02em',
          cursor: 'pointer',
          userSelect: 'none',
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.25)',
          transition: 'all 0.2s ease'
        }}
        title="View 7-Day Study Activity Streak"
      >
        <span style={{ fontSize: '0.95rem', animation: 'flameFlicker 1.8s ease-in-out infinite' }}>🔥</span>
        <span>5-Day Streak</span>
      </div>

      {/* Floating 7-Day Heatmap Popover */}
      {showPopover && (
        <div
          className="study-streak-popover"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: '240px',
            padding: '1rem',
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #0b132b 0%, #1e293b 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 16px rgba(245, 158, 11, 0.2)',
            zIndex: 1100,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24' }}>
              🔥 Study Momentum
            </span>
            <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>
              +850 XP
            </span>
          </div>

          <p style={{ margin: '0 0 10px', fontSize: '0.75rem', color: '#94a3b8' }}>
            6 of 7 days active this sprint. Maintain daily practice to retain XP multiplier.
          </p>

          {/* 7-Day Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
            {days.map((d, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: d.active
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'rgba(255, 255, 255, 0.06)',
                    border: d.active ? '1px solid #34d399' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: d.active ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    color: '#ffffff',
                    fontWeight: 700
                  }}
                >
                  {d.active ? '✓' : ''}
                </div>
                <span style={{ fontSize: '0.6rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                  {d.day[0]}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.675rem', color: '#34d399', textAlign: 'center', fontWeight: 700 }}>
            ⚡ Streak Booster: 2.0x Active
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyStreakPill;
