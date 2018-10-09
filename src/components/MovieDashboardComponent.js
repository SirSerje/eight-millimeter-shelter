import React, { Component } from 'react';
import MovieCardComponent from './MovieCardComponent';

class MovieDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.movieData;
    console.log(data);
    return (
      <div className="movie-dashboard">
        {data.length >= 1 &&
          data.map((item, idx) => {
            return (
              <MovieCardComponent
                key={idx}
                idx={idx}
                format={item.format}
                release={item.release}
                stars={item.stars}
                title={item.title}
              />
            );
          })}
      </div>
    );
  }
}

export default MovieDashboardComponent;
