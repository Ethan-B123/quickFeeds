import * as collectionApiUtil from "../util/collections_api_util"

export const RECEIVE_ALL_COLLECTIONS = 'RECEIVE_ALL_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export const RECEIVE_COLLECTION_FULL = 'RECEIVE_COLLECTION_FULL';

export const receiveAllCollections = (collections) => ({
  type: RECEIVE_ALL_COLLECTIONS,
  collections
});

export const receiveCollectionFull = (collectionFull) => ({
  type: RECEIVE_COLLECTION_FULL,
  collectionFull
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
      failCb && failCb()
    }
  )
)

export const fetchCollectionFull = (id) => dispatch => (
  collectionApiUtil.getFullCollection(id).then(
    (response) => {
      dispatch(receiveCollectionFull(response))
    }
  )
);

export const fetchCollections = () => dispatch => (
  collectionApiUtil.fetchCollections().then(
    (response) => {
      dispatch(receiveAllCollections(response));
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
