import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';


const InputComponent = ({ name, type, onChange, label }) => (
  <input
    className="input-common"
    label={label}
    name={name}
    type={type}
    onChange={onChange}
  />
);

InputComponent.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default InputComponent;
