import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {BrowserRouter, Link, Route} from "react-router-dom";
import App from './App';
import {getById} from "../utils";

const Root = ({ store }) => (
  <BrowserRouter>
    <Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={App} store={store} />
        <Route path="/final-app" component={() => <div>test route</div>} />
        {/*FIXME: if path with movie will change to host/some/:id it will crash, because app.js is looked in host/some*/}
        <Route path="/:id" component = {Loader}/>
      </React.Fragment>
    </Provider>
  </BrowserRouter>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

//Use react hooks
const Child = ({data}) => {
  console.log("CHILD", data);
  return (
    <React.Fragment>
      {/*<span>some text, movie: {match.params.id ? match.params.id : '01'}</span>*/}
      <Link to="/"><button>Back Home</button></Link>
    </React.Fragment>
  );
};
const Loader = ({match}) => {
  let data = getById(match.params.id).then(i =>{console.log("data in loader from Promise",i); return i.data.message;} );
  return (<Child data={data}/>);
};


export default Root;
