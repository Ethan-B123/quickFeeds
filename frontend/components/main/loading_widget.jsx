import React from "react";

const tickLength = 300;

class LoadingString extends React.Component {

  constructor(props) {
    super(props);
    this.state = { string: "loading", dots: 0 };
    setTimeout(this.tickUpdate.bind(this), tickLength);
  }

  tickUpdate() {
    const dots = this.state.dots;
    let loadingString = "loading";
    for (let i = 0; i <= dots; i++) {
      loadingString += ".";
    }
    this.setState({dots: (dots + 1) % 4, string: loadingString});
    setTimeout(this.tickUpdate.bind(this), tickLength);
  }

  render() {
    return (
      <h1>{this.state.string}</h1>
    );
  }
}

export default LoadingString;
