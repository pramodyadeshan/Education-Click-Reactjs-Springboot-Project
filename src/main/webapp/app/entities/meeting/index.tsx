import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Meeting from './meeting';
import MeetingDetail from './meeting-detail';
import MeetingUpdate from './meeting-update';

const MeetingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Meeting />} />
    <Route path="new" element={<MeetingUpdate />} />
    <Route path=":id">
      <Route index element={<MeetingDetail />} />
      <Route path="edit" element={<MeetingUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MeetingRoutes;
