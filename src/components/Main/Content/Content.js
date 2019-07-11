import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Content.scss";
import Videos from "./Videos";
import Pictures from "./Pictures";
import Audios from "./Audios";
import Texts from "./Texts";

export default class Content extends Component {
  render() {
    const { content } = this.props;
    const videos = content
      ? content.filter(item => item.type === "video").map(item => item.content)
      : [];
    const pictures = content
      ? content
          .filter(item => item.type === "picture")
          .map(item => item.content)
      : [];
    const audios = content
      ? content.filter(item => item.type === "audio").map(item => item.content)
      : [];
    const texts = content
      ? content.filter(item => item.type === "text").map(item => item.content)
      : [];

    return (
      <div className='content'>
        <Switch>
          <Route
            path='/content/videos'
            render={() => <Videos videos={videos} />}
          />
          <Route
            path='/content/pictures'
            render={() => <Pictures pictures={pictures} />}
          />
          <Route
            path='/content/audios'
            render={() => <Audios audios={audios} />}
          />
          <Route path='/content/texts' render={() => <Texts texts={texts} />} />
        </Switch>
      </div>
    );
  }
}
