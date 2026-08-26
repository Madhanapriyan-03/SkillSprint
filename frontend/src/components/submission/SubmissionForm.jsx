import React, { useState } from 'react';
import submissionService from '../../services/submissionService';

const SubmissionForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { enrollmentId: '', milestoneId: '', contentUrl: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await submissionService.create(formData);
      onSuccess();
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error creating submission');
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          <h3>Submit Milestone</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
        </div>
        {errorMsg && <div style={{ color: 'var(--danger)', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '500' }}>{errorMsg}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Enrollment ID <span style={{color: 'red'}}>*</span></label>
            <input type="number" value={formData.enrollmentId} onChange={e => setFormData({...formData, enrollmentId: parseInt(e.target.value)})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} />
          </div>
          <div>
            <label>Milestone ID <span style={{color: 'red'}}>*</span></label>
            <input type="number" value={formData.milestoneId} onChange={e => setFormData({...formData, milestoneId: parseInt(e.target.value)})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} />
          </div>
          <div>
            <label>Content URL <span style={{color: 'red'}}>*</span></label>
            <input type="url" value={formData.contentUrl} onChange={e => setFormData({...formData, contentUrl: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
