import React from "react";
import PropTypes from "prop-types";
import * as S from "./styled";

const MenuItem = ({ label, route, icon, location: { pathname } }) => (
  <S.Item to={route} active={pathname === route}>
    <i className={`mdi ${icon}`} />
    <S.Label>{label}</S.Label>
  </S.Item>
);

MenuItem.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  label: PropTypes.string,
  route: PropTypes.string,
  icon: PropTypes.string
};

MenuItem.defaultProps = {
  label: "",
  route: "",
  icon: ""
};

export default MenuItem;
