import { connect } from "react-redux";
import * as ReadActions from "../../actions/read_actions";
import ReadButton from "./read_button";

const mapStateToProps = ({ reads }) => {
  return {
    keys: reads.keys
  }
};

const mapDispatchToProps = (dispatch) => ({
  deleteRead: (articleId) => {
    dispatch(ReadActions.deleteRead(articleId));
  },
  createRead: (articleId) => {
    dispatch(ReadActions.createRead(articleId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadButton);
