import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as FeedActions from "../../actions/feed_actions";
import * as CollectionActions from "../../actions/collection_actions";
import * as ReadActions from "../../actions/read_actions";
import ArticleIndex from "./article_index";

const mapStateToProps = ({ feeds, articles, feedArticles, collections, reads }) => ({
  feeds,
  articles,
  feedArticles,
  collections,
  reads
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedData:
    (id) => dispatch(FeedActions.fetchFeedData(id)),
  fetchAllFeeds:
    () => dispatch(FeedActions.fetchAllFeeds()),
  fetchCollectionFull:
    (id) => dispatch(CollectionActions.fetchCollectionFull(id)),
  fetchReads:
    () => dispatch(ReadActions.fetchReads())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex));
