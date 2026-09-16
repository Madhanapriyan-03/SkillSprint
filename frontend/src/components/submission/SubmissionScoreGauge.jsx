import React from 'react';

/**
 * SubmissionScoreGauge
 * Radial SVG animated score gauge with verified excellence seal badge.
 */
const SubmissionScoreGauge = ({ score = 0, passingScore = 70 }) => {
  const numericScore = Number(score) || 0;
  const isPassed = numericScore >= passingScore;

  // SVG Gauge calculations
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, numericScore)) / 100) * circumference;

  const color = isPassed ? '#10b981' : '#ef4444';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      {/* Radial Gauge */}
      <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 70 70">
          <circle
            cx="35"
            cy="35"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="5"
          />
          <circle
            cx="35"
            cy="35"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>

        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>
            {numericScore}%
          </span>
        </div>
      </div>

      {/* Verified Stamp Badge */}
      {isPassed && numericScore >= 75 && (
        <span
          className="verified-excellence-seal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            padding: '3px 8px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.2) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#059669',
            fontSize: '0.675rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            animation: 'stampBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          ★ Verified
        </span>
      )}
    </div>
  );
};

export default SubmissionScoreGauge;
