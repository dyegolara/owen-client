import React from 'react'

// Para el MVP usaremos Bulma, después lo quitamos por estilos propios
export default ({
  type,
  children,
  onClick,
  icon,
  className = '',
  ariaLabel = ''
}) => (
  <button
    className={`button ${className} ${type ? `is-${type}` : ''}`}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {icon && (
      <span className='icon is-small'>
        <i className={`mdi mdi-${icon}`} />
      </span>
    )}
    {children}
  </button>
)
