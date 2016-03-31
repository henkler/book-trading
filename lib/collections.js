/* global SimpleSchema: false*/
import { Mongo } from 'meteor/mongo';

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

const BooksSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  createdAt: {
    type: Date,
    label: 'The date this checkin was created',
    autoValue() {
      return new Date();
    }
  }
});

Books.attachSchema(BooksSchema);
