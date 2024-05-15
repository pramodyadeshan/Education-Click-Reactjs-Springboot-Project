import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StudyMaterial from './study-material';
import StudyMaterialDetail from './study-material-detail';
import StudyMaterialUpdate from './study-material-update';

const StudyMaterialRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StudyMaterial />} />
    <Route path="new" element={<StudyMaterialUpdate />} />
    <Route path=":id">
      <Route index element={<StudyMaterialDetail />} />
      <Route path="edit" element={<StudyMaterialUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StudyMaterialRoutes;
