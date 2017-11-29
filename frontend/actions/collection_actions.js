import * as collectionApiUtil from "../util/collections_api_util"

export const RECEIVE_ALL_COLLECTIONS = 'RECEIVE_ALL_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';

export const receiveAllCollections = (collections) => ({
  type: RECEIVE_ALL_COLLECTIONS,
  collections
});

export const receiveCollection = (collection) => ({
  type: RECEIVE_COLLECTION,
  collection
});

export const createCollection = (collection, successCb, failCb) => dispatch => (
  collectionApiUtil.createCollection(collection).then(
    (response) => {
      dispatch(receiveCollection(response));
      successCb && successCb();
    },
    (errors) => {
      console.log("couldn't createCollection");
      console.log(errors);
      failCb && failCb()
    }
  )
)

export const fetchCollections = () => dispatch => (
  collectionApiUtil.fetchCollections().then(
    (response) => {
      dispatch(receiveAllCollections(response));
    },
    (errors) => {
      console.log("couldn't receiveAllCollections");
      console.log(errors);
    }
  )
)

export const deleteCollection = (id) => dispatch => (
  collectionApiUtil.deleteCollection(id).then(
    (response) => dispatch( receiveAllCollections(response) )
  )
);


export const addFeed = (collectionFeed) => dispatch => (
  collectionApiUtil.addFeed(collectionFeed).then(
    (response) => dispatch( receiveCollection(response) )
  )
);

export const removeFeed = (collectionFeed) => dispatch => (
  collectionApiUtil.removeFeed(collectionFeed).then(
    (response) => dispatch( receiveCollection(response) )
  )
);
