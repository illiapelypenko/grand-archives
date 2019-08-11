import React from "react";

const Info = () => (
  <div className='contacts__info'>
    <div className='contacts__info-item'>
      <h3>Adress: </h3>
      <p>Khreschatyk St, 2, Kyiv</p>
    </div>
    <div className='contacts__info-item'>
      <h3>Phone: </h3>
      <a href='tel:+380955311510'>0955311510</a>
    </div>
    <div className='contacts__info-item'>
      <h3>Email: </h3>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='mailto:pelypenkoillya@gmail.com'
      >
        pelypenkoillya@gmail.com
      </a>
    </div>
  </div>
);

export default Info;
