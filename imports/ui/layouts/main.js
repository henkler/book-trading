import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import AccountsUIWrapper from '../components/accountsUIWrapper';

export const MainLayout = ({ children }) => (
  <div>
    <AppBar
      title="Book Trading App"
      iconElementRight={<AccountsUIWrapper />}
      zDepth={4}
    />
    { children }
  </div>
);

MainLayout.propTypes = {
  children: React.PropTypes.object
};
