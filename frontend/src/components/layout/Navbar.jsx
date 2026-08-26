import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">SkillSprint</div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/roadmaps" className={location.pathname.startsWith('/roadmaps') ? 'active' : ''}>Roadmaps</Link>
        <Link to="/enrollments" className={location.pathname.startsWith('/enrollments') ? 'active' : ''}>Enrollments</Link>
        <Link to="/submissions" className={location.pathname.startsWith('/submissions') ? 'active' : ''}>Submissions</Link>
      </div>
      <div className="navbar-right">
        <span>Welcome back! {user?.role}</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;