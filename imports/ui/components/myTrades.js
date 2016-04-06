import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TradeList from '../containers/tradeList';

const MyTrades = () => (
  <Tabs>
    <Tab label="Trades Requested">
      <TradeList publication="myTrades" filter="requested" />
    </Tab>
    <Tab label="Books to Ship">
      <TradeList publication="myTrades" filter="owned" />
    </Tab>
  </Tabs>
);


export default MyTrades;
