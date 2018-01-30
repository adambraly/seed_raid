import 'whatwg-fetch';
import * as types from './actionTypes';


export function isFetching(bool) {
  return {
    type: types.FETCHING_RAIDS,
    isFetching: bool,
  };
}


export function raidsFetchSuccess(items) {
  return {
    type: types.RAID_FETCH_SUCCESS,
    items,
  };
}


export function fetchRaids() {
  return (dispatch) => {
    dispatch(isFetching(true));
    return fetch('http://localhost:4000/api/raids')
      .then(response => response.json())
      .then(json => dispatch(raidsFetchSuccess(json.data)));
  };
}
