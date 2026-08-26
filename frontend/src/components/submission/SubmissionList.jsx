import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions } from '../../store/slices/submissionSlice';
import EmptyState from '../common/EmptyState';
import SubmissionForm from './SubmissionForm';

const SubmissionList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.submissions);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSubmissions({ page: 0, size: 20 }));
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2>Submissions</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + New Submission
          </button>
        </div>
        
        {loading ? <p>Loading submissions...</p> : items.length === 0 ? (
          <EmptyState entityName="Submissions" message="No submissions found." onAction={() => setShowModal(true)} />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Enrollment ID</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map(sub => (
                <tr key={sub.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px' }}>{sub.enrollmentId}</td>
                  <td style={{ padding: '10px' }}>{sub.status}</td>
                  <td style={{ padding: '10px' }}>{sub.score ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <SubmissionForm 
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            dispatch(fetchSubmissions({ page: 0, size: 20 }));
          }}
        />
      )}
    </div>
  );
};

export default SubmissionList;
