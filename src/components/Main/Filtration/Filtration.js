import React, { Component } from "react";
import "./Filtration.scss";
import Search from "./Search";

const Filtration = ({
  sortby,
  search,
  filters,
  onChangeFilters,
  setFiltration,
  onSearchWordChange,
  onSortWordChange
}) => {
  const handleChange = e => {
    onChangeFilters(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFiltration();
  };

  const handleWordChange = e => {
    const { value } = e.target;
    onSearchWordChange(value);
  };

  const handleSortingChange = e => {
    const { value } = e.target;
    onSortWordChange(value);
  };

  const { videos, pictures, audios, texts } = filters;

  return (
    <form className='filtration' onSubmit={handleSubmit}>
      <div className='sort'>
        <label htmlFor='sort'>Sort by:</label>
        <select id='sort' onChange={handleSortingChange} value={sortby}>
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
          onChange={handleChange}
          checked={videos}
        />
        <label htmlFor='videos'>Videos</label>
      </div>
      <div className='filtration__item' style={{ gridArea: "pc" }}>
        <input
          type='checkbox'
          name='pictures'
          id='pictures'
          onChange={handleChange}
          checked={pictures}
        />
        <label htmlFor='pictures'>Pictures</label>
      </div>
      <input type='submit' value='Submit' id='submit' />

      <Search onWordChange={handleWordChange} word={search} />

      <div className='filtration__item' style={{ gridArea: "ad" }}>
        <input
          type='checkbox'
          name='audios'
          id='audios'
          onChange={handleChange}
          checked={audios}
        />
        <label htmlFor='audios'>Audios</label>
      </div>
      <div className='filtration__item' style={{ gridArea: "tx" }}>
        <input
          type='checkbox'
          name='texts'
          id='texts'
          onChange={handleChange}
          checked={texts}
        />
        <label htmlFor='texts'>Texts</label>
      </div>
    </form>
  );
};

export default Filtration;
