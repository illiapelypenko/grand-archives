import React, { Component } from "react";
import serverURL from "../../serverURL";
import Audio from "./Audio";

export default class Audios extends Component {
  state = {
    audios: []
  };

  componentDidMount() {
    fetch(`${serverURL}/audios`)
      .then(res => res.json())
      .then(audios => this.setState({ audios }));
  }
  render() {
    return (
      <div>
        {this.state.audios.map((audio, index) => (
          <Audio name={audio} key={index} />
        ))}
      </div>
    );
  }
}
