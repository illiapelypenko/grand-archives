import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";

const Navbar = ({
  switchMenu,
  isAuth,
  logout,
  name,
  onSubmenuClick,
  showLogout
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  const handleClick = async () => {
    switchMenu();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  });

  return (
    <div className='navbar'>
      <Logo />
      {width <= 700 ? (
        showMenu ? (
          <ArrowUpIcon onClick={handleClick} />
        ) : (
          <ArrowDownIcon onClick={handleClick} />
        )
      ) : null}
      <Menu
        showLogout={showLogout}
        isAuth={isAuth}
        logout={logout}
        name={name}
        onSubmenuClick={onSubmenuClick}
        showSelf={width > 700 || showMenu ? true : false}
      />
    </div>
  );
};

export default Navbar;
