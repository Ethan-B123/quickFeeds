import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { asArray } from '../../reducers/selectors';
import * as FeedActions from "../../actions/feed_actions";
import Sidebar from "./sidebar";

const mapStateToProps = ({ feeds }) => ({
  feeds: asArray(feeds)
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedData: (id) => dispatch(FeedActions.fetchFeedData(id)),
  fetchAllFeeds: (id) => dispatch(FeedActions.fetchAllFeeds())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
