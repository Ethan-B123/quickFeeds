import { connect } from "react-redux";
import * as CollectionActions from "../../actions/collection_actions";
import EditCollection from "./edit_collection";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ feeds, collections }, ownProps) => {
  return {
  closeFn: ownProps.closeFn,
  collection: collections[ownProps.collectionId],
  feeds
}};

const mapDispatchToProps = (dispatch) => ({
  addFeed: (feedId, collectionId) => {
    dispatch(CollectionActions.addFeed(
      { feed_id: feedId , collection_id: collectionId }
    ));
  },
  removeFeed: (feedId, collectionId) => {
    dispatch(CollectionActions.removeFeed(
      { feed_id: feedId , collection_id: collectionId }
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);
