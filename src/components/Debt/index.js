import React from 'react';

import StyledDebt from 'components/Debt/styles';
import DebtShape from 'components/Debt/propTypes';
import { formatCurrency } from 'utils';

const Debt = ({ debt }) => (
  <StyledDebt>
    <div>
      <span>name</span>
      <span>fecha</span>
    </div>
    <div>
      <span className='title is-5'>{formatCurrency(debt.amount)}</span>
    </div>
    <p>{debt.description}</p>
  </StyledDebt>
);

Debt.propTypes = {
  debt: DebtShape.isRequired,
};

export default Debt;
