import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../../styles/index.scss';
import parseTextFile from '../../utils/fileParser';
import PropTypes from 'prop-types';
import ControlMenuComponent from '../ControlMenuComponent';
import autobind from 'class-autobind';
import MovieItemComponent from '../MovieItemComponent';
import uuidv4 from 'uuid/v4';
import ErrorComponent from '../ErrorComponent';


class Index extends Component {
  constructor(params) {
    super(params);
    autobind(this);
  }

  componentDidMount() {
    this.props.getAll();
  }

  sortUpHandler() {
    this.props.sortUp();
  }

  sortDownHandler() {
    this.props.sortDown();
  }


  initHandler() {
    this.props.init();
  }

  getAllHandler() {
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

  deleteHandler(item) {
    if (item) {
      this.props.movieDelete(item);
    }
  }

  byNameHandler(value) {
    this.props.searchByName(value);
  }

  byActorHandler(value) {
    this.props.searchByActor(value);
  }

  uploadHandler(item) {
    this.props.uploadHandler(item);
  }

  handleFiles(files) {
    const reader = new FileReader();
    reader.onload = function (file) {
      const splitted = file.srcElement.result.split('\n');
      this.props.uploadHandler({ movie: parseTextFile(splitted) });
    }.bind(this);
    reader.readAsText(files[0]);
  }

  render() {
    const { movies, errors } = this.props;
    return (
      <div className="app-main">
        <ControlMenuComponent
          initHandler={this.initHandler}
          getAllHandler={this.getAllHandler}
          addHandler={this.addHandler}
          byNameHandler={this.byNameHandler}
          sortDownHandler={this.sortDownHandler}
          sortUpHandler={this.sortUpHandler}
          handleFiles={this.handleFiles}
          byActorHandler={this.byActorHandler}
        />

        <div>
          {errors && errors.map(
            err => <ErrorComponent key={uuidv4()} message={err.message} />,
          )}
        </div>

        {movies.size
        && movies.map(item => {
          if (item === null) {
            return <b>empty</b>;
          }
          return (
            <MovieItemComponent
              key={item.id}
              id={item.id}
              title={item.title}
              release={item.release}
              format={item.format}
              stars={item.stars}
              deleteHandler={this.deleteHandler}
            />
          );
        })}
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
  movieDelete: PropTypes.func,
  searchByName: PropTypes.func,
  searchByActor: PropTypes.func,
  sortDown: PropTypes.func,
  sortUp: PropTypes.func,
  uploadHandler: PropTypes.func,
  // TODO: fix this:

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
