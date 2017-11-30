import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as FeedActions from "../../actions/feed_actions";
import * as CollectionActions from "../../actions/collection_actions";
import ArticleIndex from "./article_index";

const mapStateToProps = ({ feeds, articles, feedArticles, collections }) => ({
  feeds,
  articles,
  feedArticles,
  collections
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedData:
    (id) => dispatch(FeedActions.fetchFeedData(id)),
  fetchAllFeeds:
    () => dispatch(FeedActions.fetchAllFeeds()),
  fetchCollectionFull:
    (id) => dispatch(CollectionActions.fetchCollectionFull(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex));
