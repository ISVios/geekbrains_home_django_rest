import axios from "axios";
import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.getToken(this.state.login, this.state.password);
    event.preventDefault();
  }

  getToken(login, password) {
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", {
        username: login,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        return true;
      })
      .catch((error) => {
        alert("Wrong login or password");
      });
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input
          type="text"
          name="login"
          placeholder="login"
          value={this.state.login}
          onChange={(event) => this.handleChange(event)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={(event) => this.handleChange(event)}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;
