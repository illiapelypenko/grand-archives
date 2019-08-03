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
    const { pagesAmount } = this.props;
    const pages = [];
    for (let i = 0; i < pagesAmount; i++) {
      pages.push(i);
    }

    return (
      <div className='pages'>
        {pages.map(i => (
          <div
            className={`page ${+this.state.page === i ? "current-page" : ""}`}
            onClick={this.handleOnclick(i)}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  }
}
