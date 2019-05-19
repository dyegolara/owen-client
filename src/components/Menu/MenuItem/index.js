// Librerías
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Estilos
import styles from './Menu.module.scss';

const MenuItem = ({
  label, route, icon, location: { pathname },
}) => (
  <Link
    to={route}
    className={`${styles.item} ${pathname === route ? styles.activeItem : ''}`}
  >
    <i className={`mdi ${icon}`} />
    <span className={styles.label}>{label}</span>
  </Link>
);

MenuItem.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  route: PropTypes.string,
  icon: PropTypes.string,
};

MenuItem.defaultProps = {
  label: '',
  route: '',
  icon: '',
};

export default MenuItem;
