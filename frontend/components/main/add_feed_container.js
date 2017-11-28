import { connect } from "react-redux";
import * as FeedActions from "../../actions/feed_actions";
import AddFeed from "./add_feed";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ errors }) => ({
  errors: errors.feed
});

const mapDispatchToProps = (dispatch) => ({
  createFeed:
    (url, successCb, failCb) =>
    dispatch(FeedActions.createFeed(url, successCb, failCb)),
  clearErrors: () => dispatch(FeedActions.clearErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddFeed));
