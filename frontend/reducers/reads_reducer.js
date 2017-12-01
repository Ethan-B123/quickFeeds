
import { RECEIVE_READ_ARTICLES } from "../actions/read_actions";


export default (state = { keys:[], objects:[] }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_READ_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}
