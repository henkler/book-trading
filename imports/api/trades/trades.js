import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { cancel, accept, reject, receive, ship, archive } from './methods';

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
  status: {
    type: String,
    label: 'Current status of the trade',
    allowedValues: [
      'pending',
      'cancelled',
      'accepted',
      'rejected',
      'shipped',
      'received',
      'archived'
    ],
    defaultValue: 'pending'
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
    return (this.status === 'pending' && this.isTradeCreator());
  },
  accept() {
    accept.call({ tradeId: this._id });
  },
  canAccept() {
    return (this.status === 'pending' && this.isBookOwner());
  },
  reject() {
    reject.call({ tradeId: this._id });
  },
  canReject() {
    return (this.status === 'pending' && this.isBookOwner());
  },
  ship() {
    ship.call({ tradeId: this._id });
  },
  canShip() {
    return (this.status === 'accepted' && this.isBookOwner());
  },
  receive() {
    receive.call({ tradeId: this._id });
  },
  canReceive() {
    return (this.status === 'shipped' && this.isTradeCreator());
  },
  archive() {
    archive.call({ tradeId: this._id });
  },
  canArchive() {
    return (['rejected', 'cancelled', 'received'].indexOf(this.status) >= 0 && this.isTradeCreator());
  }
});

Trades.attachSchema(Trades.schema);
