import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

import { updateProfile } from '/imports/api/users/methods';

const styles = {
  paper: {
    width: 500,
    margin: 10,
    padding: 10
  }
};


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
    );
  }
}

export default UserProfile;

