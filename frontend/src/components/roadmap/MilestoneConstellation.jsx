import React, { useState } from 'react';

/**
 * MilestoneConstellation
 * Interactive gamified skill constellation / milestone tree for RoadmapDetails.
 * Displays milestone nodes connected by pulsing energy beams with interactive criteria peek.
 */
const MilestoneConstellation = ({ milestones = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!milestones || milestones.length === 0) return null;

  const activeMilestone = milestones[selectedIdx] || milestones[0];

  return (
    <div
      className="card milestone-constellation-card"
      style={{
        marginBottom: '1.75rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(24, 32, 54, 0.96) 50%, rgba(30, 27, 75, 0.95) 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 16px 36px -8px rgba(11, 19, 43, 0.35)',
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.35)'
            }}
          >
            ✨
          </div>
          <div>
            <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.15rem' }}>
              Interactive Skill Constellation Graph
            </h3>
            <p style={{ margin: '2px 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>
              Click on any milestone node to preview passing thresholds, criteria, and estimated study duration
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.75rem',
            fontWeight: 800
          }}
        >
          <span>✦ {milestones.length} Step Pathway</span>
        </div>
      </div>

      {/* Interactive Constellation Horizontal Node Beam */}
      <div style={{ position: 'relative', margin: '2rem 0 1.5rem', overflowX: 'auto', paddingBottom: '0.75rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: `${Math.max(600, milestones.length * 140)}px`,
            position: 'relative',
            padding: '0 20px'
          }}
        >
          {/* Continuous Glowing Energy Beam */}
          <div
            style={{
              position: 'absolute',
              top: '26px',
              left: '40px',
              right: '40px',
              height: '3px',
              background: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc, #34d399)',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
              zIndex: 1
            }}
          />

          {/* Milestone Nodes */}
          {milestones.map((m, idx) => {
            const isSelected = selectedIdx === idx;
            const stepNum = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={m.id || idx}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Node Disc */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: isSelected
                      ? 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)'
                      : 'rgba(15, 23, 42, 0.95)',
                    border: `2.5px solid ${isSelected ? '#38bdf8' : 'rgba(147, 197, 253, 0.4)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: '#ffffff',
                    boxShadow: isSelected
                      ? '0 0 20px rgba(56, 189, 248, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.3)'
                      : '0 4px 12px rgba(0, 0, 0, 0.4)',
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {stepNum}
                </div>

                <strong
                  style={{
                    marginTop: '0.65rem',
                    fontSize: '0.8rem',
                    color: isSelected ? '#38bdf8' : '#cbd5e1',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block'
                  }}
                >
                  {m.title || `Milestone ${stepNum}`}
                </strong>

                <span style={{ fontSize: '0.675rem', color: '#94a3b8', marginTop: '2px' }}>
                  {m.expectedDurationDays ? `${m.expectedDurationDays}d` : 'Self-paced'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Interactive Peek Card */}
      {activeMilestone && (
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                Stage #{String(selectedIdx + 1).padStart(2, '0')}
              </span>
              <strong style={{ color: '#ffffff', fontSize: '1rem' }}>
                {activeMilestone.title}
              </strong>
            </div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.825rem', maxWidth: '620px' }}>
              {activeMilestone.description || 'Complete the deliverables and submit proof of completion for evaluation.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Passing Score</span>
              <strong style={{ color: '#38bdf8', fontSize: '0.9rem' }}>{activeMilestone.passingScore || 70}%</strong>
            </div>
            <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(129, 140, 248, 0.25)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Est. Duration</span>
              <strong style={{ color: '#a5b4fc', fontSize: '0.9rem' }}>{activeMilestone.expectedDurationDays || 7} Days</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilestoneConstellation;
