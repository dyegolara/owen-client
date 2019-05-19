// Librerías
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// Componentes
import MenuItem from 'shared/menu/MenuItem';
// Estilos
import styles from './Menu.module.scss';

const Menu = ({ location, routes }) => (
  <div className={styles.wrapper}>
    {routes.map(item => (
      <MenuItem {...item} key={item.label} location={location} />
    ))}
  </div>
);

Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    icon: PropTypes.string,
  })),
};

Menu.defaultProps = {
  routes: [],
};

export default withRouter(Menu);
