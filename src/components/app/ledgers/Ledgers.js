import React from 'react';

import NewLedger from './NewLedger';
import SelectLedger from './SelectLedger';

const Ledgers = ({ activeLedger, ledgers }) => (
  <React.Fragment>
    <SelectLedger activeLedger={activeLedger} ledgers={ledgers} />
    <NewLedger />
  </React.Fragment>
);

export default Ledgers;
