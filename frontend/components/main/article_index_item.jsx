import React from 'react';

export default ({key, article, openFn}) => {
console.log(article.image === "No image data available");
  const imageUrl = article.image === "No image data available"
    ? ""
    : "http://res.cloudinary.com/dhc8w148v/image/fetch/c_fill,g_center,h_80,q_100,w_140/" + article.image;
  return (
    <li onClick={openFn(article.id)} className="article" key={key}>
      <div
        style={{backgroundImage: `url(${imageUrl})`}}
        className="article-image-container">
      </div>
      <div className="article-item-right-container">
        <h3>{article.title}</h3>
        <sub>{article.publish_date.toLocaleString()}</sub>
      </div>
    </li>
  );
};
// http://res.cloudinary.com/dhc8w148v/image/fetch/c_fill,g_center,h_80,q_100,w_140/http://www.nasa.gov/sites/default/files/thumbnails/image/nithin_mac_panel_0.jpg
