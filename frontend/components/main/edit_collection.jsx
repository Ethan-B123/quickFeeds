
import React from "react"

const fadeoutLength = 300;

class EditCollection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {collection: props.collection}
  }

  tryCloseClick (e) {
    const target = e.target;
    const classArr = Array.from(target.classList);
    if (classArr.includes("close-on-click")) {
      this.props.closeFn();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.collection !== this.state.collection &&
      newProps.collection != undefined) {
        this.setState({collection: newProps.collection});
    }
  }

  toggleFeed(feedId) {
    return () => {
      const collection = this.state.collection;
      if (collection.feeds.includes(parseInt(feedId))) {
        this.props.removeFeed(feedId, collection.id)
      } else {
        this.props.addFeed(feedId, collection.id)
      }
    }
  }

  render() {
    const closeFn = this.props.closeFn;
    const tryCloseClick = this.tryCloseClick.bind(this);

    const collection = this.state.collection;
    const feedKeys = Object.keys(this.props.feeds);
    const feeds = this.props.feeds;
    // debugger;

    return (
      <div onClick={tryCloseClick} className="new-feed-form-container close-on-click">
        <form>
          <label htmlFor="new-feed-input">Edit {collection.name}:</label>
          <ul>
            { feedKeys.map((feedKey) => (
              collection.feeds.includes(parseInt(feedKey)) ?
              <li className="included-feed"
              onClick={this.toggleFeed(feedKey).bind(this)}
              key={feedKey + "y"}>{feeds[feedKey].title}</li> :
              <li className="excluded-feed"
              onClick={this.toggleFeed(feedKey).bind(this)}
              key={feedKey + "n"}>{feeds[feedKey].title}</li> )) }
          </ul>

        </form>
      </div>
    )
  }
}

export default EditCollection;
