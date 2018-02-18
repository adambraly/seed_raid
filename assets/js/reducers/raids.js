import {
  FETCHING_RAIDS,
  RAID_FETCH_SUCCESS,
  SYNC_CHANNEL_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  raids: {},
  isFetching: true,
};

function setChannelState(state, channel, channelRaids) {
  const raidState = Object.assign({}, state.raids);
  raidState[channel] = channelRaids;
  return raidState;
}

function raids(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_RAIDS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RAID_FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        raids: action.raids,
      });
    case SYNC_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        raids: setChannelState(state, action.channel, action.raids),
      });
    default:
      return state;
  }
}

export default raids;
