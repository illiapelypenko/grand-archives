import React, { Component } from "react";
import serverURL from "../../../serverURL";
import "./Uploader.scss";
import UploaderPic from "./UploadPic";
import ArrowPic from "./ArrowRightPic";

export default class Uploader extends Component {
  state = {
    files: [],
    key: 0,
    showForm: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    const { files } = this.state;

    for (let i = 0; i < files.length; i++) {
      data.append(files[i].name, files[i]);
    }
    data.append("token", localStorage.getItem("token"));
    data.append("uploaderName", localStorage.getItem("name"));

    try {
      const res = await fetch(`${serverURL}/api/content/upload`, {
        method: "POST",
        body: data
      });
      this.props.onUpload();
      if (!res.ok) {
        throw Error(`server error`);
      }
    } catch (e) {
      console.error(e);
    }

    this.setState(state => ({
      key: state.key + 1,
      showForm: false
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
    const { showForm, key } = this.state;

    return (
      <div className='uploader'>
        {showForm ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type='file'
              name='file'
              accept='.txt,.doc,.pdf,.docx,.png,.jpg,.gif,.svg,.mp3,.mp4'
              multiple
              onChange={this.handleChange}
              key={key} // to reset files
            />
            <input type='submit' value='upload' />
          </form>
        ) : null}
        <div className='uploader__showBtn' onClick={this.handleUploaderClick}>
          {showForm ? <ArrowPic /> : <UploaderPic />}
        </div>
      </div>
    );
  }
}
