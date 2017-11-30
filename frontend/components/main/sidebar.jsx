import React from "react";
import AddFeed from "./add_feed_container";
import AddCollection from "./add_collection_container";
import EditCollection from "./edit_collection_container";
import Modal from "react-modal";
import FeedListItem from "./feed_list_item";
import CollectionListItem from "./collection_list_item";

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedFormOpen: false,
      newCollectionFormOpen: false,
      editCollectionFormOpen: false,
      currentCollectionId: undefined
    }
    this.props.fetchAllFeeds();
    this.props.fetchCollections();
  }

  selectFeed(id) {
    return () => {
      this.props.history.push(`/feed/${id}`)
    }
  }

  renderFeeds() {
    return (
      this.props.feeds.map((feed)=>(
        <FeedListItem key={feed.id} feed={feed} />
      ))
    );
  }

  renderCollections() {
    // debugger;
    return (
      this.props.collections.map((collection)=>(
        <CollectionListItem
        key={collection.id}
        collection={collection}
        feeds={this.props.feedObjects}
        openEditor={this.openForm("editCollection", collection.id).bind(this)} />
      ))
    );
  }

  openForm (type, collectionId) {
    const statePiece = type + "FormOpen";
    return () => {
      this.setState({
      currentCollectionId: collectionId,
      [statePiece]: true });
    };
  }

  closeForm (type) {
    const statePiece = type + "FormOpen";
    return () => {
      if (this.props.match.params.groupType === "collection" &&
        this.props.match.params.groupId) {
        this.props.fetchCollectionFull(this.props.match.params.groupId);
      }
      this.setState({
        currentCollectionId: undefined,
        [statePiece]: false
      });
    }
  }

  // <ul className="feed-list">
  // <li onClick={this.openForm("newCollection").bind(this)}>
  // <a>Add Collection</a>
  // </li>
  // {this.renderFeeds()}
  // </ul>
  render() {
    const newCollectionFormOpen = this.state.newCollectionFormOpen;
    const currentCollectionId = this.state.currentCollectionId;
    return (
      <div className="sidebar-container">
        <ul className="feed-list">
          <li onClick={this.openForm("newCollection").bind(this)}>
            <span className="add-collection-link">+ Create Collection</span>
          </li>
          {this.renderCollections()}
        </ul>
        <button onClick={this.openForm("feed").bind(this)}
          className="add-feed-button">+ ADD FEED</button>
        <Modal
          isOpen={this.state.feedFormOpen}
          closeTimeoutMS={500}
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
          <AddFeed closeFn={this.closeForm("feed").bind(this)} />
        </Modal>

        <Modal
          isOpen={this.state.newCollectionFormOpen}
          closeTimeoutMS={500}
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
          <AddCollection closeFn={this.closeForm("newCollection").bind(this)} />
        </Modal>

        <Modal
          isOpen={ Boolean(this.state.currentCollectionId) }
          closeTimeoutMS={500}
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
          <EditCollection
            collectionId={this.state.currentCollectionId}
            closeFn={this.closeForm("editCollection").bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
