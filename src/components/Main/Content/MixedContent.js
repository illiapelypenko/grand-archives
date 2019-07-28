import React, { Component } from "react";
import Picture from "./Pictures/Picture";
import Video from "./Videos/Video";
import Text from "./Texts/Text";
import Audio from "./Audios/Audio";

export default class MixedContent extends Component {
  render() {
    let { content } = this.props;

    return (
      <div className='content__container'>
        {content
          ? content.map((item, index) => {
              switch (item.type) {
                case "picture":
                  return (
                    <Picture
                      name={item.name}
                      uploaderName={item.uploaderName}
                      rating={item.rating}
                      key={index}
                    />
                  );
                case "video":
                  return (
                    <Video
                      name={item.name}
                      uploaderName={item.uploaderName}
                      rating={item.rating}
                      key={index}
                    />
                  );
                case "audio":
                  return (
                    <Audio
                      name={item.name}
                      uploaderName={item.uploaderName}
                      rating={item.rating}
                      key={index}
                    />
                  );
                case "text":
                  return (
                    <Text
                      name={item.name}
                      uploaderName={item.uploaderName}
                      rating={item.rating}
                      key={index}
                    />
                  );
                default:
                  return null;
              }
            })
          : null}
      </div>
    );
  }
}
