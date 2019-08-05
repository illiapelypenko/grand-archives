import React, { Component } from "react";
import Slider from "./Slider/Slider";
import Navbar from "./Navbar/Navbar";
import "./Header.scss";
import Eye from "./Eye/Eye";
import { withRouter } from "react-router-dom";

class Header extends Component {
  state = {
    showSlider: true,
    showLogout: false
  };

  componentDidMount() {
    const showSlider = localStorage.getItem("showSlider");
    if (showSlider === null) {
      localStorage.setItem("showSlider", this.state.showSlider);
    } else {
      this.setState({ showSlider: JSON.parse(showSlider) });
    }
  }

  switchShowLogout = () => {
    this.setState(state => ({ showLogout: true }));
  };

  hadleShowSliderStatusChange = () => {
    if (!/^\/auth/.test(this.props.location.pathname)) {
      localStorage.setItem("showSlider", !this.state.showSlider);
      this.setState(state => ({ showSlider: !state.showSlider }));
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (/^\/auth/.test(props.location.pathname)) {
      return {
        showSlider: false
      };
    }
    return null;
  }

  render() {
    const {
      isAuth,
      slider,
      name,
      onSubmenuClick,
      logout,
      switchMenu
    } = this.props;
    const { showSlider, showLogout } = this.state;
    return (
      <div className='header'>
        {showSlider ? <Slider slider={slider} /> : null}
        <Navbar
          isAuth={isAuth}
          logout={logout}
          name={name}
          switchMenu={switchMenu}
          onSubmenuClick={onSubmenuClick}
          showLogout={this.switchShowLogout}
        />
        <Eye
          showLogout={showLogout}
          showSlider={showSlider}
          onClick={this.hadleShowSliderStatusChange}
        />
      </div>
    );
  }
}

export default withRouter(Header);
