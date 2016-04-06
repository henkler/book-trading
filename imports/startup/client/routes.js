import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '/imports/ui/layouts/main';
import Index from '/imports/ui/components/index';
import BookEdit from '/imports/ui/containers/bookEdit';
import BooksAvaiable from '/imports/ui/components/booksAvailable';
import BooksOwned from '/imports/ui/components/booksOwned';
import BooksTraded from '/imports/ui/components/booksTraded';
import BooksAddSearch from '/imports/ui/components/booksAddSearch';
import TradePage from '/imports/ui/components/tradePage';
import UserProfile from '/imports/ui/containers/userProfile';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="/books" component={ BooksAvaiable } />
      <Route path="/mybooks" component={ BooksOwned } />
      <Route path="/addbooks" component={ BooksAddSearch } />
      <Route path="/tradedbooks" component={ BooksTraded } />
      <Route path="/books/:id" component={ BookEdit } />
      <Route path="/mytrades" component={ TradePage } />
      <Route path="/myprofile" components={ UserProfile } />
    </Route>
  </Router>
);
