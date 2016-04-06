import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const styles = {
  paper: {
    width: 350,
    margin: 10,
    display: 'inline-block'
  },
  actions: {
    textAlign: 'center'
  },
  thumbnailContainer: {
    textAlign: 'center'
  },
  thumbnail: {
    height: 200,
    width: 'auto'
  }
};

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleTradeClick = this.handleTradeClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleAddClick() {
    this.props.book.insert();
    this.context.router.push('/mybooks');
  }

  handleTradeClick() {
    this.props.book.trade();
    this.context.router.push('/mytrades');
  }

  handleEditClick() {
    this.context.router.push(`/books/${this.props.book._id}`);
  }

  handleDeleteClick() {
    this.props.book.remove();
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

    if (actions.includes('trade')) {
      actionButtons.push(<FlatButton key="action_trade" label="Request Trade" onClick={ this.handleTradeClick } />);
    }

    if (actionButtons.length > 0) {
      return (
        <CardActions style={styles.actions} >
          {actionButtons}
        </CardActions>
      );
    }
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <Card>
          <CardTitle
            title={this.props.book.title}
            subtitle={this.props.book.author}
            showExpandableButton={true}
          />
          <CardText style={styles.thumbnailContainer}>
            <img src={this.props.book.thumbnail} style={styles.thumbnail} />
          </CardText>
          <CardText expandable={true}>
            <p>{this.props.book.description}</p>
            <br />
            <p><b>Publisher:</b> {this.props.book.publisher}</p>
            <p><b>Pages:</b> {this.props.book.pageCount}</p>
          </CardText>
          {this.renderActions()}
        </Card>
      </Paper>
    );
  }
}

Book.propTypes = {
  book: React.PropTypes.object.isRequired,
  actions: React.PropTypes.array
};

Book.defaultProps = {
  actions: []
};

Book.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Book;
