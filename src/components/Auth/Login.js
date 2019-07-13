import React, { Component } from "react";
import FormPart from "./FormPart";
import { withRouter } from "react-router-dom";
import serverURL from "../../serverURL";

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
      const res = await fetch(`${serverURL}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        throw Error(await res.text());
      }
      const token = await res.text();
      localStorage.setItem("token", token);
      this.props.login();
      this.props.history.push("/content/pictures");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { email, password } = this.state.values;
    return (
      <form onSubmit={this.handleSubmit} className='auth__form'>
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
        <input type='submit' value='Login' id='submit' name='submit' />
      </form>
    );
  }
}

export default withRouter(Login);
