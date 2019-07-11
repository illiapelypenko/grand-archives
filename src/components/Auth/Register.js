import React, { Component } from "react";
import FormPart from "./FormPart";

export default class Register extends Component {
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

  render() {
    const { name, email, password } = this.state.values;
    return (
      <form>
        <FormPart
          label='Name:'
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
