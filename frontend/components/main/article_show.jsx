import React from "react";
import { Link } from 'react-router-dom';

export default ({ article, key }) => {
  const img = article.image === "No image data available" ?
    false : article.image;
  const imgSettings = img ?
    { backgroundImage: `url(${article.image})` } :
    { height: "0px" }
  return (
    <div className="article-show" key={key}>
      <div className="article-show-top">
        <span>header bar thing</span>
      </div>
      <div className="article-show-body">
        <h1>{article.title}</h1>
        <div>
          <div style={ imgSettings }
          className="show-image-container">
          </div>
        </div>
        <p>{article.description}</p>
        <sub>{article.publish_date}</sub>
      </div>
      <a className="nav-link link-button" target="_blank" href={article.url}>VISIT WEBSITE</a>
    </div>
  );
}
