import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../styles/index.scss';
import ReactFileReader from 'react-file-reader';
import parseTextFile from '../utils/fileParser';

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
    return (
      <div className="App">
        <p>
          Edit <code>src/App.js</code> and save to reload. 8mm📽
        </p>
        <p>
          <b>API methods:</b>
          <button onClick={this.initHandler}>init</button>
          <button onClick={this.getAllHandler}>getAll</button>
          <br />
          {this.props.block === 1 ? (
            <button onClick={this.addHandler} disabled>
              addNew
            </button>
          ) : (
            <button onClick={this.addHandler}>addNew</button>
          )}
          <input
            name="title"
            type="text"
            value={this.state.addItem.title}
            onChange={this.addNewHandler}
          />
          <input
            name="release"
            type="number"
            value={this.state.addItem.release}
            onChange={this.addNewHandler}
          />
          <input
            name="format"
            type="text"
            value={this.state.addItem.format}
            onChange={this.addNewHandler}
          />
          <input
            name="stars"
            type="text"
            value={this.state.addItem.stars}
            onChange={this.addNewHandler}
          />
          <br />
          <button onClick={this.byActorHandler}>searchByActor</button>
          <input type="text" value={this.state.byActorInput} onChange={this.byActorInputHandler} />
          <button onClick={this.byNameHandler}>searchByName</button>
          <input type="text" value={this.state.byNameInput} onChange={this.byNameInputHandler} />
          <br />
          <button onClick={this.sortDownHandler}>↑</button>
          <button onClick={this.sortUpHandler}>↓</button>
        </p>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
