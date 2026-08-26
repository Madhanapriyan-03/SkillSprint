import React, { useState, useEffect, useRef } from 'react';
import roadmapService from '../../services/roadmapService';

const RoadmapForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { title: '', description: '', maxCapacity: 10, status: 'DRAFT' });
  const [loading, setLoading] = useState(false);

  const titleInputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
    if (cardRef.current && typeof cardRef.current.scrollIntoView === 'function') {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (item?.id) {
        await roadmapService.update(item.id, formData);
      } else {
        await roadmapService.create(formData);
      }
      onSuccess();
    } catch (error) {
      alert('Error saving roadmap');
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div ref={cardRef} className="card" style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2>{item ? 'Edit Roadmap' : 'Create New Roadmap'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Title <span style={{color: 'red'}}>*</span></label>
            <input ref={titleInputRef} type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} placeholder="e.g. Frontend Masterclass" />
          </div>
          <div>
            <label>Description <span style={{color: 'red'}}>*</span></label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} placeholder="Detailed course description..." rows="3" />
          </div>
          <div>
            <label>Max Capacity <span style={{color: 'red'}}>*</span></label>
            <input type="number" min="1" value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: parseInt(e.target.value)})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Saving...' : 'Save Roadmap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoadmapForm;
