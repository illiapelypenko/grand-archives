import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Videos from "./Videos";
import Pictures from "./Pictures";
import Audios from "./Audios";
import Texts from "./Texts";
import Menu from "./Menu";

export default class Content extends Component {
  render() {
    const { content } = this.props;
    const videos = content
      ? content.find(item => item.type === "videos").content
      : [];
    const pictures = content
      ? content.find(item => item.type === "pictures").content
      : [];
    const audios = content
      ? content.find(item => item.type === "audios").content
      : [];
    const texts = content
      ? content.find(item => item.type === "texts").content
      : [];

    return (
      <Router>
        <Menu />
        <Switch>
          <Route path='/videos' render={() => <Videos videos={videos} />} />
          <Route
            path='/pictures'
            render={() => <Pictures pictures={pictures} />}
          />
          <Route path='/audios' render={() => <Audios audios={audios} />} />
          <Route path='/texts' render={() => <Texts texts={texts} />} />
        </Switch>
      </Router>
    );
  }
}
