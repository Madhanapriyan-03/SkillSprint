import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../store/slices/authSlice';

const NotificationStack = () => {
  const { message: authMessage, isSuccess: authSuccess } = useSelector((state) => state.auth);
  const { error: roadmapError } = useSelector((state) => state.roadmaps);
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const seenRoadmapError = useRef(null);

  useEffect(() => {
    if (authSuccess && authMessage) {
      const id = 'auth-' + Date.now() + Math.random();
      setAlerts((prev) => [...prev, { id, text: authMessage, type: 'success' }]);
      dispatch(reset());
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, 3000);
    }
  }, [authSuccess, authMessage, dispatch]);

  useEffect(() => {
    if (roadmapError && roadmapError !== seenRoadmapError.current) {
      seenRoadmapError.current = roadmapError;
      const id = 'roadmap-' + Date.now() + Math.random();
      setAlerts((prev) => [...prev, { id, text: roadmapError, type: 'error' }]);
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, 3000);
    } else if (!roadmapError) {
      seenRoadmapError.current = null;
    }
  }, [roadmapError]);

  if (alerts.length === 0) return null;

  return (
    <div className="notification-stack" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert ${alert.type}`}
          style={{
            background: alert.type === 'success' ? 'green' : 'red',
            color: 'white',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          {alert.text}
        </div>
      ))}
    </div>
  );
};

export default NotificationStack;
