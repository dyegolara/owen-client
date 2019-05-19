import React from 'react';
import PropTypes from 'prop-types';

import useAuth from 'hooks/useAuth';

const Total = ({ total }) => {
  const { getUserInfo } = useAuth();

  const getTotalLabel = () => {
    const { userId } = getUserInfo();
    if (total.amount === 0) return 'Debes';
    return total.to === userId ? 'Te deben' : 'Debes';
  };

  return (
    <div className='section flex-center'>
      <div className='level'>
        <div className='level-item has-text-centered'>
          <div>
            <p className='heading'>{getTotalLabel()}</p>
            <p className='title is-1'>
              {`$${total.amount}`}
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
