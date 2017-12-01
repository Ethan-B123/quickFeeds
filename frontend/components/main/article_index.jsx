import React from "react";
import ArticleIndexItem from "./article_index_item";
import SideNav from "./sidebar_container";
import TopNav from "./top_nav_container";
import LoadingString from "./loading_widget";
import ArticleShow from "./article_show";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const fadeoutLength = 300;

class ArticleIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupType: undefined,
      groupId: undefined,
      readyForArticles: true
    };
  }

  componentWillMount() {
    const groupType = this.props.match.params.groupType;
    const groupId = this.props.match.params.groupId;
    this.props.fetchReads()
    if (groupType === "feed") {
      this.onFeedChange(groupId);
    } else if (groupType === "collection") {
      this.onCollectionChange(groupId);
    } else if (groupType === "read") {
      this.onReadChange(groupId);
    }
  }

  componentWillReceiveProps(newProps) {
    const groupId = this.props.match.params.groupId
    const groupType = this.props.match.params.groupType
    const newGroupId = newProps.match.params.groupId
    const newGroupType = newProps.match.params.groupType
    if (groupType !== newGroupType || groupId !== newGroupId) {
      if (newGroupType === "feed") {
        this.onFeedChange(newGroupId);
      } else if (newGroupType === "collection") {
        this.onCollectionChange(newGroupId)
      } else if (newGroupType === "read") {
        this.onReadChange(newGroupId);
      } else {
        this.setState({readyForArticles: false});
      }
    }
  }

  onCollectionChange(newGroupId) {
    this.setState({
      groupType: "collection",
      groupId: undefined,
      readyForArticles: false });
    setTimeout(() => {
      this.setState({ readyForArticles: true });
    }, fadeoutLength);
    // TODO: this.props.fetchColectionData(collectionId).then(
    this.props.fetchCollectionFull(newGroupId).then(
      () => this.setState({ groupId: newGroupId })
    );
  }

  onFeedChange(newGroupId) {
    this.setState({
      groupType: "feed",
      groupId: undefined,
      readyForArticles: false });
    setTimeout(() => {
      this.setState({ readyForArticles: true });
    }, fadeoutLength);
    this.props.fetchFeedData(newGroupId).then(
      () => this.setState({ groupId: newGroupId })
    );
  }

  onReadChange(newGroupId) {
    this.setState({
      groupType: "read",
      groupId: undefined,
      readyForArticles: false });
    setTimeout(() => {
      this.setState({ readyForArticles: true });
    }, fadeoutLength);
    this.props.fetchReads().then(
      () => this.setState({ groupId: newGroupId })
    );
  }

  openShow(id) {
    return () => this.props.history.push({ search: id.toString() });
  }

  closeShow() {
    this.props.history.push({ search: "" });
  }

  getCollectionArray() {
    const groupId = this.state.groupId;
    const readyForArticles = this.state.readyForArticles;
    const collection = this.props.collections[groupId]
    if (groupId === undefined ||
      !readyForArticles ||
      collection === undefined) {
      return [];
    }
    if (collection.feeds.length === 0) {
      return [<h1 key="title" className="article-head">Click the gear to add feeds</h1>,
      <div key="backdrop" className="backdrop"></div>]

    }
    const allFeeds = this.props.feeds;
    const feedArticles = this.props.feedArticles;
    const articles = this.props.articles;
    const feeds = collection.feeds.map((feedId) => allFeeds[feedId]);
    let articlesArr = [];
    feeds.forEach((feed) => {
      if (feedArticles[feed.id.toString()] === undefined) {
        return undefined
      }
      const newArticles = feedArticles[feed.id.toString()].map((articleId) =>(
        articles[articleId]
      ));
      articlesArr = articlesArr.concat(newArticles);
    });

    articlesArr.sort((a,b) => (
      b.publish_date - a.publish_date
    ));

    let returnArticlesArr = articlesArr.map((article) => (
      <ArticleIndexItem
        openFn={this.openShow.bind(this)}
        article={article} key={article.id}/>
    ));

    returnArticlesArr = returnArticlesArr.slice(0, 100);

    returnArticlesArr.unshift(
      <h1 key="title" className="article-head">{collection.name}</h1>
    )
    returnArticlesArr.push(
      <div key="backdrop" className="backdrop"></div>
    );

    return returnArticlesArr;
  }

  getFeedArray() {
    const groupId = this.state.groupId;
    const readyForArticles = this.state.readyForArticles;
    if (groupId === undefined || !readyForArticles) {
      return [];
    }

    const articles = this.props.feedArticles[groupId].map((articleId)=>{
      const article = this.props.articles[articleId];
      return (
        <ArticleIndexItem
          openFn={this.openShow.bind(this)}
          article={article} key={article.id}/>
      );
    });
    articles.unshift(
      <h1 key="title" className="article-head">{this.props.feeds[groupId].title}</h1>
    )
    articles.push(
      <div key="backdrop" className="backdrop"></div>
    );
    return (articles);
  }

  getReadArray() {
    const groupId = this.state.groupId;
    const readyForArticles = this.state.readyForArticles;
    if (groupId === undefined || !readyForArticles) {
      return [];
    }

    const articles = Object.values(this.props.reads.objects)
    .reverse()
    .map((article)=>{
      return (
        <ArticleIndexItem
          openFn={this.openShow.bind(this)}
          article={article} key={article.id}/>
      );
    });
    articles.unshift(
      <h1 key="title" className="article-head">Saved Articles</h1>
    )
    articles.push(
      <div key="backdrop" className="backdrop"></div>
    );
    return (articles);
  }

  getArticles() {
    if (this.state.groupType === "feed") {
      return this.getFeedArray();
    } else if (this.state.groupType === "collection") {
      return this.getCollectionArray();
    } else if (this.state.groupType === "read") {
      return this.getReadArray();
    } else {
      return [];
    }
  }

  articleShow() {
    const articles = this.props.articles;
    const keys = Object.keys(articles)
    if (this.props.location.search === "" || keys.length === 0) {
      return [];
    }
    const articleId = this.props.location.search.slice(1);
    if (!keys.includes(articleId)) {
      return [];
    }
    const article = articles[articleId];
    return (
      [<ArticleShow
        key={articleId} article={article} />]
    )
  }

  render() {
    const articleShowArr = this.articleShow();
    const showBgArr = articleShowArr.length === 1 ?
      [<div key="background" onClick={this.closeShow.bind(this)}
        className="show-bg"></div>] : [];
    return (
      <div className="article-index">
        <SideNav />
        <TopNav />
        <div className="inner-900">
          <ReactCSSTransitionGroup
          component="ul"
          transitionName="article"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {this.getArticles()}
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
          component="div"
          transitionName="show-bg"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {showBgArr}
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
          component="div"
          transitionName="article-show"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {articleShowArr}
          </ReactCSSTransitionGroup>
        </div>
        <div className="loading-container">
          <LoadingString />
        </div>
      </div>
    );
  }
}

export default ArticleIndex;
