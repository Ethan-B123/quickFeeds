import React from "react";
import { Link } from "react-router-dom";


class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetchAllFeeds();
  }

  selectFeed(id) {
    return () => {
      this.props.history.push(`/feed/${id}`)
    }
  }

  renderFeeds() {
    console.log(this.props.feed);
    return (
      this.props.feeds.map((feed)=>(
        <li key={feed.id}>
          <Link to={"/feed/" + feed.id}>
            {feed.title}
          </Link>
        </li>
      ))
    );
  }

  render() {
    return (
      <div className="sidebar-container">
        <ul>
          {this.renderFeeds()}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
