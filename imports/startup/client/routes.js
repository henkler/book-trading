import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '../../ui/layouts/main';
import { Index } from '../../ui/components/index';
import BookAdd from '../../ui/components/bookForm';
import BookEdit from '../../ui/containers/bookEdit';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="books/add" component={ BookAdd } />
      <Route path="books/:id" component={ BookEdit } />
    </Route>
  </Router>
);
