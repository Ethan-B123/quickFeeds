import React from "react";

class ReadButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const keys = this.props.keys;
    const articleId = this.props.articleId;
    const deleteRead = this.props.deleteRead;
    const createRead = this.props.createRead;
    return (
      <div>
        { keys.includes(articleId) ?
          <button onClick={() => deleteRead(articleId)}>
          <span>remove read</span>
          </button> :
          <button onClick={() => createRead(articleId)}>
          <span>add read</span>
          </button>
        }
      </div>
    );
  }
}

export default ReadButton;
