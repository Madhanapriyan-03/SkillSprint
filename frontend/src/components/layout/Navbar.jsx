import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import StudyStreakPill from './StudyStreakPill';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'STUDENT':
        return 'role-badge-student';
      case 'MENTOR':
        return 'role-badge-mentor';
      case 'LEARNING_MANAGER':
        return 'role-badge-manager';
      default:
        return '';
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
        <span className="navbar-brand-badge">S</span>
        <span>SkillSprint</span>
      </Link>
      
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <span>Home</span>
        </Link>
        <Link to="/roadmaps" className={location.pathname.startsWith('/roadmaps') ? 'active' : ''}>
          <span>Roadmaps</span>
        </Link>
        <Link to="/enrollments" className={location.pathname.startsWith('/enrollments') ? 'active' : ''}>
          <span>Enrollments</span>
        </Link>
        <Link to="/submissions" className={location.pathname.startsWith('/submissions') ? 'active' : ''}>
          <span>Submissions</span>
        </Link>
      </div>

      <div className="navbar-right">
        {user?.role === 'STUDENT' && <StudyStreakPill />}
        <span className={`navbar-role-pill ${getRoleBadgeClass(user?.role)}`}>
          Welcome back! {user?.role}
        </span>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;