
import { RECIEVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from "../actions/session_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
      break;
    case RECIEVE_CURRENT_USER:
      return {};
      break;
    default:
      return state;
  }
}
