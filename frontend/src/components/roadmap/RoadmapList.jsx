import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchRoadmaps,
  setSearchQuery
} from '../../store/slices/roadmapSlice';

import SearchFilterBar from '../common/SearchFilterBar';
import CapacityBar from '../common/CapacityBar';
import EmptyState from '../common/EmptyState';
import RoadmapForm from './RoadmapForm';

import roadmapService from '../../services/roadmapService';
import enrollmentService from '../../services/enrollmentService';


const RoadmapList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, searchQuery } = useSelector(
    (state) => state.roadmaps
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);


  useEffect(() => {
    dispatch(
      fetchRoadmaps({
        page: 0,
        size: 20
      })
    );
  }, [dispatch, searchQuery]);


  const filteredItems = items.filter((item) =>
    item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


  const isAdmin =
    user?.role === 'LEARNING_MANAGER' ||
    user?.role === 'MENTOR';


  const handleDelete = async (id) => {
    console.log('Deleting roadmap:', id);

    try {
      const response =
        await roadmapService.remove(id);

      console.log(
        'Delete success:',
        response
      );

      dispatch(
        fetchRoadmaps({
          page: 0,
          size: 20
        })
      );

    } catch (err) {
      console.error(
        'Delete error:',
        err
      );

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Unknown error';

      alert(
        'Delete failed: ' +
        errorMsg
      );
    }
  };


  const handlePublish = async (id) => {
    console.log(
      'Publishing roadmap:',
      id
    );

    try {
      const response =
        await roadmapService.publish(id);

      console.log(
        'Publish success:',
        response
      );

      dispatch(
        fetchRoadmaps({
          page: 0,
          size: 20
        })
      );

    } catch (err) {
      console.error(
        'Publish error:',
        err
      );

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Unknown error';

      alert(
        'Publish failed: ' +
        errorMsg
      );
    }
  };


  const handleEnroll = async (roadmapId) => {
    try {
      await enrollmentService.create({
        roadmapId
      });

      alert(
        'Successfully enrolled!'
      );

    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to enroll'
      );
    }
  };


  const handleTitleClick = (id) => {
    navigate(`/roadmaps/${id}`);
  };


  return (
    <div className="page-container roadmaps-page">

      <div className="card">

        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >

          <h2>
            Learning Roadmaps
          </h2>

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


        {/* SEARCH */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) =>
            dispatch(
              setSearchQuery(q)
            )
          }
          placeholder="Search roadmaps by title..."
        />


        {/* CONTENT */}
        {loading ? (

          <p>
            Loading roadmaps...
          </p>

        ) : filteredItems.length === 0 ? (

          <EmptyState
            entityName="Roadmaps"
            onAction={
              isAdmin
                ? () => {
                    setEditingItem(null);
                    setShowModal(true);
                  }
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

                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  ID
                </th>

                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Title
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
                  Capacity
                </th>

                <th
                  style={{
                    padding: '10px'
                  }}
                >
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredItems.map(
                (roadmap) => (

                  <tr
                    key={roadmap.id}
                    style={{
                      borderBottom:
                        '1px solid var(--border)'
                    }}
                  >

                    {/* ID */}
                    <td
                      style={{
                        padding: '10px',
                        fontWeight: 'bold'
                      }}
                    >
                      #{roadmap.id}
                    </td>


                    {/* TITLE */}
                    <td
                      style={{
                        padding: '10px'
                      }}
                    >

                      <span
                        role="link"
                        tabIndex={0}
                        onClick={() =>
                          handleTitleClick(
                            roadmap.id
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' ||
                            e.key === ' '
                          ) {
                            e.preventDefault();

                            handleTitleClick(
                              roadmap.id
                            );
                          }
                        }}
                        style={{
                          color:
                            'var(--text-dark)',
                          textDecoration:
                            'none',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color =
                            'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            'var(--text-dark)';
                        }}
                      >
                        {roadmap.title}
                      </span>

                    </td>


                    {/* STATUS */}
                    <td
                      style={{
                        padding: '10px'
                      }}
                    >

                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor:
                            roadmap.status ===
                            'PUBLISHED'
                              ? '#dcfce7'
                              : '#f1f5f9',
                          color:
                            roadmap.status ===
                            'PUBLISHED'
                              ? '#166534'
                              : '#475569'
                        }}
                      >
                        {roadmap.status}
                      </span>

                    </td>


                    {/* CAPACITY */}
                    <td
                      style={{
                        padding: '10px'
                      }}
                    >

                      <CapacityBar
                        current={0}
                        max={
                          roadmap.maxCapacity
                        }
                      />

                    </td>


                    {/* ACTIONS */}
                    <td
                      style={{
                        padding: '10px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                      }}
                    >

                      {/* ENROLL */}
                      {roadmap.status ===
                        'PUBLISHED' &&
                        (
                          user?.role ===
                            'STUDENT' ||
                          user?.role ===
                            'LEARNING_MANAGER'
                        ) && (

                          <button
                            className="btn-primary"
                            style={{
                              padding:
                                '5px 10px',
                              fontSize:
                                '12px',
                              minWidth:
                                'auto'
                            }}
                            onClick={() =>
                              handleEnroll(
                                roadmap.id
                              )
                            }
                          >
                            Enroll
                          </button>

                        )}


                      {/* ADMIN ACTIONS */}
                      {isAdmin && (
                        <>

                          {/* PUBLISH */}
                          {roadmap.status ===
                            'DRAFT' && (

                            <button
                              style={{
                                color:
                                  '#16a34a',
                                border:
                                  '1px solid #16a34a',
                                padding:
                                  '4px 8px',
                                borderRadius:
                                  '4px',
                                background:
                                  'none',
                                cursor:
                                  'pointer',
                                fontSize:
                                  '12px'
                              }}
                              onClick={() =>
                                handlePublish(
                                  roadmap.id
                                )
                              }
                            >
                              Publish
                            </button>

                          )}


                          {/* EDIT */}
                          <button
                            style={{
                              color:
                                'var(--primary)',
                              border: 'none',
                              background:
                                'none',
                              cursor:
                                'pointer'
                            }}
                            onClick={() => {
                              setEditingItem(
                                roadmap
                              );
                              setShowModal(
                                true
                              );
                            }}
                          >
                            Edit
                          </button>


                          {/* DELETE */}
                          <button
                            style={{
                              color:
                                'var(--danger)',
                              border: 'none',
                              background:
                                'none',
                              cursor:
                                'pointer'
                            }}
                            onClick={() =>
                              handleDelete(
                                roadmap.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </>
                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>


      {/* LEARNING INSPIRATION SECTION */}
      <div className="roadmap-inspiration">

        {/* Decorative Books */}
        <div className="books-illustration">

          <div className="book book-blue">
            <div className="book-page"></div>
            <span>LEARN</span>
          </div>

          <div className="book book-purple">
            <div className="book-page"></div>
            <span>GROW</span>
          </div>

          <div className="book book-yellow">
            <div className="book-page"></div>
            <span>BUILD</span>
          </div>

          <div className="book-shadow"></div>

          <div className="floating-star star-one">
            ✦
          </div>

          <div className="floating-star star-two">
            ✧
          </div>

          <div className="floating-star star-three">
            ✦
          </div>

        </div>


        {/* Quote */}
        <div className="roadmap-quote">

          <div className="quote-mark">
            “
          </div>

          <h2>
            Every expert was once
            <span> a beginner.</span>
          </h2>

          <p>
            Choose a roadmap, build your
            skills, and keep moving forward
            one milestone at a time.
          </p>

          <div className="quote-line"></div>

          <div className="quote-label">
            YOUR NEXT SKILL STARTS HERE
          </div>

        </div>


        {/* Small Learning Notes */}
        <div className="learning-pill pill-one">
          <span>✦</span>
          Learn
        </div>

        <div className="learning-pill pill-two">
          <span>✓</span>
          Practice
        </div>

        <div className="learning-pill pill-three">
          <span>↗</span>
          Grow
        </div>

      </div>


      {/* ROADMAP FORM MODAL */}
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
          }}
        />
      )}

    </div>
  );
};


export default RoadmapList;