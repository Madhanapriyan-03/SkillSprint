import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ErrorHandler from './components/ErrorHandler';
import NotificationStack from './components/NotificationStack';
import Dashboard from './components/dashboard/Dashboard';
import RoadmapList from './components/roadmap/RoadmapList';
import EnrollmentList from './components/enrollment/EnrollmentList';

import SubmissionList from './components/submission/SubmissionList';

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        {user && <Navbar />}
        <ErrorHandler />
        <NotificationStack />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/roadmaps" element={<PrivateRoute><RoadmapList /></PrivateRoute>} />
          <Route path="/enrollments" element={<PrivateRoute><EnrollmentList /></PrivateRoute>} />
          <Route path="/submissions" element={<PrivateRoute><SubmissionList /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
