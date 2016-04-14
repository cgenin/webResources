import React from 'react';
import { Route } from 'react-router';

import MainLayout from './components/layouts/mainLayout';
import HomePage from './components/pages/home';
import ProjectCreatePage from './components/pages/project-create';
import CreditsPage from './components/pages/credits';

export default (
  <Route>
    <Route component={MainLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/project-create" component={ProjectCreatePage} />
      <Route path="/credits" component={CreditsPage} />
    </Route>
  </Route>
);
