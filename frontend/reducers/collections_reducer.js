import { RECEIVE_ALL_COLLECTIONS,
  RECEIVE_COLLECTION } from "../actions/collection_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { merge } from "lodash";


export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOGOUT_CURRENT_USER:
    return {};
      break;
    case RECEIVE_ALL_COLLECTIONS:
    return action.collections;
      break;
    case RECEIVE_COLLECTION:
    const collectionId = action.collection.id;
    const oldState = merge({}, state);
    oldState[collectionId] = action.collection;
    return oldState;
      break;
    default:
      return state;
  }
}
