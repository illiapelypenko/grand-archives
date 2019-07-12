import React, { Component } from "react";
import "./Colors.scss";

export default class Colors extends Component {
  render() {
    // const colors = ["#fcae62", "#cf3d42", "#442931"];
    const colors = ["#000b29", "#d70026", "#f8f5f2"];
    let blocks = [];
    for (let color of colors) {
      for (let back of colors) {
        if (color !== back) {
          blocks.push(
            <div className='block' style={{ color: color, background: back }}>
              <p>Grand Archive</p>
            </div>
          );
        }
      }
    }
    return <div className='colors'> {blocks} </div>;
  }
}
