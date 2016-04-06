import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  buttonLabel: {
    color: '#fff'
  }
};

const TradePoints = (props) => {
  if (props.user && props.user.tradePoints) {
    return (
      <FlatButton label="Trade Points" labelStyle={styles.buttonLabel}>
        <Avatar>
          {props.user.tradePoints}
        </Avatar>
      </FlatButton>
    );
  }
  return <div />;
};

TradePoints.propTypes = {
  user: React.PropTypes.object
};

export default TradePoints;
