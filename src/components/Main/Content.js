import React, { Component } from "react";
import Item from "./Item";

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

    const data = content.map(item => <Item item={item} />);

    return <div>{data}</div>;
  }
}
