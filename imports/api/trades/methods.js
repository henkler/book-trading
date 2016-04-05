import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Books } from '../books/books';
import { Trades } from './trades';

export const cancel = new ValidatedMethod({
  name: 'trades.cancel',
  validate: new SimpleSchema({
    tradeId: { type: String }
  }).validator(),
  run({ tradeId }) {
    const trade = Trades.findOne(tradeId);

    if (!trade) {
      throw new Meteor.Error('trades.cancel.accessDenied',
        'Unable to find trade');
    }

    if (!trade.canCancel()) {
      throw new Meteor.Error('trades.cancel.accessDenied',
        'Unable to cancel trade');
    }

    Trades.remove(tradeId);
    Books.update(trade.bookId, { $set: { traded: false } });
  }
});

export const accept = new ValidatedMethod({
  name: 'trades.accept',
  validate: new SimpleSchema({
    tradeId: { type: String }
  }).validator(),
  run({ tradeId }) {
    const trade = Trades.findOne(tradeId);

    if (!trade) {
      throw new Meteor.Error('trades.accept.accessDenied',
        'Unable to find trade');
    }

    if (!trade.canAccept()) {
      throw new Meteor.Error('trades.accept.accessDenied',
        'Unable to accept trade');
    }

    Trades.update(tradeId, { $set: { accepted: true, rejected: false } });
  }
});

export const reject = new ValidatedMethod({
  name: 'trades.reject',
  validate: new SimpleSchema({
    tradeId: { type: String }
  }).validator(),
  run({ tradeId }) {
    const trade = Trades.findOne(tradeId);

    if (!trade) {
      throw new Meteor.Error('trades.reject.accessDenied',
        'Unable to find trade');
    }

    if (!trade.canReject()) {
      throw new Meteor.Error('trades.reject.accessDenied',
        'Unable to reject trade');
    }

    Trades.update(tradeId, { $set: { accepted: false, rejected: true } });
    Books.update(trade.bookId, { $set: { traded: false } });
  }
});

export const ship = new ValidatedMethod({
  name: 'trades.ship',
  validate: new SimpleSchema({
    tradeId: { type: String }
  }).validator(),
  run({ tradeId }) {
    const trade = Trades.findOne(tradeId);

    if (!trade) {
      throw new Meteor.Error('trades.ship.accessDenied',
        'Unable to find trade');
    }

    if (!trade.canShip()) {
      throw new Meteor.Error('trades.ship.accessDenied',
        'Unable to ship trade');
    }

    Trades.update(tradeId, { $set: { shipped: true } });
  }
});

export const receive = new ValidatedMethod({
  name: 'trades.receive',
  validate: new SimpleSchema({
    tradeId: { type: String }
  }).validator(),
  run({ tradeId }) {
    const trade = Trades.findOne(tradeId);

    if (!trade) {
      throw new Meteor.Error('trades.receive.accessDenied',
        'Unable to find trade');
    }

    if (!trade.canReceive()) {
      throw new Meteor.Error('trades.receive.accessDenied',
        'Unable to receive trade');
    }

    Trades.update(tradeId, { $set: { received: true } });
  }
});
