
import {
  RECEIVE_FEED_AND_ARTICLES,
  RECEIVE_FEED_ERRORS } from "../actions/feed_actions";


export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FEED_ERRORS:
    return action.errors;
      break;
    case RECEIVE_FEED_AND_ARTICLES:
    return [];
      break;
    default:
      return state;
  }
}
