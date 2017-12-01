import * as readApiUtil from "../util/read_api_util";

export const RECEIVE_READ_ARTICLES = "RECEIVE_READ_ARTICLES";

export const receiveReadArticles = (articles) => ({
  type: RECEIVE_READ_ARTICLES,
  articles
});

export const fetchReads = () => dispatch => (
  readApiUtil.fetchReads().then(
    (articlesArr) => dispatch(receiveReadArticles(articlesArr))
  )
);

export const createRead = (article_id) => dispatch => (
  readApiUtil.createRead(article_id).then(
    (articlesArr) => dispatch(receiveReadArticles(articlesArr))
  )
);

export const deleteRead = (article_id) => dispatch => (
  readApiUtil.deleteRead(article_id).then(
    (articlesArr) => dispatch(receiveReadArticles(articlesArr))
  )
);
