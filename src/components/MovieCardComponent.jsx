import React, { Component } from 'react';

class MovieCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="movie-dashboard__card">
        <ul>
          <li>{this.props.title}</li>
          <li>{this.props.format}</li>
          <li>{this.props.release}</li>
          <li>{this.props.stars}</li>
        </ul>
      </div>
    );
  }
}

export default MovieCardComponent;
