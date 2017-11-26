import { connect } from "react-redux";
import * as sessionActions from "../../actions/session_actions";
import TopNav from "./top_nav";

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(sessionActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
