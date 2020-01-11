import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class DataFetcher extends React.Component {
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
    const { url, method } = this.props;
    method(url)
      .then(result => this.setState({
        data: result.data,
        isLoading: false,
      }))
      .catch(error => this.setState({
        error,
        isLoading: false,
      }));
  }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Link to="/">
          <button>Back Home</button>
        </Link>
        {children(this.state)}
      </React.Fragment>
    );
  }
}

DataFetcher.propTypes = {
  children: PropTypes.any,
};

DataFetcher.defaultProps = {
  children: () => {},
};

export default DataFetcher;
