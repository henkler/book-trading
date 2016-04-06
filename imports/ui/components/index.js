import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  paper: {
    margin: 20,
    textAlign: 'center'
  }
};

const Index = (props, context) => (
  <Paper style={styles.paper} zDepth={4}>
    <Card>
      <CardTitle title="Book Trading App" subtitle="Recycle your old books.  Discover new books.  Save the world." />
      <CardText>
        <h2>Join today and get 5 Trade Points free!</h2>
        <h3>Features:</h3>
        <ul>
          <li>Add books via the Google Books Search API</li>
          <li>See all current books available to trade</li>
          <li>List your books to trade</li>
          <li>Every book successfully traded gets you another Trade Point!</li>
          <li>Manage your shipping address via the My Profile panel</li>
          <li>Manage your active trades via the My Trades panel</li>
          <li>Written 100% in ES6, React, Meteor 1.3, and MaterialUI</li>
          <li>All Book datastores are completely reactive</li>
        </ul>
      </CardText>
      <CardActions>
        <RaisedButton
          label="Discover Books"
          primary={true}
          onClick={() => context.router.push('/books')}
        />
      </CardActions>
    </Card>
  </Paper>
);

Index.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Index;
