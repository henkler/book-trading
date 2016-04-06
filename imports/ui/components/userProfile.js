import React from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
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

    this.handleSave = this.handleSave.bind(this);
  }

  getFormData() {
    const fullName = this.refs.fullName.getValue().trim();
    const shippingAddress = {
      streetAddress: this.refs.streetAddress.getValue().trim(),
      city: this.refs.city.getValue().trim(),
      state: this.refs.state.getValue().trim(),
      zipCode: this.refs.zipCode.getValue().trim()
    };

    return {
      fullName,
      shippingAddress
    };
  }

  handleSave() {
    updateProfile.call(this.getFormData());
    this.context.router.goBack();
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <h2>User Information</h2>
        <TextField
          id="fullName"
          ref="fullName"
          hintText="Full Name"
          defaultValue={this.props.user.fullName}
        />
        <br />
        <h2>Shipping Address</h2>
        <b><label htmlFor="streetAddress">Street</label></b><br />
        <TextField
          id="streetAddress"
          ref="streetAddress"
          hintText="Street Address"
          defaultValue={this.props.user.shippingAddress.streetAddress}
        />
        <br />
        <b><label htmlFor="city">City</label></b><br />
        <TextField
          id="city"
          ref="city"
          hintText="City"
          defaultValue={this.props.user.shippingAddress.city}
        />
        <br />
        <b><label htmlFor="state">State</label></b><br />
        <TextField
          id="state"
          ref="state"
          hintText="State "
          defaultValue={this.props.user.shippingAddress.state}
        />
        <br />
        <b><label htmlFor="zipCode">ZIP Code: </label></b><br />
        <TextField
          id="zipCode"
          ref="zipCode"
          hintText="Zip Code"
          defaultValue={this.props.user.shippingAddress.zipCode}
        />
        <br />
        <RaisedButton label="Save" primary={true} onClick={this.handleSave} />
      </Paper>
    );
  }
}

UserProfile.propTypes = {
  user: React.PropTypes.object.isRequired
};

UserProfile.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserProfile;
