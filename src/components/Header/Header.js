import React, { Component } from "react";
import Slider from "./Slider/Slider";
import Navbar from "./Navbar/Navbar";
import "./Header.scss";
import Eye from "./Eye/Eye";
import { withRouter } from "react-router-dom";

class Header extends Component {
  state = {
    showSlider: true
  };

  componentDidMount() {
    const showSlider = localStorage.getItem("showSlider");
    if (showSlider === null) {
      localStorage.setItem("showSlider", this.state.showSlider);
    } else {
      this.setState({ showSlider: JSON.parse(showSlider) });
    }
  }

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
    const { isAuth, slider, name, menuOpened, onSubmenuClick } = this.props;
    const { showSlider } = this.state;
    return (
      <div className='header'>
        {showSlider ? <Slider slider={slider} /> : null}
        <Navbar
          isAuth={isAuth}
          logout={this.props.logout}
          name={name}
          switchMenu={this.props.switchMenu}
          onSubmenuClick={onSubmenuClick}
        />
        <Eye
          menuOpened={menuOpened}
          showSlider={showSlider}
          onClick={this.hadleShowSliderStatusChange}
        />
      </div>
    );
  }
}

export default withRouter(Header);
