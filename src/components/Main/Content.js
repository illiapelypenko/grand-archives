import React, { Component } from "react";
import Item from "./Item";
import serverURL from "../../serverURL";

export default class Content extends Component {
  state = {
    content: [] // [{type: photo, name: 'apple'}]
  };

  componentDidMount() {
    fetch(`${serverURL}/content`)
      .then(res => res.json())
      .then(content => this.setState({ content }));
  }

  render() {
    const { content } = this.state;

    const data = content.map((item, index) => <Item item={item} key={index} />);

    return <div>{data}</div>;
  }
}
