import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Teacher from './teacher';
import Student from './student';
import Booking from './booking';
import Subject from './subject';
import Timeslot from './timeslot';
import Meeting from './meeting';
import StudyMaterial from './study-material';
import Profile from 'app/modules/profile/profile';
import PaymentForm from 'app/modules/payment';
import UpcommingClass from 'app/modules/upcomming_class';

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route path="teacher/*" element={<Teacher />} />
        <Route path="student/*" element={<Student />} />
        <Route path="booking/*" element={<Booking />} />
        <Route path="subject/*" element={<Subject />} />
        <Route path="timeslot/*" element={<Timeslot />} />
        <Route path="meeting/*" element={<Meeting />} />
        <Route path="study-material/*" element={<StudyMaterial />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment/*" element={<PaymentForm />} />
        <Route path="upcoming-class/*" element={<UpcommingClass />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};
