import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LibraryAdd from 'material-ui/lib/svg-icons/av/library-add';
import LibraryBooks from 'material-ui/lib/svg-icons/av/library-books';
import AccountBox from 'material-ui/lib/svg-icons/action/account-box';
import NavigationApps from 'material-ui/lib/svg-icons/navigation/apps';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import AVRepeat from 'material-ui/lib/svg-icons/av/repeat';

import AccountsUIWrapper from '../components/accountsUIWrapper';

const styles = {
  link: {
    textDecoration: 'none'
  }
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = { open: false };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  renderMenuItems() {
    const menuItems = [];

    menuItems.push(
      <Link key="item_home" to="/" style={styles.link}>
        <MenuItem leftIcon={<ActionHome />} onTouchTap={ this.handleClose }>
          Home
        </MenuItem>
      </Link>
    );

    menuItems.push(
      <Link key="item_books" to="/books" style={styles.link}>
        <MenuItem leftIcon={<LibraryBooks />} onTouchTap={ this.handleClose }>
          All Books
        </MenuItem>
      </Link>
    );

    if (Meteor.userId()) {
      menuItems.push(
        <Link key="item_mybooks" to="/mybooks" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={ this.handleClose }>
            My Books
          </MenuItem>
        </Link>
      );
      menuItems.push(
        <Link key="item_mytrades" to="/mytrades" style={styles.link}>
          <MenuItem leftIcon={<AVRepeat />} onTouchTap={ this.handleClose }>
            My Trades
          </MenuItem>
        </Link>
      );
      menuItems.push(
        <Link key="item_myprofile" to="/myprofile" style={styles.link}>
          <MenuItem leftIcon={<NavigationApps />} onTouchTap={ this.handleClose }>
            My Profile
          </MenuItem>
        </Link>
      );
    }

    menuItems.push(
      <MenuItem key="item_login" insetChildren={true} onTouchTap={ this.handleClose }>
        <AccountsUIWrapper />
      </MenuItem>
    );

    return menuItems;
  }

  render() {
    return (
      <LeftNav
        docked={false}
        width={250}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        {this.renderMenuItems()}
      </LeftNav>
    );
  }
}

export default Navigation;
