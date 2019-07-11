import React, { Component } from "react";
import FormPart from "./FormPart";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    values: {
      email: "brad@brad.brad",
      password: "bradbrad"
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const token = await res.text();
      localStorage.setItem("token", token);
      this.props.login();
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { email, password } = this.state.values;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormPart
          label='Email:'
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={this.handleChange}
        />
        <FormPart
          label='Password:'
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={this.handleChange}
        />
        <input type='submit' value='Submit' id='submit' name='submit' />
      </form>
    );
  }
}

export default withRouter(Login);
