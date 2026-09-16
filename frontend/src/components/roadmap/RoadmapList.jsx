import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchRoadmaps,
  setSearchQuery
} from '../../store/slices/roadmapSlice';

import {
  fetchEnrollments
} from '../../store/slices/enrollmentSlice';

import SearchFilterBar from '../common/SearchFilterBar';
import CapacityBar from '../common/CapacityBar';
import EmptyState from '../common/EmptyState';
import RoadmapForm from './RoadmapForm';

import roadmapService from '../../services/roadmapService';
import enrollmentService from '../../services/enrollmentService';

const RoadmapList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    loading,
    searchQuery
  } = useSelector(
    (state) => state.roadmaps
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Load roadmaps on mount and when searchQuery changes
  useEffect(() => {
    dispatch(
      fetchRoadmaps({
        page: 0,
        size: 20
      })
    );
  }, [dispatch, searchQuery]);

  // Load enrollments
  useEffect(() => {
    dispatch(
      fetchEnrollments({
        page: 0,
        size: 100
      })
    );
  }, [dispatch]);

  // Filter roadmaps
  const filteredItems = items.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
  );

  const isAdmin =
    user?.role === 'LEARNING_MANAGER' ||
    user?.role === 'MENTOR';

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this roadmap?')) {
      return;
    }

    try {
      await roadmapService.remove(id);

      dispatch(
        fetchRoadmaps({
          page: 0,
          size: 20
        })
      );

      dispatch(
        fetchEnrollments({
          page: 0,
          size: 100
        })
      );
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Unknown error';

      alert('Delete failed: ' + errorMsg);
    }
  };

  const handlePublish = async (id) => {
    try {
      await roadmapService.publish(id);

      dispatch(
        fetchRoadmaps({
          page: 0,
          size: 20
        })
      );
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Unknown error';

      alert('Publish failed: ' + errorMsg);
    }
  };

  const handleEnroll = async (roadmapId) => {
    try {
      await enrollmentService.create({
        roadmapId
      });

      alert('Successfully enrolled!');

      dispatch(
        fetchEnrollments({
          page: 0,
          size: 100
        })
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

  const totalCapacity = items.reduce((sum, r) => sum + (Number(r.maxCapacity) || 0), 0);
  const totalEnrolled = items.reduce((sum, r) => sum + (Number(r.currentEnrollmentCount) || 0), 0);
  const publishedCount = items.filter(r => r.status === 'PUBLISHED').length;

  return (
    <div className="page-container roadmaps-page">
      {/* Universal Optimistic Quote Banner */}
      <div className="page-quote-banner">
        <div className="page-quote-content">
          <div className="page-quote-icon">🗺️</div>
          <div>
            <div className="page-quote-text">
              "The expert in anything was once a beginner. Choose your path, embrace every milestone, and build real-world mastery."
            </div>
            <span className="page-quote-author">— Helen Hayes • Lifelong Learning Mindset</span>
          </div>
        </div>
        <div className="page-quote-tag">⚡ {items.length} Curated Tracks</div>
      </div>

      {/* Curriculum Overview Metric Process Bar */}
      <div className="process-metric-bar">
        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            📚
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Total Tracks</span>
            <span className="process-metric-val">{items.length}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            ✓
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Published</span>
            <span className="process-metric-val">{publishedCount}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple-accent)' }}>
            👥
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Enrolled Learners</span>
            <span className="process-metric-val">{totalEnrolled}</span>
          </div>
        </div>

        <div className="process-metric-item">
          <div className="process-metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            🎯
          </div>
          <div className="process-metric-info">
            <span className="process-metric-label">Total Capacity</span>
            <span className="process-metric-val">{totalCapacity}</span>
          </div>
        </div>
      </div>

      <div className="card">
        {/* Header with Title & Action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Learning Roadmaps</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Explore structured curricula, milestone requirements, and start learning.
            </p>
          </div>

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

        {/* Search Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => dispatch(setSearchQuery(q))}
          placeholder="Search roadmaps by title..."
        />

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading roadmaps...
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            entityName="Roadmaps"
            message="No learning roadmaps match your search criteria."
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
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Title & Description</th>
                  <th style={{ width: '130px' }}>Status</th>
                  <th style={{ width: '150px' }}>Capacity</th>
                  <th style={{ width: '200px' }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((roadmap) => (
                  <tr key={roadmap.id}>
                    {/* ID */}
                    <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>
                      #{roadmap.id}
                    </td>

                    {/* Title & Description */}
                    <td>
                      <div>
                        <span
                          role="link"
                          tabIndex={0}
                          onClick={() => handleTitleClick(roadmap.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleTitleClick(roadmap.id);
                            }
                          }}
                          style={{
                            color: 'var(--text-dark)',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-dark)';
                          }}
                        >
                          {roadmap.title}
                        </span>

                        {roadmap.description && (
                          <div
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              marginTop: '3px',
                              maxWidth: '450px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {roadmap.description}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span
                        className={
                          roadmap.status === 'PUBLISHED'
                            ? 'status-badge status-published'
                            : 'status-badge status-draft'
                        }
                      >
                        {roadmap.status}
                      </span>
                    </td>

                    {/* Capacity Bar */}
                    <td>
                      <CapacityBar
                        current={roadmap.currentEnrollmentCount || 0}
                        max={roadmap.maxCapacity}
                      />
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Student Enroll Button */}
                        {roadmap.status === 'PUBLISHED' && user?.role === 'STUDENT' && (
                          <button
                            className="btn-primary"
                            style={{
                              padding: '4px 12px',
                              fontSize: '0.8125rem'
                            }}
                            onClick={() => handleEnroll(roadmap.id)}
                          >
                            Enroll
                          </button>
                        )}

                        {/* Admin / Mentor Actions */}
                        {isAdmin && (
                          <>
                            {roadmap.status === 'DRAFT' && (
                              <button
                                style={{
                                  color: '#059669',
                                  background: 'var(--success-light)',
                                  border: '1px solid var(--success-border)',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem',
                                  fontWeight: '600'
                                }}
                                onClick={() => handlePublish(roadmap.id)}
                              >
                                Publish
                              </button>
                            )}

                            <button
                              style={{
                                color: 'var(--primary)',
                                border: '1px solid var(--border)',
                                background: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '600'
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
                                color: 'var(--danger-dark)',
                                border: '1px solid var(--danger-border)',
                                background: 'var(--danger-light)',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                              }}
                              onClick={() => handleDelete(roadmap.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Roadmap Inspiration Banner */}
      <div className="roadmap-inspiration">
        <div className="roadmap-quote">
          <div className="quote-mark">“</div>
          <h2>Every expert was once a <span>beginner</span>.</h2>
          <p>
            Choose a structured learning path, complete real milestones, and master in-demand skills step by step with mentor support.
          </p>
          <span className="quote-label">⚡ Continuous Skill Acceleration</span>
        </div>
        <div className="learning-pills-container">
          <div className="learning-pill">
            <span>✦</span> Step-by-Step Curriculum
          </div>
          <div className="learning-pill">
            <span>✓</span> Milestone Verification
          </div>
          <div className="learning-pill">
            <span>↗</span> Industry Ready Portfolio
          </div>
        </div>
      </div>

      {/* Roadmap Form Modal */}
      {showModal && (
        <RoadmapForm
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            dispatch(fetchRoadmaps({ page: 0, size: 20 }));
            dispatch(fetchEnrollments({ page: 0, size: 100 }));
          }}
        />
      )}
    </div>
  );
};

export default RoadmapList;