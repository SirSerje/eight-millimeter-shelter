import React, {Component} from 'react';
import * as actions from "../actions";
import './../App.css';
import {connect} from "react-redux";
import DEFAULT_MOVIE from "../constants/defaultMovie";
import MovieDashboardComponent from "./MovieDashboardComponent";
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  constructor(params) {
    super(params)
    this.state = {
      deleteInput:-1,
      updateInput:-1,
      byIdInput:-1
    }

    this.initHandler = this.initHandler.bind(this);
    this.getAllHandler = this.getAllHandler.bind(this);
    this.getByIdHandler = this.getByIdHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.deleteInputHandler = this.deleteInputHandler.bind(this);
    this.updateInputHandler = this.updateInputHandler.bind(this);
    this.byIdHandler = this.byIdHandler.bind(this);
  }

  componentDidMount() {
    this.props.getAll()
  }

  deleteInputHandler(event) { this.setState({deleteInput: event.target.value}); }
  updateInputHandler(event) { this.setState({updateInput: event.target.value}); }
  byIdHandler(event) { this.setState({byIdInput: event.target.value}); }

  initHandler() {this.props.init()}
  getAllHandler() {this.props.getAll()}
  getByIdHandler() {this.props.getAllById(0)}
  addHandler() {this.props.addNew(DEFAULT_MOVIE())}
  deleteHandler() {this.props.movieDelete(this.state.deleteInput)}
  updateHandler() {this.props.updateExisting(0, DEFAULT_MOVIE())}

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
          <b>API methods:</b>

          <button onClick={this.initHandler}>init</button>
          <button onClick={this.getAllHandler}>getAll</button>
          <button onClick={this.getByIdHandler}>getAllById</button>
          <input type="text" value={this.state.byIdInput} onChange={this.byIdHandler} />
          <button onClick={this.addHandler}>addNew</button>
          <button onClick={this.deleteHandler}>movieDelete</button>
          <input type="text" value={this.state.deleteInput} onChange={this.deleteInputHandler} />
          <button onClick={this.updateHandler}>updateExisting</button>
          <input type="text" value={this.state.updateInput} onChange={this.updateInputHandler} />

        </p>

        <span>List:</span>
        {/*FIXME: ID should be set properly, temporary hack*/}
        {console.log('on render >>>>',this.props.movies.movie)}
        {this.props.movies.movie  && <MovieDashboardComponent
          movieData={this.props.movies.movie}
        />}
        <div>{this.props.movies.movie && this.props.movies.movie.map(item =>{
          console.log('MAP', item)
          if(item ===null) {return}
         return <p key={Math.round(Math.random()*20000)}>{item.title} - {item.release} -  {item.format} - {item.stars}</p>
          }
        )}</div>
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

const mapStateToProps = state => {
  //state.XX, where XX depends on reducer name
  // console.log("mapStateToProps", state)
  return {movies: state.getAll}
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: item => dispatch(actions.addTodo(item)),

    init: () => dispatch(actions.init()),
    getAll: () => dispatch(actions.movieGetAll()),
    getAllById: id => dispatch(actions.movieGetById(id)),
    addNew: body => dispatch(actions.movieAddNew(body)),
    movieDelete: id => dispatch(actions.movieDelete(id)),

    updateExisting: (id, body) => dispatch(actions.movieUpdateExisting(id, body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
