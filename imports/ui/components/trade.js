import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import { TradeStatusTypes } from '/imports/api/trades/trades';

const styles = {
  paper: {
    width: 350,
    margin: 10,
    display: 'inline-block'
  },
  actions: {
    textAlign: 'center'
  },
  thumbnailContainer: {
    textAlign: 'center'
  },
  thumbnail: {
    height: 200,
    width: 'auto'
  }
};

class Trade extends React.Component {
  constructor(props) {
    super(props);

    this.handleAcceptClick = this.handleAcceptClick.bind(this);
    this.handleRejectClick = this.handleRejectClick.bind(this);
    this.handleShipClick = this.handleShipClick.bind(this);
    this.handleReceiveClick = this.handleReceiveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleArchiveClick = this.handleArchiveClick.bind(this);
  }

  handleAcceptClick() {
    this.props.trade.accept();
  }

  handleRejectClick() {
    this.props.trade.reject();
  }

  handleShipClick() {
    this.props.trade.ship();
  }

  handleReceiveClick() {
    this.props.trade.receive();
  }

  handleCancelClick() {
    this.props.trade.cancel();
  }

  handleArchiveClick() {
    this.props.trade.archive();
  }

  renderActions() {
    const trade = this.props.trade;
    const actionButtons = [];

    if (trade.canCancel()) {
      actionButtons.push(<FlatButton key="action_cancel" label="Cancel Trade" onClick={ this.handleCancelClick }/>);
    }
    if (trade.canAccept()) {
      actionButtons.push(<FlatButton key="action_accept" label="Accept Trade" onClick={ this.handleAcceptClick } />);
    }
    if (trade.canReject()) {
      actionButtons.push(<FlatButton key="action_reject" label="Reject Trade" onClick={ this.handleRejectClick } />);
    }
    if (trade.canShip()) {
      actionButtons.push(<FlatButton key="action_ship" label="Mark as Shipped" onClick={ this.handleShipClick } />);
    }
    if (trade.canReceive()) {
      actionButtons.push(<FlatButton key="action_receive" label="Mark as Received" onClick={ this.handleReceiveClick } />);
    }
    if (trade.canArchive()) {
      actionButtons.push(<FlatButton key="action_archive" label="Archive Trade" onClick={ this.handleArchiveClick } />);
    }

    if (actionButtons.length > 0) {
      return (
        <CardActions style={styles.actions} >
          {actionButtons}
        </CardActions>
      );
    }
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <Card>
          <CardHeader
            title={<h2>{`Status: ${TradeStatusTypes[this.props.trade.status].label}`}</h2>}
          />
          <CardTitle
            title={this.props.book.title}
            subtitle={this.props.book.author}
            showExpandableButton={true}
          />
          <CardText style={styles.thumbnailContainer}>
            <img src={this.props.book.thumbnail} style={styles.thumbnail} />
          </CardText>
          <CardText expandable={true}>
            <p>{this.props.book.description}</p>
            <br />
            <p><b>Publisher:</b> {this.props.book.publisher}</p>
            <p><b>Pages:</b> {this.props.book.pageCount}</p>
          </CardText>
          <CardText>
            <h2>Shipping Information</h2>
            <p><b>Name:</b> {this.props.user.fullName}</p>
            <p><b>Address</b></p>
            <ul>
              <li><b>Street:</b> {this.props.user.shippingAddress.streetAddress}</li>
              <li><b>City:</b> {this.props.user.shippingAddress.city}</li>
              <li><b>State:</b> {this.props.user.shippingAddress.state}</li>
              <li><b>Zip:</b> {this.props.user.shippingAddress.zipCode}</li>
            </ul>
          </CardText>
          {this.renderActions()}
        </Card>
      </Paper>
    );
  }
}

Trade.propTypes = {
  book: React.PropTypes.object.isRequired,
  trade: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

Trade.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Trade;
