import React, { useState } from "react";
import serverURL from "../../../serverURL";
import ItemInfo from "./Item/ItemInfo";

const Picture = ({ name, id, personalRating, token, uploaderName }) => {
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
      <img src={`${serverURL}/api/content/picture/${name}`} alt='pic' />

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

export default Picture;
