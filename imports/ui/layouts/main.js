import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import AccountsUIWrapper from '../components/accountsUIWrapper';

const MainLayout = ({ children }) => (
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

export default MainLayout;
