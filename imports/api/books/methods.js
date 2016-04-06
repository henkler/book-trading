import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Books } from './books';
import { Trades } from '../trades/trades';

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
        'Not authenticated');
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
    if (!this.userId) {
      throw new Meteor.Error('books.update.accessDenied',
        'Not authenticated');
    }

    const book = Books.findOne(bookId);

    if (!book) {
      throw new Meteor.Error('books.update.accessDenied',
        'Unable to find book');
    }

    if (!book.editableByCurrentUser()) {
      throw new Meteor.Error('books.update.accessDenied',
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
    if (!this.userId) {
      throw new Meteor.Error('books.remove.accessDenied',
        'Not authenticated');
    }

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

export const trade = new ValidatedMethod({
  name: 'books.trade',
  validate: new SimpleSchema({
    bookId: { type: String }
  }).validator(),
  run({ bookId }) {
    if (!this.userId) {
      throw new Meteor.Error('books.trade.accessDenied',
        'Not authenticated');
    }

    const book = Books.findOne(bookId);
    if (!book) {
      throw new Meteor.Error('books.trade.accessDenied',
        'Unable to find book');
    }

    // make sure this only runs on the server as tradePoints is not published to clients automatically
    if (!this.isSimulation) {
      const user = Meteor.users.find(this.userId);
      if (!user) {
        throw new Meteor.Error('books.trade.accessDenied',
          'Unable to retrieve User object');
      }
      if (user.tradePoints <= 0) {
        throw new Meteor.Error('books.trade.accessDenied',
          'Insufficient Trade Points Available');
      }
    }

    if (book.editableByCurrentUser()) {
      throw new Meteor.Error('books.trade.accessDenied',
        'Cannot trade a book you already own');
    }

    if (book.traded) {
      throw new Meteor.Error('books.traded.accessDenied',
        'Cannot trade a book that has already been traded');
    }

    const tradeId = Trades.insert({ bookId, bookOwnerUserId: book.userId });
    Books.update(bookId, { $set: { traded: true, tradeId } });

    // Decrement the available trade points
    Meteor.users.update(this.userId, { $inc: { tradePoints: -1 } });
  }
});
