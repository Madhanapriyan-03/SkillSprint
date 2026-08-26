import React, { useState } from 'react';
import enrollmentService from '../../services/enrollmentService';

const EnrollmentForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { roadmapId: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enrollmentService.create(formData);
      onSuccess();
    } catch (error) {
      alert('Error creating enrollment');
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2>Enroll in Roadmap</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Roadmap ID <span style={{color: 'red'}}>*</span></label>
            <input type="number" value={formData.roadmapId} onChange={e => setFormData({...formData, roadmapId: parseInt(e.target.value)})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Enrolling...' : 'Enroll'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;
