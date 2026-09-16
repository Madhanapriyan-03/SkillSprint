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

  const loadMilestones = useCallback(async () => {
    try {
      setLoading(true);

      const response = await milestoneService.getByRoadmap(roadmapId);

      setMilestones(response?.content || response?.data?.content || []);
    } catch (error) {
      console.error('Failed to load milestones:', error);

      alert(
        error.response?.data?.message ||
        'Failed to load milestones'
      );
    } finally {
      setLoading(false);
    }
  }, [roadmapId]);

  useEffect(() => {
    loadMilestones();
  }, [loadMilestones]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this milestone?')) {
      return;
    }

    try {
      await milestoneService.remove(id);
      alert('Milestone deleted successfully!');
      await loadMilestones();
    } catch (error) {
      console.error('Failed to delete milestone:', error);
      alert(
        error.response?.data?.message ||
        'Failed to delete milestone'
      );
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (milestone) => {
    setEditingItem(milestone);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSuccess = async () => {
    setShowForm(false);
    setEditingItem(null);
    await loadMilestones();
  };

  return (
    <>
      <div className="modern-modal-overlay">
        <div
          className="modern-modal"
          style={{ maxWidth: '750px' }}
        >
          {/* Header */}
          <div className="modern-modal-header">
            <div className="modern-modal-title-area">
              <div className="modern-modal-icon">
                🎯
              </div>
              <div>
                <h2>Manage Milestones</h2>
                <p>
                  Roadmap: <strong>{roadmapTitle}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="modern-modal-close"
            >
              ×
            </button>
          </div>

          {/* Add Milestone Action */}
          {roadmapStatus === 'DRAFT' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <button
                className="btn-primary"
                onClick={handleAdd}
              >
                + Add Milestone
              </button>
            </div>
          )}

          {/* Content */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
              Loading milestones...
            </div>
          )}

          {!loading && milestones.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                border: '2px dashed var(--border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-muted)',
                background: 'var(--surface-alt)'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.9rem' }}>No milestones found.</p>
              {roadmapStatus === 'DRAFT' && (
                <p style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                  Click <strong>+ Add Milestone</strong> to create your first milestone step.
                </p>
              )}
            </div>
          )}

          {!loading && milestones.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    background: 'var(--surface-alt)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1rem' }}>
                      {index + 1}. {milestone.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      <span><strong>Duration:</strong> {milestone.expectedDurationDays} days</span>
                      <span><strong>Passing Score:</strong> {milestone.passingScore}</span>
                      <span style={{ color: 'var(--text-muted)' }}>ID: #{milestone.id}</span>
                    </div>
                  </div>

                  {roadmapStatus === 'DRAFT' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(milestone)}
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
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(milestone.id)}
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
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="modern-modal-actions">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <MilestoneForm
          roadmapId={roadmapId}
          item={editingItem}
          onClose={handleFormClose}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default MilestoneList;