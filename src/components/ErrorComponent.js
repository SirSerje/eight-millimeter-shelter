import React from 'react';

const ErrorComponent = props => {
  const { message } = props;
  return <b>Error: {message}</b>;
};

export default ErrorComponent;
