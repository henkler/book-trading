import { Meteor } from 'meteor/meteor';
import { Trades, TradeStatusTypes } from '../trades';
import { Books } from '../../books/books';

Meteor.publishComposite('myTrades', {
  find() {
    if (!this.userId) {
      return this.ready();
    }

    const query = {
      $or: [{ userId: this.userId }, { bookOwnerUserId: this.userId }],
      status: { $ne: TradeStatusTypes.archived.value }
    };

    return Trades.find(query);
  },
  children: [
    {
      find(trade) {
        return Books.find({ _id: trade.bookId }, { limit: 1 });
      }
    },
    {
      find(trade) {
        return Meteor.users.find({ _id: trade.userId }, {
          fields: {
            fullName: 1,
            shippingAddress: 1
          }
        });
      }
    }
  ]
});
