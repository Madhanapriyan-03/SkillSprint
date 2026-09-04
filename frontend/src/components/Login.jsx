import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../store/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="login-page">

      {/* Decorative background */}
      <div className="login-bg-circle circle-one"></div>
      <div className="login-bg-circle circle-two"></div>
      <div className="login-bg-circle circle-three"></div>

      {/* Top brand */}
      <div className="login-top-brand">
        <span className="brand-skill">Skill</span>
        <span className="brand-sprint">Sprint</span>
        <small>LEARN · BUILD · ACHIEVE</small>
      </div>

      {/* Top right message */}
      <div className="login-top-message">
        <span>Better Skills</span>
        <span>Brighter Careers</span>
        <span>A Smarter You</span>
        <i></i>
      </div>

      <div className="login-layout">

        {/* ================= LEFT ================= */}
        <div className="login-brand-panel">

          <div className="brand-icon">
            S
          </div>

          <h1>SkillSprint</h1>

          <p className="brand-tagline">
            Learn smarter.<br />
            Build your skills.<br />
            Achieve your goals.
          </p>

          {/* Mountain / learning path decoration */}
          <div className="learning-landscape">
            <div className="mountain mountain-back"></div>
            <div className="mountain mountain-middle"></div>
            <div className="mountain mountain-front"></div>

            <div className="learning-path"></div>
          </div>

          <div className="brand-quote">
            <span className="quote-mark">“</span>
            Progress is a series<br />
            of small wins.
            <div className="quote-line"></div>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="login-form-panel">

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your learning journey</p>
          </div>

          {isError && (
            <div className="login-error">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">

            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">Email</label>

              <div className="login-input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">Password</label>

              <div className="login-input-wrapper">
                <span className="input-icon lock-icon">⌑</span>

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="forgot-row">
              <button
                type="button"
                className="forgot-password"
                onClick={() => {}}
              >
                Forgot password?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              <span>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </span>

              {!isLoading && (
                <span className="login-arrow">→</span>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* Register */}
          <div className="login-register">
            <span>Don't have an account?</span>

            <button
              type="button"
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          </div>

        </div>
      </div>

      {/* Bottom benefits */}
      <div className="login-benefits">

        <div className="benefit">
          <div className="benefit-icon">⌂</div>
          <div>
            <strong>Learn from experts</strong>
            <span>Build real-world skills</span>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">▥</div>
          <div>
            <strong>Track your progress</strong>
            <span>Stay on your roadmap</span>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">↗</div>
          <div>
            <strong>Achieve your goals</strong>
            <span>Grow one step at a time</span>
          </div>
        </div>

      </div>

      {/* Decorative books */}
      <div className="decor-books">
        <div className="book book-one">Plan</div>
        <div className="book book-two">Learn</div>
        <div className="book book-three">Build</div>
        <div className="book book-four">Grow</div>
      </div>

      <div className="decor-plant">
        <div className="plant-leaf leaf-one"></div>
        <div className="plant-leaf leaf-two"></div>
        <div className="plant-leaf leaf-three"></div>
        <div className="plant-pot"></div>
      </div>

      {/* Right decorative laptop */}
      <div className="decor-laptop">
        <div className="laptop-screen">
          <span>Good Skills</span>
          <span>Brighter</span>
          <span>Tomorrow</span>
        </div>
        <div className="laptop-base"></div>
      </div>

      {/* Handwritten style messages */}
      <div className="learning-note note-left">
        Your Learning<br />
        Journey<br />
        Starts Here
        <span>↗</span>
      </div>

      <div className="learning-note note-right">
        Small<br />
        Steps<br />
        Big<br />
        Progress
        <span>↗</span>
      </div>

    </div>
  );
};

export default Login;