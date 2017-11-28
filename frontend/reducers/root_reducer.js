import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import feedArticlesReducer from "./feed_articles_reducer";
import feedsReducer from "./feeds_reducer";
import articlesReducer from "./articles_reducer";
import collectionsReducer from "./collections_reducer";


export default combineReducers({
  session: sessionReducer,
  collections: collectionsReducer,
  errors: errorsReducer,
  feeds: feedsReducer,
  articles: articlesReducer,
  feedArticles: feedArticlesReducer
});
