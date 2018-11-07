import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import '../../styles/index.scss';
import parseTextFile from '../../utils/fileParser';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ControlMenuComponent from '../ControlMenuComponent';
import autobind from 'class-autobind';
import MovieItemComponent from '../MovieItemComponent';
import uuidv4 from 'uuid/v4';
import ErrorComponent from '../ErrorComponent';
import styles from './styles';

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

  deleteInputHandler(event) {
    this.setState({ deleteInput: event.target.value });
  }

  initHandler() {
    this.props.init();
  }

  getAllHandler() {
    this.props.getAll();
  }

  addHandler(value) {
    let item = value;
    item.stars = !Array.isArray(item.stars) ? item.stars.split(', ') : item.stars;
    let isAllowed =
      item.title !== '' && item.release >= 0 && item.stars.length > 0 && item.format !== '';

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
    reader.onload = function(file) {
      let splitted = file.srcElement.result.split('\n');
      this.props.uploadHandler({ movie: parseTextFile(splitted) });
    }.bind(this);
    reader.readAsText(files[0]);
  }

  render() {
    const { classes } = this.props;
    // const bull = <span className={classes.bullet}>•</span>;
    return (
      <div className="app-main">
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Edit <code>src/App.js</code> and save to reload. 8mm📽
            </Typography>
          </Toolbar>
        </AppBar>
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
          {this.props.errors &&
            this.props.errors.map(err => <ErrorComponent key={uuidv4()} message={err.message} />)}
        </div>

        <Grid container className={classes.root}>
          {this.props.movies.length &&
            this.props.movies.map(item => {
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
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.getAll,
    block: state.blockAddNew,
    errors: state.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => dispatch(actions.init()),

    getAll: () => dispatch(actions.movieGetAll()),
    addNew: body => dispatch(actions.movieAddNew(body)),
    movieDelete: id => dispatch(actions.movieDelete(id)),

    searchByName: name => dispatch(actions.searchByName(name)),
    searchByActor: name => dispatch(actions.searchByActor(name)),

    sortDown: () => dispatch(actions.sortDown()),
    sortUp: () => dispatch(actions.sortUp()),

    uploadHandler: data => dispatch(actions.upload(data)),
  };
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const combinedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
export default withStyles(styles)(combinedApp);
