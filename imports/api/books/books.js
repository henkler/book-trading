import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  createdAt: {
    type: Date,
    label: 'The date this Book was created',
    denyUpdate: true,
    autoValue() {
      return new Date();
    }
  }
});

Books.helpers({
  editableBy(userId) {
    return this.userId === userId;
  }
});

Books.attachSchema(Books.schema);
