import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type,
  icon,
  className,
  ariaLabel,
  ...props
}) => (
  <button
    type='button'
    className={`button ${className} ${type ? `is-${type}` : ''}`}
    aria-label={ariaLabel}
    {...props}
  >
    {icon && (
      <span className='icon is-small'>
        <i className={`mdi mdi-${icon}`} />
      </span>
    )}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

Button.defaultProps = {
  type: '',
  icon: '',
  className: '',
  ariaLabel: '',
};

export default Button;
