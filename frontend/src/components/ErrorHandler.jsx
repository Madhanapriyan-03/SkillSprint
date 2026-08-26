import React from 'react';
import { useSelector } from 'react-redux';

const ErrorHandler = () => {
  const { error: roadmapError } = useSelector((state) => state.roadmaps);
  const { message: authError } = useSelector((state) => state.auth);

  const error = roadmapError || authError;

  if (!error) return null;

  return (
    <div className="error-handler" style={{ color: 'red', padding: '10px', border: '1px solid red', margin: '10px 0' }}>
      <p>{error}</p>
    </div>
  );
};

export default ErrorHandler;
