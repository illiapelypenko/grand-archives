import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}
