import React, { Component } from "react";

export default class Pages extends Component {
  state = {
    page: 0
  };

  handleOnclick = number => {
    return () => {
      this.setState({ page: number });
      this.props.setPage(number);
    };
  };

  render() {
    const { pagesAmount, currentPage } = this.props;
    const pages = [];
    for (let i = 0; i < pagesAmount; i++) {
      pages.push(i);
    }

    return (
      <div className='pages'>
        {pages.map((i, index) => {
          // current page
          // neighbours of current page
          // first page
          // last page
          if (
            i === currentPage ||
            i === currentPage - 1 ||
            i === currentPage + 1 ||
            i === 0 ||
            i === pages.length - 1
          ) {
            return (
              <div
                className={`page ${
                  +this.state.page === i ? "current-page" : ""
                }`}
                onClick={this.handleOnclick(i)}
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
  }
}
