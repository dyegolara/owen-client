import React from 'react';
import PropTypes from 'prop-types';

import useAuth from 'hooks/useAuth';
import { formatCurrency } from 'utils';

const YOU_OWE_THEM = 'Debes';
const THEY_OWE_YOU = 'Te deben';

const Total = ({ total: { amount, to } }) => {
  const { getUserInfo } = useAuth();

  const getTotalLabel = () => {
    const { userId } = getUserInfo();
    if (amount === 0) return YOU_OWE_THEM;
    return to === userId ? YOU_OWE_THEM : THEY_OWE_YOU;
  };

  return (
    <div className='section flex-center'>
      <div className='level'>
        <div className='level-item has-text-centered'>
          <div>
            <p className='heading'>{getTotalLabel()}</p>
            <p className='title is-1'>
              {formatCurrency(amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Total.propTypes = {
  total: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
};

export default Total;
