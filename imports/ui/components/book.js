import React from 'react';
import { Link } from 'react-router';

import { remove } from '/imports/api/books/methods';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  
  handleDeleteClick(event) {
    remove.call({ bookId: this.props._id });
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={ this.handleDeleteClick }>Delete</button>
        <Link to={`/books/${this.props._id}`}>Edit</Link>
      </div>
    );
  }
}

Book.propTypes = {
  title: React.PropTypes.string
};

export default Book;
