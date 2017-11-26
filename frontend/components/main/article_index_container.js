import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { asArray } from '../../reducers/selectors';
import * as FeedActions from "../../actions/feed_actions";
import ArticleIndex from "./article_index";

const mapStateToProps = ({ feeds, articles, feedArticles }) => ({
  feeds: asArray(feeds),
  articles,
  feedArticles
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedData: (id) => dispatch(FeedActions.fetchFeedData(id)),
  fetchAllFeeds: () => dispatch(FeedActions.fetchAllFeeds())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex));
