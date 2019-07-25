import React from "react";

export default function ItemInfo(props) {
  const { name, uploaderName, rating } = props.info;
  return (
    <>
      <div className='content__item--hovered--up'>{name}</div>
      <div className='content__item--hovered--down'>
        <p>{`By: ${uploaderName}`}</p>
        <div className='content__item-rating'>{rating}</div>
      </div>
    </>
  );
}
