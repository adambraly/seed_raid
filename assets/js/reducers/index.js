import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import raids from './raids';

const rootReducer = combineReducers({
  raids,
  router: routerReducer,
});

export default rootReducer;
