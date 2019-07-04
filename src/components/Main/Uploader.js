import React, { Component } from "react";
import serverURL from "../../serverURL";

export default class Uploader extends Component {
  state = {
    files: []
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    const { files } = this.state;

    for (let i = 0; i < files.length; i++) {
      data.append(files[i].name, files[i]);
    }

    fetch(`${serverURL}/api/content/upload`, {
      method: "POST",
      body: data
    }).then(() => this.props.onUpload());
  };

  handleChange = e => {
    this.setState({ files: e.target.files });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='file'
          name='file'
          accept='.txt,.doc,.pdf,.docx,.png,.jpg,.gif,.svg,.mp3,.mp4'
          multiple
          onChange={this.handleChange}
        />
        <input type='submit' value='upload' />
      </form>
    );
  }
}
