import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '/imports/ui/layouts/main';
import { Index } from '/imports/ui/components/index';
import BookForm from '/imports/ui/components/bookForm';
import BookEdit from '/imports/ui/containers/bookEdit';
import SearchForm from '/imports/ui/components/searchForm';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="/books/add" component={ BookForm } />
      <Route path="/books/:id" component={ BookEdit } />
      <Route path="/search" component={ SearchForm } />
    </Route>
  </Router>
);
