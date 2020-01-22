import React, { useState } from 'react';
import '../../styles/index.scss';
import ReactFileReader from 'react-file-reader';
import PropTypes from 'prop-types';
import ButtonComponent from '../../ButtonComponent';
import InputComponent from '../../InputComponent';

const Index = props => {
  const [byNameInputComponent, setByNameInputComponent] = useState('');
  const [byActorInputComponent, setByActorInputComponent] = useState('');
  const [title, setTitle] = useState('');
  const [release, setRelease] = useState('');
  const [format, setFormat] = useState('');
  const [stars, setStars] = useState('');

  const {
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
      <div>
        <ButtonComponent
          type="submit"
          onClick={initHandler}
        >init
        </ButtonComponent>
        <ButtonComponent
          type="submit"
          onClick={getAllHandler}
        > getAll
        </ButtonComponent>
        {props.block === 1 ? (
          <ButtonComponent
            type="submit"
            onClick={() => addHandler({
              title, release, format, stars,
            })}
            disabled
          >
            addNew
          </ButtonComponent>
        ) : (
          <ButtonComponent
            type="submit"
            onClick={() => addHandler({
              title, release, format, stars,
            })}
          >
            addNew
          </ButtonComponent>
        )}
        <br />
        <InputComponent
          label="name"
          name="title"
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
        <InputComponent
          name="release"
          type="number"
          onChange={e => setRelease(e.target.value)}
        />
        <br />
        <InputComponent
          name="format"
          type="text"
          onChange={e => setFormat(e.target.value)}
        />
        <InputComponent
          name="stars"
          type="text"
          onChange={e => setStars(e.target.value)}
        />
      </div>

      <div>
        <ButtonComponent
          type="submit"
          onClick={() => byActorHandler(byActorInputComponent)}
        >
          searchByActor
        </ButtonComponent>
        <InputComponent
          type="text"
          onChange={e => setByActorInputComponent(e.target.value)}
        />
        <br />
        <ButtonComponent
          onClick={() => byNameHandler(byNameInputComponent)}
        >
          searchByName
        </ButtonComponent>
        <InputComponent
          id="standard-name"
          type="text"
          onChange={e => setByNameInputComponent(e.target.value)}
        />
        <br />
        <ButtonComponent type="submit" onClick={sortDownHandler}>
          ↑
        </ButtonComponent>
        <ButtonComponent type="submit" onClick={sortUpHandler}>f
          ↓
        </ButtonComponent>
      </div>
      <div>

        <ReactFileReader
          fileTypes={['.txt']}
          handleFiles={handleFiles}
          multipleFiles={false}
        >
          <ButtonComponent type="submit">
            Upload
          </ButtonComponent>
        </ReactFileReader>
      </div>
    </div>
  );
};

Index.propTypes = {
  addHandler: PropTypes.func,
  byNameHandler: PropTypes.func,
  sortDownHandler: PropTypes.func,
  sortUpHandler: PropTypes.func,
  handleFiles: PropTypes.func,
  initHandler: PropTypes.func,
  getAllHandler: PropTypes.func,
  byActorHandler: PropTypes.func,
};

export default Index;
