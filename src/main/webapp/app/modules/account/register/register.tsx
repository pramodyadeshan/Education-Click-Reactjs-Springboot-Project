import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './registerForm';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen rounded-sm">
      <div className="container-fluid">
        <div className="row flex-wrap align-items-center min-h-screen">
          <div className="col-xl-6 d-none d-xl-block">
            <div className="py-4 px-5 text-center">
              <img
                className="img-fluid mb-4 items-start"
                src="../../../content/images/logo-education-click.png"
                alt="Logo EducationClick"
                style={{ width: '50%' }}
              />
              <h3 style={{ color: 'rgb(89,89,89)' }}>Welcome to EducationClick</h3>
              <p style={{ color: 'rgb(89,89,89)' }}>Please fill and submit student registration form</p>
              <p>
                <span>If you want to </span>
                <Link to="/login" className="alert-link">
                  sign in
                </Link>
              </p>
              <img className="mt-4 img-fluid" src="../../../content/images/login.svg" alt="Logo" style={{ width: '70%' }} />
            </div>
          </div>

          <div className="col-xl-6 col-12">
            <div style={{ borderLeft: '1px solid #80808047' }}>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
