import React from 'react';
import { Meteor } from 'meteor/meteor';
import AppBar from 'material-ui/lib/app-bar';
import Navigation from './navigation';

import TradePoints from '../containers/tradePoints';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.refs.navBar.handleToggle();
  }

  render() {
    return (
      <div>
        <AppBar
          title="Book Trading App"
          onLeftIconButtonTouchTap={this.handleMenuClick}
          iconElementRight={<TradePoints />}
        />
        <Navigation ref="navBar" />
        { this.props.children }
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: React.PropTypes.object
};

export default MainLayout;
