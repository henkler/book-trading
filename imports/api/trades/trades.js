import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Trades = new Mongo.Collection('trades');

Trades.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Trades.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Trades.schema = new SimpleSchema({
  bookId: {
    type: SimpleSchema.RegEx.Id,
    label: 'ID of Book to be traded'
  },
  userId: {
    type: String,
    label: 'ID of user initiating trade',
    regEx: SimpleSchema.RegEx.Id,
    autoValue() {
      return this.userId;
    }
  },
  accepted: {
    type: Boolean,
    label: 'Has the trade been accepted',
    defaultValue: false
  },
  shipped: {
    type: Boolean,
    label: 'Has the trade been shipped',
    defaultValue: false
  },
  received: {
    type: Boolean,
    label: 'Has the trade been received',
    defaultValue: false
  },
  createdAt: {
    type: Date,
    label: 'The date this trade was created',
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

Trades.helpers({
  editableByCurrentUser() {
    return this.userId === Meteor.userId();
  }
});

Trades.attachSchema(Trades.schema);
