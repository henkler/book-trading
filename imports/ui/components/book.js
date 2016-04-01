import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import { remove } from '/imports/api/books/methods';

const styles = {
  paper: {
    width: 350,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block'
  }
};

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleAddClick() {
    this.props.book.addBookToCollection();
    this.context.router.push('/mybooks');
  }

  handleEditClick() {
    this.context.router.push(`/books/${this.props.book._id}`);
  }

  handleDeleteClick() {
    remove.call({ bookId: this.props.book._id });
  }

  renderActions() {
    const book = this.props.book;
    const actions = this.props.actions;
    const actionButtons = [];

    if (book.editableByCurrentUser()) {
      if (actions.includes('edit')) {
        actionButtons.push(<FlatButton key="action_edit" label="Edit" onClick={ this.handleEditClick } />);
      }

      if (actions.includes('delete')) {
        actionButtons.push(<FlatButton key="action_delete" label="Delete" onClick={ this.handleDeleteClick } />);
      }
    }

    if (actions.includes('add')) {
      actionButtons.push(<FlatButton key="action_add" label="Add to My Books" onClick={ this.handleAddClick } />);
    }

    if (actionButtons.length > 0) {
      return (
        <CardActions>
          {actionButtons}
        </CardActions>
      );
    }
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <Card>
          <CardTitle title={this.props.book.title} subtitle={this.props.book.author} />
          <CardMedia>
            <img src={this.props.book.thumbnail} />
          </CardMedia>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          {this.renderActions()}
        </Card>
      </Paper>
    );
  }
}

Book.propTypes = {
  book: React.PropTypes.object
};

Book.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Book;
