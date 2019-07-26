import React, { Component } from "react";
import FormPart from "../Auth/FormPart";
import "./Filtration.scss";

export default class Filtration extends Component {
  state = {
    videos: true,
    pictures: true,
    audios: true,
    texts: true
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState(state => ({ [name]: !state[name] }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setFiltration(this.state);
  };

  render() {
    return (
      <form className='filtration' onSubmit={this.handleSubmit}>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='videos'
            id='videos'
            onChange={this.handleChange}
            checked={this.state.videos}
          />
          <label htmlFor='videos'>Videos</label>
        </div>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='pictures'
            id='pictures'
            onChange={this.handleChange}
            checked={this.state.pictures}
          />
          <label htmlFor='pictures'>Pictures</label>
        </div>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='audios'
            id='audios'
            onChange={this.handleChange}
            checked={this.state.audios}
          />
          <label htmlFor='audios'>Audios</label>
        </div>
        <div className='filtration__item'>
          <input
            type='checkbox'
            name='texts'
            id='texts'
            onChange={this.handleChange}
            checked={this.state.texts}
          />
          <label htmlFor='texts'>Texts</label>
        </div>
        <input type='submit' value='Submit' id='submit' />
      </form>
    );
  }
}
