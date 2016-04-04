import React from 'react';
import BookPage from './bookPage';

const BooksOwned = () => (
  <BookPage publication={'booksOwned'} actions={['edit', 'delete']} />
);

export default BooksOwned;
