import { combineReducers } from 'redux';

import sessionErrorsReducer from './session_errors_reducer';
import feedErrorsReducer from './feed_errors_reducer';

export default combineReducers({
  login: sessionErrorsReducer,
  feed: feedErrorsReducer
  // TODO: feed errors
});
