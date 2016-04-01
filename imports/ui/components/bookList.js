import React from 'react';
import Book from './book';

const BookList = (props) => (
  <div>
    {props.books.map(book =>
      <Book
        key={book._id}
        book={book}
        actions={props.actions}
      />)}
  </div>
);

BookList.propTypes = {
  books: React.PropTypes.array.isRequired,
  actions: React.PropTypes.array
};

BookList.defaultProps = {
  actions: []
};

export default BookList;
