import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import MenuItem from "components/Menu/MenuItem";
import * as S from "./styled";

function Menu({ location, routes }) {
  return (
    <S.Menu>
      {routes.map(item => (
        <MenuItem {...item} key={item.label} location={location} />
      ))}
    </S.Menu>
  );
}

Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      route: PropTypes.string,
      icon: PropTypes.string
    })
  )
};

Menu.defaultProps = {
  routes: []
};

export default withRouter(Menu);
