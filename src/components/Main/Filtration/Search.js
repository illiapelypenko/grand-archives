import React from "react";

const Search = ({ word, onWordChange }) => (
  <div className='search'>
    <label htmlFor='search'>Search:</label>
    <input
      id='search'
      type='text'
      onChange={e => onWordChange(e)}
      value={word}
      placeholder='enter uploader'
    />
  </div>
);

export default Search;
