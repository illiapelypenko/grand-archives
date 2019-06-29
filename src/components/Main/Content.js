import React, { Component } from "react";
import Text from "./Text";
import Photo from "./Photo";
import Video from "./Video";
import Audio from "./Audio";

export default class Content extends Component {
  state = {
    content: [] // [{type: photo, name: 'apple'}]
  };

  componentDidMount() {
    fetch("http://localhost:5000/content")
      .then(res => res.json())
      .then(content => this.setState({ content }));
  }

  render() {
    const { content } = this.state;

    const data = content.map(item => {
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
    });

    return <div>{data[0]}</div>;
  }
}
