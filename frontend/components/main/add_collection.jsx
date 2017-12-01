
import React from "react"

const fadeoutLength = 300;

class AddCollection extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: "", loading: false, errors: false }
  }

  updateInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  tryMakeCollection(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.createCollection({name: this.state.name},
      (response) => {
        this.setState({ loading: false });
        this.props.closeFn();
      },
      () => this.setState({ loading: false, errors: true })
    );
  }

  tryCloseClick (e) {
    const target = e.target;
    const classArr = Array.from(target.classList);
    if (classArr.includes("close-on-click")) {
      this.props.closeFn();
      setTimeout(() => {
        this.props.clearErrors();
      }, fadeoutLength);
    }
  }

  render() {
    const loading = this.state.loading;
    const closeFn = this.props.closeFn;
    const updateInput = this.updateInput.bind(this);
    const tryMakeCollection = this.tryMakeCollection.bind(this);
    const tryCloseClick = this.tryCloseClick.bind(this);
    const errors = this.state.errors;

    return (
      <div onClick={tryCloseClick} className="new-feed-form-container close-on-click">
        <div className="full-bar">
        <div className="edit-collection-form">
          <h3 className="col-edit-title">New Collection</h3>
          <div>{ loading ? "Loading" : "" }</div>
          <input disabled={loading} onChange={updateInput}
            placeholder="Collection Name"
            type="text" id="new-collection-input"
          />
          <button disabled={loading} onClick={tryMakeCollection} type="submit">Add Collection</button>
        </div>
        </div>
      </div>
    )
  }
}

export default AddCollection;
