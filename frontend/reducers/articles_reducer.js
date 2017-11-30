
import { RECEIVE_COLLECTION_FULL } from "../actions/collection_actions";
import { RECEIVE_FEED_AND_ARTICLES } from "../actions/feed_actions";
import { merge } from "lodash"


export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FEED_AND_ARTICLES:
    Object.keys(action.response.articles).forEach((articleId) =>{
      const article = action.response.articles[articleId.toString()]
      article.publish_date = new Date(article.publish_date);
    });
    return merge({}, state, action.response.articles)
      break;
    case RECEIVE_COLLECTION_FULL:
    Object.keys(action.collectionFull.articles).forEach((articleId) =>{
      const article = action.collectionFull.articles[articleId.toString()]
      article.publish_date = new Date(article.publish_date);
    });
    return merge({}, state, action.collectionFull.articles)
      break;
    default:
      return state;
  }
}
