import * as SessionActions from "../../actions/session_actions";
import SessionForm from "./session_form";
import { connect } from "react-redux";

const mapStateToProps = ({ errors }) => ({
  errors: errors.login
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(SessionActions.login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
