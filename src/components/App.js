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
        {console.log('render:', this.state.todos)}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
            8mm📽
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  console.log('mapStateToProps', state);
  return {todos: state.todos}
}

const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(actions.addTodo(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
