import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Content.scss";
import Videos from "./Videos/Videos";
import Pictures from "./Pictures/Pictures";
import Audios from "./Audios/Audios";
import Texts from "./Texts/Texts";
import MixedContent from "./MixedContent";

export default class Content extends Component {
  render() {
    const { content } = this.props;
    const videos = content
      ? content.filter(item => item.type === "video").map(item => item.name)
      : [];
    const pictures = content
      ? content.filter(item => item.type === "picture").map(item => item.name)
      : [];
    const audios = content
      ? content.filter(item => item.type === "audio").map(item => item.name)
      : [];
    const texts = content
      ? content.filter(item => item.type === "text").map(item => item.name)
      : [];

    return (
      <div className='content'>
        <Switch>
          <Route path='/' render={() => <MixedContent content={content} />} />
          <Route path='/videos' render={() => <Videos videos={videos} />} />
          <Route
            path='/pictures'
            render={() => <Pictures pictures={pictures} />}
          />
          <Route path='/audios' render={() => <Audios audios={audios} />} />
          <Route path='/texts' render={() => <Texts texts={texts} />} />
        </Switch>
      </div>
    );
  }
}
