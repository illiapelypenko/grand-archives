import React, { Component } from "react";
import serverURL from "../../serverURL";
import Video from "./Video";

export default class Videos extends Component {
  state = {
    videos: [] // [{type: photo, name: 'apple'}]
  };

  componentDidMount() {
    fetch(`${serverURL}/videos`)
      .then(res => res.json())
      .then(videos => this.setState({ videos }));
  }

  render() {
    return (
      <div>
        {this.state.videos.map((video, index) => (
          <Video name={video} key={index} />
        ))}
      </div>
    );
  }
}
