import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatCards from './StatCards';
import StatusDistributionDonut from './StatusDistributionDonut';
import RecentActivity from './RecentActivity';
import { fetchRoadmaps } from '../../store/slices/roadmapSlice';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { items: roadmaps } = useSelector(state => state.roadmaps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoadmaps({ page: 0, size: 100 }));
  }, [dispatch]);

  const activeRoadmaps = roadmaps.filter(r => r.status === 'PUBLISHED').length;

  return (
    <div className="page-container">
      <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '2rem' }}>
        <h1>Welcome back, {user?.role}!</h1>
        <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Here's what's happening with your learning roadmaps today.</p>
        <button className="btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary)', marginTop: '1rem' }}>
          Explore Roadmaps
        </button>
      </div>

      {(user?.role === 'LEARNING_MANAGER' || user?.role === 'MENTOR') && (
        <>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <StatCards title="Total Roadmaps" value={roadmaps.length} />
            <StatCards title="Active Published" value={activeRoadmaps} color="#10b981" />
            <StatCards title="Pending Grading" value="12" color="#f59e0b" />
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <StatusDistributionDonut />
            <RecentActivity />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
