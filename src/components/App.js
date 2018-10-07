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
      byNameInput:'Furious',
      byActorInput:'Brooks',
      byIdInput:-1
    }

    this.initHandler = this.initHandler.bind(this);
    this.getAllHandler = this.getAllHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.deleteInputHandler = this.deleteInputHandler.bind(this);
    this.byNameInputHandler = this.byNameInputHandler.bind(this);
    this.byActorInputHandler = this.byActorInputHandler.bind(this);
    this.byNameHandler = this.byNameHandler.bind(this);
    this.byActorHandler = this.byActorHandler.bind(this);
    this.sortDownHandler = this.sortDownHandler.bind(this);
    this.sortUpHandler = this.sortUpHandler.bind(this);

  }

  componentDidMount() {
    this.props.getAll()
  }
  sortUpHandler() { this.props.sortUp() }
  sortDownHandler() { this.props.sortDown() }

  deleteInputHandler(event) { this.setState({deleteInput: event.target.value}); }
  byIdHandler(event) { this.setState({byIdInput: event.target.value}); }

  byNameInputHandler(event) { this.setState({byNameInput: event.target.value}); }
  byActorInputHandler(event) { this.setState({byActorInput: event.target.value}); }

  initHandler() {this.props.init()}
  getAllHandler() {this.props.getAll()}
  addHandler() {this.props.addNew(DEFAULT_MOVIE())}

  deleteHandler(item) {
    if(item) {
      this.props.movieDelete(item)
    }
  }

  byNameHandler() {
    this.props.searchByName(this.state.byNameInput)
  }
  byActorHandler() {
    this.props.searchByActor(this.state.byActorInput)
  }

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
          <button onClick={this.addHandler}>addNew</button>

          <br/>
          <button onClick={this.byActorHandler}>searchByActor</button>
          <input type="text" value={this.state.byActorInput} onChange={this.byActorInputHandler} />
          <button onClick={this.byNameHandler}>searchByName</button>
          <input type="text" value={this.state.byNameInput} onChange={this.byNameInputHandler} />

          <br/>

          <button onClick={this.sortDownHandler}>A-Z</button>
          <button onClick={this.sortUpHandler}>Z-A</button>

        </p>

        <span>List:</span>
        {/*FIXME: ID should be set properly, temporary hack*/}
        {/*{this.props.movies.movie  && <MovieDashboardComponent*/}
          {/*movieData={this.props.movies.movie}*/}
        {/*/>}*/}
        <div>{this.props.movies.movie && this.props.movies.movie.map(item =>{
          if(item ===null) {return}
         return <p key={item.id}>{item.id} - {item.title} - {item.release} -  {item.format} - {item.stars}
             <button onClick={() => this.deleteHandler(item.id)}>remove</button>
         </p>
          }
        )}
        </div>
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
    // addTodo: item => dispatch(actions.addTodo(item)),

    init: () => dispatch(actions.init()),
    getAll: () => dispatch(actions.movieGetAll()),
    getAllById: id => dispatch(actions.movieGetById(id)),
    addNew: body => dispatch(actions.movieAddNew(body)),
    movieDelete: id => dispatch(actions.movieDelete(id)),

    searchByName: name => dispatch(actions.searchByName(name)),
    searchByActor: name => dispatch(actions.searchByActor(name)),

    sortDown: () => dispatch(actions.sortDown()),
    sortUp: () => dispatch(actions.sortUp()),

    // updateExisting: (id, body) => dispatch(actions.movieUpdateExisting(id, body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
