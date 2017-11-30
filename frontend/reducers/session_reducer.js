
import { RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER } from "../actions/session_actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser };
      break;
    case LOGOUT_CURRENT_USER:
      return { currentUser: null };
      break;
    default:
      return state;
  }
}
