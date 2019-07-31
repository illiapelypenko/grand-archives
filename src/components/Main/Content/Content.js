import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import "./Content.scss";
import Picture from "./Picture";
import Video from "./Video";
import Text from "./Text";
import Audio from "./Audio";

class Content extends Component {
  render() {
    let { content } = this.props;

    return (
      <div className='content'>
        <div className='content__container'>
          {content
            ? content.map((item, index) => {
                switch (item.type) {
                  case "picture":
                    return (
                      <Picture
                        name={item.name}
                        uploaderName={item.uploaderName}
                        key={item.id}
                        id={item.id}
                        token={this.props.token}
                        personalRating={item.personalRating}
                      />
                    );
                  case "video":
                    return (
                      <Video
                        name={item.name}
                        uploaderName={item.uploaderName}
                        rating={item.rating}
                        key={item.id}
                        id={item.id}
                        token={this.props.token}
                      />
                    );
                  case "audio":
                    return (
                      <Audio
                        name={item.name}
                        uploaderName={item.uploaderName}
                        rating={item.rating}
                        key={item.id}
                        id={item.id}
                        token={this.props.token}
                      />
                    );
                  case "text":
                    return (
                      <Text
                        name={item.name}
                        uploaderName={item.uploaderName}
                        rating={item.rating}
                        key={item.id}
                        id={item.id}
                        token={this.props.token}
                      />
                    );
                  default:
                    return null;
                }
              })
            : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Content);
