import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import TradePoints from '../components/tradePoints';

const composer = (props, onData) => {
  if (Meteor.subscribe('user.tradePoints').ready()) {
    const user = Meteor.user();
    onData(null, { user });
  }
};

export default composeWithTracker(composer)(TradePoints);
