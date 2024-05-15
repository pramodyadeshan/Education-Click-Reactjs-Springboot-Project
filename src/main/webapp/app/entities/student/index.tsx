import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Student from './student';
import StudentDetail from './student-detail';
import StudentUpdate from './student-update';

const StudentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Student />} />
    <Route path="new" element={<StudentUpdate />} />
    <Route path=":id">
      <Route index element={<StudentDetail />} />
      <Route path="edit" element={<StudentUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StudentRoutes;
