import React, { Component } from "react";
import serverURL from "../../serverURL";
import Text from "./Text";

export default class Texts extends Component {
  state = {
    texts: []
  };

  componentDidMount() {
    fetch(`${serverURL}/texts`)
      .then(res => res.json())
      .then(texts => this.setState({ texts }));
  }

  render() {
    return (
      <div>
        {this.state.texts.map((text, index) => (
          <Text name={text} key={index} />
        ))}
      </div>
    );
  }
}
