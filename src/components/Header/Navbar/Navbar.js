import React, { Component } from "react";
import Logo from "./Logo";
// import Menu from "./Menu";
import NewMenu from "./NewMenu";
import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";

export default class Navbar extends Component {
  state = {
    width: 0,
    showMenu: false
  };

  handleClick = async () => {
    this.props.switchMenu();
    this.setState(state => ({ showMenu: !state.showMenu }));
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { isAuth, logout, name, onSubmenuClick, showLogout } = this.props;
    const { width, showMenu } = this.state;

    return (
      <div className='navbar'>
        <Logo />
        {width <= 700 ? (
          showMenu ? (
            <ArrowUpIcon onClick={this.handleClick} />
          ) : (
            <ArrowDownIcon onClick={this.handleClick} />
          )
        ) : null}
        <NewMenu
          showLogout={showLogout}
          isAuth={isAuth}
          logout={logout}
          name={name}
          onSubmenuClick={onSubmenuClick}
          showSelf={width > 700 || showMenu ? true : false}
        />
      </div>
    );
  }
}
