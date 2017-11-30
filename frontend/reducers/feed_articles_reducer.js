
import { RECEIVE_COLLECTION_FULL } from "../actions/collection_actions";
import { RECEIVE_FEED_AND_ARTICLES } from "../actions/feed_actions";
import { merge } from "lodash"


export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FEED_AND_ARTICLES:
    return merge({}, state, action.response.feedArticles)
      break;
    case RECEIVE_COLLECTION_FULL:
    return merge({}, state, action.collectionFull.feedArticles)
      break;
    default:
      return state;
  }
}
