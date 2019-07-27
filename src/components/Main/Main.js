import React, { Component } from "react";
import Uploader from "./Uploader/Uploader";
import Content from "./Content/Content";
import Pages from "./Pages";
import "./Main.scss";
import Filtration from "./Filtration";

export default class Main extends Component {
  state = {
    filters: {
      videos: true,
      pictures: true,
      audios: true,
      texts: true
    }
  };

  setFiltration = filters => {
    this.setState({ filters });
  };

  render() {
    return (
      <div className={`main ${this.props.menuOpened ? "pdtop" : null}`}>
        {this.props.isAuth ? <Uploader onUpload={this.props.onUpload} /> : null}
        <Content content={this.props.content} filters={this.state.filters} />
        {this.props.route.match.path === "/content" &&
        this.props.route.match.isExact ? (
          <Filtration setFiltration={this.setFiltration} />
        ) : null}
        <Pages />
      </div>
    );
  }
}
