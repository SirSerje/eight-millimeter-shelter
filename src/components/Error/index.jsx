import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ErrorComponent = ({ message }) => (
  <div className="error">
    <span className="error-message">
      {message}
    </span>
  </div>
);

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorComponent;
