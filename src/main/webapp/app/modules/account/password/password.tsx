import React, { useState, useEffect } from 'react';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [successMessage, errorMessage]);

  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                Hi {account.login}, Change your Password
              </h1>
              <div className="row overflow-hidden">
                <div className="col-md-3 col-12 mb-3"></div>
                <div className="col-md-5 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card h-auto px-8 pt-4 pb-10">
                    <div className="overflow-hidden bg-white rounded-xl text-gray-700">
                      <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
                        <ValidatedField
                          name="currentPassword"
                          label="Current password"
                          placeholder="Current password"
                          type="password"
                          validate={{
                            required: { value: true, message: 'Your password is required.' },
                          }}
                          data-cy="currentPassword"
                        />
                        <ValidatedField
                          name="newPassword"
                          label="New password"
                          placeholder="New password"
                          type="password"
                          validate={{
                            required: { value: true, message: 'Your password is required.' },
                            minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
                            maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
                          }}
                          onChange={updatePassword}
                          data-cy="newPassword"
                        />
                        <PasswordStrengthBar password={password} />
                        <ValidatedField
                          name="confirmPassword"
                          label="New password confirmation"
                          placeholder="Confirm the new password"
                          type="password"
                          validate={{
                            required: { value: true, message: 'Your confirmation password is required.' },
                            minLength: {
                              value: 4,
                              message: 'Your confirmation password is required to be at least 4 characters.',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Your confirmation password cannot be longer than 50 characters.',
                            },
                            validate: v => v === password || 'The password and its confirmation do not match!',
                          }}
                          data-cy="confirmPassword"
                        />
                        <Button color="success" type="submit" data-cy="submit">
                          Save
                        </Button>
                      </ValidatedForm>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12 mb-3"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
