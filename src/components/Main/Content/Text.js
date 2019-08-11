import React, { useState } from "react";
import serverURL from "../../../serverURL";
import ItemInfo from "./Item/ItemInfo";
import FileDownloadPic from "./FileDownloadPic";

const Text = ({ name, id, personalRating, token, uploaderName }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={`content__picture content__item ${
        !isHovered ? "not-display" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={`
            ${serverURL}/api/content/text/${name}`}
        target='_blank'
        rel='noopener noreferrer'
        download
      >
        <FileDownloadPic />
        <p className='content__item-name'>{name}</p>
      </a>

      <ItemInfo
        info={{ name, id, personalRating, token, uploaderName }}
        token={token}
        id={id}
        display={isHovered ? true : false}
        personalRating={personalRating}
      />
    </div>
  );
};

export default Text;
