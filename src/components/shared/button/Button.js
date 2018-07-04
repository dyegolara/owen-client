import React from 'react'

// Para el MVP usaremos Bulma, después lo quitamos por estilos propios
export default ({ type, children, onClick, icon }) => (
  <button className={`button is-${type}`} onClick={onClick}>
    <span>
      <i className={icon} />
      {children}
    </span>
  </button>
)
