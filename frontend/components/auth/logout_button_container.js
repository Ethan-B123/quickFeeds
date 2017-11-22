import { connect } from "react-redux";
import * as SessionActions from "../../actions/session_actions";
import LogoutButton from "./logout_button";

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(SessionActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
