import React, { Component } from 'react';
import '../styles/index.scss';
import ReactFileReader from 'react-file-reader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

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

class ControlMenuComponent extends Component {
  constructor(params) {
    super(params);
    let temp;
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
    this.byNameInputHandler = this.byNameInputHandler.bind(this);
    this.byActorInputHandler = this.byActorInputHandler.bind(this);
    this.addNewHandler = this.addNewHandler.bind(this);
  }
  addNewHandler(event) {
    let fieldType = event.target.name;
    let temp = this.state.addItem;

    temp[fieldType] = event.target.value;
    this.setState({ addItem: temp });
  }

  byNameInputHandler(event) {
    this.setState({ byNameInput: event.target.value });
  }

  byActorInputHandler(event) {
    this.setState({ byActorInput: event.target.value });
  }
  render() {
    const {
      classes,
      addHandler,
      byNameHandler,
      sortDownHandler,
      sortUpHandler,
      handleFiles,
      initHandler,
      getAllHandler,
      byActorHandler,
    } = this.props;
    return (
      <div>
        <div>
          <b>API methods:</b>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={initHandler}
          >
            init
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={getAllHandler}
          >
            getAll
          </Button>
          <br />
          {this.props.block === 1 ? (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => addHandler(this.state.addItem)}
              disabled
            >
              addNew
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => addHandler(this.state.addItem)}
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
          <Button variant="outlined" color="primary" onClick={()=>byActorHandler(this.state.byActorInput)}>
            searchByActor
          </Button>
          <TextField
            id="standard-name"
            label="actor's name"
            type="text"
            value={this.state.byActorInput}
            onChange={this.byActorInputHandler}
          />
          <Button variant="outlined" color="primary" onClick={()=>byNameHandler(this.state.byNameInput)}>
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
          <Button variant="outlined" color="secondary" onClick={sortDownHandler}>
            ↑
          </Button>
          <Button variant="outlined" color="secondary" onClick={sortUpHandler}>
            ↓
          </Button>
        </div>

        <ReactFileReader fileTypes={['.txt']} handleFiles={handleFiles} multipleFiles={false}>
          <button style={{ background: 'gray' }}>Upload</button>
        </ReactFileReader>
      </div>
    );
  }
}

export default withStyles(styles)(ControlMenuComponent);
