import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Badge = ({ children }) => <span className="badge">{children}</span>;

Badge.propTypes = {
  children: PropTypes.node,
};


export default Badge;
