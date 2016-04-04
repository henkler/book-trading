import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

Users.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Users.helpers({
  editableByCurrentUser() {
    return this.userId === Meteor.userId();
  }
});
