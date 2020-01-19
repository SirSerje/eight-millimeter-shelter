import React from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';
import DefaultImage from '../../../images/default.png';
import Badge from '../Badge';

const Index = props => {
  const {
    id, title, release, format, stars, deleteHandler, idx,
  } = props;

  return (
    <div
      className="movie-entity"
      id={id}
      style={{ animationDelay: `.${idx}s` }}
    >

      <div className="movie-entity__preview">
        <img className="movie-entity__preview-image" src={DefaultImage} alt={title} />
      </div>

      <div className="movie-entity-container">

        <span className="movie-entity-container__title">{title} - {release}</span>
        <div className="movie-entity-container__stars">
          {stars.map((item, idx, total) => (
            <Link key={uuid()} to={`${id}`}>
              {item}{idx !== (total.length - 1) && ', '}
            </Link>
          ))}
        </div>
        <Badge>{format}</Badge>
        <button
          className="movie-entity-container__remove-button"
          onClick={() => deleteHandler(id)}
          type="submit"
        >
        remove
        </button>

      </div>
    </div>
  );
};

Index.propTypes = {
  idx: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  // TODO: fix later
  release: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  format: PropTypes.string,
  stars: PropTypes.arrayOf(PropTypes.string),
  deleteHandler: PropTypes.func,
};


export default Index;
