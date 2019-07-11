import React, { Component } from "react";

export default class FormPart extends Component {
  render() {
    const { label, type, name, id, value, onChange } = this.props;
    return (
      <div className='form-part'>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}
