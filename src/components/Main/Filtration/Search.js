import React, { Component } from "react";

export default class Search extends Component {
  handleChange = e => {
    this.props.onWordChange(e);
  };

  render() {
    return (
      <form className='search'>
        <label htmlFor='search'>Search:</label>
        <input
          id='search'
          type='text'
          onChange={this.handleChange}
          value={this.props.word}
          placeholder='enter uploader'
        />
      </form>
    );
  }
}
