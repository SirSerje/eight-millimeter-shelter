import React, {Component} from 'react';
import logo from './../logo.svg';
import * as actions from "../actions";
import './../App.css';
import {connect} from "react-redux";


class App extends Component {

  constructor(params) {
    super(params)
    this.state = {movies: {}}

    this.initHandler = this.initHandler.bind(this);
    this.getAllHandler = this.getAllHandler.bind(this);
    this.getByIdHandler = this.getByIdHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  initHandler() {this.props.init()}
  getAllHandler() {this.props.getAll()}
  getByIdHandler() {this.props.getAllById(15)}
  addHandler() {this.props.addNew({foo:'bar'})}
  deleteHandler() {this.props.deleteHandler(13)}
  updateHandler() {this.props.updateExisting(15, {foo:'bar'})}

  render() {
    return (
      <div className="App">
       {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>*/}
        <p>
            Edit <code>src/App.js</code> and save to reload.
            8mm📽
          </p>
        <p>
          <button onClick={this.initHandler}>init</button>
          <button onClick={this.getAllHandler}>getAll</button>
          <button onClick={this.getByIdHandler}>getAllById</button>
          <button onClick={this.addHandler}>addNew</button>
          <button onClick={this.deleteHandler}>movieDelete</button>
          <button onClick={this.updateHandler}>updateExisting</button>


        </p>
         {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {movies: state.movies}
}

const mapDispatchToProps = dispatch => {
  console.log('mapDispatchToProps called');
  return ({
    addTodo: item => dispatch(actions.addTodo(item)),

    init: () => dispatch(actions.init()),
    getAll: () => dispatch(actions.movieGetAll()),
    getAllById: id => dispatch(actions.movieGetById(id)),
    addNew: body => dispatch(actions.movieAddNew(body)),
    movieDelete: id => dispatch(actions.movieDelete(id)),
    updateExisting: (id, body) => dispatch(actions.movieUpdateExisting(id, body)),
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
