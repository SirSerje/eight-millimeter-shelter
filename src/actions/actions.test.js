import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index.js';
import * as types from '../constants';
import * as utilRequest from '../utils';

const testsList = [
  {
    testName: 'upload',
    actionCommand: actions.upload,
    action0: types.UPLOAD_PENDING,
    action1: types.UPLOAD_SUCCESS,
  },
  {
    testName: 'add new',
    actionCommand: actions.movieDelete,
    action0: types.MOVIE_DELETE_PENDING,
    action1: types.MOVIE_DELETE_SUCCESS,
  },
  {
    testName: 'add new',
    actionCommand: actions.movieAddNew,
    action0: types.MOVIE_ADD_NEW_PENDING,
    action1: types.MOVIE_ADD_NEW_SUCCESS,
  },
  {
    testName: 'search by actor',
    actionCommand: actions.searchByActor,
    action0: types.SEARCH_BY_ACTOR_PENDING,
    action1: types.SEARCH_BY_ACTOR_SUCCESS,
  },
  // FIXME: get all broken
  /* {
    testName: "get all",
    actionCommand: actions.movieGetAll,
    action0: types.MOVIE_GET_ALL_PENDING,
    action1: types.MOVIE_GET_ALL_SUCCESS
  },*/
  {
    testName: 'search by name',
    actionCommand: actions.searchByName,
    action0: types.SEARCH_BY_NAME_PENDING,
    action1: types.SEARCH_BY_NAME_SUCCESS,
  },
];

describe('redux-thunk actions test', () => {
  let mockStore;
  let store;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
    store = mockStore({ todos: ['1', '2'] });
  });

  utilRequest.getAllRequest = jest.fn(i => Promise.resolve(i));
  utilRequest.getById = jest.fn(i => Promise.resolve(i));
  utilRequest.addNewRequest = jest.fn(i => Promise.resolve(i));
  utilRequest.movieDeleteRequest = jest.fn(i => Promise.resolve(i));
  utilRequest.searchByName = jest.fn(i => Promise.resolve(i));
  utilRequest.searchByActor = jest.fn(i => Promise.resolve(i));
  utilRequest.addNewRequest = jest.fn(i => Promise.resolve(i));
  utilRequest.uploadFile = jest.fn(i => Promise.resolve(i));

  testsList.forEach(test => {
    it(test.testName, async () => {
      await store.dispatch(test.actionCommand({}));
      let action = store.getActions;
      expect(action()).toHaveLength(2);
      expect(action()[0].type).toBe(test.action0);
      expect(action()[1].type).toBe(test.action1);
    });
  });
});
