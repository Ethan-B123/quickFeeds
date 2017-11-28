import React from 'react';

export default ({key, article, openFn}) => {
  // const classString = classes.join(" ");
  return (
    <li onClick={openFn(article.id)} className="article" key={key}>
      <div
        style={{backgroundImage: `url(${article.image})`}}
        className="article-image-container">
      </div>
      <div className="article-item-right-container">
        <h3>{article.title}</h3>
        <sub>{article.publish_date}</sub>
      </div>
    </li>
  );
};

// <img className="article-image" src={article.image} />
