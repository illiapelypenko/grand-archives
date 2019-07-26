import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import "./Content.scss";
import Videos from "./Videos/Videos";
import Pictures from "./Pictures/Pictures";
import Audios from "./Audios/Audios";
import Texts from "./Texts/Texts";
import MixedContent from "./MixedContent";

class Content extends Component {
  render() {
    const { content, match } = this.props;
    const videos = content.filter(item => item.type === "video");
    const pictures = content.filter(item => item.type === "picture");
    const audios = content.filter(item => item.type === "audio");
    const texts = content.filter(item => item.type === "text");

    return (
      <div className='content'>
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={() => (
              <MixedContent filters={this.props.filters} content={content} />
            )}
          />
          <Route
            path={`${match.path}/pictures`}
            render={() => <MixedContent content={pictures.slice(0, 9)} />}
          />
          <Route
            path={`${match.path}/videos`}
            render={() => <MixedContent content={videos.slice(0, 9)} />}
          />
          <Route
            path={`${match.path}/audios`}
            render={() => <MixedContent content={audios.slice(0, 9)} />}
          />
          <Route
            path={`${match.path}/texts`}
            render={() => <MixedContent content={texts.slice(0, 9)} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Content);
