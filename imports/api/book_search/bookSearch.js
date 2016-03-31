import { Mongo } from 'meteor/mongo';

export const BookSearch = new Mongo.Collection('bookSearch');

BookSearch.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

BookSearch.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

BookSearch.helpers({
  addBookToLibrary() {
    return this.userId === null;
  }
});
