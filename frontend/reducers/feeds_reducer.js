
import { RECEIVE_COLLECTION_FULL } from "../actions/collection_actions";
import {
  RECEIVE_ALL_FEEDS,
  RECEIVE_FEED_AND_ARTICLES } from "../actions/feed_actions";
import { merge } from "lodash"


export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_FEEDS:
    return action.feeds
      break;
    case RECEIVE_FEED_AND_ARTICLES:
    const feed = action.response.feed;
    return merge({}, state, {[feed.id]: feed})
      break;
    case RECEIVE_COLLECTION_FULL:
    return merge({}, state, action.collectionFull.feeds)
      break;
    default:
      return state;
  }
}
