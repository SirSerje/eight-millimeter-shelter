import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index.js';
import * as types from '../constants';
import * as utilRequest from '../utils';

const mockStore = configureMockStore([thunk]);

describe('redux-thunk actions test', () => {
  utilRequest.addNewRequest = jest.fn(i => Promise.resolve(i));

  //FIXME: payload comes with bullshit
  it('addNewRequest', async () => {
    const store = mockStore({ todos: [] });
    await store.dispatch(actions.movieAddNew({}));

    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toBe(types.MOVIE_ADD_NEW_PENDING);
    expect(store.getActions()[1].type).toBe(types.MOVIE_ADD_NEW_SUCCESS);
  });
});
