import React, { Component } from "react";
import Uploader from "./Uploader/Uploader";
import Content from "./Content/Content";
import Pages from "./Pages";
import "./Main.scss";
import Filtration from "./Filtration";

export default class Main extends Component {
  render() {
    const {
      menuOpened,
      isAuth,
      onUpload,
      content,
      setFiltration,
      filters,
      onChangeFilters
    } = this.props;

    return (
      <div className={`main ${menuOpened ? "pdtop" : null}`}>
        {isAuth ? <Uploader onUpload={onUpload} /> : null}
        <Content content={content} />
        <Filtration
          setFiltration={setFiltration}
          filters={filters}
          onChangeFilters={onChangeFilters}
        />
        <Pages />
      </div>
    );
  }
}
