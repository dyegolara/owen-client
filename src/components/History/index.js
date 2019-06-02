import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Debt from 'components/Debt';
import Button from 'components/Button';
import DebtShape from 'components/Debt/propTypes';
import HistoryWrapper from 'components/History/styles';

const History = ({ debts }) => {
  const [showFullHistory, setShowFullHistory] = useState(false);

  const debtsToShow = showFullHistory ? debts : debts.slice(0, 10);
  return (
    <HistoryWrapper>
      <ul>
        {debtsToShow.map(debt => (
          <Debt key={debt.id} debt={debt} />
        ))}
      </ul>
      {!showFullHistory && (
      <Button
        className='is-inverted is-link is-fullwidth'
        onClick={() => setShowFullHistory(true)}
      >
        Mostrar historial completo
      </Button>
      )}
    </HistoryWrapper>
  );
};

History.propTypes = {
  debts: PropTypes.arrayOf(DebtShape).isRequired,
};

export default History;
