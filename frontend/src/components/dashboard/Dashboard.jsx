import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StatCards from './StatCards';
import StatusDistributionDonut from './StatusDistributionDonut';
import RecentActivity from './RecentActivity';
import { fetchRoadmaps } from '../../store/slices/roadmapSlice';
import submissionService from '../../services/submissionService';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: roadmaps } = useSelector((state) => state.roadmaps);
  const dispatch = useDispatch();

  const [pendingGrading, setPendingGrading] = useState(0);

  useEffect(() => {
    dispatch(fetchRoadmaps({ page: 0, size: 100 }));
  }, [dispatch]);

  useEffect(() => {
    const loadPendingSubmissions = async () => {
      try {
        const response = await submissionService.getAll(0, 1000);
        const submissions = Array.isArray(response?.content)
          ? response.content
          : Array.isArray(response)
            ? response
            : [];

        const pendingCount = submissions.filter(
          (submission) => submission.status === 'PENDING'
        ).length;

        setPendingGrading(pendingCount);
      } catch (error) {
        console.error('Failed to load pending submissions:', error);
        setPendingGrading(0);
      }
    };

    if (user?.role === 'LEARNING_MANAGER' || user?.role === 'MENTOR') {
      loadPendingSubmissions();
    }
  }, [user?.role]);

  const roadmapList = Array.isArray(roadmaps) ? roadmaps : [];

  const activeRoadmaps = roadmapList.filter(
    (roadmap) => roadmap.status === 'PUBLISHED'
  ).length;

  return (
    <div className="page-container">
      <div
        className="card dashboard-hero"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          marginBottom: '2rem'
        }}
      >
        <h1>Welcome back, {user?.role}!</h1>

        <p
          style={{
            marginTop: '0.5rem',
            opacity: 0.9
          }}
        >
          Here's what's happening with your learning roadmaps today.
        </p>

        <Link
          to="/roadmaps"
          className="btn-primary dashboard-explore-btn"
        >
          Explore Roadmaps
        </Link>
      </div>

      {(user?.role === 'LEARNING_MANAGER' ||
        user?.role === 'MENTOR') && (
        <>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >
            <StatCards
              title="Total Roadmaps"
              value={roadmapList.length}
            />

            <StatCards
              title="Active Published"
              value={activeRoadmaps}
              color="#10b981"
            />

            <StatCards
              title="Pending Grading"
              value={pendingGrading}
              color="#f59e0b"
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <StatusDistributionDonut />
            <RecentActivity />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;