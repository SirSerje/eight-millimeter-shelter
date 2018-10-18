import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../styles/index.scss';
import ReactFileReader from 'react-file-reader';
import parseTextFile from '../utils/fileParser';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class App extends Component {
  constructor(params) {
    super(params);
    this.state = {
      byNameInput: '',
      byActorInput: '',
      byIdInput: -1,
      addItem: {
        title: '',
        release: '',
        format: '',
        stars: '',
      },
    };

    this.initHandler = this.initHandler.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.getAllHandler = this.getAllHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteInputHandler = this.deleteInputHandler.bind(this);
    this.byNameInputHandler = this.byNameInputHandler.bind(this);
    this.byActorInputHandler = this.byActorInputHandler.bind(this);
    this.byNameHandler = this.byNameHandler.bind(this);
    this.byActorHandler = this.byActorHandler.bind(this);
    this.sortDownHandler = this.sortDownHandler.bind(this);
    this.sortUpHandler = this.sortUpHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    //add new inputs:
    this.addNewHandler = this.addNewHandler.bind(this);
  }

  addNewHandler(event) {
    let fieldType = event.target.name;
    let temp = this.state.addItem;

    temp[fieldType] = event.target.value;
    this.setState({ addItem: temp });
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

  byNameInputHandler(event) {
    this.setState({ byNameInput: event.target.value });
  }

  byActorInputHandler(event) {
    this.setState({ byActorInput: event.target.value });
  }

  initHandler() {
    this.props.init();
  }

  getAllHandler() {
    this.props.getAll();
  }

  addHandler() {
    let item = this.state.addItem;
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

  byNameHandler() {
    this.props.searchByName(this.state.byNameInput);
  }

  byActorHandler() {
    this.props.searchByActor(this.state.byActorInput);
  }

  uploadHandler(item) {
    this.props.uploadHandler(item);
  }

  handleFiles(files) {
    const reader = new FileReader();
    reader.onload = function(file) {
      this.props.uploadHandler({ movie: parseTextFile(file) });
    }.bind(this);
    reader.readAsText(files[0]);
  }

  render() {
    const { classes } = this.props;

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

        <div>
          <b>API methods:</b>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={this.initHandler}
          >
            init
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={this.getAllHandler}
          >
            getAll
          </Button>
          <br />
          {this.props.block === 1 ? (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={this.addHandler}
              disabled
            >
              addNew
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={this.addHandler}
            >
              addNew
            </Button>
          )}
          <TextField
            id="standard-name"
            label="name"
            name="title"
            type="text"
            value={this.state.addItem.title}
            onChange={this.addNewHandler}
          />
          <TextField
            id="standard-name"
            label="release date"
            name="release"
            type="number"
            value={this.state.addItem.release}
            onChange={this.addNewHandler}
          />
          <TextField
            id="standard-name"
            label="format"
            name="format"
            type="text"
            value={this.state.addItem.format}
            onChange={this.addNewHandler}
          />
          <TextField
            id="standard-name"
            label="stars"
            name="stars"
            type="text"
            value={this.state.addItem.stars}
            onChange={this.addNewHandler}
          />
          <br />
          <Button variant="outlined" color="primary" onClick={this.byActorHandler}>
            searchByActor
          </Button>
          <TextField
            id="standard-name"
            label="actor's name"
            type="text"
            value={this.state.byActorInput}
            onChange={this.byActorInputHandler}
          />
          <Button variant="outlined" color="primary" onClick={this.byNameHandler}>
            searchByName
          </Button>
          <TextField
            id="standard-name"
            label="film's name"
            type="text"
            value={this.state.byNameInput}
            onChange={this.byNameInputHandler}
          />
          <br />
          <Button variant="outlined" color="secondary" onClick={this.sortDownHandler}>
            ↑
          </Button>
          <Button variant="outlined" color="secondary" onClick={this.sortUpHandler}>
            ↓
          </Button>
        </div>

        <ReactFileReader fileTypes={['.txt']} handleFiles={this.handleFiles} multipleFiles={false}>
          <button style={{ background: 'gray' }}>Upload</button>
        </ReactFileReader>

        <span>Errors:</span>
        <div>
          {' '}
          {this.props.errors &&
            this.props.errors.map(err => (
              <p key={Math.round(Math.random() * 20000)}>{err.message}</p>
            ))}
        </div>

        <span>List:</span>
        <div>
          {this.props.movies.length &&
            this.props.movies.map(item => {
              if (item === null) {
                return <b>empty</b>;
              }
              return (
                <p key={item.id}>
                  {item.id} - {item.title} - {item.release} - {item.format} - {item.stars}
                  <button onClick={() => this.deleteHandler(item.id)}>remove</button>
                </p>
              );
            })}
        </div>
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

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const combinedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default withStyles(styles)(combinedApp);
