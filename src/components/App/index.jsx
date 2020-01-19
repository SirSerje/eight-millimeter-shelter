import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import * as actions from '../../actions';
import '../../styles/index.scss';
import parseTextFile from '../../utils/fileParser';
import PropTypes from 'prop-types';
import ControlMenuComponent from '../ControlMenuComponent';
import autobind from 'class-autobind';
import MovieItemComponent from '../MovieItemComponent';
import ErrorComponent from '../Error';


class Index extends Component {
  constructor(params) {
    super(params);
    autobind(this);
  }

  componentDidMount() {
    this.props.getAll();
  }

  addHandler(value) {
    const item = value;
    item.stars = !Array.isArray(item.stars)
      ? item.stars.split(', ')
      : item.stars;
    const isAllowed = item.title !== '' && item.release >= 0 && item.stars.length > 0
      && item.format !== '';

    if (isAllowed) {
      this.props.addNew(item);
    } else {
      console.warn('check input fields and than try again');
    }
  }

  handleFiles(files) {
    const reader = new FileReader();
    reader.onload = function (file) {
      const splitted = file.srcElement.result.split('\n');
      this.props.uploadHandler({ movie: parseTextFile(splitted) });
    }.bind(this);
    reader.readAsText(files[0]);
  }

  moviesRenderer = param => {
    const movies = Object.values(param);
    console.log('___', param);
    return movies && movies.length > 0 && movies.map((item, idx) => {
      if (!item || !item.id) {
        return <b>empty</b>;
      }
      return (
        <MovieItemComponent
          idx={idx}
          key={item.id}
          id={item.id}
          title={item.title}
          release={item.release}
          format={item.format}
          stars={item.stars}
          deleteHandler={this.props.movieDelete}
        />
      );
    });
  };

  // In this app we can get only 1 error per moment
  errorsRenderer = errors => (
    <>
      {errors && errors.error && <ErrorComponent message={errors.error} />}
    </>
  );

  render() {
    const {
      movies, errors, getAll, init, sortDown, sortUp, searchByActor, searchByName,
    } = this.props;
    return (
      <div className="app-main">
        <ControlMenuComponent
          initHandler={init}
          getAllHandler={getAll}
          addHandler={this.addHandler}
          byNameHandler={searchByName}
          sortDownHandler={sortDown}
          sortUpHandler={sortUp}
          handleFiles={this.handleFiles}
          byActorHandler={searchByActor}
        />

        <div className="errors-container">
          {this.errorsRenderer(errors)}
        </div>
        <div className="movies-container">
          {this.moviesRenderer(movies)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(actions.init()),

  getAll: () => dispatch(actions.movieGetAll()),
  addNew: body => dispatch(actions.movieAddNew(body)),
  movieDelete: id => dispatch(actions.movieDelete(id)),

  searchByName: name => dispatch(actions.searchByName(name)),
  searchByActor: name => dispatch(actions.searchByActor(name)),

  sortDown: () => dispatch(actions.sortDown()),
  sortUp: () => dispatch(actions.sortUp()),

  uploadHandler: data => dispatch(actions.upload(data)),
});

Index.propTypes = {
  init: PropTypes.func,
  getAll: PropTypes.func,
  addNew: PropTypes.func,
  searchByName: PropTypes.func,
  searchByActor: PropTypes.func,
  movieDelete: PropTypes.func,
  sortDown: PropTypes.func,
  sortUp: PropTypes.func,
  uploadHandler: PropTypes.func,
  // TODO: fix this:
  // eslint-disable-next-line react/forbid-prop-types
  movies: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  // movies: PropTypes.arrayOf(PropTypes.shape({
  //   format: PropTypes.string,
  //   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   release: PropTypes.number,
  //   title: PropTypes.string,
  //   stars: PropTypes.arrayOf(PropTypes.string),
  // })),
  // errors: PropTypes.any,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
