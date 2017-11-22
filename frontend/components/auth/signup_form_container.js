import * as SessionActions from "../../actions/session_actions";
import SignupForm from "./signup_form";
import { connect } from "react-redux";

const mapStateToProps = ({ errors }) => ({
  errors: errors.login
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(SessionActions.signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
