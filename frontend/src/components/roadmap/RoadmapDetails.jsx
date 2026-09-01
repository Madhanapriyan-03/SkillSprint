import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

const RoadmapDetails = () => {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setLoading(true);
        setError('');

        const roadmapResponse = await api.get(
          '/roadmaps?page=0&size=100'
        );

        const roadmaps =
          roadmapResponse.data?.content ||
          roadmapResponse.data ||
          [];

        const selectedRoadmap = roadmaps.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedRoadmap) {
          setError('Roadmap not found');
          return;
        }

        setRoadmap(selectedRoadmap);

        const milestoneResponse = await api.get(
          `/milestones?roadmapId=${id}&page=0&size=100`
        );

        setMilestones(
          milestoneResponse.data?.content ||
          milestoneResponse.data ||
          []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to load roadmap details'
        );
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>Roadmap</h2>
          <p style={{ color: 'var(--danger)' }}>
            {error}
          </p>

          <Link
            to="/roadmaps"
            className="btn-primary"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              textDecoration: 'none'
            }}
          >
            Back to Roadmaps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="card">

        {/* Back */}
        <Link
          to="/roadmaps"
          style={{
            display: 'inline-block',
            marginBottom: '1rem'
          }}
        >
          ← Back to Roadmaps
        </Link>

        {/* Roadmap Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <h1>{roadmap.title}</h1>

            <p
              style={{
                color: 'var(--text-muted)',
                marginTop: '0.5rem'
              }}
            >
              {roadmap.description ||
                'Learning Roadmap'}
            </p>
          </div>

          <span
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '600',
              backgroundColor:
                roadmap.status === 'PUBLISHED'
                  ? '#dcfce7'
                  : '#f1f5f9',
              color:
                roadmap.status === 'PUBLISHED'
                  ? '#166534'
                  : '#475569'
            }}
          >
            {roadmap.status}
          </span>
        </div>

        {/* Roadmap Info */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              flex: '1',
              minWidth: '180px',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}
          >
            <strong>Roadmap ID</strong>
            <div style={{ marginTop: '5px' }}>
              #{roadmap.id}
            </div>
          </div>

          <div
            style={{
              flex: '1',
              minWidth: '180px',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}
          >
            <strong>Capacity</strong>
            <div style={{ marginTop: '5px' }}>
              {roadmap.maxCapacity}
            </div>
          </div>

          <div
            style={{
              flex: '1',
              minWidth: '180px',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}
          >
            <strong>Milestones</strong>
            <div style={{ marginTop: '5px' }}>
              {milestones.length}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>
            Learning Milestones
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              marginBottom: '1.5rem'
            }}
          >
            Complete each milestone to progress
            through this roadmap.
          </p>

          {milestones.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-muted)',
                border: '1px dashed var(--border)',
                borderRadius: '8px'
              }}
            >
              No milestones available yet.
            </div>
          ) : (
            milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                style={{
                  padding: '1.25rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  backgroundColor: 'white'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <h3>
                      {index + 1}. {milestone.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-muted)',
                        marginTop: '8px'
                      }}
                    >
                      Milestone ID: #{milestone.id}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    marginTop: '1rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <span>
                    <strong>Duration:</strong>{' '}
                    {milestone.expectedDurationDays}{' '}
                    days
                  </span>

                  <span>
                    <strong>Passing Score:</strong>{' '}
                    {milestone.passingScore}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default RoadmapDetails;