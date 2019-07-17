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
      const res = await fetch(`${serverURL}/api/users/register`, {
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
    const { name, email, password } = this.state.values;
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
        />
        <FormPart
          label=''
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={this.handleChange}
          placeholder='Enter Email'
        />
        <FormPart
          label=''
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={this.handleChange}
          placeholder='Enter Password'
        />
        <input type='submit' value='Register' id='submit' name='submit' />
      </form>
    );
  }
}

export default withRouter(Registration);
