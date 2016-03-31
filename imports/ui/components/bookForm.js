import React from 'react';
import ReactDOM from 'react-dom';

import { insert } from '/imports/api/books/methods';
import { update } from '/imports/api/books/methods';

class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const bookId = this.props.book._id;
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();

    // if we have a bookId, do an update rather than insert
    if (bookId) {
      update.call({ bookId, title });
    } else {
      insert.call({ title });
    }

    this.context.router.goBack();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          ref="titleInput"
          placeholder="Book Title"
          defaultValue={ this.props.book.title }
        />
        <input type="submit" />
      </form>
    );
  }
}

BookForm.propTypes = {
  book: React.PropTypes.object
};

BookForm.defaultProps = {
  book: {
    title: ''
  }
};

BookForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookForm;
