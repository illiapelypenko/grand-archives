import React, { Component } from "react";
import FormPart from "../Auth/FormPart";
import "./Filtration.scss";
import Search from "./Search";

export default class Filtration extends Component {
  state = {
    searchWord: ""
  };

  handleChange = e => {
    this.props.onChangeFilters(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setFiltration(this.state.searchWord);
  };

  handleWordChange = e => {
    const { value } = e.target;
    this.setState({ searchWord: value });
  };

  render() {
    const { videos, pictures, audios, texts } = this.props.filters;

    return (
      <form className='filtration' onSubmit={this.handleSubmit}>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='videos'
            id='videos'
            onChange={this.handleChange}
            checked={videos}
          />
          <label htmlFor='videos'>Videos</label>
        </div>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='pictures'
            id='pictures'
            onChange={this.handleChange}
            checked={pictures}
          />
          <label htmlFor='pictures'>Pictures</label>
        </div>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='audios'
            id='audios'
            onChange={this.handleChange}
            checked={audios}
          />
          <label htmlFor='audios'>Audios</label>
        </div>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='texts'
            id='texts'
            onChange={this.handleChange}
            checked={texts}
          />
          <label htmlFor='texts'>Texts</label>
        </div>
        <Search
          onWordChange={this.handleWordChange}
          word={this.state.searchWord}
        />
        <input type='submit' value='Submit' id='submit' />
      </form>
    );
  }
}
