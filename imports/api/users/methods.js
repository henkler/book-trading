import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Users } from './users';
import { AddressSchema } from './addresses';

const userProfileValidator = new SimpleSchema({
  fullName: {
    type: String
  },
  shippingAddress: {
    type: AddressSchema
  }
}).validator();

export const updateProfile = new ValidatedMethod({
  name: 'users.profile.update',
  validate: userProfileValidator,
  run({ fullName, shippingAddress }) {
    if (!this.userId) {
      throw new Meteor.Error('users.update.shippingAddress.accessDenied',
        'Must be logged in to update Shipping Address');
    }

    Users.update(this.userId, { $set: { fullName, shippingAddress } });
  }
});
