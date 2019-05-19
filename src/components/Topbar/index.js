import React from 'react';

import SignOut from 'components/SignOut';
import Ledgers from 'components/Ledgers';
import NewLedger from 'components/NewLedger';
import StyledTopbar from 'components/Topbar/styles';

const Topbar = props => (
  <StyledTopbar>
    <SignOut />
    <Ledgers {...props} />
    <NewLedger />
  </StyledTopbar>
);

export default Topbar;
