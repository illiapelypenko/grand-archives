import React, { Component } from "react";
import SearchPic from "./searchPic";

export default class Search extends Component {
  handleChange = e => {
    this.props.onWordChange(e);
  };

  render() {
    return (
      <form className='search'>
        <label htmlFor='search'>Search for:</label>
        <input
          id='search'
          type='text'
          onChange={this.handleChange}
          value={this.props.word}
          placeholder='enter name'
        />
        {/* <SearchPic onSubmit={this.handleSubmit} /> */}
      </form>
    );
  }
}
