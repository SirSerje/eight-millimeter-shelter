import React from 'react';
import { useState, useEffect } from 'react';
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

function Index (props) {
  const [byNameInput, setbyNameInput] = useState('');
  const [byActorInput, setbyActorInput] = useState('');
  // const [byIdInput, setbyIdInput] = useState(-1);

  const [addItem, setAddItem] = useState({
    title: '',
    release: '',
    format: '',
    stars: '',
  });

  const addNewHandler = event => {
    let fieldType = event.target.name;
    let temp = addItem;

    temp[fieldType] = event.target.value;

    setAddItem({addItem: temp});
  };

  const byNameInputHandler = event => {
    setbyNameInput(event.target.value);
  };

  const byActorInputHandler = event => {
    setbyActorInput(event.target.value);
  };

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
  } = props;

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
            {props.block === 1 ? (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => addHandler(addItem)}
                disabled
              >
                  addNew
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => addHandler(addItem)}
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
              value={addItem.title}
              onChange={addNewHandler}
            />
            <TextField
              id="standard-name"
              label="release date"
              name="release"
              type="number"
              value={addItem.release}
              onChange={addNewHandler}
            />{' '}
            <br />
            <TextField
              id="standard-name"
              label="format"
              name="format"
              type="text"
              value={addItem.format}
              onChange={addNewHandler}
            />
            <TextField
              id="standard-name"
              label="stars"
              name="stars"
              type="text"
              value={addItem.stars}
              onChange={addNewHandler}
            />
          </div>{' '}
          <div className={classes.column}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => byActorHandler(byActorInput)}
            >
                searchByActor
            </Button>
            <TextField
              id="standard-name"
              label="actor's name"
              type="text"
              value={byActorInput}
              onChange={byActorInputHandler}
            />{' '}
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => byNameHandler(byNameInput)}
            >
                searchByName
            </Button>
            <TextField
              id="standard-name"
              label="film's name"
              type="text"
              value={byNameInput}
              onChange={byNameInputHandler}
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

export default withStyles(styles)(Index);
