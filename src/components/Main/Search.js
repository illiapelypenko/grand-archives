import React, { Component } from "react";
import SearchPic from "./searchPic";

export default class Search extends Component {
  state = {
    value: ""
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };

  handleSubmit = () => {};

  render() {
    return (
      <form className='search'>
        <input
          type='text'
          onChange={this.handleChange}
          value={this.state.value}
          placeholder='by uploader'
        />
        <SearchPic onSubmit={this.handleSubmit} />
      </form>
    );
  }
}
