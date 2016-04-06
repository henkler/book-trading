import React from 'react';
import Trade from './trade';

const TradeList = (props) => (
  <div>
    {props.trades.map(trade =>
      <Trade
        key={trade._id}
        trade={trade}
        book={trade.book}
        user={trade.user}
      />)}
  </div>
);

TradeList.propTypes = {
  trades: React.PropTypes.array.isRequired
};

export default TradeList;
