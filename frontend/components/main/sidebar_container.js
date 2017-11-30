import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { asArray } from '../../reducers/selectors';
import * as FeedActions from "../../actions/feed_actions";
import * as CollectionActions from "../../actions/collection_actions";
import Sidebar from "./sidebar";

const mapStateToProps = ({ feeds, collections }) => ({
  feeds: asArray(feeds),
  feedObjects: feeds,
  collections: asArray(collections)
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedData: (id) => dispatch(FeedActions.fetchFeedData(id)),
  fetchAllFeeds: (id) => dispatch(FeedActions.fetchAllFeeds()),
  fetchCollections: (id) => dispatch(CollectionActions.fetchCollections()),
  createCollection: (name) => dispatch( CollectionActions.createCollection({name: name})),
  fetchCollectionFull:
    (id) => dispatch( CollectionActions.fetchCollectionFull(id) )
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
