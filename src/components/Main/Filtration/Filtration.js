import React, { Component } from "react";
import "./Filtration.scss";
import Search from "./Search";

export default class Filtration extends Component {
  state = {
    searchWord: "",
    sortby: "new"
  };

  handleChange = e => {
    this.props.onChangeFilters(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setFiltration(this.state.searchWord, this.state.sortby);
  };

  handleWordChange = e => {
    const { value } = e.target;
    this.setState({ searchWord: value });
  };

  handleSortingChange = e => {
    const { value } = e.target;
    this.setState({ sortby: value });
  };

  render() {
    const { videos, pictures, audios, texts } = this.props.filters;
    const { sortby, searchWord } = this.state;

    return (
      <form className='filtration' onSubmit={this.handleSubmit}>
        <div className='sort'>
          <label htmlFor='sort'>Sort by:</label>
          <select id='sort' onChange={this.handleSortingChange} value={sortby}>
            <option value='new'>New</option>
            <option value='old'>Old</option>
            <option value='nameaz'>Name a-z</option>
            <option value='nameza'>Name z-a</option>
            <option value='uploadernameaz'>Uploader's name a-z</option>
            <option value='uploadernameza'>Uploader's name z-a</option>
          </select>
        </div>
        <div className='filtration__item' style={{ gridArea: "vd" }}>
          <input
            type='checkbox'
            name='videos'
            id='videos'
            onChange={this.handleChange}
            checked={videos}
          />
          <label htmlFor='videos'>Videos</label>
        </div>
        <div className='filtration__item' style={{ gridArea: "pc" }}>
          <input
            type='checkbox'
            name='pictures'
            id='pictures'
            onChange={this.handleChange}
            checked={pictures}
          />
          <label htmlFor='pictures'>Pictures</label>
        </div>
        <input type='submit' value='Submit' id='submit' />

        <Search onWordChange={this.handleWordChange} word={searchWord} />

        <div className='filtration__item' style={{ gridArea: "ad" }}>
          <input
            type='checkbox'
            name='audios'
            id='audios'
            onChange={this.handleChange}
            checked={audios}
          />
          <label htmlFor='audios'>Audios</label>
        </div>
        <div className='filtration__item' style={{ gridArea: "tx" }}>
          <input
            type='checkbox'
            name='texts'
            id='texts'
            onChange={this.handleChange}
            checked={texts}
          />
          <label htmlFor='texts'>Texts</label>
        </div>
      </form>
    );
  }
}
