import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Trades } from '/imports/api/trades/trades';
import { Books } from '/imports/api/books/books';
import TradeList from '../components/tradeList';

const composer = (props, onData) => {
  if (Meteor.subscribe(props.publication).ready()) {
    let trades = [];
    let tradeHandle = null;
    let tradeCount = 0;

    if (props.filter === 'requested') {
      tradeHandle = Trades.find({ userId: Meteor.userId() });
      tradeCount = tradeHandle.count();
      trades = tradeHandle.fetch();
    } else if (props.filter === 'owned') {
      tradeHandle = Trades.find({ bookOwnerUserId: Meteor.userId() });
      tradeCount = tradeHandle.count();
      trades = tradeHandle.fetch();
    } else {
      tradeHandle = Trades.find();
      tradeCount = tradeHandle.count();
      trades = tradeHandle.fetch();
    }
    trades.forEach(trade => {
      trade.book = Books.findOne(trade.bookId);
      trade.user = Meteor.users.findOne(trade.userId);
    });
    onData(null, { trades, tradeCount });
  }
};

export default composeWithTracker(composer)(TradeList);
