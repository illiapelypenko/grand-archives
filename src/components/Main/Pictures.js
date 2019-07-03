import React, { Component } from "react";
import serverURL from "../../serverURL";
import Picture from "./Picture";

export default class pictures extends Component {
  state = {
    pictures: []
  };

  componentDidMount() {
    fetch(`${serverURL}/pictures`)
      .then(res => res.json())
      .then(pictures => this.setState({ pictures }));
  }

  render() {
    return (
      <div>
        {this.state.pictures.map((picture, index) => (
          <Picture name={picture} key={index} />
        ))}
      </div>
    );
  }
}
