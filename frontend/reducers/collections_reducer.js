import { RECEIVE_ALL_COLLECTIONS,
  RECEIVE_COLLECTION } from "../actions/collection_actions";
import { merge } from "lodash";


export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_COLLECTIONS:
    return action.collections;
      break;
    case RECEIVE_COLLECTION:
    const collectionId = action.collection.id
    return merge({}, state, {[collectionId]: action.collection});
      break;
    default:
      return state;
  }
}
