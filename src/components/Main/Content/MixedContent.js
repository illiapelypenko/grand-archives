import React, { Component } from "react";
import Picture from "./Picture";
import Video from "./Video";
import Text from "./Text";
import Audio from "./Audio";

export default class MixedContent extends Component {
  render() {
    const { content } = this.props;
    return (
      <div className='content__container'>
        {content
          ? content.map((item, index) => {
              switch (item.type) {
                case "picture":
                  return <Picture name={item.name} key={index} />;
                case "video":
                  return <Video name={item.name} key={index} />;
                case "audio":
                  return <Audio name={item.name} key={index} />;
                case "text":
                  return <Text name={item.name} key={index} />;
              }
            })
          : null}
      </div>
    );
  }
}
