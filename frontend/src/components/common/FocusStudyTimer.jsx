import React, { useState, useEffect, useRef } from 'react';

/**
 * FocusStudyTimer
 * Collapsible Pomodoro deep focus timer capsule with SVG progress ring,
 * ambient breathing glow, mode toggles, and study tips.
 */
const FocusStudyTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' (25m), 'break' (5m), 'sprint' (50m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const modeDurations = {
    focus: 25 * 60,
    break: 5 * 60,
    sprint: 50 * 60
  };

  const modeLabels = {
    focus: 'Deep Focus',
    break: 'Quick Break',
    sprint: 'Skill Sprint'
  };

  // Timer interval handling
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modeDurations[newMode]);
  };

  const handleToggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(modeDurations[mode]);
    }
    setIsRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode]);
  };

  const totalDuration = modeDurations[mode];
  const progressPercent = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  // Format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG ring parameters
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      className="focus-timer-capsule-wrapper"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 850,
        fontFamily: 'var(--font-heading)'
      }}
    >
      {/* Minimized Pill Toggle */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="focus-timer-mini-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #0b132b 0%, #1e293b 100%)',
            color: '#ffffff',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 8px 24px rgba(11, 19, 43, 0.45), 0 0 16px rgba(56, 189, 248, 0.25)',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.875rem',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title="Open Deep Study Sprint Timer"
        >
          <span style={{ fontSize: '1rem', animation: isRunning ? 'pulseCoreHub 2s infinite' : 'none' }}>
            ⏱️
          </span>
          <span>{timeDisplay}</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isRunning ? '#10b981' : '#f59e0b',
              boxShadow: isRunning ? '0 0 8px #10b981' : 'none'
            }}
          />
        </button>
      ) : (
        /* Expanded Floating Timer Card */
        <div
          className="focus-timer-expanded-card"
          style={{
            width: '290px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(11, 19, 43, 0.96) 0%, rgba(30, 41, 59, 0.98) 60%, rgba(30, 27, 75, 0.96) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 24px 48px -10px rgba(0, 0, 0, 0.6), 0 0 24px rgba(56, 189, 248, 0.2)',
            padding: '1.5rem',
            color: '#ffffff',
            position: 'relative',
            animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.1rem' }}>⏱️</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#93c5fd', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Study Sprint Mode
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.25rem',
                cursor: 'pointer',
                padding: '2px 6px',
                lineHeight: 1
              }}
              title="Minimize"
            >
              ×
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '3px',
              borderRadius: '9999px',
              marginBottom: '1.25rem'
            }}
          >
            {['focus', 'break', 'sprint'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: mode === m ? 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)' : 'transparent',
                  color: mode === m ? '#ffffff' : '#94a3b8',
                  padding: '5px 0',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: mode === m ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>

          {/* Center Radial Clock Visualizer */}
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="7"
              />
              {/* Progress Stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="url(#timerProgressGradient)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
              <defs>
                <linearGradient id="timerProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Time readout in center */}
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', display: 'block', lineHeight: 1 }}>
                {timeDisplay}
              </span>
              <span style={{ fontSize: '0.625rem', fontWeight: 700, color: isRunning ? '#34d399' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '3px', display: 'block' }}>
                {isRunning ? '● ACTIVE' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <button
              type="button"
              onClick={handleToggleTimer}
              style={{
                flex: 2,
                padding: '8px 0',
                borderRadius: '10px',
                border: 'none',
                background: isRunning ? '#ef4444' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: isRunning ? '0 4px 12px rgba(239, 68, 68, 0.35)' : '0 4px 12px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              {isRunning ? '⏸ Pause' : '▶ Start Focus'}
            </button>
            <button
              type="button"
              onClick={handleResetTimer}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              ↺ Reset
            </button>
          </div>

          {/* Micro Study Mindset Tip */}
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              color: '#7dd3fc',
              fontSize: '0.7rem',
              textAlign: 'center'
            }}
          >
            💡 Focus on 1 task at a time for maximum retention.
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusStudyTimer;
