import React, { useState } from "react";
import serverURL from "../../../serverURL";
import "./Uploader.scss";
import UploaderPic from "./UploadPic";
import ArrowPic from "./ArrowRightPic";

const Uploader = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [key, setKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();

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
      onUpload();
      if (!res.ok) {
        throw Error(`server error`);
      }
    } catch (e) {
      console.error(e);
    }
    setKey(key + 1);
    setShowForm(false);
  };

  const handleChange = e => {
    setFiles(e.target.files);
  };

  const handleUploaderClick = e => {
    setShowForm(!showForm);
  };

  return (
    <div className='uploader'>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            name='file'
            accept='.txt,.doc,.pdf,.docx,.png,.jpg,.gif,.svg,.mp3,.mp4'
            multiple
            onChange={handleChange}
            key={key} // to reset files
          />
          <input type='submit' value='upload' />
        </form>
      ) : null}
      <div className='uploader__showBtn' onClick={handleUploaderClick}>
        {showForm ? <ArrowPic /> : <UploaderPic />}
      </div>
    </div>
  );
};

export default Uploader;
