import React, { Component } from "react";
import FormPart from "./FormPart";
import { withRouter } from "react-router-dom";
import serverURL from "../../serverURL";

class Registration extends Component {
  state = {
    values: {
      name: "",
      email: "",
      password: ""
    },
    errors: {
      name: "",
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
      const res = await fetch(`${serverURL}/api/users/register`, {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        const data = await res.json();
        const error = data.error;
        if (res.status === 400) {
          this.setState({
            errors: {
              ...this.state.errors,
              [error]: `invalid ${error}`
            }
          });
        }
        throw Error(`${error} not valid`);
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
    const { name, email, password } = this.state.values;
    const {
      name: nameError,
      email: emailError,
      password: passwordError
    } = this.state.errors;
    return (
      <form onSubmit={this.handleSubmit} className={`auth__form`}>
        <FormPart
          label=''
          type='name'
          name='name'
          id='name'
          value={name}
          onChange={this.handleChange}
          placeholder='Enter Name'
          error={nameError}
        />
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
        <input type='submit' value='Register' id='submit' name='submit' />
      </form>
    );
  }
}

export default withRouter(Registration);
