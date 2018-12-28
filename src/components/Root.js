import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import App from './App';
import { getById } from '../utils';

const Root = ({ store }) => (
  <BrowserRouter>
    <Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={App} store={store} />
        <Route path="/final-app" component={() => <div>test route</div>} />
        {/*FIXME: if path with movie will change to host/some/:id it will crash, because app.js is looked in host/some*/}
        <Route path="/:id" component={RenderPropApproach} something="foo" />
      </React.Fragment>
    </Provider>
  </BrowserRouter>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

const RenderPropApproach = ({ data, isLoading, error }) => (
  <Fetcher url={86}>
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

      if (data && data.message) {
        const { release, stars, title, format } = data.message;
        return (
          <div>
            {`${title} (${release}) ${format}`}
            <p>
              stars:
              {stars.length > 0 && stars.map(i => <span>{i} </span>)}
            </p>
          </div>
        );
      }

      return (
        <p>unfortunately, no data, smth happened</p>
      );
    }}
  </Fetcher>
);

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

    getById(this.props.url)
      .then(result =>
        this.setState({
          data: result.data,
          isLoading: false,
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    return (
      <div>
        <Link to="/">
          <button>Back Home</button>
        </Link>
        {this.props.children(this.state)}
      </div>
    );
  }
}

export default Root;
