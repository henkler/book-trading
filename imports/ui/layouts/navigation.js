import React from 'react';
import { Link } from 'react-router';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import LibraryAdd from 'material-ui/lib/svg-icons/av/library-add';
import LibraryBooks from 'material-ui/lib/svg-icons/av/library-books';

const styles = {
  navBar: {
    top: 64
  },
  link: {
    textDecoration: "none"
  }
}

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
    this.setState({open: false});
  }

  render() {
    return (
      <LeftNav
        containerStyle={styles.navBar}
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={open => this.setState({open})}
      >
        <Link to="/search" style={styles.link}>
          <MenuItem leftIcon={<LibraryBooks />} onTouchTap={this.handleClose}>
            Search
          </MenuItem>
        </Link>
        <Link to="/" style={styles.link}>
          <MenuItem leftIcon={<LibraryAdd />} onTouchTap={this.handleClose}>
            Available Books
          </MenuItem>
        </Link>
        <MenuItem leftIcon={<LibraryAdd />} onTouchTap={this.handleClose}>
          Stuff
        </MenuItem>
      </LeftNav>
    );
  }
}

export default Navigation;
