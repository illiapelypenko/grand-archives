import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
    );
  }
}
