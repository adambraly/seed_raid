import 'whatwg-fetch';
import * as types from './actionTypes';
import configureChannel from '../utils/channel';


const socket = configureChannel();
const channel = socket.channel('raids');


export function isFetching(bool) {
  return {
    type: types.FETCHING_RAIDS,
    isFetching: bool,
  };
}


export function raidsFetchSuccess(raids) {
  return {
    type: types.RAID_FETCH_SUCCESS,
    raids,
  };
}

export function syncChannelSuccess(payload) {
  return {
    type: types.SYNC_CHANNEL_SUCCESS,
    channel: payload.channel_slug,
    raids: payload.raids,
  };
}

export function fetchRaids() {
  return (dispatch) => {
    console.log("will fetch");
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

    channel.on('sync_channel', (msg) => {
      console.log('sync_channel', msg);
      dispatch(syncChannelSuccess(msg));
    });
  };
}
