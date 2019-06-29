import React, { Component } from "react";
import Text from "./Text";
import Photo from "./Photo";
import Video from "./Video";
import Audio from "./Audio";

export default class Item extends Component {
  render() {
    const { item } = this.props;
    switch (item.type) {
      case "text":
        return <Text name={item.name} />;
      case "photo":
        return <Photo name={item.name} />;
      case "video":
        return <Video name={item.name} />;
      case "audio":
        return <Audio name={item.name} />;
      default:
        return null;
    }
  }
}
