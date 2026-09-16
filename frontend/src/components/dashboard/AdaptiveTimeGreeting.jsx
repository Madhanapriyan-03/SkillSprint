import React, { useState, useEffect } from 'react';

/**
 * AdaptiveTimeGreeting
 * Dynamic time-of-day greeting engine with live clock ticker and context-aware study mindset tips.
 */
const AdaptiveTimeGreeting = ({ userRole = 'STUDENT' }) => {
  const [timeState, setTimeState] = useState({
    greeting: 'Welcome back',
    sessionTitle: 'Focus Session',
    icon: '☀️',
    color: '#38bdf8',
    advice: 'Track your milestones and build real-world mastery step by step.'
  });

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);

      if (hours >= 5 && hours < 12) {
        setTimeState({
          greeting: 'Good morning',
          sessionTitle: 'Morning Focus Track',
          icon: '🌅',
          color: '#fbbf24',
          advice: 'Prime hours for algorithmic drills, structured reading, and new concept synthesis.'
        });
      } else if (hours >= 12 && hours < 17) {
        setTimeState({
          greeting: 'Good afternoon',
          sessionTitle: 'Afternoon Velocity Sprint',
          icon: '☀️',
          color: '#38bdf8',
          advice: 'Maintain your momentum with hands-on coding, repository builds, and milestone submissions.'
        });
      } else {
        setTimeState({
          greeting: 'Good evening',
          sessionTitle: 'Deep Work Night Sprint',
          icon: '🌙',
          color: '#a855f7',
          advice: 'Quiet hours for deep debugging, architectural synthesis, and milestone review.'
        });
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      {/* Dynamic Session Pill */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 10px',
            borderRadius: '9999px',
            background: `${timeState.color}18`,
            border: `1px solid ${timeState.color}44`,
            color: timeState.color,
            fontSize: '0.725rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          <span>{timeState.icon}</span>
          <span>{timeState.sessionTitle}</span>
          {currentTime && <span style={{ opacity: 0.7 }}>• {currentTime}</span>}
        </span>
      </div>

      <h1 style={{ margin: 0, fontSize: '1.85rem', color: '#ffffff', letterSpacing: '-0.03em' }}>
        {timeState.greeting}, {userRole}!
      </h1>

      <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '600px', lineHeight: 1.55 }}>
        {timeState.advice}
      </p>
    </div>
  );
};

export default AdaptiveTimeGreeting;
