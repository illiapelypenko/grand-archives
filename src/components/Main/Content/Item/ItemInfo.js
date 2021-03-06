import React from "react";
import ItemRating from "./ItemRating";

const ItemInfo = ({ personalRating, token, id, display, info }) => {
  const { name, uploaderName } = info;

  return (
    <>
      <div className='content__item--hovered--up'>{name}</div>
      <div className='content__item--hovered--down'>
        <p>{`By: ${uploaderName}`}</p>
        <ItemRating
          personalRating={personalRating}
          token={token}
          id={id}
          display={display}
        />
      </div>
    </>
  );
};

export default ItemInfo;
