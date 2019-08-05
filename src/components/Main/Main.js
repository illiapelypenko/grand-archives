import React, { Component } from "react";
import Uploader from "./Uploader/Uploader";
import Content from "./Content/Content";
import Pages from "./Pages";
import "./Main.scss";
import Filtration from "./Filtration/Filtration";

export default class Main extends Component {
  render() {
    const {
      isAuth,
      onUpload,
      content,
      setFiltration,
      filters,
      onChangeFilters,
      pagesAmount,
      setPage,
      token,
      currentPage
    } = this.props;

    return (
      <div className={`main`}>
        {isAuth ? <Uploader onUpload={onUpload} /> : null}
        <Content content={content} token={token} />
        <Filtration
          setFiltration={setFiltration}
          filters={filters}
          onChangeFilters={onChangeFilters}
        />
        <Pages
          pagesAmount={pagesAmount}
          setPage={setPage}
          currentPage={currentPage}
        />
      </div>
    );
  }
}
