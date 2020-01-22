import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ButtonComponent = ({ children, onClick }) => (
  <button className="button-control" type="submit" onClick={onClick}>{children}</button>
);

ButtonComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  onClick: PropTypes.func,
};
export default ButtonComponent;
