import React from "react";
import { Link } from "react-router-dom";
import AddFeed from "./add_feed_container";
import Modal from "react-modal";


class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { formOpen: false }
    this.props.fetchAllFeeds();
  }

  selectFeed(id) {
    return () => {
      this.props.history.push(`/feed/${id}`)
    }
  }

  renderFeeds() {
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

  openForm () {
    this.setState({ formOpen: true });
  }

  closeForm () {
    this.setState({ formOpen: false });
  }

  render() {
    return (
      <div className="sidebar-container">
        <ul className="feed-list">
          {this.renderFeeds()}
        </ul>
        <button onClick={this.openForm.bind(this)}
          className="add-feed-button">Add Feed</button>
        <Modal
          isOpen={this.state.formOpen}
          closeTimeoutMS={300}
          overlayClassName={{
              base: 'overlay',
              afterOpen: 'overlay-after-open',
              beforeClose: 'overlay-before-close'
            }}
          className={{
            base: 'form-modal',
            afterOpen: 'form-modal-after-open',
            beforeClose: 'form-modal-before-close'
          }}>
          <AddFeed closeFn={this.closeForm.bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
