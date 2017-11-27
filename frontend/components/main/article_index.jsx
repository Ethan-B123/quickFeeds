import React from "react";
import ArticleIndexItem from "./article_index_item";
import SideNav from "./sidebar_container";
import TopNav from "./top_nav_container";
import LoadingString from "./loading_widget";

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

  getArticlesArray() {
    const groupId = this.state.groupId;
    const readyForArticles = this.state.readyForArticles;
    if (groupId === undefined || !readyForArticles) {
      return [];
    }
    const articles = this.props.feedArticles[groupId].map((articleId)=>{
      const article = this.props.articles[articleId];
      return (
        <ArticleIndexItem article={article} key={article.id}/>
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

  render() {
    return (
      <div className="article-index">
        <SideNav />
        <TopNav />
        <ReactCSSTransitionGroup
          component="ul"
          transitionName="article"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {this.getArticlesArray()}
        </ReactCSSTransitionGroup>
        <div className="loading-container">
          <LoadingString className="test" />
        </div>
      </div>
    );
  }
}

export default ArticleIndex;
