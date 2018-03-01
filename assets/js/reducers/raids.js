import {
  FETCHING_RAIDS,
  RAID_FETCH_SUCCESS,
  SYNC_CHANNEL_SUCCESS,
  UPDATE_RAID_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  raids: {},
  isFetching: true,
};

function updateChannel(state, action) {
  return {
    ...state,
    raids: {
      ...state.raids,
      [action.channel]: action.raids,
    },
  };
}

function replaceRaid(channel, newRaid) {
  return channel.map((raid) => {
    if (raid.id === newRaid.id) {
      return newRaid;
    }
    return raid;
  });
}

export function updateRaid(state, action) {
  return {
    ...state,
    raids: {
      ...state.raids,
      [action.raid.channel_slug]:
        replaceRaid(state.raids[action.raid.channel_slug], action.raid),
    },
  };
}

function raids(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_RAIDS:
      return {
        ...state,
        isFetching: true,
      };
    case RAID_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        raids: action.raids,
      };
    case SYNC_CHANNEL_SUCCESS:
      return updateChannel(state, action);
    case UPDATE_RAID_SUCCESS:
      return updateRaid(state, action);
    default:
      return state;
  }
}

export default raids;
