import * as FeedApiUtil from "../util/feed_api_util"

export const RECEIVE_ALL_FEEDS = 'RECEIVE_ALL_FEEDS';
export const RECEIVE_FEED_AND_ARTICLES = 'RECEIVE_FEED_AND_ARTICLES';
export const RECEIVE_FEED_ERRORS = 'RECEIVE_FEED_ERRORS';

export const receiveAllFeeds = (feeds) => ({
  type: RECEIVE_ALL_FEEDS,
  feeds
});

export const receiveFeed = (response) => ({
  type: RECEIVE_FEED_AND_ARTICLES,
  response
});

export const receiveFeedErrors = (res) => ({
  type: RECEIVE_FEED_ERRORS,
  errors: res.responseJSON
});

export const clearFeedErrors = (res) => ({
  type: RECEIVE_FEED_ERRORS,
  errors: []
});

export const createFeed = (url, successCb, failCb) => dispatch => (
  FeedApiUtil.createFeed(url).then(
    (response) => {
      dispatch(receiveFeed(response));
      successCb(response)
    },
    (errors) => {
      dispatch(receiveFeedErrors(errors));
      failCb(errors)
    }
  )
)

export const clearErrors = () => clearFeedErrors([]);

export const fetchAllFeeds = () => dispatch => (
  FeedApiUtil.fetchAllFeeds().then(
    (response) => dispatch( receiveAllFeeds(response) )
  )
);

export const fetchFeedData = id => dispatch => (
  FeedApiUtil.fetchFeed(id).then(
    (response) => (dispatch(receiveFeed(response))),
    (errors) => (dispatch(receiveFeedErrors(response)))
  )
)
