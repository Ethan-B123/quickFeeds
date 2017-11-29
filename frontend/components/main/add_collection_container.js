import { connect } from "react-redux";
import * as CollectionActions from "../../actions/collection_actions";
import AddCollection from "./add_collection";


const mapDispatchToProps = (dispatch) => ({
  createCollection:
    (collection, successCb, failCb) =>
    dispatch(CollectionActions.createCollection(collection, successCb, failCb)),
});

export default connect(null, mapDispatchToProps)(AddCollection);
