

export const fetchFeed = (id) => (
  $.ajax({
    method: "get",
    url: "/api/feeds/" + id
  })
);

export const fetchAllFeeds = () => (
  $.ajax({
    method: "get",
    url: "/api/feeds"
  })
);

export const createFeed = (url) => (
  $.ajax({
    method: "get",
    url: "/api/feeds",
    data: { url: url }
  })
);
