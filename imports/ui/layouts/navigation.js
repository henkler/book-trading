import React from 'react';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LibraryAdd from 'material-ui/lib/svg-icons/av/library-add';
import LibraryBooks from 'material-ui/lib/svg-icons/av/library-books';

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

  render() {
    return (
      <LeftNav
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        <Link to="/mybooks" style={styles.link}>
          <MenuItem leftIcon={<LibraryBooks />} onTouchTap={ this.handleClose }>
            My Books
          </MenuItem>
        </Link>
        <Link to="/books" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={ this.handleClose }>
            Available Books
          </MenuItem>
        </Link>
        <Link to="/addbooks" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={ this.handleClose }>
            Add Books
          </MenuItem>
        </Link>
        <Link to="/tradedbooks" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={ this.handleClose }>
            Traded Books
          </MenuItem>
        </Link>
        <Link to="/mytrades" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={ this.handleClose }>
            My Trades
          </MenuItem>
        </Link>
        <Link to="/myprofile" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={ this.handleClose }>
            My Profile
          </MenuItem>
        </Link>
      </LeftNav>
    );
  }
}

export default Navigation;
