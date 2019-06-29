import React, { Component } from "react";

export default class Uploader extends Component {
  handleChange = e => {
    const data = new FormData();

    e.target.files.forEach(file => {
      data.append(file.name, file);
    });

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data
    });
  };

  render() {
    return (
      <div>
        <input
          type='file'
          name='file'
          onChange={this.handleChange}
          accept='audio/*|video/*|image/*'
          multiple
        />
      </div>
    );
  }
}
