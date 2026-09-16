import React, { useState } from 'react';

/**
 * StudyMasteryWheel
 * Dynamic, lively rotating study cycle wheel for high-impact visual EdTech aesthetic.
 * Features:
 * - Smooth continuous orbital rotation with counter-rotating upright milestone nodes
 * - Center glowing pulse hub with active progress badge
 * - Interactive hover states & micro-tooltips
 */
const StudyMasteryWheel = ({
  variant = 'enrollment',
  size = 180,
  speed = 22 // seconds per revolution
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStage, setActiveStage] = useState(null);

  // Define nodes based on page context
  const nodes = variant === 'submission'
    ? [
        { id: 1, label: 'Code', icon: '💻', color: '#38bdf8', angle: 0 },
        { id: 2, label: 'Submit', icon: '📤', color: '#818cf8', angle: 90 },
        { id: 3, label: 'Review', icon: '🔍', color: '#c084fc', angle: 180 },
        { id: 4, label: 'Mastery', icon: '🏆', color: '#34d399', angle: 270 }
      ]
    : [
        { id: 1, label: 'Plan', icon: '🎯', color: '#38bdf8', angle: 0 },
        { id: 2, label: 'Study', icon: '📚', color: '#818cf8', angle: 90 },
        { id: 3, label: 'Track', icon: '🔥', color: '#f59e0b', angle: 180 },
        { id: 4, label: 'Excel', icon: '🎓', color: '#34d399', angle: 270 }
      ];

  const centerBadge = variant === 'submission'
    ? { icon: '⚡', title: 'LIVE EVAL' }
    : { icon: '🚀', title: 'SPRINT' };

  return (
    <div
      className="study-wheel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveStage(null);
      }}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      title="Study Mastery Orbit Engine"
    >
      {/* Outer ambient decorative aura glow */}
      <div
        className="wheel-ambient-aura"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)',
          filter: 'blur(12px)',
          pointerEvents: 'none'
        }}
      />

      {/* Secondary Counter-Rotating Geometric Track */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          animation: `spinReverseTrack 35s linear infinite`,
          pointerEvents: 'none',
          opacity: 0.6
        }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          strokeDasharray="20 40"
        />
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Rotating Orbit Track & Nodes Container */}
      <div
        className="study-wheel-orbit"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1.5px dashed rgba(96, 165, 250, 0.45)',
          animation: `spinOrbitTrack ${isHovered ? speed * 1.5 : speed}s linear infinite`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'animation-duration 0.4s ease'
        }}
      >
        {/* Orbital Learning Milestone Nodes */}
        {nodes.map((node) => {
          const radius = (size / 2) - 18;
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.round(radius * Math.cos(rad));
          const y = Math.round(radius * Math.sin(rad));

          return (
            <div
              key={node.id}
              className="orbit-node-wrapper"
              onMouseEnter={() => setActiveStage(node.label)}
              style={{
                position: 'absolute',
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              {/* Counter-rotating badge so text & icon stay permanently upright */}
              <div
                className="orbit-node-pill"
                style={{
                  animation: `counterSpinOrbit ${isHovered ? speed * 1.5 : speed}s linear infinite`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  background: 'rgba(15, 23, 42, 0.88)',
                  border: `1.5px solid ${node.color}`,
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  boxShadow: `0 0 10px ${node.color}55`,
                  cursor: 'pointer',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.8rem' }}>{node.icon}</span>
                <span>{node.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Core Glowing Hub */}
      <div
        className="study-wheel-core-hub"
        style={{
          position: 'relative',
          zIndex: 5,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid rgba(147, 197, 253, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(37, 99, 235, 0.45), inset 0 0 12px rgba(139, 92, 246, 0.3)',
          cursor: 'pointer',
          animation: 'pulseCoreHub 3s ease-in-out infinite'
        }}
      >
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{centerBadge.icon}</span>
        <span
          style={{
            fontSize: '0.55rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#93c5fd',
            marginTop: '2px'
          }}
        >
          {activeStage || centerBadge.title}
        </span>
      </div>
    </div>
  );
};

export default StudyMasteryWheel;
