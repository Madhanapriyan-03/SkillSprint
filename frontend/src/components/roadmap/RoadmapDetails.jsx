import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import roadmapService from '../../services/roadmapService';
import api from '../../services/api';

const RoadmapDetails = () => {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        // Get roadmap
        const roadmapResponse =
          await roadmapService.getById(id);

        setRoadmap(roadmapResponse.data);

        // Get milestones
        const milestoneResponse = await api.get(
          `/milestones?roadmapId=${id}&page=0&size=100`
        );

        const milestoneData =
          milestoneResponse.data?.content ||
          milestoneResponse.data ||
          [];

        setMilestones(milestoneData);

      } catch (err) {
        console.error(
          'Failed to load roadmap:',
          err
        );

        setError(
          err.response?.data?.message ||
          'Failed to load roadmap details'
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

          <p
            style={{
              color: 'var(--danger)',
              marginTop: '1rem'
            }}
          >
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
            ← Back to Roadmaps
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="card">

        {/* BACK */}
        <Link
          to="/roadmaps"
          style={{
            display: 'inline-block',
            marginBottom: '1.5rem',
            textDecoration: 'none'
          }}
        >
          ← Back to Roadmaps
        </Link>

        {/* HEADER */}
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
            <h1>
              {roadmap?.title}
            </h1>

            <p
              style={{
                color: 'var(--text-muted)',
                marginTop: '0.5rem'
              }}
            >
              {roadmap?.description ||
                'Learning Roadmap'}
            </p>
          </div>

          <span
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor:
                roadmap?.status === 'PUBLISHED'
                  ? '#dcfce7'
                  : '#f1f5f9',
              color:
                roadmap?.status === 'PUBLISHED'
                  ? '#166534'
                  : '#475569'
            }}
          >
            {roadmap?.status}
          </span>
        </div>

        {/* INFO CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >

          <div
            style={{
              padding: '1rem',
              background: '#f8fafc',
              border:
                '1px solid var(--border)',
              borderRadius: '8px'
            }}
          >
            <strong>Roadmap ID</strong>

            <div style={{ marginTop: '6px' }}>
              #{roadmap?.id}
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              background: '#f8fafc',
              border:
                '1px solid var(--border)',
              borderRadius: '8px'
            }}
          >
            <strong>Capacity</strong>

            <div style={{ marginTop: '6px' }}>
              {roadmap?.maxCapacity || 'N/A'}
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              background: '#f8fafc',
              border:
                '1px solid var(--border)',
              borderRadius: '8px'
            }}
          >
            <strong>Milestones</strong>

            <div style={{ marginTop: '6px' }}>
              {milestones.length}
            </div>
          </div>

        </div>

        {/* MILESTONES */}
        <h2>
          Learning Milestones
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            marginTop: '0.5rem',
            marginBottom: '1.5rem'
          }}
        >
          Complete each milestone to progress
          through this roadmap.
        </p>

        {milestones.length === 0 ? (

          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              border:
                '1px dashed var(--border)',
              borderRadius: '8px',
              color: 'var(--text-muted)'
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
                border:
                  '1px solid var(--border)',
                borderRadius: '10px',
                background: '#fff'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >

                <div>

                  <h3>
                    {index + 1}.{' '}
                    {milestone.title}
                  </h3>

                  <p
                    style={{
                      color:
                        'var(--text-muted)',
                      marginTop: '6px'
                    }}
                  >
                    Milestone ID: #{milestone.id}
                  </p>

                </div>

              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  marginTop: '1rem',
                  fontSize: '14px'
                }}
              >

                <span>
                  <strong>
                    Duration:
                  </strong>{' '}
                  {milestone.expectedDurationDays ||
                    'N/A'}{' '}
                  days
                </span>

                <span>
                  <strong>
                    Passing Score:
                  </strong>{' '}
                  {milestone.passingScore ||
                    'N/A'}
                </span>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default RoadmapDetails;