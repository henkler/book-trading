import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { insert, remove, trade } from './methods';

export const Books = new Mongo.Collection('books');

Books.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Books.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Books.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  author: {
    type: String,
    label: 'Author'
  },
  thumbnail: {
    type: String,
    label: 'Thumbnail URL'
  },
  description: {
    type: String,
    label: 'Book Description',
    optional: true
  },
  publisher: {
    type: String,
    label: 'Book Publisher',
    optional: true
  },
  pageCount: {
    type: Number,
    label: 'Page Count',
    optional: true
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    autoValue() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId };
      }

      this.unset();  // Prevent user from supplying their own value
    }
  },
  traded: {
    type: Boolean,
    label: 'Has this book been traded',
    defaultValue: false
  },
  tradeId: {
    type: SimpleSchema.RegEx.Id,
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'The date this Book was created',
    denyUpdate: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      this.unset();  // Prevent user from supplying their own value
    }
  }
});

Books.helpers({
  editableByCurrentUser() {
    return this.userId === Meteor.userId();
  },
  canEdit() {
    return this.editableByCurrentUser();
  },
  insert() {
    insert.call({
      title: this.title,
      author: this.author,
      thumbnail: this.thumbnail,
      description: this.description,
      publisher: this.publisher,
      pageCount: this.pageCount
    });
  },
  canInsert() {
    if (Meteor.userId()) {
      return true;
    }

    return false;
  },
  remove() {
    remove.call({ bookId: this._id });
  },
  canRemove() {
    return this.editableByCurrentUser();
  },
  trade() {
    trade.call({ bookId: this._id });
  },
  canTrade() {
    if (Meteor.userId()) {
      return true;
    }

    return false;
  }
});

Books.attachSchema(Books.schema);

export function myBooks() {
  const query = {};
  query.traded = false;

  return Books.find(query).fetch();
}

export function tradedBooks() {
  const query = {};
  query.traded = true;

  return Books.find(query).fetch();
}
