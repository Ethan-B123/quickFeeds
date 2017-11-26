import React from "react";
import SplashNav from "../splash/splash_nav_container";


class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showusername: true,
      showpassword: true,
      username: "",
      password: ""
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.signup(this.state);
  }

  handleInput(type) {
    return e => this.setState({[type]: e.target.value});
  }

  handleBlur(type) {
    const key = "show" + type
    return e => {
      if (this.state[type] === ""){
        this.setState({ [key]: true });
      }
    }
  }

  handleFocus(type) {
    const key = "show" + type
    return e => {
      this.setState({ [key]: false });
    }
  }

  render() {
    return (
      <section className="form-container">
      <SplashNav />
        <form>
          <h4>Set up an account</h4>
          <ul className="session-error-container">
            {this.props.errors.map((error) => (<li key={error} className="session-error">{error}</li>))}
          </ul>
          {this.state.showusername ? <label htmlFor="username-input">Username</label> : ""}
          <input id="username-input"
            type="text"
            onChange={this.handleInput("username")}
            onFocus={this.handleFocus("username")}
            onBlur={this.handleBlur("username")} />
            {this.state.showpassword ? <label htmlFor="password-input">Password</label> : ""}
          <input id="password-input"
            type="password"
            onChange={this.handleInput("password")}
            onFocus={this.handleFocus("password")}
            onBlur={this.handleBlur("password")} />
          <button className={"submit-button"} onClick={this.handleSubmit.bind(this)}>Sign Up</button>
        </form>
      </section>
    );
  }
}


export default SessionForm;
