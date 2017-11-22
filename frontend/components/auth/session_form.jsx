import React from "react";


class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.login(this.state);
  }

  handleInput(type) {
    return e => this.setState({[type]: e.target.value});
  }

  render() {
    return (
      <form>
        <h4>Login to quickFeeds</h4>
        <h5>{this.state.username}</h5>
        <label htmlFor="username-input">Username: </label>
        <input id="username-input" type="text" onChange={this.handleInput("username")} />
        <label htmlFor="password-input">Password: </label>
        <input id="password-input" type="password" onChange={this.handleInput("password")} />
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      </form>
    );
  }
}


export default SessionForm;
