import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  buttonLabel: {
    color: '#fff'
  }
};

const TradePoints = (props, context) => {
  if (props.user && props.user.tradePoints) {
    return (
      <FlatButton
        label="Trade Points"
        labelStyle={styles.buttonLabel}
        onClick={() => context.router.push('/')}
      >
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

TradePoints.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TradePoints;
