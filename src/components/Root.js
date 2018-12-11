import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <React.Fragment>
      <Route exact path="/" component={App} store={store} />
      <Route path="/final-app" component={() => <div>test route</div>} />
      <Route path="/movie/:id" component = {Child}/>
    </React.Fragment>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}


export default Root;
