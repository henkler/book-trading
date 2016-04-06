import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Trades } from '../trades';
import { Books } from '../../books/books';

Meteor.publishComposite('myTrades', {
  find() {
    if (!this.userId) {
      return this.ready();
    }

    const query = {};
    query.userId = this.userId;
    query.status = { $ne: 'archived' };

    return Trades.find(query);
  },
  children: [
    {
      find(trade) {
        return Books.find({ _id: trade.bookId }, { limit: 1 });
      }
    }
  ]
});
