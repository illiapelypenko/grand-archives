import React, { Component } from "react";
import FormPart from "./FormPart";
import { withRouter } from "react-router-dom";
import serverURL from "../../serverURL";

class Login extends Component {
  state = {
    values: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
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

    for (let key in this.state.values) {
      let error = "";
      if (!this.state.values[key]) {
        error = `can't be empty`;
      } else {
        error = ``;
      }

      this.setState(state => ({
        errors: {
          ...state.errors,
          [key]: error
        }
      }));
    }

    for (let key in this.state.values) {
      if (!this.state.values[key]) return null;
    }

    try {
      const res = await fetch(`${serverURL}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      const { token, error, name } = data;
      if (!res.ok) {
        if (res.status === 400) {
          this.setState({
            errors: {
              ...this.state.errors,
              [error]: `invalid ${error}`
            }
          });
        }
        throw Error(`${error} already exists`);
      }
      localStorage.setItem("token", token);
      this.props.login(name);
      this.props.history.push("/content/pictures");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { email, password } = this.state.values;
    const { email: emailError, password: passwordError } = this.state.errors;
    return (
      <form onSubmit={this.handleSubmit} className='auth__form'>
        <FormPart
          label=''
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={this.handleChange}
          placeholder='Enter Email'
          error={emailError}
        />
        <FormPart
          label=''
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={this.handleChange}
          placeholder='Enter Password'
          error={passwordError}
        />
        <input type='submit' value='Login' id='submit' name='submit' />
      </form>
    );
  }
}

export default withRouter(Login);