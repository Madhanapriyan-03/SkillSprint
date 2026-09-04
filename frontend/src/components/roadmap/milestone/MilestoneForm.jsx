import React, { useState, useEffect, useRef } from 'react';
import milestoneService from '../../services/milestoneService';

const MilestoneForm = ({ roadmapId, item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    roadmapId: roadmapId,
    title: '',
    expectedDurationDays: 1,
    passingScore: 1
  });

  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (item) {
      setFormData({
        roadmapId: roadmapId,
        title: item.title || '',
        expectedDurationDays: item.expectedDurationDays || 1,
        passingScore: item.passingScore || 1
      });
    }

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [item, roadmapId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item?.id) {
        await milestoneService.update(item.id, formData);
      } else {
        await milestoneService.create(formData);
      }

      onSuccess();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Error saving milestone';

      alert(message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
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
          maxWidth: '500px',
          margin: '20px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <h2>{item ? 'Edit Milestone' : 'Add Milestone'}</h2>

          <button
            onClick={onClose}
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

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          <div>
            <label>
              Title <span style={{ color: 'red' }}>*</span>
            </label>

            <input
              ref={titleInputRef}
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: '4px'
              }}
              placeholder="e.g. Java Basics"
            />
          </div>

          <div>
            <label>
              Expected Duration (days){' '}
              <span style={{ color: 'red' }}>*</span>
            </label>

            <input
              type="number"
              min="1"
              value={formData.expectedDurationDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expectedDurationDays: parseInt(e.target.value) || 1
                })
              }
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label>
              Passing Score <span style={{ color: 'red' }}>*</span>
            </label>

            <input
              type="number"
              min="1"
              value={formData.passingScore}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passingScore: parseInt(e.target.value) || 1
                })
              }
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: '4px'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '10px'
            }}
          >
            {loading
              ? 'Saving...'
              : item
              ? 'Update Milestone'
              : 'Save Milestone'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MilestoneForm;