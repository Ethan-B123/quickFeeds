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
    const groupId = this.props.match.params.groupId
    this.onFeedChange(groupId);
  }

  componentWillReceiveProps(newProps) {
    const groupId = this.props.match.params.groupId
    const groupType = this.props.match.params.groupType
    const newGroupId = newProps.match.params.groupId
    const newGroupType = newProps.match.params.groupType
    if (groupType !== newGroupType || groupId !== newGroupId) {
      if (newGroupType === "feed") {
        this.onFeedChange(newGroupId);
        console.log(this.props);
      } else {
        this.onCollectionChange(newGroupId)
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
    // TODO: this.props.fetchColectionData().then(
    this.props.fetchFeedData(newGroupId).then(
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

  openShow(id) {
    return () => this.props.history.push({ search: id.toString() });
  }

  closeShow() {
    this.props.history.push({ search: "" });
  }

  getCollectionArray(collection) {
    const allFeeds = this.props.feeds;
    const feedArticles = this.props.feedArticles;
    const articles = this.props.articles;
    const feeds = collection.feeds.map((feedId) => allFeeds[feedId]);
    let articlesArr = [];
    feeds.forEach((feed) => {
      const newArticles = feedArticles[feed.id.toString()].map((articleId) =>(
        articles[articleId]
      ));
      articlesArr += newArticles
    });

    articlesArr.sort((a,b) => (
      b.publish_date - a.publish_date
    ));

    return articlesArr.map((article) => (
      <ArticleIndexItem
        openFn={this.openShow.bind(this)}
        article={article} key={article.id}/>
    ));
  }

  getFeedArray() {
    const groupId = this.state.groupId;
    const readyForArticles = this.state.readyForArticles;
    if (groupId === undefined || !readyForArticles) {
      return [];
    }

    // debugger;
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
    // debugger;
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
          {this.getFeedArray()}
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
          <LoadingString className="test" />
        </div>
      </div>
    );
  }
}

export default ArticleIndex;
