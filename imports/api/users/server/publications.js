/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Users } from '../users';

Meteor.publish('user.profile', function userProfile() {
  if (!this.userId) {
    return this.ready();
  }

  const selector = { _id: this.userId };
  const options = {
    fields: {
      fullName: 1,
      shippingAddress: 1
    }
  };

  return Users.find(selector, options);
});

Meteor.publish('user.tradePoints', function userTradePoints() {
  if (!this.userId) {
    return this.ready();
  }

  const selector = { _id: this.userId };

  const options = {
    fields: { tradePoints: 1 }
  };

  return Users.find(selector, options);
});
