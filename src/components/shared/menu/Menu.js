// Librerías
import React from 'react'
import { withRouter } from 'react-router-dom'
// Componentes
import MenuItem from './MenuItem'
// Estilos
import styles from './Menu.module.scss'

export default withRouter(({ location, routes }) => (
  <div className={styles.wrapper}>
    {routes.map(item => (
      <MenuItem {...item} key={item.label} location={location} />
    ))}
  </div>
))
