import React, { useState, useEffect } from "react";
import serverURL from "../../../../serverURL";
import "./Rating.scss";

const ItemRating = ({ token, id, personalRating }) => {
  const [rating, setRating] = useState(personalRating || null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [set, setSet] = useState(false);

  const handleMouseEnter = (e, i) => {
    setHoveredItem(i);
    setIsHovered(true);
  };

  const handleMouseLeave = (e, i) => {
    setHoveredItem(null);
    setIsHovered(false);
  };

  const handleClick = async (e, i) => {
    e.preventDefault();
    setRating(i);
    setSet(true);
    await fetch(`${serverURL}/api/content/evaluate`, {
      method: "POST",
      body: JSON.stringify({
        token: token,
        rating: i,
        itemId: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  useEffect(() => {
    if (rating !== personalRating && !set) {
      setRating(personalRating);
    }
  });

  const stars = [];

  for (let i = 0; i < 5; i++) {
    let className = "disabled";
    if (!isHovered && i <= rating) {
      className = "enabled";
    }
    if (isHovered && i <= hoveredItem) {
      className = "enabled";
    }
    stars.push(
      <p
        key={i}
        onClick={e => handleClick(e, i)}
        onMouseEnter={e => handleMouseEnter(e, i)}
        onMouseLeave={e => handleMouseLeave(e, i)}
        className={className}
      >
        ★
      </p>
    );
  }

  return (
    <div className={`content__item-rating ${token ? "" : "hidden"}`}>
      <div className='rating--personal'>{stars}</div>
    </div>
  );
};

export default ItemRating;
