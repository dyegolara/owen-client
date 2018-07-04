import React from 'react'

// Para el MVP usaremos Bulma, después lo quitamos por estilos propios
export default ({ type, children, onClick, icon, className }) => (
  <button className={`button is-${type} ${className}`} onClick={onClick}>
    <span className='icon'>
      <i className={`mdi mdi-${icon}`} />
    </span>
    <span>{children}</span>
  </button>
)
