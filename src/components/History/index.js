import React from 'react';
import PropTypes from 'prop-types';

import Debt from 'components/Debt';
import DebtShape from 'components/Debt/propTypes';
import StyledHistory from 'components/History/styles';

const History = ({ debts }) => (
  <StyledHistory>
    <h2 className='title is-3'>Historial</h2>
    <ul>
      {debts.map(debt => (
        <Debt key={debt.id} debt={debt} />
      ))}
    </ul>
  </StyledHistory>
);

History.propTypes = {
  debts: PropTypes.arrayOf(DebtShape).isRequired,
};

export default History;
