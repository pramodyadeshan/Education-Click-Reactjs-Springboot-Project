import React, { useEffect, useState } from 'react';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import { FiCheckCircle, FiPlusCircle } from 'react-icons/fi';
import { format, subYears } from 'date-fns';
import Select from 'react-select';
export const RegisterForm = () => {
  const options = [
    { value: '1', label: 'ICT' },
    { value: '2', label: 'Science' },
    { value: '3', label: 'English' },
    { value: '4', label: 'History' },
    { value: '5', label: 'Geography' },
  ];

  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState(null);
  const [address, setAddress] = useState('');
  const currentDate = new Date();
  const tenYearsAgoDate = subYears(currentDate, 10);
  const formattedDefaultDate = format(tenYearsAgoDate, 'yyyy-MM-dd');
  const [dateOfBirth, setDateOfBirth] = useState(formattedDefaultDate);
  const [subjects, setSubject] = useState([]);
  const [subjectError, setSubjectError] = useState('null');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleGenderChange = e => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    if (selectedGender === '') {
      setGenderError('Please select a gender.');
    } else {
      setGenderError(null);
    }
  };
  const handleAccordionToggle = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );
  const handleValidSubmit = ({
    username,
    email,
    firstPassword,
    contactNo,
    dateOfBirth,
    gender,
    guardianName,
    address,
    guardianContact,
    guardianEmail,
  }) => {
    dispatch(
      handleRegister({
        login: username,
        email,
        password: firstPassword,
        contactNo,
        dateOfBirth,
        gender,
        guardianName,
        address,
        guardianContact,
        guardianEmail,

        langKey: 'en',
      }),
    );
  };

  const handleSubjectChange = selectedOptions => {
    if (selectedOptions) {
      setSubject(selectedOptions);
    } else {
      setSubject([]); // Reset subjects to an empty array if selectedOptions is undefined
    }
  };

  /*const updatePassword = event => setPassword(event.target.value);
  const updatePassword = event => setPassword(event.target.value);
  const updatePassword = event => setPassword(event.target.value);*/
  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <Row className="justify-content-center">
      <Col md="10">
        <h2 className="text-3xl mb-7 text-center font-bold opacity-75 my-4">Student Registration</h2>

        <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
          <ValidatedField
            name="firstName"
            label="First Name"
            placeholder="Your First Name"
            validate={{
              required: { value: true, message: 'Your first name is required.' },
              pattern: {
                value: /^[a-zA-Z. -]+$/,
                message: 'Your first name is invalid.',
              },
            }}
            data-cy="firstName"
          />

          <ValidatedField
            name="lastName"
            label="Last Name"
            placeholder="Your Last Name"
            validate={{
              required: { value: true, message: 'Your last name is required.' },
              pattern: {
                value: /^[a-zA-Z. -]+$/,
                message: 'Your last name is invalid.',
              },
            }}
            data-cy="lastName"
          />

          <ValidatedField
            name="contactNo"
            label="Contact No"
            placeholder="Your contact no"
            validate={{
              required: { value: true, message: 'Your contact number is required.' },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Your contact is invalid.',
              },
              minLength: { value: 10, message: 'Your contact number is required to be at least 10 numbers.' },
              maxLength: { value: 10, message: 'Your contact number cannot be longer than 10 numbers.' },
            }}
            data-cy="contactNo"
          />

          <ValidatedField
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            placeholder="Select your date of birth"
            validate={{
              required: { value: true, message: 'Your date of birth is required.' },
              validate: value => {
                const selectedDate = new Date(value);
                return (
                  (selectedDate <= currentDate && selectedDate <= tenYearsAgoDate) ||
                  'You must select a date of birth that is at least 10 years ago.'
                );
              },
            }}
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            data-cy="dateOfBirth"
          />

          <div className="mb-3">
            <label className="mb-2.5 block font-medium text-black dark:text-white">Gender</label>
            <div className="relative pt-2">
              <select value={gender} onChange={handleGenderChange} className="w-100 form-control">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {genderError !== null && <span className="text-danger">{genderError}</span>}
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2.5 block font-medium text-black dark:text-white">Address</label>
            <div className="relative pt-2">
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-100 form-control"
              />
            </div>
          </div>

          <ValidatedField
            name="email"
            label="Email"
            placeholder="Your email"
            type="email"
            validate={{
              required: { value: true, message: 'Your email is required.' },
              validate: v => isEmail(v) || 'Your email is invalid.',
            }}
            data-cy="email"
          />

          <div className="mb-3">
            <label className="mb-2.5 block font-medium text-black dark:text-white">Subject(s)</label>
            <div className="relative pt-2">
              <Select
                name="subjects"
                value={subjects}
                onChange={handleSubjectChange}
                options={options}
                isMulti
                placeholder="Select subjects"
                className="mw-100 border-0"
              />
              {subjectError !== 'null' && <span className="text-danger">{subjectError}</span>}
            </div>
          </div>

          <ValidatedField
            name="username"
            label="Username"
            placeholder="Your username"
            validate={{
              required: { value: true, message: 'Your username is required.' },
              pattern: {
                value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                message: 'Your username is invalid.',
              },
              minLength: { value: 1, message: 'Your username is required to be at least 1 character.' },
              maxLength: { value: 50, message: 'Your username cannot be longer than 50 characters.' },
            }}
            data-cy="username"
          />

          <ValidatedField
            name="firstPassword"
            label="New password"
            placeholder="New password"
            type="password"
            onChange={updatePassword}
            validate={{
              required: { value: true, message: 'Your password is required.' },
              minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
              maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
            }}
            data-cy="firstPassword"
          />
          <PasswordStrengthBar password={password} />
          <ValidatedField
            name="secondPassword"
            label="New password confirmation"
            placeholder="Confirm the new password"
            type="password"
            validate={{
              required: { value: true, message: 'Your confirmation password is required.' },
              minLength: { value: 4, message: 'Your confirmation password is required to be at least 4 characters.' },
              maxLength: { value: 50, message: 'Your confirmation password cannot be longer than 50 characters.' },
              validate: v => v === password || 'The password and its confirmation do not match!',
            }}
            data-cy="secondPassword"
          />

          <hr />
          <div>
            <button
              className="p-0 btn btn-link mb-3 text-boxdark"
              style={{ textDecoration: 'none' }}
              type="button"
              onClick={handleAccordionToggle}
              aria-expanded={isCollapsed ? 'true' : 'false'}
              aria-controls="collapseContent"
            >
              <>
                <FiPlusCircle className="text-xl mr-2" />
                &nbsp;<span>Guardian's Information</span>
              </>
            </button>
          </div>
          {isCollapsed && (
            <div id="collapseContent" className="fade-in">
              <ValidatedField
                name="guardianName"
                label="Guardian's Name"
                placeholder="Your guardian's Name"
                validate={{
                  required: { value: true, message: "Your guardian's name is required." },
                  pattern: {
                    value: /^[a-zA-Z. -]+$/,
                    message: "Your guardian's name is invalid.",
                  },
                }}
                data-cy="guardianName"
              />

              <ValidatedField
                name="guardianEmail"
                label="Guardian's email"
                placeholder="Your Guardian's email"
                type="email"
                validate={{
                  required: { value: true, message: "Your Guardian's email is required." },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Your Guardian's email is invalid.",
                  },
                }}
                data-cy="guardianEmail"
              />

              <ValidatedField
                name="guardianContact"
                label="Guardian's contact No"
                placeholder="Your Guardian's contact no"
                validate={{
                  required: { value: true, message: "Your Guardian's contact number is required." },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Your contact is invalid.',
                  },
                  minLength: { value: 10, message: "Your Guardian's contact number is required to be at least 10 numbers." },
                  maxLength: { value: 10, message: "Your Guardian's contact number cannot be longer than 10 numbers." },
                }}
                data-cy="guardianContact"
              />
            </div>
          )}
          <Button id="register-submit" color="primary" type="submit" data-cy="submit" className="w-100 my-2">
            <FiCheckCircle /> Register
          </Button>
        </ValidatedForm>
      </Col>
    </Row>
  );
};

export default RegisterForm;
