import React from "react";
import "./Footer.scss";
import Socials from "./Socials";

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; created by Illia Pelypenko</p>
      <Socials />
    </div>
  );
};

export default Footer;
