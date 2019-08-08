import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import RenderPropApproach from './DataFetcher/FetcherApproach';

const Root = ({ store }) => (
  <BrowserRouter>
    <Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={App} store={store} />
        <Route path="/final-app" component={() => <div>test route</div>} />
        {/* FIXME: if path with movie will change to host/some/:id it will crash, because app.js is looked in host/some */}
        <Route path="/:id" component={RenderPropApproach} something="foo" />
      </React.Fragment>
    </Provider>
  </BrowserRouter>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
