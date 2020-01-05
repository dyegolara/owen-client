import React from 'react';
import PropTypes from 'prop-types';

const AmountInput = ({ onChange, value, isValid }) => (
  <div className='field'>
    <p className='control has-icons-left'>
      <input
        className={`input is-large ${isValid ? '' : 'is-danger'}`}
        type='number'
        onChange={onChange}
        value={value}
        placeholder='0'
        //  style={{textAlign: 'right'}}
      />
      <span className='icon is-left'>
        <i className='mdi mdi-currency-usd' />
      </span>
    </p>
    {!isValid && <p className='help is-danger'>La cantidad debe ser mayor a 0</p>}
  </div>
);

AmountInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isValid: PropTypes.bool,
};

AmountInput.defaultProps = {
  value: '',
  isValid: true,
};

export default AmountInput;
