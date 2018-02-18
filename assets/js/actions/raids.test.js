import * as types from './actionTypes';
import * as actions from './raids';

describe('actions', () => {
  it('should create an action to change fetching state', () => {
    const expectedAction = {
      type: types.FETCHING_RAIDS,
      isFetching: true,
    };
    expect(actions.isFetching(true)).toEqual(expectedAction);
  });
});
