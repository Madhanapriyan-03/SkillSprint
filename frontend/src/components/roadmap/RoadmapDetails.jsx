import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import SubmissionForm from '../submission/SubmissionForm';

const RoadmapDetails = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { items: enrollments } = useSelector(
    (state) => state.enrollments
  );

  const [roadmap, setRoadmap] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        const roadmapResponse = await api.get(
          `/roadmaps/${id}`
        );

        setRoadmap(roadmapResponse.data);

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

  /*
    Find the student's enrollment for this roadmap.
    This allows us to automatically pass the correct
    enrollment ID to the submission form.
  */
  const currentEnrollment = enrollments?.find(
    (enrollment) =>
      Number(enrollment.roadmapId) === Number(id)
  );

  const isStudent = user?.role === 'STUDENT';

  const canSubmit =
    isStudent && !!currentEnrollment;

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

        {/* Back */}
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
            <h1>{roadmap?.title}</h1>

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

        {/* Info Cards */}
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
              border: '1px solid var(--border)',
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
              border: '1px solid var(--border)',
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
              border: '1px solid var(--border)',
              borderRadius: '8px'
            }}
          >
            <strong>Milestones</strong>

            <div style={{ marginTop: '6px' }}>
              {milestones.length}
            </div>
          </div>
        </div>

        {/* Student Enrollment Info */}
        {canSubmit && (
          <div
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px'
            }}
          >
            <strong>
              You are enrolled in this roadmap.
            </strong>

            <div
              style={{
                marginTop: '5px',
                color: 'var(--text-muted)',
                fontSize: '14px'
              }}
            >
              Enrollment ID: #{currentEnrollment.id}
            </div>
          </div>
        )}

        {/* Milestones */}
        <h2>Learning Milestones</h2>

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
              border: '1px dashed var(--border)',
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
                border: '1px solid var(--border)',
                borderRadius: '10px',
                background: '#fff'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                      marginTop: '6px'
                    }}
                  >
                    Milestone ID: #{milestone.id}
                  </p>
                </div>

                {/* Submit Button */}
                {canSubmit && (
                  <button
                    className="btn-primary"
                    onClick={() =>
                      setSelectedMilestone(milestone)
                    }
                  >
                    Submit Milestone
                  </button>
                )}
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
                  <strong>Duration:</strong>{' '}
                  {milestone.expectedDurationDays ||
                    'N/A'}{' '}
                  days
                </span>

                <span>
                  <strong>Passing Score:</strong>{' '}
                  {milestone.passingScore ||
                    'N/A'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submission Modal */}
      {selectedMilestone && currentEnrollment && (
        <SubmissionForm
          item={{
            enrollmentId: currentEnrollment.id,
            milestoneId: selectedMilestone.id,
            contentUrl: ''
          }}
          onClose={() =>
            setSelectedMilestone(null)
          }
          onSuccess={() => {
            setSelectedMilestone(null);
          }}
        />
      )}
    </div>
  );
};

export default RoadmapDetails;