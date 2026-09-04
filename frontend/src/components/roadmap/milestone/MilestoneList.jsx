import React, {
  useCallback,
  useEffect,
  useState
} from 'react';

import milestoneService from '../../../services/milestoneService';
import MilestoneForm from './MilestoneForm';


const MilestoneList = ({
  roadmapId,
  roadmapTitle,
  roadmapStatus,
  onClose
}) => {

  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);


  // =====================================================
  // LOAD MILESTONES
  // =====================================================

  const loadMilestones = useCallback(async () => {

    try {

      setLoading(true);

      const response =
        await milestoneService.getByRoadmap(
          roadmapId
        );

      setMilestones(
        response?.content || []
      );

    } catch (error) {

      console.error(
        'Failed to load milestones:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to load milestones'
      );

    } finally {

      setLoading(false);

    }

  }, [roadmapId]);


  // =====================================================
  // LOAD WHEN ROADMAP CHANGES
  // =====================================================

  useEffect(() => {

    loadMilestones();

  }, [loadMilestones]);


  // =====================================================
  // DELETE MILESTONE
  // =====================================================

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        'Are you sure you want to delete this milestone?'
      )
    ) {
      return;
    }


    try {

      await milestoneService.remove(id);

      alert(
        'Milestone deleted successfully!'
      );

      await loadMilestones();

    } catch (error) {

      console.error(
        'Failed to delete milestone:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to delete milestone'
      );

    }

  };


  // =====================================================
  // ADD MILESTONE
  // =====================================================

  const handleAdd = () => {

    setEditingItem(null);
    setShowForm(true);

  };


  // =====================================================
  // EDIT MILESTONE
  // =====================================================

  const handleEdit = (milestone) => {

    setEditingItem(milestone);
    setShowForm(true);

  };


  // =====================================================
  // CLOSE FORM
  // =====================================================

  const handleFormClose = () => {

    setShowForm(false);
    setEditingItem(null);

  };


  // =====================================================
  // FORM SUCCESS
  // =====================================================

  const handleSuccess = async () => {

    setShowForm(false);
    setEditingItem(null);

    await loadMilestones();

  };


  return (
    <>
      {/* =================================================
          MILESTONE MODAL
      ================================================= */}

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          backgroundColor:
            'rgba(0,0,0,0.5)',

          display: 'flex',

          alignItems: 'center',

          justifyContent: 'center',

          zIndex: 1000,

          padding: '20px'
        }}
      >

        <div
          className="card"
          style={{
            width: '90%',
            maxWidth: '800px',

            maxHeight: '85vh',

            overflowY: 'auto'
          }}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            style={{
              display: 'flex',

              justifyContent:
                'space-between',

              alignItems: 'center',

              marginBottom: '1rem'
            }}
          >

            <div>

              <h2
                style={{
                  marginBottom: '5px'
                }}
              >
                Manage Milestones
              </h2>


              <p
                style={{
                  margin: 0,
                  color: '#64748b'
                }}
              >
                Roadmap:{' '}

                <strong>
                  {roadmapTitle}
                </strong>

              </p>

            </div>


            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',

                fontSize: '1.5rem',

                cursor: 'pointer'
              }}
            >
              ×
            </button>

          </div>


          {/* =================================================
              ADD MILESTONE
          ================================================= */}

          {roadmapStatus === 'DRAFT' && (

            <button
              className="btn-primary"

              onClick={handleAdd}

              style={{
                marginBottom: '1rem'
              }}
            >
              + Add Milestone
            </button>

          )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div
              style={{
                textAlign: 'center',
                padding: '30px',
                color: '#64748b'
              }}
            >

              <p>
                Loading milestones...
              </p>

            </div>

          )}


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!loading &&
            milestones.length === 0 && (

              <div
                style={{
                  textAlign: 'center',

                  padding: '30px',

                  color: '#64748b'
                }}
              >

                <p>
                  No milestones found.
                </p>


                {roadmapStatus === 'DRAFT' && (

                  <p>
                    Click{' '}

                    <strong>
                      + Add Milestone
                    </strong>{' '}

                    to create one.
                  </p>

                )}

              </div>

            )}


          {/* =================================================
              MILESTONE LIST
          ================================================= */}

          {!loading &&
            milestones.length > 0 && (

              <div>

                {milestones.map(
                  (milestone, index) => (

                    <div
                      key={milestone.id}

                      style={{
                        border:
                          '1px solid var(--border)',

                        borderRadius: '8px',

                        padding: '15px',

                        marginBottom: '12px',

                        background: '#fff'
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',

                          justifyContent:
                            'space-between',

                          alignItems:
                            'flex-start',

                          gap: '15px'
                        }}
                      >

                        {/* =================================================
                            MILESTONE DETAILS
                        ================================================= */}

                        <div>

                          <h3
                            style={{
                              margin:
                                '0 0 8px'
                            }}
                          >
                            {index + 1}.{' '}
                            {milestone.title}
                          </h3>


                          <p
                            style={{
                              margin: '4px 0'
                            }}
                          >
                            <strong>
                              Duration:
                            </strong>{' '}

                            {
                              milestone
                                .expectedDurationDays
                            }{' '}

                            days
                          </p>


                          <p
                            style={{
                              margin: '4px 0'
                            }}
                          >
                            <strong>
                              Passing Score:
                            </strong>{' '}

                            {
                              milestone
                                .passingScore
                            }
                          </p>


                          <p
                            style={{
                              margin: '4px 0',

                              fontSize: '12px',

                              color: '#64748b'
                            }}
                          >
                            Milestone ID: #
                            {milestone.id}
                          </p>

                        </div>


                        {/* =================================================
                            EDIT / DELETE
                        ================================================= */}

                        {roadmapStatus ===
                          'DRAFT' && (

                          <div
                            style={{
                              display: 'flex',

                              gap: '10px'
                            }}
                          >

                            <button
                              onClick={() =>
                                handleEdit(
                                  milestone
                                )
                              }

                              style={{
                                color:
                                  'var(--primary)',

                                border: 'none',

                                background:
                                  'none',

                                cursor:
                                  'pointer'
                              }}
                            >
                              Edit
                            </button>


                            <button
                              onClick={() =>
                                handleDelete(
                                  milestone.id
                                )
                              }

                              style={{
                                color:
                                  'var(--danger)',

                                border: 'none',

                                background:
                                  'none',

                                cursor:
                                  'pointer'
                              }}
                            >
                              Delete
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}


          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <div
            style={{
              display: 'flex',

              justifyContent:
                'flex-end',

              marginTop: '1rem'
            }}
          >

            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MILESTONE FORM
      ================================================= */}

      {showForm && (

        <MilestoneForm
          roadmapId={roadmapId}
          item={editingItem}

          onClose={
            handleFormClose
          }

          onSuccess={
            handleSuccess
          }
        />

      )}

    </>
  );
};


export default MilestoneList;