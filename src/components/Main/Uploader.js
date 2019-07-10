import React, { Component } from "react";
import serverURL from "../../serverURL";
import "./Uploader.scss";

export default class Uploader extends Component {
  state = {
    files: [],
    key: 0,
    showForm: false
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
    })
      .then(() => this.props.onUpload())
      .catch(e => console.log("e"));
    this.setState(state => ({
      key: state.key + 1
    }));
  };

  handleChange = e => {
    this.setState({ files: e.target.files });
  };

  handleUploaderClick = e => {
    this.setState(state => ({
      showForm: !state.showForm
    }));
  };

  render() {
    return (
      <div className='uploader'>
        {this.state.showForm ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type='file'
              name='file'
              accept='.txt,.doc,.pdf,.docx,.png,.jpg,.gif,.svg,.mp3,.mp4'
              multiple
              onChange={this.handleChange}
              key={this.state.key} // to reset files
            />
            <input type='submit' value='upload' />
          </form>
        ) : null}
        <div className='uploader__showBtn' onClick={this.handleUploaderClick} />
      </div>
    );
  }
}
