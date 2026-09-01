import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoadmaps, setSearchQuery } from '../../store/slices/roadmapSlice';
import SearchFilterBar from '../common/SearchFilterBar';
import CapacityBar from '../common/CapacityBar';
import EmptyState from '../common/EmptyState';
import RoadmapForm from './RoadmapForm';
import roadmapService from '../../services/roadmapService';
import enrollmentService from '../../services/enrollmentService';

const RoadmapList = () => {
  const dispatch = useDispatch();
  const { items, loading, searchQuery } = useSelector((state) => state.roadmaps);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // NEW: actual enrollment counts
  const [enrollmentCounts, setEnrollmentCounts] = useState({});

  useEffect(() => {
    dispatch(fetchRoadmaps({ page: 0, size: 20 }));
  }, [dispatch]);

  // NEW: load actual enrollment counts
  const loadEnrollmentCounts = async () => {
    try {
      const response = await enrollmentService.getAll(0, 1000);

      const enrollments = Array.isArray(response?.content)
        ? response.content
        : Array.isArray(response)
          ? response
          : [];

      const counts = {};

      enrollments.forEach((enrollment) => {
        const roadmapId =
          enrollment.roadmapId ??
          enrollment.roadmap?.id;

        if (roadmapId != null) {
          counts[roadmapId] =
            (counts[roadmapId] || 0) + 1;
        }
      });

      setEnrollmentCounts(counts);
    } catch (error) {
      console.error(
        'Failed to load enrollment counts:',
        error
      );
    }
  };

  useEffect(() => {
    loadEnrollmentCounts();
  }, []);

  const filteredItems = items.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAdmin =
    user?.role === 'LEARNING_MANAGER' ||
    user?.role === 'MENTOR';

  const handleDelete = async (id) => {
    console.log('Deleting roadmap:', id);

    try {
      const response = await roadmapService.remove(id);
      console.log('Delete success:', response);

      dispatch(fetchRoadmaps({ page: 0, size: 20 }));
      loadEnrollmentCounts();
    } catch (err) {
      console.error('Delete error:', err);

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Unknown error';

      alert('Delete failed: ' + errorMsg);
    }
  };

  const handlePublish = async (id) => {
    console.log('Publishing roadmap:', id);

    try {
      const response = await roadmapService.publish(id);
      console.log('Publish success:', response);

      dispatch(fetchRoadmaps({ page: 0, size: 20 }));
    } catch (err) {
      console.error('Publish error:', err);

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Unknown error';

      alert('Publish failed: ' + errorMsg);
    }
  };

  const handleEnroll = async (roadmapId) => {
    try {
      await enrollmentService.create({ roadmapId });

      alert('Successfully enrolled!');

      // NEW: immediately refresh capacity
      await loadEnrollmentCounts();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to enroll'
      );
    }
  };

  return (
    <div className="page-container">
      <div className="card">

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <h2>Learning Roadmaps</h2>

          {isAdmin && (
            <button
              className="btn-primary"
              onClick={() => {
                setEditingItem(null);
                setShowModal(true);
              }}
            >
              + Add Roadmap
            </button>
          )}
        </div>

        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) =>
            dispatch(setSearchQuery(q))
          }
          placeholder="Search roadmaps by title..."
        />

        {loading ? (
          <p>Loading roadmaps...</p>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            entityName="Roadmaps"
            onAction={
              isAdmin
                ? () => setShowModal(true)
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
            <thead>
              <tr
                style={{
                  borderBottom:
                    '2px solid var(--border)',
                  textAlign: 'left'
                }}
              >
                <th style={{ padding: '10px' }}>
                  ID
                </th>

                <th style={{ padding: '10px' }}>
                  Title
                </th>

                <th style={{ padding: '10px' }}>
                  Status
                </th>

                <th style={{ padding: '10px' }}>
                  Capacity
                </th>

                <th style={{ padding: '10px' }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map(roadmap => {
                const currentEnrollment =
                  enrollmentCounts[roadmap.id] || 0;

                return (
                  <tr
                    key={roadmap.id}
                    style={{
                      borderBottom:
                        '1px solid var(--border)'
                    }}
                  >
                    <td
                      style={{
                        padding: '10px',
                        fontWeight: 'bold'
                      }}
                    >
                      #{roadmap.id}
                    </td>

                    <td style={{ padding: '10px' }}>
                      {roadmap.title}
                    </td>

                    <td style={{ padding: '10px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
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
                    </td>

                    <td style={{ padding: '10px' }}>
                      <CapacityBar
                        current={currentEnrollment}
                        max={roadmap.maxCapacity}
                      />
                    </td>

                    <td
                      style={{
                        padding: '10px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                      }}
                    >
                      {roadmap.status === 'PUBLISHED' &&
                        (
                          user?.role === 'STUDENT' ||
                          user?.role === 'LEARNING_MANAGER'
                        ) && (
                          <button
                            className="btn-primary"
                            style={{
                              padding: '5px 10px',
                              fontSize: '12px',
                              minWidth: 'auto'
                            }}
                            onClick={() =>
                              handleEnroll(roadmap.id)
                            }
                          >
                            Enroll
                          </button>
                        )}

                      {isAdmin && (
                        <>
                          {roadmap.status === 'DRAFT' && (
                            <button
                              style={{
                                color: '#16a34a',
                                border:
                                  '1px solid #16a34a',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                              onClick={() =>
                                handlePublish(roadmap.id)
                              }
                            >
                              Publish
                            </button>
                          )}

                          <button
                            style={{
                              color: 'var(--primary)',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              setEditingItem(roadmap);
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            style={{
                              color: 'var(--danger)',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer'
                            }}
                            onClick={() =>
                              handleDelete(roadmap.id)
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <RoadmapForm
          item={editingItem}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() => {
            setShowModal(false);

            dispatch(
              fetchRoadmaps({
                page: 0,
                size: 20
              })
            );

            loadEnrollmentCounts();
          }}
        />
      )}
    </div>
  );
};

export default RoadmapList;