import React from 'react';
import { useState } from 'react';
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

const Index = props => {
  const [byNameInput, setByNameInput] = useState('');
  const [byActorInput, setByActorInput] = useState('');
  const [title, setTitle] = useState('');
  const [release, setRelease] = useState('');
  const [format, setFormat] = useState('');
  const [stars, setStars] = useState('');

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
                onClick={() => addHandler({title, release, format, stars})}
                disabled
              >
                  addNew
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => addHandler({title, release, format, stars})}
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
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              id="standard-name"
              label="release date"
              name="release"
              type="number"
              onChange={e => setRelease(e.target.value)}
            />{' '}
            <br />
            <TextField
              id="standard-name"
              label="format"
              name="format"
              type="text"
              onChange={e => setFormat(e.target.value)}
            />
            <TextField
              id="standard-name"
              label="stars"
              name="stars"
              type="text"
              onChange={e => setStars(e.target.value)}
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
              onChange={e => setByActorInput(e.target.value)}
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
              onChange={ e => setByNameInput(e.target.value) }
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
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(Index);
