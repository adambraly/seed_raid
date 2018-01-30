import {
  FETCHING_RAIDS,
  RAID_FETCH_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  isFetching: true,
};


function raids(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_RAIDS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RAID_FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      });
    default:
      return state;
  }
}

export default raids;
