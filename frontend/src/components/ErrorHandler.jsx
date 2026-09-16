import React from 'react';
import { useSelector } from 'react-redux';

const ErrorHandler = () => {
  const { error: roadmapError } = useSelector((state) => state.roadmaps);
  const { message: authError } = useSelector((state) => state.auth);

  const error = roadmapError || authError;

  if (!error) return null;

  return (
    <div className="error-handler">
      <p style={{ margin: 0 }}>{error}</p>
    </div>
  );
};

export default ErrorHandler;
