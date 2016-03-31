import React from 'react';
import Book from './book';

const BookList = (props) => (
  <div>
    {props.books.map(book =>
      <Book
        key={book._id}
        {...book}
      />)}
  </div>
);

BookList.propTypes = {
  books: React.PropTypes.array
};

export default BookList;
