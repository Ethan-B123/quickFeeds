
import React from "react"

const fadeoutLength = 300;

class AddFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = { url: "", loading: false }
  }

  updateInput(e) {
    this.setState({ url: e.currentTarget.value });
  }

  tryNewFeed() {
    this.setState({ loading: true });
    this.props.createFeed(this.state.url,
      (response) => {
        this.props.history.push("/feed/" + response.feed.id)
        this.setState({ loading: false });
        this.props.closeFn();
      }, (error) => {
        this.setState({ loading: false });
      }
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
    const tryNewFeed = this.tryNewFeed.bind(this);
    const tryCloseClick = this.tryCloseClick.bind(this);
    const errors = this.props.errors;

    return (
      <div onClick={tryCloseClick} className="new-feed-form-container close-on-click">
      <div className="full-bar">
      <div className="edit-collection-form">
          <h3 className="col-edit-title">New Feed</h3>
          <ul>
            { errors.map((err) => <li key={err}>{err}</li>) }
          </ul>
          <div>{ loading ? "Loading" : "" }</div>
          <input disabled={loading} onChange={updateInput}
            placeholder="Feed URL"
            type="text" id="new-feed-input"
          />
          <button disabled={loading} onClick={tryNewFeed} type="submit">Add Feed</button>
          </div>
          </div>
      </div>
    )
  }
}

export default AddFeed;
