import { MOVIE_ADD_NEW_SUCCESS, MOVIE_DELETE_SUCCESS, MOVIE_GET_ALL_SUCCESS } from '../constants';
import movies from './movies';
import { List } from 'immutable';

//run test only from CLI (or create-react-app scripts should be configured)
const getAllMock = {
  movie: {
    25: {
      format: 'VHS',
      id: 25,
      release: 1990,
      stars: [
        'Mel Brooks',
        'Clevon Little',
        'Harvey Korman',
        'Gene Wilder',
        'Slim Pickens',
        'Madeline Kahn',
      ],
      title: 'Blazing Robocop',
    },
  },
};

describe('movies reducer', () => {
  it('should get fine empty state', () => {
    const action = { type: MOVIE_GET_ALL_SUCCESS };
    expect(movies([], action)).toEqual(List());
  });

  it('should receive correct item list', () => {
    const action = { type: MOVIE_GET_ALL_SUCCESS, payload: getAllMock };
    const result = {
      '25': {
        format: 'VHS',
        id: 25,
        release: 1990,
        stars: [
          'Mel Brooks',
          'Clevon Little',
          'Harvey Korman',
          'Gene Wilder',
          'Slim Pickens',
          'Madeline Kahn',
        ],
        title: 'Blazing Robocop',
      },
    };
    expect(movies([], action)).toEqual(List([result]));
  });

  it('should add new item properly', () => {
    const action = {
      type: MOVIE_ADD_NEW_SUCCESS,
      payload: {
        message: {
          format: 'VHS',
          release: 1990,
          stars: ['Blake Henry'],
          title: 'Blazing Robocop',
          id: 29,
        },
      },
    };
    let result = [
      {
        format: 'VHS',
        release: 1990,
        stars: ['Blake Henry'],
        title: 'Blazing Robocop',
        id: 29,
      },
    ];

    expect(movies([], action)).toEqual(List(result));
  });

  it('should delete item', () => {
    const action = { type: MOVIE_DELETE_SUCCESS, payload: 155 };
    let state = [
      {
        format: 'VHS',
        id: 29,
        release: 1990,
        stars: ['Nataly Oreiro', 'Blake Henry'],
        title: 'Blazing Robocop',
      },
      {
        format: 'VHS',
        id: 155,
        release: 1991,
        stars: ["'Blake Henry'", 'Unknown Person'],
        title: 'Furious Robocop',
      },
    ];

    const result = [
      {
        format: 'VHS',
        id: 29,
        release: 1990,
        stars: ['Nataly Oreiro', 'Blake Henry'],
        title: 'Blazing Robocop',
      },
    ];

    expect(movies(state, action)).toEqual(List(result));
  });
});
