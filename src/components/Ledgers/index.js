import React from 'react';
import PropTypes from 'prop-types';

import NewLedger from 'components/Ledgers/NewLedger';
import SelectLedger from 'components/Ledgers/SelectLedger';
import LedgerShape from 'components/Ledgers/propTypes';

const Ledgers = ({ activeLedger, ledgers }) => (
  <>
    <SelectLedger activeLedger={activeLedger} ledgers={ledgers} />
    <NewLedger />
  </>
);

Ledgers.propTypes = {
  activeLedger: LedgerShape,
  ledgers: PropTypes.arrayOf(LedgerShape),
};

Ledgers.defaultProps = {
  activeLedger: null,
  ledgers: [],
};

export default Ledgers;
