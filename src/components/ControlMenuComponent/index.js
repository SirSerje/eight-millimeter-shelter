import React, { Component } from 'react';
import '../../styles/index.scss';
import ReactFileReader from 'react-file-reader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './styles';


class Index extends Component {
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
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>Expand</Typography>
            </div>
            {/*<div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Use controls to operate with API stuff</Typography>
            </div>*/}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
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
              <br />
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
              />{' '}
              <br />
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
            </div>{' '}
            <div className={classes.column}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => byActorHandler(this.state.byActorInput)}
              >
                searchByActor
              </Button>
              <TextField
                id="standard-name"
                label="actor's name"
                type="text"
                value={this.state.byActorInput}
                onChange={this.byActorInputHandler}
              />{' '}
              <br />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => byNameHandler(this.state.byNameInput)}
              >
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
            </div>{' '}
            <div className={classes.column}>
              <ReactFileReader fileTypes={['.txt']} handleFiles={handleFiles} multipleFiles={false}>
                <Button variant="outlined" color="secondary">
                  Upload
                </Button>
              </ReactFileReader>
            </div>
          </ExpansionPanelDetails>
          {/* <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
              Save
            </Button>
          </ExpansionPanelActions>*/}
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Index);