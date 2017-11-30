export const fetchCollections = () => (
  $.ajax({
    method: "get",
    url: "/api/collections/"
  })
);

export const getFullCollection = (id) => (
  $.ajax({
    mathod: "get",
    url: "/api/collections/full/" + id
  })
)

export const createCollection = (collection) => (
  $.ajax({
    method: "post",
    url: "/api/collections/",
    data: { collection }
  })
);

export const deleteCollection = (id) => (
  $.ajax({
    method: "delete",
    url: "/api/collections/" + id
  })
);

export const addFeed = (collection_feed) => (
  // collection_feed: { :feed_id, :collection_id }
  $.ajax({
    method: "post",
    url: "/api/collection_feeds/",
    data: { collection_feed }
  })
);

export const removeFeed = (collection_feed) => (
  $.ajax({
    method: "delete",
    url: "/api/collection_feeds/",
    data: { collection_feed }
  })
);
