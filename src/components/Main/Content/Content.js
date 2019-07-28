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

    return (
      <div className='content'>
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={() => <MixedContent content={content} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Content);
