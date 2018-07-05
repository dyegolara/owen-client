// Librerías
import React from 'react'
import { Link } from 'react-router-dom'

// Estilos
import styles from './Menu.module.scss'

export default class MenuItem extends React.PureComponent {
  render () {
    const { label, route, icon, location } = this.props
    return (
      <Link
        to={route}
        className={`${styles.item} ${
          location.pathname === route ? styles.activeItem : ''
        }`}
      >
        <i className={`mdi ${icon}`} />
        <span className={styles.label}>{label}</span>
      </Link>
    )
  }
}
