import React from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import Badge from '../Badge';


const Index = props => {
  const {id, title, release, format, stars, deleteHandler} = props;
  
  return (
    <div id={id}>
      <b>{title} - {release}</b>
      <div>
        {stars.map((item, idx, total) =>
          <Link key={uuid()} to={`${id}`}>{item}{idx !== (total.length - 1) &&
          ', '}</Link>)}
      </div>
      
      <Badge>{format}</Badge>
      <button onClick={() => deleteHandler(id)}>remove</button>
      <br/>
    </div>
  );
};

export default Index;
