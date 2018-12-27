import React from "react";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import {BrowserRouter, Link, Route} from "react-router-dom";
import App from "./App";
import {getById} from "../utils";
import axios from "axios";
import PATH from "../constants/path";

const Root = ({ store }) => (
  <BrowserRouter>
    <Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={App} store={store} />
        <Route path="/final-app" component={() => <div>test route</div>} />
        {/*FIXME: if path with movie will change to host/some/:id it will crash, because app.js is looked in host/some*/}
        <Route path="/:id" component = {RenderPropApproach} something="foo"/>
      </React.Fragment>
    </Provider>
  </BrowserRouter>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(this.props.url)
      .then(result => this.setState({
        data: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    return this.props.children(this.state);
  }
}

const RenderPropApproach = ({ data, isLoading, error }) =>
// TODO: id should come from props;
//Props come from Fetcher

  <Fetcher url={`${PATH}/${86}`}>
    {console.log('props', data, isLoading, error)}
    {({ data, isLoading, error }) => {
      if (!data) {
        return <p>No data yet ...</p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }
      let a = data && data.message;
      return (
        <React.Fragment>
          <Link to="/"><button>Back Home</button></Link>
          <ul>
            <li>{a.format}</li>
            <li>{a.release}</li>
            <li>{a.stars}</li>
            <li>{a.title}</li>
          </ul>
        </React.Fragment>
      );
    }}
  </Fetcher>;


export default Root;
