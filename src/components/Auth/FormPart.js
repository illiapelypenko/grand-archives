import React, { Component } from "react";

export default class FormPart extends Component {
  render() {
    const {
      label,
      type,
      name,
      id,
      value,
      onChange,
      placeholder,
      error
    } = this.props;
    return (
      <div className='auth__form-part'>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <p className='auth__error-msg'>{error}</p>
      </div>
    );
  }
}
