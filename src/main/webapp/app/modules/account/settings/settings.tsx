import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { reset, saveAccountSettings } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      }),
    );
  };

  return (
    <div className="text-dark">
      <div className="d-flex h-100 overflow-hidden">
        <div className="flex-grow-1">
          <main className="d-flex justify-content-center align-items-center mt-3">
            <div className="container">
              <h1 className="text-center text-zinc-600 my-4 font-sans xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl min-[320px]:text-3xl max-[639px]:text-4xl antialiased font-medium leading-snug tracking-normal ">
                Hi {account.login}, Update your user settings
              </h1>
              <div className="row overflow-hidden">
                <div className="col-md-6 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card py-3">
                    <div className="relative mt-2 flex justify-center items-center overflow-hidden bg-white rounded-xl">
                      <img src="../../../content/images/icon/Teacher-boy.jpg" alt="ui/ux review" className="object-cover w-60 h-60" />
                    </div>

                    <div className="p-6 pt-2">
                      <div className="mb-2 text-center">
                        <h5 className="block font-sans text-3xl antialiased font-medium leading-snug tracking-normal text-gray-600">
                          {account.login}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <div className="relative flex w-full flex-col rounded-xl bg-white mx-4 my-4 card h-auto px-8 pt-4 pb-10">
                    <div className="overflow-hidden bg-white rounded-xl text-gray-700">
                      <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
                        <ValidatedField
                          name="firstName"
                          label="First Name"
                          id="firstName"
                          placeholder="Your first name"
                          validate={{
                            required: { value: true, message: 'Your first name is required.' },
                            minLength: { value: 1, message: 'Your first name is required to be at least 1 character' },
                            maxLength: { value: 50, message: 'Your first name cannot be longer than 50 characters' },
                          }}
                          data-cy="firstname"
                        />
                        <ValidatedField
                          name="lastName"
                          label="Last Name"
                          id="lastName"
                          placeholder="Your last name"
                          validate={{
                            required: { value: true, message: 'Your last name is required.' },
                            minLength: { value: 1, message: 'Your last name is required to be at least 1 character' },
                            maxLength: { value: 50, message: 'Your last name cannot be longer than 50 characters' },
                          }}
                          data-cy="lastname"
                        />
                        <ValidatedField
                          name="email"
                          label="Email"
                          placeholder="Your email"
                          type="email"
                          validate={{
                            required: { value: true, message: 'Your email is required.' },
                            minLength: { value: 5, message: 'Your email is required to be at least 5 characters.' },
                            maxLength: { value: 254, message: 'Your email cannot be longer than 50 characters.' },
                            validate: v => isEmail(v) || 'Your email is invalid.',
                          }}
                          data-cy="email"
                        />
                        <Button color="primary" type="submit" data-cy="submit">
                          Save
                        </Button>
                      </ValidatedForm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
