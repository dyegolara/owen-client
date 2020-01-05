/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type,
  icon,
  className,
  ariaLabel,
  children,
  ...props
}) => (
  <button
    type={type}
    className={`button ${className}`}
    aria-label={ariaLabel}
    {...props}
  >
    {icon && (
      <span className='icon is-small'>
        <i className={`mdi mdi-${icon}`} />
      </span>
    )}
    {children && <span>{children}</span>}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  type: 'button',
  icon: '',
  className: '',
  ariaLabel: '',
  children: null,
};

export default Button;
