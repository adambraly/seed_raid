import fetch from 'whatwg-fetch';
import * as types from './actionTypes';

function requestRaids() {
  return {
    type: types.REQUEST_RAIDS,
  };
}

function receiveRaids(json) {
  return {
    type: types.RECIEVE_RAIDS,
    data: json,
  };
}

const Actions = {
  fetchRaids: (dispatch) => {
    dispatch(requestRaids());
    return fetch('http://localhost:4000/api/raids')
      .then(response => response.json())
      .then(json => dispatch(receiveRaids(json)));
  },
};

export default Actions;
