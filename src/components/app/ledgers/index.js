import React from 'react';
import PropTypes from 'prop-types';

import NewLedger from 'components/app/ledgers/NewLedger';
import SelectLedger from 'components/app/ledgers/SelectLedger';

const Ledgers = ({ activeLedger, ledgers }) => (
  <>
    <SelectLedger activeLedger={activeLedger} ledgers={ledgers} />
    <NewLedger />
  </>
);

Ledgers.propTypes = {
  activeLedger: PropTypes.string,
  ledgers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    total: PropTypes.string,
    users: PropTypes.array,
  })),
};

Ledgers.defaultProps = {
  activeLedger: null,
  ledgers: [],
};

export default Ledgers;
