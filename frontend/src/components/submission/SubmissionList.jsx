import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions } from '../../store/slices/submissionSlice';
import EmptyState from '../common/EmptyState';
import SubmissionForm from './SubmissionForm';
import submissionService from '../../services/submissionService';

const SubmissionList = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading
  } = useSelector(
    (state) => state.submissions
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showModal, setShowModal] =
    useState(false);

  // Grading state
  const [showGradeModal, setShowGradeModal] =
    useState(false);

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);

  const [score, setScore] =
    useState('');

  const [grading, setGrading] =
    useState(false);

  const [gradeError, setGradeError] =
    useState('');


  // =========================================================
  // LOAD SUBMISSIONS
  // =========================================================

  useEffect(() => {
    dispatch(
      fetchSubmissions({
        page: 0,
        size: 20
      })
    );
  }, [dispatch]);


  // =========================================================
  // ROLE CHECK
  // =========================================================

  const canGrade =
    user?.role === 'MENTOR' ||
    user?.role === 'LEARNING_MANAGER';

  const isStudent =
    user?.role === 'STUDENT';


  // =========================================================
  // OPEN GRADE MODAL
  // =========================================================

  const openGradeModal = (
    submission
  ) => {

    setSelectedSubmission(
      submission
    );

    setScore('');

    setGradeError('');

    setShowGradeModal(true);
  };


  // =========================================================
  // CLOSE GRADE MODAL
  // =========================================================

  const closeGradeModal = () => {

    setShowGradeModal(false);

    setSelectedSubmission(null);

    setScore('');

    setGradeError('');
  };


  // =========================================================
  // GRADE SUBMISSION
  // =========================================================

  const handleGrade = async (e) => {

    e.preventDefault();

    if (
      score === '' ||
      Number(score) < 0 ||
      Number(score) > 100
    ) {

      setGradeError(
        'Score must be between 0 and 100.'
      );

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


      alert(
        'Submission graded successfully!'
      );


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


  // =========================================================
  // OPEN SUBMISSION LINK
  // =========================================================

  const openSubmissionLink = (
    url
  ) => {

    if (!url) {
      alert(
        'No submission link available.'
      );
      return;
    }


    let finalUrl = url.trim();


    // Add https:// if student entered
    // github.com/... instead of
    // https://github.com/...

    if (
      !finalUrl.startsWith('http://') &&
      !finalUrl.startsWith('https://')
    ) {

      finalUrl =
        'https://' + finalUrl;

    }


    window.open(
      finalUrl,
      '_blank',
      'noopener,noreferrer'
    );

  };


  // =========================================================
  // GET SUBMISSION LINK
  // =========================================================

  const getSubmissionUrl = (
    submission
  ) => {

    return (
      submission?.contentUrl ||
      submission?.url ||
      ''
    );

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="page-container submissions-page">

      <div className="card">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >

          <h2>
            Submissions
          </h2>


          {/* New Submission should be
              available only for students */}

          {isStudent && (

            <button
              className="btn-primary"
              onClick={() =>
                setShowModal(true)
              }
            >
              + New Submission
            </button>

          )}

        </div>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        {loading ? (

          <p>
            Loading submissions...
          </p>


        ) : items.length === 0 ? (

          <EmptyState

            entityName="Submissions"

            message="No submissions found."

            onAction={
              isStudent
                ? () =>
                    setShowModal(true)
                : null
            }

          />

        ) : (

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1rem'
            }}
          >


            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <thead>

              <tr
                style={{
                  borderBottom:
                    '2px solid var(--border)',
                  textAlign: 'left'
                }}
              >

                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Enrollment ID
                </th>


                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Milestone
                </th>


                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Submission
                </th>


                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Status
                </th>


                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Score
                </th>


                {canGrade && (

                  <th
                    style={{
                      padding: '10px'
                    }}
                  >
                    Actions
                  </th>

                )}

              </tr>

            </thead>


            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>

              {items.map(
                (sub) => {

                  const submissionUrl =
                    getSubmissionUrl(sub);


                  return (

                    <tr

                      key={sub.id}

                      style={{
                        borderBottom:
                          '1px solid var(--border)'
                      }}

                    >


                      {/* =========================================
                          ENROLLMENT ID
                      ========================================= */}

                      <td
                        style={{
                          padding: '10px'
                        }}
                      >
                        {sub.enrollmentId}
                      </td>


                      {/* =========================================
                          MILESTONE
                      ========================================= */}

                      <td
                        style={{
                          padding: '10px'
                        }}
                      >

                        {sub.milestoneId ??
                          'N/A'}

                      </td>


                      {/* =========================================
                          SUBMISSION LINK
                      ========================================= */}

                      <td
                        style={{
                          padding: '10px'
                        }}
                      >

                        {submissionUrl ? (

                          <button

                            type="button"

                            onClick={() =>
                              openSubmissionLink(
                                submissionUrl
                              )
                            }

                            style={{
                              border: 'none',
                              background: 'none',
                              padding: 0,
                              color:
                                'var(--primary)',
                              cursor:
                                'pointer',
                              textDecoration:
                                'underline',
                              fontWeight:
                                '600',
                              fontSize:
                                '13px'
                            }}

                            title={
                              submissionUrl
                            }

                          >
                            🔗 View Submission
                          </button>

                        ) : (

                          <span
                            style={{
                              color:
                                'var(--text-muted)',
                              fontSize:
                                '12px'
                            }}
                          >
                            No link
                          </span>

                        )}

                      </td>


                      {/* =========================================
                          STATUS
                      ========================================= */}

                      <td
                        style={{
                          padding: '10px'
                        }}
                      >

                        <span
                          style={{
                            padding:
                              '4px 8px',
                            borderRadius:
                              '4px',
                            fontSize:
                              '12px',
                            fontWeight:
                              '500',

                            backgroundColor:
                              sub.status ===
                              'PASSED'
                                ? '#dcfce7'
                                : sub.status ===
                                  'REJECTED'
                                  ? '#fee2e2'
                                  : '#fef3c7',

                            color:
                              sub.status ===
                              'PASSED'
                                ? '#166534'
                                : sub.status ===
                                  'REJECTED'
                                  ? '#991b1b'
                                  : '#92400e'
                          }}
                        >

                          {sub.status}

                        </span>

                      </td>


                      {/* =========================================
                          SCORE
                      ========================================= */}

                      <td
                        style={{
                          padding: '10px'
                        }}
                      >

                        {sub.score !== null &&
                        sub.score !== undefined
                          ? sub.score
                          : 'N/A'}

                      </td>


                      {/* =========================================
                          MENTOR / MANAGER ACTIONS
                      ========================================= */}

                      {canGrade && (

                        <td
                          style={{
                            padding: '10px'
                          }}
                        >

                          {sub.status ===
                          'PENDING' ? (

                            <button

                              className="btn-primary"

                              onClick={() =>
                                openGradeModal(
                                  sub
                                )
                              }

                              style={{
                                padding:
                                  '5px 12px',
                                fontSize:
                                  '12px'
                              }}

                            >
                              Grade
                            </button>

                          ) : (

                            <span
                              style={{
                                color:
                                  'var(--text-muted)',
                                fontSize:
                                  '12px'
                              }}
                            >
                              Graded
                            </span>

                          )}

                        </td>

                      )}

                    </tr>

                  );

                }

              )}

            </tbody>

          </table>

        )}

      </div>


      {/* =====================================================
          SUBMISSION ACHIEVEMENT SECTION
      ===================================================== */}

      <div className="submission-inspiration">


        <div className="submission-message">


          <div className="small-label submission-label">
            SHOW WHAT YOU LEARNED
          </div>


          <h2>
            Learn it.
            <span>
              {' '}Build it. Submit it.
            </span>
          </h2>


          <p>
            Every submission is proof of your progress.
            Keep practicing, complete your milestones,
            and turn your learning into achievements.
          </p>


          <div className="submission-quote">
            “Small progress is still progress.”
          </div>


          <div className="submission-line"></div>

        </div>


        <div className="achievement-visual">


          <div className="achievement-circle">

            <div className="trophy">
              ★
            </div>

            <strong>
              ACHIEVE
            </strong>

            <span>
              KEEP GOING
            </span>

          </div>


          <div className="achievement-badge badge-one">
            ✓ Passed
          </div>


          <div className="achievement-badge badge-two">
            ★ Score
          </div>


          <div className="achievement-badge badge-three">
            ↗ Progress
          </div>


          <div className="achievement-star achievement-star-one">
            ✦
          </div>


          <div className="achievement-star achievement-star-two">
            ✧
          </div>


        </div>

      </div>


      {/* =====================================================
          NEW SUBMISSION MODAL
      ===================================================== */}

      {showModal && (

        <SubmissionForm

          onClose={() =>
            setShowModal(false)
          }

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


      {/* =====================================================
          GRADE MODAL
      ===================================================== */}

      {showGradeModal &&
        selectedSubmission && (

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
                maxWidth: '450px',
                margin: '20px'
              }}

            >


              {/* =============================================
                  MODAL HEADER
              ============================================= */}

              <div

                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  borderBottom:
                    '1px solid var(--border)',
                  paddingBottom:
                    '0.5rem'
                }}

              >

                <h3>
                  Grade Submission
                </h3>


                <button

                  onClick={
                    closeGradeModal
                  }

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


              {/* =============================================
                  ERROR
              ============================================= */}

              {gradeError && (

                <div

                  style={{
                    color:
                      'var(--danger)',
                    marginBottom:
                      '1rem',
                    padding:
                      '0.75rem',
                    backgroundColor:
                      '#fee2e2',
                    borderRadius:
                      '6px',
                    fontSize:
                      '0.9rem'
                  }}

                >
                  {gradeError}
                </div>

              )}


              {/* =============================================
                  SUBMISSION DETAILS
              ============================================= */}

              <div
                style={{
                  marginBottom:
                    '1rem'
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


                {/* =========================================
                    SUBMITTED PROJECT LINK
                ========================================= */}

                <div
                  style={{
                    marginTop:
                      '12px',
                    padding:
                      '12px',
                    backgroundColor:
                      '#f8fafc',
                    borderRadius:
                      '6px',
                    border:
                      '1px solid var(--border)'
                  }}
                >

                  <div
                    style={{
                      fontWeight:
                        '600',
                      marginBottom:
                        '6px'
                    }}
                  >
                    Submitted Project
                  </div>


                  {getSubmissionUrl(
                    selectedSubmission
                  ) ? (

                    <button

                      type="button"

                      onClick={() =>
                        openSubmissionLink(
                          getSubmissionUrl(
                            selectedSubmission
                          )
                        )
                      }

                      style={{
                        border: 'none',
                        background:
                          'none',
                        padding: 0,
                        color:
                          'var(--primary)',
                        cursor:
                          'pointer',
                        textDecoration:
                          'underline',
                        fontSize:
                          '13px',
                        wordBreak:
                          'break-all',
                        textAlign:
                          'left'
                      }}

                    >
                      🔗 View Student Submission
                    </button>

                  ) : (

                    <span
                      style={{
                        color:
                          'var(--text-muted)',
                        fontSize:
                          '13px'
                      }}
                    >
                      No submission link available.
                    </span>

                  )}

                </div>

              </div>


              {/* =============================================
                  GRADE FORM
              ============================================= */}

              <form

                onSubmit={
                  handleGrade
                }

                style={{
                  display: 'flex',
                  flexDirection:
                    'column',
                  gap: '15px'
                }}

              >

                <div>

                  <label>
                    Score{' '}

                    <span
                      style={{
                        color: 'red'
                      }}
                    >
                      *
                    </span>

                  </label>


                  <input

                    type="number"

                    min="0"

                    max="100"

                    value={score}

                    onChange={(e) =>
                      setScore(
                        e.target.value
                      )
                    }

                    required

                    placeholder="Enter score (0-100)"

                    style={{
                      width: '100%',
                      padding: '8px',
                      border:
                        '1px solid var(--border)',
                      borderRadius:
                        '4px',
                      marginTop:
                        '5px'
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