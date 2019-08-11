import React, { useState, useEffect } from "react";
import Slider from "./Slider/Slider";
import Navbar from "./Navbar/Navbar";
import "./Header.scss";
import Eye from "./Eye/Eye";
import { withRouter } from "react-router-dom";

const Header = ({
  isAuth,
  slider,
  name,
  onSubmenuClick,
  logout,
  switchMenu,
  location
}) => {
  const [showSlider, setShowSlider] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const lsShowSlider = localStorage.getItem("showSlider");
    if (lsShowSlider === null) {
      localStorage.setItem("showSlider", showSlider);
    } else {
      setShowSlider(JSON.parse(lsShowSlider));
    }
  }, []);

  useEffect(() => {
    if (/^\/auth/.test(location.pathname)) {
      setShowSlider(false);
    }
  }, [location.pathname]);

  const switchShowLogout = () => {
    setShowLogout(true);
  };

  const hadleShowSliderStatusChange = () => {
    if (!/^\/auth/.test(location.pathname)) {
      localStorage.setItem("showSlider", !showSlider);
      setShowSlider(!showSlider);
    }
  };

  return (
    <div className='header'>
      {showSlider ? <Slider slider={slider} /> : null}
      <Navbar
        isAuth={isAuth}
        logout={logout}
        name={name}
        switchMenu={switchMenu}
        onSubmenuClick={onSubmenuClick}
        showLogout={switchShowLogout}
      />
      <Eye
        showLogout={showLogout}
        showSlider={showSlider}
        onClick={hadleShowSliderStatusChange}
      />
    </div>
  );
};

export default withRouter(Header);
