import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions } from '../../store/slices/submissionSlice';
import EmptyState from '../common/EmptyState';
import SubmissionForm from './SubmissionForm';
import submissionService from '../../services/submissionService';

const SubmissionList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.submissions);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  // NEW: grading state
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState('');

  useEffect(() => {
    dispatch(fetchSubmissions({ page: 0, size: 20 }));
  }, [dispatch]);

  const canGrade =
    user?.role === 'MENTOR' ||
    user?.role === 'LEARNING_MANAGER';

  const openGradeModal = (submission) => {
    setSelectedSubmission(submission);
    setScore('');
    setGradeError('');
    setShowGradeModal(true);
  };

  const closeGradeModal = () => {
    setShowGradeModal(false);
    setSelectedSubmission(null);
    setScore('');
    setGradeError('');
  };

  const handleGrade = async (e) => {
    e.preventDefault();

    if (
      score === '' ||
      Number(score) < 0 ||
      Number(score) > 100
    ) {
      setGradeError('Score must be between 0 and 100.');
      return;
    }

    setGrading(true);
    setGradeError('');

    try {
      await submissionService.grade(
        selectedSubmission.id,
        {
          score: Number(score)
        }
      );

      alert('Submission graded successfully!');

      closeGradeModal();

      dispatch(
        fetchSubmissions({
          page: 0,
          size: 20
        })
      );
    } catch (error) {
      setGradeError(
        error.response?.data?.message ||
        'Failed to grade submission'
      );
    } finally {
      setGrading(false);
    }
  };

  return (
    <div className="page-container submissions-page">
      <div className="card">

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <h2>Submissions</h2>

          <button
            className="btn-primary"
            onClick={() => setShowModal(true)}
          >
            + New Submission
          </button>
        </div>

        {loading ? (
          <p>Loading submissions...</p>
        ) : items.length === 0 ? (
          <EmptyState
            entityName="Submissions"
            message="No submissions found."
            onAction={() => setShowModal(true)}
          />
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1rem'
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom:
                    '2px solid var(--border)',
                  textAlign: 'left'
                }}
              >
                <th style={{ padding: '10px' }}>
                  Enrollment ID
                </th>

                <th style={{ padding: '10px' }}>
                  Status
                </th>

                <th style={{ padding: '10px' }}>
                  Score
                </th>

                {canGrade && (
                  <th style={{ padding: '10px' }}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {items.map((sub) => (
                <tr
                  key={sub.id}
                  style={{
                    borderBottom:
                      '1px solid var(--border)'
                  }}
                >
                  <td style={{ padding: '10px' }}>
                    {sub.enrollmentId}
                  </td>

                  <td style={{ padding: '10px' }}>
                    {sub.status}
                  </td>

                  <td style={{ padding: '10px' }}>
                    {sub.score ?? 'N/A'}
                  </td>

                  {canGrade && (
                    <td style={{ padding: '10px' }}>
                      {sub.status === 'PENDING' ? (
                        <button
                          className="btn-primary"
                          onClick={() =>
                            openGradeModal(sub)
                          }
                          style={{
                            padding: '5px 12px',
                            fontSize: '12px'
                          }}
                        >
                          Grade
                        </button>
                      ) : (
                        <span
                          style={{
                            color:
                              'var(--text-muted)',
                            fontSize: '12px'
                          }}
                        >
                          Graded
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Existing submission modal */}
      {showModal && (
        <SubmissionForm
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);

            dispatch(
              fetchSubmissions({
                page: 0,
                size: 20
              })
            );
          }}
        />
      )}

      {/* NEW: Grade Modal */}
      {showGradeModal && selectedSubmission && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:
              'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '400px',
              margin: '20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom:
                  '1px solid var(--border)',
                paddingBottom: '0.5rem'
              }}
            >
              <h3>Grade Submission</h3>

              <button
                onClick={closeGradeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            {gradeError && (
              <div
                style={{
                  color: 'var(--danger)',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#fee2e2',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              >
                {gradeError}
              </div>
            )}

            <div
              style={{
                marginBottom: '1rem'
              }}
            >
              <p>
                <strong>
                  Submission ID:
                </strong>{' '}
                #{selectedSubmission.id}
              </p>

              <p>
                <strong>
                  Enrollment ID:
                </strong>{' '}
                {selectedSubmission.enrollmentId}
              </p>

              <p>
                <strong>
                  Milestone ID:
                </strong>{' '}
                {selectedSubmission.milestoneId}
              </p>
            </div>

            <form
              onSubmit={handleGrade}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}
            >
              <div>
                <label>
                  Score{' '}
                  <span style={{ color: 'red' }}>
                    *
                  </span>
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) =>
                    setScore(e.target.value)
                  }
                  required
                  placeholder="Enter score (0-100)"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border:
                      '1px solid var(--border)',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={grading}
                style={{
                  width: '100%'
                }}
              >
                {grading
                  ? 'Grading...'
                  : 'Submit Grade'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionList;