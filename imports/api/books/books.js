import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { insert } from '/imports/api/books/methods';

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
    autoValue() {
      return this.userId;
    }
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
  addBookToCollection() {
    insert.call({
      title: this.title,
      author: this.author,
      thumbnail: this.thumbnail,
      description: this.description,
      publisher: this.publisher,
      pageCount: this.pageCount
    });
  }
});

Books.attachSchema(Books.schema);
