import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Debt from 'components/Debt';
import Button from 'components/Button';
import DebtShape from 'components/Debt/propTypes';
import * as S from './styles';

const History = ({ debts }) => {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const debtsToShow = showFullHistory ? debts : debts.slice(0, 10);

  return (
    <S.History>
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
    </S.History>
  );
};

History.propTypes = {
  debts: PropTypes.arrayOf(DebtShape).isRequired,
};

export default History;
