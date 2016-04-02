import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Users } from '/imports/api/users/users';
import UserProfile from '../components/userProfile';

const composer = (props, onData) => {
  if (Meteor.subscribe('user.profile').ready()) {
    const user = Users.findOne();
    onData(null, { user });
  }
};

export default composeWithTracker(composer)(UserProfile);
