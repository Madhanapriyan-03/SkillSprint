import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { useSelector } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Login from './components/Login';
import ErrorHandler from './components/ErrorHandler';
import NotificationStack from './components/NotificationStack';

import Dashboard from './components/dashboard/Dashboard';

import RoadmapList from './components/roadmap/RoadmapList';
import RoadmapDetails from './components/roadmap/RoadmapDetails';

import EnrollmentList from './components/enrollment/EnrollmentList';
import SubmissionList from './components/submission/SubmissionList';


function PrivateRoute({ children }) {
  const { user } = useSelector(
    (state) => state.auth
  );

  return user
    ? children
    : <Navigate to="/login" />;
}


function App() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <Router>

      <div className="app">

        {user && <Navbar />}

        <ErrorHandler />

        <NotificationStack />

        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Home */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Roadmap List */}
          <Route
            path="/roadmaps"
            element={
              <PrivateRoute>
                <RoadmapList />
              </PrivateRoute>
            }
          />

          {/* Roadmap Details */}
          <Route
            path="/roadmaps/:id"
            element={
              <PrivateRoute>
                <RoadmapDetails />
              </PrivateRoute>
            }
          />

          {/* Enrollments */}
          <Route
            path="/enrollments"
            element={
              <PrivateRoute>
                <EnrollmentList />
              </PrivateRoute>
            }
          />

          {/* Submissions */}
          <Route
            path="/submissions"
            element={
              <PrivateRoute>
                <SubmissionList />
              </PrivateRoute>
            }
          />

        </Routes>

      </div>

    </Router>
  );
}

export default App;