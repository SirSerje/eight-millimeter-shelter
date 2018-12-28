import React from "react";
import {Link} from "react-router-dom";

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
      <React.Fragment>
        <Link to="/">
          <button>Back Home</button>
        </Link>
        {this.props.children(this.state)}
      </React.Fragment>
    );
  }
}

export default DataFetcher;