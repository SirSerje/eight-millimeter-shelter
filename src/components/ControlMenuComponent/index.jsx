import React from 'react';
import { useState } from 'react';
import '../../styles/index.scss';
import ReactFileReader from 'react-file-reader';


const Index = props => {
  const [byNameInput, setByNameInput] = useState('');
  const [byActorInput, setByActorInput] = useState('');
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
      <div >
        <button
          onClick={initHandler}
        >init </button>
        <button
          onClick={getAllHandler}
        > getAll</button>
        {props.block === 1 ? (
          <button
            onClick={() => addHandler({title, release, format, stars})}
            disabled
          >
            addNew
          </button>
        ) : (
          <button
            onClick={() => addHandler({title, release, format, stars})}
          >
            addNew
          </button>
        )}
        <br/>
        <input
          label="name"
          name="title"
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          name="release"
          type="number"
          onChange={e => setRelease(e.target.value)}
        />{' '}
        <br/>
        <input
          name="format"
          type="text"
          onChange={e => setFormat(e.target.value)}
        />
        <input
          name="stars"
          type="text"
          onChange={e => setStars(e.target.value)}
        />
      </div>
      {' '}
      <div >
        <button
          onClick={() => byActorHandler(byActorInput)}
        >
          searchByActor
        </button>
        <input
          type="text"
          onChange={e => setByActorInput(e.target.value)}
        />{' '}
        <br/>
        <button
          onClick={() => byNameHandler(byNameInput)}
        >
          searchByName
        </button>
        <input
          id="standard-name"
          type="text"
          onChange={e => setByNameInput(e.target.value)}
        />
        <br/>
        <button onClick={sortDownHandler}>
          ↑
        </button>
        <button onClick={sortUpHandler}>f
          ↓
        </button>
      </div>
      {' '}
      <div >
        
        <ReactFileReader fileTypes={['.txt']} handleFiles={handleFiles}
                         multipleFiles={false}>
          <button>
            Upload
          </button>
        </ReactFileReader>
      </div>
    </div>
  );
};

export default Index;
