import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { cancel, accept, reject, receive, ship } from './methods';

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
  bookOwnerUserId: {
    type: SimpleSchema.RegEx.Id,
    label: 'User ID of the owner of the book'
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
  rejected: {
    type: Boolean,
    label: 'Has the trade been rejected',
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
  book() {
    return Books.findOne(this.bookId);
  },
  isBookOwner() {
    return this.bookOwnerUserId === Meteor.userId();
  },
  isTradeCreator() {
    return this.userId === Meteor.userId();
  },
  cancel() {
    cancel.call({ tradeId: this._id });
  },
  canCancel() {
    if (this.accepted || this.rejected || !this.isTradeCreator()) {
      return false;
    }
    return true;
  },
  accept() {
    accept.call({ tradeId: this._id });
  },
  canAccept() {
    if (this.accepted || this.rejected || !this.isBookOwner()) {
      return false;
    }
    return true;
  },
  reject() {
    reject.call({ tradeId: this._id });
  },
  canReject() {
    if (this.rejected || this.shipped || !this.isBookOwner()) {
      return false;
    }
    return true;
  },
  ship() {
    ship.call({ tradeId: this._id });
  },
  canShip() {
    if (!this.accepted || !this.isBookOwner()) {
      return false;
    }
    return true;
  },
  receive() {
    receive.call({ tradeId: this._id });
  },
  canReceive() {
    if (!this.shipped || !this.isTradeCreator()) {
      return false;
    }
    return true;
  }
});

Trades.attachSchema(Trades.schema);
