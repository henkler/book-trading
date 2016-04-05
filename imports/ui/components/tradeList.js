import React from 'react';
import Trade from './trade';

const TradeList = (props) => (
  <div>
    {props.trades.map(trade =>
      <Trade
        key={trade._id}
        trade={trade}
        book={trade.book}
        actions={props.actions}
      />)}
  </div>
);

TradeList.propTypes = {
  trades: React.PropTypes.array.isRequired,
  actions: React.PropTypes.array
};

TradeList.defaultProps = {
  actions: []
};

export default TradeList;
