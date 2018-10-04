import React, {Component} from 'react';
import logo from './../logo.svg';
import * as actions from "../actions";
import './../App.css';
import {connect} from "react-redux";


class App extends Component {
  constructor(params) {
    super(params)
    this.state = {todos: undefined}
  }

  componentDidMount() {
    this.props.addTodo()
  }

  render() {
    return (
      <div className="App">
       {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>*/}
        {console.log('render:', this.state.todos)}
        <p>
            Edit <code>src/App.js</code> and save to reload.
            8mm📽
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
  console.log('mapStateToProps', state);
  return {todos: state.todos}
}

const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(actions.addTodo(item)),

  init: item => dispatch(actions.init(item)),
  getAll: item => dispatch(actions.movieGetAll(item)),
  getAllById: item => dispatch(actions.movieGetById(item)),
  addNew: item => dispatch(actions.movieAddNew(item)),
  movieDelete: item => dispatch(actions.movieDelete(item)),
  updateExisting: item => dispatch(actions.movieUpdateExisting(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
