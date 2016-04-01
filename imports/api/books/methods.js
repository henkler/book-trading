import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Books } from './books';

export const insert = new ValidatedMethod({
  name: 'books.insert',
  validate: new SimpleSchema({
    title: { type: String }
  }).validator(),
  run({ title }) {
    if (!this.userId) {
      throw new Meteor.Error('books.insert.accessDenied',
        'Must be logged in to add a book');
    }

    const book = {
      title
    };

    Books.insert(book);
  }
});

export const update = new ValidatedMethod({
  name: 'books.update',
  validate: new SimpleSchema({
    bookId: { type: String },
    title: { type: String }
  }).validator(),
  run({ bookId, title }) {
    const book = Books.findOne(bookId);

    if (!book) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Unable to find book');
    }

    if (!book.editableByCurrentUser()) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Cannot remove a book you do not own');
    }

    Books.update(book, { $set: { title } });
  }
});

export const remove = new ValidatedMethod({
  name: 'books.remove',
  validate: new SimpleSchema({
    bookId: { type: String }
  }).validator(),
  run({ bookId }) {
    const book = Books.findOne(bookId);

    if (!book) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Unable to find book');
    }

    if (!book.editableByCurrentUser()) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Cannot remove a book you do not own');
    }

    Books.remove(bookId);
  }
});
