import React, { Component } from "react";

const Pages = ({ setPage, pagesAmount, currentPage }) => {
  const handleOnclick = number => {
    return () => {
      setPage(number);
    };
  };

  const pages = [];

  for (let i = 0; i < pagesAmount; i++) {
    pages.push(i);
  }

  return (
    <div className='pages'>
      {pages.map((i, index) => {
        if (
          i === currentPage ||
          i === currentPage - 1 ||
          i === currentPage + 1 ||
          i === 0 ||
          i === pages.length - 1
        ) {
          return (
            <div
              className={`page ${+currentPage === i ? "current-page" : ""}`}
              onClick={handleOnclick(i)}
              key={i}
            >
              {i + 1}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Pages;
