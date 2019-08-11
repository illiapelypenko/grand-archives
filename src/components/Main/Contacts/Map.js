import React from "react";

const Map = () => (
  <div className='contacts__map'>
    <iframe
      title='map'
      id='gmap'
      scrolling='no'
      src='https://maps.google.com/maps?q=Khreschatyk%20St%2C%202%2C%20Kyiv%2C%2002000&t=&z=13&ie=UTF8&iwloc=&output=embed'
      frameBorder='0'
    />
  </div>
);

export default Map;
