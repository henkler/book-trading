import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Books } from './books';

export const insert = new ValidatedMethod({
  name: 'books.insert',
  validate: new SimpleSchema({
    title: { type: String },
    author: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    publisher: { type: String },
    pageCount: { type: Number }
  }).validator(),
  run({ title, author, thumbnail, description, publisher, pageCount }) {
    if (!this.userId) {
      throw new Meteor.Error('books.insert.accessDenied',
        'Must be logged in to add a book');
    }

    const bookFields = {
      title,
      author,
      thumbnail,
      description,
      publisher,
      pageCount
    };

    Books.insert(bookFields);
  }
});

export const update = new ValidatedMethod({
  name: 'books.update',
  validate: new SimpleSchema({
    bookId: { type: String },
    title: { type: String },
    author: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    publisher: { type: String },
    pageCount: { type: Number }
  }).validator(),
  run({ bookId, title, author, thumbnail, description, publisher, pageCount }) {
    const book = Books.findOne(bookId);

    if (!book) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Unable to find book');
    }

    if (!book.editableByCurrentUser()) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Cannot remove a book you do not own');
    }

    const bookFields = {
      title,
      author,
      thumbnail,
      description,
      publisher,
      pageCount
    };

    Books.update(book, { $set: bookFields });
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
