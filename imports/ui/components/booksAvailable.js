import React from 'react';
import BookPage from './bookPage';

const BooksAvailable = () => (
  <BookPage publication={'booksAvailable'} actions={['trade']} />
);

export default BooksAvailable;
