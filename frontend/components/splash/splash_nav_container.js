import { connect } from "react-redux";
import { clearErrors, loginDemo } from "../../actions/session_actions";
import SplashNav from "./splash_nav";

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  loginDemo: () => dispatch(loginDemo())
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashNav);
