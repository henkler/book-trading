import React from 'react';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

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

    this.handelSave = this.handelSave.bind(this);
  }

  getFormData() {
    const fullName = this.refs.fullName.value;
    const shippingAddress = {
      streetAddress: this.refs.streetAddress.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      zipCode: this.refs.zipCode.value
    };

    return {
      fullName,
      shippingAddress
    };
  }

  handelSave() {
    updateProfile.call(this.getFormData());
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <label htmlFor="fullName">Full Name: </label>
        <input type="text" id="fullName" ref="fullName" defaultValue={this.props.user.fullName} />
        <br />
        <br />
        <h2>Shipping Address</h2>
        <label htmlFor="streetAddress">Street Address: </label>
        <input type="text" id="streetAddress" ref="streetAddress" defaultValue={this.props.user.shippingAddress.streetAddress} />
        <br />
        <label htmlFor="city">City: </label>
        <input type="text" id="city" ref="city" defaultValue={this.props.user.shippingAddress.city} />
        <br />
        <label htmlFor="state">State: </label>
        <input type="text" id="state" ref="state" defaultValue={this.props.user.shippingAddress.state} />
        <br />
        <label htmlFor="zipCode">ZIP Code: </label>
        <input type="text" id="zipCode" ref="zipCode" defaultValue={this.props.user.shippingAddress.zipCode} />
        <br />
        <FlatButton label="Save" onClick={this.handelSave} />
      </Paper>
    );
  }
}

UserProfile.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default UserProfile;
