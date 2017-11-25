
import { RECEIVE_FEED_AND_ARTICLES } from "../actions/feed_actions";
import { merge } from "lodash"


export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FEED_AND_ARTICLES:
    return merge({}, state, action.response.articles)
      break;
    default:
      return state;
  }
}
