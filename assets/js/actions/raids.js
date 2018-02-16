import 'whatwg-fetch';
import * as types from './actionTypes';
import { configureChannel } from '../utils/channel';


const socket = configureChannel();
const channel = socket.channel('raids');


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
    channel.join()
      .receive('ok', (messages) => {
        console.log('catching up', messages);
        dispatch(raidsFetchSuccess(messages.raids));
      })
      .receive('error', (reason) => {
        console.log('failed join', reason);
        dispatch(raidsFetchSuccess(reason));
      });
  };
}
