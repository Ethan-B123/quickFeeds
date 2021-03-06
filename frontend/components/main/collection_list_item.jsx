import React from "react";
import FeedListItem from "./feed_list_item";
import { withRouter, Link } from "react-router-dom";


class CollectionListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { closed: true };
  }

  toggleOpen() {
    const newClosedState = !this.state.closed;
    this.setState({ closed: newClosedState });
  }

  render() {
    const feeds = this.props.feeds
    const collection = this.props.collection
    const openEditor = this.props.openEditor
    const feedsArr = collection.feeds.map(feedId => feeds[feedId]);
    const toggleOpen = this.toggleOpen.bind(this);
    const feedList = feedsArr.map(feed =>(
      <FeedListItem key={feed.id} feed={feed} />
    ));
    if (feedList.length === 0) {
      feedList.push(
        <li key="empty list">
          <a className="no-hover feed">Nothing here...</a>
        </li>
      );
    }
    return (
      <li className="collection-item-container">
        <div className="collection-item top-level-link" >
          <div
          onClick={toggleOpen}
          className="single-center">
            <i
            className={this.state.closed ?
              "icon turn-90 fa fa-chevron-right" :
              "icon turn-90 fa fa-chevron-right turned"}
            aria-hidden="true"></i>
          </div>
          <div className="collection-title">
            { openEditor ?
              <Link to={"/collection/" + collection.id}>{collection.name}</Link> :
              <span>{collection.name}</span>

            }
          </div>

          { openEditor ?
          <div
          onClick={openEditor}
          className="single-center">
            <i
            className="fa fa-cog icon"
            aria-hidden="true"></i>
          </div> :
          ""
          }
        </div>
        <ul className={this.state.closed ? "shrinker closed" : "shrinker"}>
          {feedList}
        </ul>
      </li>
    );
  }
}

export default withRouter(CollectionListItem);
// export default ({ feeds, collection, openEditor }) => {
//
// }
