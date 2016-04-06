import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import BooksList from '../containers/bookList';

import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  button: {
    margin: 12
  }
};

const MyBooks = (props, context) => (
  <Tabs>
    <Tab label="My Listed Books">
      <RaisedButton
        label="Add Book"
        style={styles.button}
        primary={true}
        onClick={() => context.router.push('/mybooks/add')}
      />
      <BooksList
        publication={'myBooks'}
        filter={'available'}
        title={''}
        actions={['edit', 'delete']}
      />
    </Tab>
    <Tab label="My Traded Books">
      <BooksList
        publication={'myBooks'}
        filter={'traded'}
        title={''}
      />
    </Tab>
  </Tabs>
);

MyBooks.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MyBooks;
