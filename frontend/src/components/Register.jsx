import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    dispatch(
      register({
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
    );
  };

  return (
    <div className="login-page register-layout-page">

      {/* ================= BACKGROUND ================= */}

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
        <span>Your learning journey</span>
        <span>starts here</span>
        <i></i>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="login-layout register-main-layout">

        {/* ================= LEFT PANEL ================= */}

        <div className="login-brand-panel">

          <div className="brand-icon">
            S
          </div>

          <h1>
            Start Your
            <br />
            Journey
          </h1>

          <p className="brand-tagline">
            Create your SkillSprint account and start
            <br />
            building skills that move you forward.
          </p>

          {/* Mountains */}
          <div className="learning-landscape">
            <div className="mountain mountain-back"></div>
            <div className="mountain mountain-middle"></div>
            <div className="mountain mountain-front"></div>

            <div className="learning-path"></div>
          </div>

          {/* Quote */}
          <div className="brand-quote">
            <span className="quote-mark">“</span>
            Small steps today,
            <br />
            big progress tomorrow.
            <div className="quote-line"></div>
          </div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="login-form-panel register-form-panel">

          <div className="login-header">
            <h2>Create Account</h2>
            <p>
              Join SkillSprint and start learning today.
            </p>
          </div>

          {isError && (
            <div className="login-error">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="login-form register-form"
          >

            {/* EMAIL */}

            <div className="login-field">
              <label htmlFor="email">
                Email
              </label>

              <div className="login-input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

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

            {/* PASSWORD */}

            <div className="login-field">
              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">

                <span className="input-icon lock-icon">
                  🔒
                </span>

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
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>

              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="login-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="login-input-wrapper">

                <span className="input-icon lock-icon">
                  🔒
                </span>

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? 'Hide'
                    : 'Show'}
                </button>

              </div>
            </div>

            {/* ACCOUNT TYPE */}

            <div className="login-field">
              <label htmlFor="role">
                Account Type
              </label>

              <div className="login-input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="register-role-select"
                  required
                >
                  <option value="STUDENT">
                    Student
                  </option>

                  <option value="MENTOR">
                    Mentor
                  </option>

                  <option value="LEARNING_MANAGER">
                    Learning Manager
                  </option>
                </select>

              </div>
            </div>

            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="login-submit register-submit"
              disabled={isLoading}
            >
              <span>
                {isLoading
                  ? 'Creating Account...'
                  : 'Create Account'}
              </span>

              {!isLoading && (
                <span className="login-arrow">
                  →
                </span>
              )}
            </button>

          </form>

          {/* Divider */}

          <div className="login-divider register-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* LOGIN */}

          <div className="login-register">
            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>

        </div>

      </div>

      {/* ================= BOTTOM BENEFITS ================= */}

      <div className="login-benefits">

        <div className="benefit">
          <div className="benefit-icon">
            ⌂
          </div>

          <div>
            <strong>Learn from experts</strong>
            <span>Build real-world skills</span>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">
            ▥
          </div>

          <div>
            <strong>Track your progress</strong>
            <span>Stay on your roadmap</span>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">
            ↗
          </div>

          <div>
            <strong>Achieve your goals</strong>
            <span>Grow one step at a time</span>
          </div>
        </div>

      </div>

      {/* ================= DECORATIVE BOOKS ================= */}

      <div className="decor-books">
        <div className="book book-one">
          Plan
        </div>

        <div className="book book-two">
          Learn
        </div>

        <div className="book book-three">
          Build
        </div>

        <div className="book book-four">
          Grow
        </div>
      </div>

      {/* Plant */}

      <div className="decor-plant">

        <div className="plant-leaf leaf-one"></div>
        <div className="plant-leaf leaf-two"></div>
        <div className="plant-leaf leaf-three"></div>

        <div className="plant-pot"></div>

      </div>

      {/* Laptop */}

      <div className="decor-laptop">

        <div className="laptop-screen">
          <span>Good Skills</span>
          <span>Brighter</span>
          <span>Tomorrow</span>
        </div>

        <div className="laptop-base"></div>

      </div>

      {/* Left handwritten note */}

      <div className="learning-note note-left">
        Your Learning
        <br />
        Journey
        <br />
        Starts Here

        <span>↗</span>
      </div>

      {/* Right handwritten note */}

      <div className="learning-note note-right">
        Small
        <br />
        Steps
        <br />
        Big
        <br />
        Progress

        <span>↗</span>
      </div>

    </div>
  );
};

export default Register;