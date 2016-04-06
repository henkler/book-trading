import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Trades } from '/imports/api/trades/trades';
import { Books } from '/imports/api/books/books';
import TradeList from '../components/tradeList';

const composer = (props, onData) => {
  if (Meteor.subscribe(props.publication).ready()) {
    let trades = [];
    if (props.filter === 'requested') {
      trades = Trades.find({ userId: Meteor.userId() }).fetch();
    } else if (props.filter === 'owned') {
      trades = Trades.find({ bookOwnerUserId: Meteor.userId() }).fetch();
    } else {
      trades = Trades.find().fetch();
    }
    trades.forEach(trade => { trade.book = Books.findOne(trade.bookId) });
    onData(null, { trades });
  }
};

export default composeWithTracker(composer)(TradeList);
