import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrollments } from '../../store/slices/enrollmentSlice';
import EmptyState from '../common/EmptyState';

const EnrollmentList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.enrollments);
  const [showModal, setShowModal] = useState(false);
  const [roadmapIdInput, setRoadmapIdInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    dispatch(fetchEnrollments({ page: 0, size: 20 }));
  }, [dispatch]);

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!roadmapIdInput) return;
    
    try {
      const enrollmentService = (await import('../../services/enrollmentService')).default;
      await enrollmentService.create({ roadmapId: parseInt(roadmapIdInput) });
      setShowModal(false);
      setRoadmapIdInput('');
      alert('Successfully enrolled!');
      dispatch(fetchEnrollments({ page: 0, size: 20 }));
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to enroll');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2>My Enrollments</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Enroll in Roadmap
          </button>
        </div>
        
        {loading ? <p>Loading enrollments...</p> : items.length === 0 ? (
          <EmptyState entityName="Enrollments" message="You have not enrolled in any roadmaps yet." onAction={() => setShowModal(true)} />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>ID</th>
                <th style={{ padding: '10px' }}>Roadmap ID</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {items.map(enroll => (
                <tr key={enroll.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>#{enroll.id}</td>
                  <td style={{ padding: '10px' }}>{enroll.roadmapId}</td>
                  <td style={{ padding: '10px' }}>{enroll.status}</td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{ width: `${enroll.progressPercentage}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card" style={{ width: '400px', position: 'relative' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Enroll in a Roadmap</h3>
            {errorMsg && <div style={{ color: 'var(--danger)', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '500' }}>{errorMsg}</div>}
            <form onSubmit={handleEnrollSubmit}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Roadmap ID</label>
                <input
                  type="number"
                  required
                  value={roadmapIdInput}
                  onChange={(e) => setRoadmapIdInput(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text-dark)', fontSize: '1rem' }}
                  placeholder="e.g. 1"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', background: 'var(--bg-color)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-dark)', fontWeight: '500' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;
