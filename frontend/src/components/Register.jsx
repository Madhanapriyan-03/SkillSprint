import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // =====================================================
  // HANDLE REGISTER
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');


    // Password validation

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        'Passwords do not match'
      );

      return;
    }


    if (
      formData.password.length < 6
    ) {

      setError(
        'Password must be at least 6 characters'
      );

      return;
    }


    setLoading(true);


    try {

      await authService.register({

        email:
          formData.email,

        password:
          formData.password,

        role:
          formData.role

      });


      alert(
        'Registration successful! Please login.'
      );


      navigate('/login');


    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.message ||
        'Registration failed'
      );

    }


    setLoading(false);

  };


  return (

    <div className="login-page">


      {/* =================================================
          BACKGROUND DECORATIONS
          Same as Login page
          ================================================= */}

      <div className="login-bg-circle circle-one"></div>

      <div className="login-bg-circle circle-two"></div>

      <div className="login-bg-circle circle-three"></div>


      {/* =================================================
          TOP BRAND
          ================================================= */}

      <div className="login-top-brand">

        <span className="brand-skill">
          Skill
        </span>

        <span className="brand-sprint">
          Sprint
        </span>

        <small>
          LEARN · BUILD · ACHIEVE
        </small>

      </div>


      {/* =================================================
          TOP RIGHT MESSAGE
          ================================================= */}

      <div className="login-top-message">

        <span>
          Your learning journey
        </span>

        <span>
          starts here
        </span>

        <i></i>

      </div>


      {/* =================================================
          MAIN LAYOUT
          Same structure as Login
          ================================================= */}

      <div className="login-layout">


        {/* =================================================
            LEFT BRAND PANEL
            ================================================= */}

        <div className="login-brand-panel">


          {/* Brand Icon */}

          <div className="brand-icon">
            S
          </div>


          {/* Main Heading */}

          <h1>
            Start Your Journey
          </h1>


          {/* Tagline */}

          <p className="brand-tagline">
            Create your SkillSprint account
            and start building skills that
            move you forward.
          </p>


          {/* =================================================
              LEARNING LANDSCAPE
              Same Login design
              ================================================= */}

          <div className="learning-landscape">

            <div className="mountain mountain-back"></div>

            <div className="mountain mountain-middle"></div>

            <div className="mountain mountain-front"></div>

            <div className="learning-path"></div>

          </div>


          {/* =================================================
              BRAND QUOTE
              ================================================= */}

          <div className="brand-quote">

            <span className="quote-mark">
              "
            </span>

            Learn.
            <br />
            Build.
            <br />
            Achieve.

            <div className="quote-line"></div>

          </div>


        </div>


        {/* =================================================
            RIGHT REGISTER FORM
            ================================================= */}

        <div className="login-form-panel">


          {/* =================================================
              HEADER
              ================================================= */}

          <div className="login-header">

            <h2>
              Create Account
            </h2>

            <p>
              Join SkillSprint and start
              learning today.
            </p>

          </div>


          {/* =================================================
              ERROR
              ================================================= */}

          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          {/* =================================================
              REGISTER FORM
              ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >


            {/* =================================================
                EMAIL
                ================================================= */}

            <div className="login-field">

              <label>
                Email
              </label>


              <div className="login-input-wrapper">

                <span className="input-icon">
                  ✉
                </span>


                <input

                  type="email"

                  name="email"

                  value={
                    formData.email
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter your email"

                  required

                />

              </div>

            </div>


            {/* =================================================
                PASSWORD
                ================================================= */}

            <div className="login-field">

              <label>
                Password
              </label>


              <div className="login-input-wrapper">

                <span className="input-icon lock-icon">
                  🔒
                </span>


                <input

                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }

                  name="password"

                  value={
                    formData.password
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Create a password"

                  required

                />


                <button

                  type="button"

                  className="password-toggle"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }

                >

                  {showPassword
                    ? 'Hide'
                    : 'Show'}

                </button>

              </div>

            </div>


            {/* =================================================
                CONFIRM PASSWORD
                ================================================= */}

            <div className="login-field">

              <label>
                Confirm Password
              </label>


              <div className="login-input-wrapper">

                <span className="input-icon lock-icon">
                  🔒
                </span>


                <input

                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }

                  name="confirmPassword"

                  value={
                    formData.confirmPassword
                  }

                  onChange={
                    handleChange
                  }

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


            {/* =================================================
                ACCOUNT TYPE
                ================================================= */}

            <div className="login-field">

              <label>
                Account Type
              </label>


              <div className="login-input-wrapper">

                <span className="input-icon">
                  👤
                </span>


                <select

                  name="role"

                  value={
                    formData.role
                  }

                  onChange={
                    handleChange
                  }

                  required

                  style={{
                    width: '100%',
                    height: '52px',
                    padding:
                      '0 45px 0 47px',
                    border:
                      '1px solid #d6deed',
                    borderRadius: '9px',
                    outline: 'none',
                    background:
                      '#f8faff',
                    color: '#0f172a',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}

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


            {/* =================================================
                CREATE ACCOUNT BUTTON
                ================================================= */}

            <button

              type="submit"

              className="login-submit"

              disabled={loading}

            >

              {loading
                ? 'Creating Account...'
                : 'Create Account'}

              {!loading && (

                <span className="login-arrow">
                  →
                </span>

              )}

            </button>


          </form>


          {/* =================================================
              DIVIDER
              ================================================= */}

          <div className="login-divider">

            <span></span>

            <p>
              Already have an account?
            </p>

            <span></span>

          </div>


          {/* =================================================
              BACK TO LOGIN
              ================================================= */}

          <div className="login-register">

            <span>
              Already registered?
            </span>


            <button

              type="button"

              onClick={() =>
                navigate('/login')
              }

            >

              Sign In

            </button>

          </div>


        </div>


      </div>


      {/* =================================================
          BOTTOM BENEFITS
          Same Login visual
          ================================================= */}

      <div className="login-benefits">

        <div className="benefit">

          <span>
            ✓
          </span>

          <p>
            Personalized Roadmaps
          </p>

        </div>


        <div className="benefit">

          <span>
            ✓
          </span>

          <p>
            Track Your Progress
          </p>

        </div>


        <div className="benefit">

          <span>
            ✓
          </span>

          <p>
            Build Skills
          </p>

        </div>

      </div>


    </div>

  );

};

export default Register;