import {
  MOVIE_ADD_NEW_ERROR,
  MOVIE_DELETE_ERROR,
  MOVIE_GET_ALL_ERROR,
  SEARCH_BY_ACTOR_ERROR,
  UPLOAD_ERROR,
} from '../constants';
import errors from './errors';

describe('errors reducer', () => {
  const ERROR = 'some error';
  it('should have same errors for all error types', () => {
    const errs = [
      UPLOAD_ERROR,
      SEARCH_BY_ACTOR_ERROR,
      MOVIE_DELETE_ERROR,
      MOVIE_ADD_NEW_ERROR,
      MOVIE_GET_ALL_ERROR,
    ];
    errs.forEach(err => {
      const action = { type: err, payload: ERROR };
      expect(errors([], action)).toEqual(['some error']);
    });
  });
});
