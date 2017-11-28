
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
        console.log(this.props);
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
        <form>
          <label htmlFor="new-feed-input">New Feed Url:</label>
          <ul>
            { errors.map((err) => <li key={err}>{err}</li>) }
          </ul>
          <div>{ loading ? "Loading" : "" }</div>
          <input disabled={loading} onChange={updateInput}
            type="text" id="new-feed-input"
          />
          <button disabled={loading} onClick={tryNewFeed} type="submit">Add Feed</button>
        </form>
      </div>
    )
  }
}

export default AddFeed;
