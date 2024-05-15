import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Alert, Button, Col, Form, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
import { FiCheckCircle } from 'react-icons/fi';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
}

const LoginForm = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError } = props;

  const handleLoginSubmit = e => {
    handleSubmit(login)(e);
  };

  return (
    <Form onSubmit={handleLoginSubmit} style={{ paddingLeft: '40px' }}>
      <h2 className="text-xxl-startx" style={{ fontSize: '40px' }}>
        Sign in
      </h2>
      <Row>
        <Col md="12 mt-2">
          {loginError ? (
            <div className="alert alert-danger" style={{ padding: '6px 12px' }}>
              <strong>Failed to sign in!</strong> Please check your credentials and try again.
            </div>
          ) : null}
        </Col>
        <Col md="12 mt-1">
          <ValidatedField
            name="username"
            label="Username"
            placeholder="Your username"
            required
            autoFocus
            data-cy="username"
            validate={{ required: 'Username cannot be empty!' }}
            register={register}
            error={errors.username as FieldError}
            isTouched={touchedFields.username}
          />
          <ValidatedField
            name="password"
            type="password"
            label="Password"
            placeholder="Your password"
            required
            data-cy="password"
            validate={{ required: 'Password cannot be empty!' }}
            register={register}
            error={errors.password as FieldError}
            isTouched={touchedFields.password}
          />
        </Col>
        <Col md="12" className="d-flex justify-content-between align-items-center">
          <div>
            <ValidatedField name="rememberMe" type="checkbox" check label="Remember me" value={true} register={register} />
          </div>
          <div style={{ fontSize: '16px' }}>
            <Link
              to="/account/reset/request"
              data-cy="forgetYourPasswordSelector"
              style={{ color: 'rgb(152 152 152)', fontWeight: 'normal', textDecoration: 'none' }}
            >
              Forgotten password?
            </Link>
          </div>
        </Col>
      </Row>
      <button
        type="submit"
        className="btn-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3 flex items-center justify-center"
      >
        <FiCheckCircle className="mr-2" /> Sign in
      </button>
      <div className="mt-2" style={{ color: 'rgb(152 152 152)', fontSize: '16px', textAlign: 'center' }}>
        <span>Don't have an account?</span>{' '}
        <Link to="/account/register" style={{ color: 'black', fontWeight: 'normal' }}>
          Sign up
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
