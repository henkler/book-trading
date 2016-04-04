import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Trades } from '../trades';

Meteor.publish('myTrades', function myTrades() {
  if (!this.userId) {
    return this.ready();
  }

  const query = {};

  if (this.userId) {
    query.userId = this.userId;
  }

  return Trades.find(query);
});
