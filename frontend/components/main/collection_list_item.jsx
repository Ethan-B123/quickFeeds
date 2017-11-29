import React from "react";
import FeedListItem from "./feed_list_item";

export default ({ feeds, collection, openEditor }) => {
  const feedsArr = collection.feeds.map(feedId => feeds[feedId]);

  return (
    <li>
      <a onClick={openEditor}>
        {collection.name}
      </a>
      <ul>
        {feedsArr.map(feed =>(
          <FeedListItem key={feed.id} feed={feed} />
        ))}
      </ul>
    </li>
  )
}
