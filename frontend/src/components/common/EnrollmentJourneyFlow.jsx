import React, { useState } from 'react';

/**
 * EnrollmentJourneyFlow
 * A unique, live-animated skill trajectory and milestone journey stream designed specifically for the Enrollments page.
 * Features:
 * - Animated flowing laser beam connecting study stations
 * - Pulsing ripple beacons for milestone checkpoints
 * - Live study momentum rhythmic equalizer bars
 * - Interactive milestone stage inspection
 */
const EnrollmentJourneyFlow = ({ enrollments = [] }) => {
  const [activeStation, setActiveStation] = useState(0);

  const activeCount = enrollments.filter((e) => e.status === 'ACTIVE').length;
  const completedCount = enrollments.filter((e) => e.status === 'COMPLETED').length;
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + Number(e.progressPercentage || 0), 0) / enrollments.length)
    : 0;

  const stations = [
    {
      id: 0,
      title: 'Track Induction',
      code: 'STAGE 01',
      icon: '🗺️',
      color: '#38bdf8',
      desc: 'Curriculum mapping & milestone alignment',
      metric: `${enrollments.length} Tracks`,
      status: 'Active'
    },
    {
      id: 1,
      title: 'Deep Study Sprints',
      code: 'STAGE 02',
      icon: '💻',
      color: '#818cf8',
      desc: 'Hands-on coding, problem solving & exercises',
      metric: `${activeCount} In Progress`,
      status: 'Accelerating'
    },
    {
      id: 2,
      title: 'Milestone Checkpoints',
      code: 'STAGE 03',
      icon: '⚡',
      color: '#f59e0b',
      desc: 'Deliverable submissions & feedback loops',
      metric: `${avgProgress}% Avg Pace`,
      status: 'Tracking'
    },
    {
      id: 3,
      title: 'Skill Certification',
      code: 'STAGE 04',
      icon: '🏆',
      color: '#34d399',
      desc: 'Verified mastery badge & portfolio deployment',
      metric: `${completedCount} Certified`,
      status: 'Achieved'
    }
  ];

  return (
    <div
      className="card enrollment-journey-card"
      style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(26, 36, 60, 0.96) 50%, rgba(30, 27, 75, 0.95) 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 40px -10px rgba(11, 19, 43, 0.4)',
        padding: '2.25rem',
        borderRadius: 'var(--radius-xl)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Cosmic Beam */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 75%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      {/* Header with Momentum Equalizer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.35rem',
              boxShadow: '0 0 18px rgba(56, 189, 248, 0.4)'
            }}
          >
            🚀
          </div>
          <div>
            <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
              Live Skill Trajectory & Journey Stream
            </h3>
            <p style={{ margin: '3px 0 0', color: '#94a3b8', fontSize: '0.825rem' }}>
              Interactive real-time visualizer mapping progression through curriculum milestones
            </p>
          </div>
        </div>

        {/* Live Study Rhythm Equalizer Animation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.06)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
            <span className="equalizer-bar eq-1" />
            <span className="equalizer-bar eq-2" />
            <span className="equalizer-bar eq-3" />
            <span className="equalizer-bar eq-4" />
            <span className="equalizer-bar eq-5" />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Momentum: High Velocity
          </span>
        </div>
      </div>

      {/* Live Animated Interactive Trajectory Stations Stream */}
      <div style={{ position: 'relative', margin: '2.5rem 0 1.5rem' }}>
        {/* Continuous Flowing Connection Beam Line */}
        <div
          style={{
            position: 'absolute',
            top: '28px',
            left: '30px',
            right: '30px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            zIndex: 1
          }}
        >
          {/* Animated flowing glowing pulse wave */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '40%',
              background: 'linear-gradient(90deg, transparent 0%, #38bdf8 50%, #818cf8 80%, transparent 100%)',
              borderRadius: '999px',
              animation: 'flowLaserPulse 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              filter: 'drop-shadow(0 0 8px #38bdf8)'
            }}
          />
        </div>

        {/* 4 Connected Interactive Journey Nodes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            position: 'relative',
            zIndex: 3
          }}
        >
          {stations.map((st, idx) => {
            const isSelected = activeStation === idx;

            return (
              <div
                key={st.id}
                onClick={() => setActiveStation(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Station Node Orb */}
                <div
                  style={{
                    position: 'relative',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: isSelected
                      ? `linear-gradient(135deg, ${st.color} 0%, #1e1b4b 100%)`
                      : 'rgba(15, 23, 42, 0.92)',
                    border: `2.5px solid ${isSelected ? st.color : 'rgba(255, 255, 255, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.35rem',
                    boxShadow: isSelected
                      ? `0 0 24px ${st.color}88, inset 0 0 10px ${st.color}44`
                      : '0 4px 12px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'scale(1.12)' : 'scale(1)'
                  }}
                >
                  {st.icon}

                  {/* Ripple beacon ring animation on active station */}
                  {isSelected && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        left: '-6px',
                        right: '-6px',
                        bottom: '-6px',
                        borderRadius: '50%',
                        border: `2px solid ${st.color}`,
                        animation: 'beaconRipple 1.8s ease-out infinite',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </div>

                {/* Station Badge & Label */}
                <span
                  style={{
                    marginTop: '0.85rem',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: isSelected ? st.color : '#94a3b8',
                    textTransform: 'uppercase'
                  }}
                >
                  {st.code}
                </span>

                <strong
                  style={{
                    fontSize: '0.9rem',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    marginTop: '2px'
                  }}
                >
                  {st.title}
                </strong>

                <span
                  style={{
                    marginTop: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: `${st.color}18`,
                    border: `1px solid ${st.color}44`,
                    color: st.color,
                    fontSize: '0.725rem',
                    fontWeight: 700
                  }}
                >
                  {st.metric}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Station Detail Spotlight */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.25rem 1.75rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          animation: 'fadeIn 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: `${stations[activeStation].color}22`,
              border: `1px solid ${stations[activeStation].color}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}
          >
            {stations[activeStation].icon}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1rem' }}>
                {stations[activeStation].title}
              </h4>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: `${stations[activeStation].color}25`,
                  color: stations[activeStation].color
                }}
              >
                ● {stations[activeStation].status}
              </span>
            </div>
            <p style={{ margin: '3px 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
              {stations[activeStation].desc}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Overall Track Velocity:</span>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2))',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              fontWeight: 800,
              fontSize: '0.875rem'
            }}
          >
            ⚡ {avgProgress}% Velocity
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentJourneyFlow;
