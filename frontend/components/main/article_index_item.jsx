import React from 'react';

export default ({key, article}) => {
  // const classString = classes.join(" ");
  return (
    <li className="article" key={key}>
      <div
        style={{backgroundImage: `url(${article.image})`}}
        className="article-image-container">
      </div>
      <span>{article.title}</span>
    </li>
  );
};

// <img className="article-image" src={article.image} />
