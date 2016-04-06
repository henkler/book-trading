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

export const TradeStatusTypes = {
  pending: { value: 'pending', label: 'Pending' },
  cancelled: { value: 'cancelled', label: 'Cancelled' },
  accepted: { value: 'accepted', label: 'Accepted' },
  rejected: { value: 'rejected', label: 'Rejected' },
  shipped: { value: 'shipped', label: 'Shipped' },
  received: { value: 'received', label: 'Received' },
  archived: { value: 'archived', label: 'Archived' }
};

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
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId };
      }

      this.unset();  // Prevent user from supplying their own value
    }
  },
  status: {
    type: String,
    label: 'Current status of the trade',
    allowedValues: Object.keys(TradeStatusTypes),
    defaultValue: TradeStatusTypes.pending.value
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
    return (this.status === TradeStatusTypes.pending.value && this.isTradeCreator());
  },
  accept() {
    accept.call({ tradeId: this._id });
  },
  canAccept() {
    return (this.status === TradeStatusTypes.pending.value && this.isBookOwner());
  },
  reject() {
    reject.call({ tradeId: this._id });
  },
  canReject() {
    return (this.status === TradeStatusTypes.pending.value && this.isBookOwner());
  },
  ship() {
    ship.call({ tradeId: this._id });
  },
  canShip() {
    return (this.status === TradeStatusTypes.accepted.value && this.isBookOwner());
  },
  receive() {
    receive.call({ tradeId: this._id });
  },
  canReceive() {
    return (this.status === TradeStatusTypes.shipped.value && this.isTradeCreator());
  },
  archive() {
    archive.call({ tradeId: this._id });
  },
  canArchive() {
    const statusArr = [TradeStatusTypes.rejected.value, TradeStatusTypes.cancelled.value, TradeStatusTypes.received.value];
    return (statusArr.indexOf(this.status) >= 0 && this.isTradeCreator());
  }
});

Trades.attachSchema(Trades.schema);
