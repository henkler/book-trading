import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import AccountsUIWrapper from '../components/accountsUIWrapper';
import Navigation from './navigation';

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
          iconElementRight={<AccountsUIWrapper />}
          onLeftIconButtonTouchTap={this.handleMenuClick}
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
