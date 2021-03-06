/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Books } from '../books';
import { bookSearchByTitle } from './bookSearch';

Meteor.publish('books', function books(bookId) {
  check(bookId, String);

  return Books.find(bookId);
});

Meteor.publish('allBooks', function books(title = '') {
  check(title, String);
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  if (this.userId) {
    query.userId = { $ne: this.userId };
  }

  query.traded = false;

  return Books.find(query);
});

Meteor.publish('myBooks', function books(title = '') {
  check(title, String);
  if (!this.userId) {
    return this.ready();
  }

  const query = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  if (this.userId) {
    query.userId = this.userId;
  }

  return Books.find(query);
});

// Synthetic collection - returns "Book-Like" objects from book database
Meteor.publish('booksAddSearch', function books(title = '') {
  check(title, String);
  if (title) {
    const results = bookSearchByTitle(title);

    results.forEach(result => {
      this.added('books', result._id, result);
    });
  }

  return this.ready();
});
