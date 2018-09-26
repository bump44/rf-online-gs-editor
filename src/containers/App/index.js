/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import RegisterPage from '../RegisterPage';

// Project(s)
import ProjectCreatePage from '../ProjectCreatePage';
import ProjectPage from '../ProjectPage';
import ProjectContributorsPage from '../ProjectContributorsPage';
import ProjectImportPage from '../ProjectImportPage';
import ProjectStoresPage from '../ProjectStoresPage';
import ProjectItemsPage from '../ProjectItemsPage';
import ProjectItemPage from '../ProjectItemPage';
import ProjectsPage from '../ProjectsPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />

      {/* Project(s) */}
      <Route exact path="/projects" component={ProjectsPage} />
      <Route exact path="/project/create" component={ProjectCreatePage} />
      <Route exact path="/project/:id" component={ProjectPage} />
      <Route
        exact
        path="/project/:id/contributors"
        component={ProjectContributorsPage}
      />
      <Route exact path="/project/:id/import" component={ProjectImportPage} />
      <Route exact path="/project/:id/items" component={ProjectItemsPage} />
      <Route
        exact
        path="/project/:id/items/:itemId"
        component={ProjectItemPage}
      />
      <Route exact path="/project/:id/stores" component={ProjectStoresPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
}
