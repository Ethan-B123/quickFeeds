import { connect } from "react-redux";
import { clearErrors } from "../../actions/session_actions";
import SplashNav from "./splash_nav";

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors())
});

export default connect(null, mapDispatchToProps)(SplashNav);
