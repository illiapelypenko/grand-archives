import React from "react";
import "./Footer.scss";
import Socials from "./Socials";

export default () => {
  return (
    <div className='footer'>
      <p>&copy; created by Illia Pelypenko</p>
      <Socials />
    </div>
  );
};
