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
    const groupId = this.props.match.params.groupId
    this.state = {
      groupId: undefined,
      readyForArticles: true
    };
    this.onFeedChange(groupId);
  }

  componentWillReceiveProps(newProps) {
    const groupId = this.props.match.params.groupId
    const newGroupId = newProps.match.params.groupId
    if (groupId !== newGroupId) {
      this.onFeedChange(newGroupId);
    }
  }

  onFeedChange(newGroupId) {
    this.setState({ groupId: undefined, readyForArticles: false });
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

  getArticlesArray() {
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
      [<div onClick={this.closeShow.bind(this)}
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
          {this.getArticlesArray()}
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
