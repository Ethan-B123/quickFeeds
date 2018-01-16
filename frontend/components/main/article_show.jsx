import React from "react";
import { Link } from 'react-router-dom';
import ReadButton from "./read_button_container";
let className = ""

function addClassTest() {
  className = "show-image";
  console.log("loaded");
}

class ArticleShow extends React.Component {
  constructor(props){
    super(props);
    this.state = { styles: {
      opacity: 0,
      // maxHeight: "0%"
    } }
  }

  imageLoaded() {
    this.setState({
      styles: {
        opacity: 1,
        maxWidth: "100%",
        // maxHeight: "100%",
        objectFit: "fill"
      }
    });
  }

  render() {
    const { article, key } = this.props;
    const image = article.image === "No image data available" ?
      false : article.image;
    const imgSettings = image ?
      { backgroundImage: `url(${article.image})` } :
      { height: "0px" }
    return (
      <div className="article-show" key={key}>
      <div className="article-show-top">
      <ReadButton articleId={article.id} />
      </div>
        <div className="inner-section">
          <div className="article-show-body">
          <h1>{article.title}</h1>
          <div>
          {image ? <div className="show-image-container">
            <img onLoad={this.imageLoaded.bind(this)} style={this.state.styles} src={image} />
          </div> : ""}

          </div>
          <p>{article.description}</p>
          <sub>{article.publish_date.toLocaleString()}</sub>
          </div>
        </div>
        <a className="nav-link link-button" target="_blank" href={article.url}>VISIT WEBSITE</a>
      </div>
    );
  }
}

export default ArticleShow;

// export default ({ article, key }) => {
//   const image = article.image === "No image data available" ?
//     false : article.image;
//   const imgSettings = image ?
//     { backgroundImage: `url(${article.image})` } :
//     { height: "0px" }
//   return (
//     <div className="article-show" key={key}>
//     <div className="article-show-top">
//     <ReadButton articleId={article.id} />
//     </div>
//       <div className="inner-section">
//         <div className="article-show-body">
//         <h1>{article.title}</h1>
//         <div>
//         {image ? <div className="show-image-container">
//           <img onLoad={addClassTest} className={className} src={image} />
//         </div> : ""}
//
//         </div>
//         <p>{article.description}</p>
//         <sub>{article.publish_date.toLocaleString()}</sub>
//         </div>
//       </div>
//       <a className="nav-link link-button" target="_blank" href={article.url}>VISIT WEBSITE</a>
//     </div>
//   );
// }
