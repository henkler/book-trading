import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '/imports/ui/layouts/main';
import Index from '/imports/ui/components/index';
import AllBooks from '/imports/ui/components/allBooks';
import MyBooks from '/imports/ui/components/myBooks';
import MyBooksAdd from '/imports/ui/components/myBooksAdd';
import MyBookEdit from '/imports/ui/containers/myBooksEdit';
import MyTrades from '/imports/ui/components/myTrades';
import UserProfile from '/imports/ui/containers/userProfile';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="/books" component={ AllBooks } />
      <Route path="/mybooks" component={ MyBooks } />
      <Route path="/mybooks/add" component={ MyBooksAdd } />
      <Route path="/mybooks/:id" component={ MyBookEdit } />
      <Route path="/mytrades" component={ MyTrades } />
      <Route path="/myprofile" components={ UserProfile } />
    </Route>
  </Router>
);
