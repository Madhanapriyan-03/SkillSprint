import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrollments } from '../../store/slices/enrollmentSlice';
import EmptyState from '../common/EmptyState';

const EnrollmentList = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.enrollments
  );

  const [showModal, setShowModal] = useState(false);
  const [roadmapIdInput, setRoadmapIdInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    dispatch(
      fetchEnrollments({
        page: 0,
        size: 20
      })
    );
  }, [dispatch]);

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!roadmapIdInput) return;

    try {
      const enrollmentService = (
        await import('../../services/enrollmentService')
      ).default;

      await enrollmentService.create({
        roadmapId: parseInt(roadmapIdInput)
      });

      setShowModal(false);
      setRoadmapIdInput('');

      alert('Successfully enrolled!');

      dispatch(
        fetchEnrollments({
          page: 0,
          size: 20
        })
      );
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
        'Failed to enroll'
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'status-badge status-completed';

      case 'ACTIVE':
        return 'status-badge status-active';

      case 'DROPPED':
        return 'status-badge status-dropped';

      default:
        return 'status-badge';
    }
  };

  const getProgress = (enrollment) => {
    const progress = Number(
      enrollment.progressPercentage || 0
    );

    return Math.min(
      100,
      Math.max(0, progress)
    );
  };

  return (
    <div className="page-container">
      <div className="card">

        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h2>My Enrollments</h2>

            <p
              style={{
                color: 'var(--text-muted)',
                marginTop: '4px',
                fontSize: '0.9rem'
              }}
            >
              Track your roadmap enrollment and progress.
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setErrorMsg('');
              setShowModal(true);
            }}
          >
            + Enroll in Roadmap
          </button>
        </div>

        {/* Enrollment Table */}
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-muted)'
            }}
          >
            Loading enrollments...
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            entityName="Enrollments"
            message="You have not enrolled in any roadmaps yet."
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div
            style={{
              overflowX: 'auto'
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '0.5rem'
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
                  <th style={{ padding: '12px' }}>
                    Enrollment
                  </th>

                  <th style={{ padding: '12px' }}>
                    Roadmap
                  </th>

                  <th style={{ padding: '12px' }}>
                    Status
                  </th>

                  <th
                    style={{
                      padding: '12px',
                      minWidth: '220px'
                    }}
                  >
                    Progress
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((enroll) => {
                  const progress = getProgress(enroll);

                  return (
                    <tr
                      key={enroll.id}
                      style={{
                        borderBottom:
                          '1px solid var(--border)'
                      }}
                    >

                      {/* Enrollment ID */}
                      <td
                        style={{
                          padding: '14px 12px',
                          fontWeight: '600'
                        }}
                      >
                        #{enroll.id}
                      </td>

                      {/* Roadmap */}
                      <td
                        style={{
                          padding: '14px 12px'
                        }}
                      >
                        <div
                          style={{
                            fontWeight: '600'
                          }}
                        >
                          Roadmap #{enroll.roadmapId}
                        </div>

                        <div
                          style={{
                            fontSize: '0.8rem',
                            color:
                              'var(--text-muted)',
                            marginTop: '2px'
                          }}
                        >
                          Learning Roadmap
                        </div>
                      </td>

                      {/* Status */}
                      <td
                        style={{
                          padding: '14px 12px'
                        }}
                      >
                        <span
                          className={getStatusClass(
                            enroll.status
                          )}
                        >
                          {enroll.status}
                        </span>
                      </td>

                      {/* Progress */}
                      <td
                        style={{
                          padding: '14px 12px'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent:
                              'space-between',
                            alignItems: 'center',
                            marginBottom: '6px',
                            fontSize: '0.85rem'
                          }}
                        >
                          <span
                            style={{
                              color:
                                'var(--text-muted)'
                            }}
                          >
                            Completion
                          </span>

                          <strong
                            style={{
                              color:
                                progress === 100
                                  ? '#059669'
                                  : 'var(--text-dark)'
                            }}
                          >
                            {progress}%
                          </strong>
                        </div>

                        {/* Progress Bar */}
                        <div
                          style={{
                            width: '100%',
                            height: '9px',
                            backgroundColor:
                              '#e5e7eb',
                            borderRadius: '999px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              width: `${progress}%`,
                              height: '100%',
                              backgroundColor:
                                progress === 100
                                  ? '#10b981'
                                  : '#3b82f6',
                              borderRadius: '999px',
                              transition:
                                'width 0.4s ease'
                            }}
                          />
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom:
                  '1px solid var(--border)'
              }}
            >
              <div>
                <h3>
                  Enroll in a Roadmap
                </h3>

                <p
                  style={{
                    color:
                      'var(--text-muted)',
                    fontSize: '0.85rem',
                    marginTop: '3px'
                  }}
                >
                  Enter the roadmap ID to enroll.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color:
                    'var(--text-muted)'
                }}
              >
                ×
              </button>
            </div>

            {/* Error */}
            {errorMsg && (
              <div
                style={{
                  color: 'var(--danger)',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor:
                    '#fee2e2',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleEnrollSubmit}
            >
              <div
                style={{
                  marginBottom: '1.5rem'
                }}
              >
                <label>
                  Roadmap ID
                </label>

                <input
                  type="number"
                  min="1"
                  required
                  value={roadmapIdInput}
                  onChange={(e) => {
                    setRoadmapIdInput(
                      e.target.value
                    );
                    setErrorMsg('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '7px',
                    border:
                      '1px solid var(--border)',
                    color:
                      'var(--text-dark)',
                    fontSize: '1rem',
                    marginTop: '5px'
                  }}
                  placeholder="e.g. 1"
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'flex-end',
                  gap: '10px'
                }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setErrorMsg('');
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                >
                  Enroll
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;