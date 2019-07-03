import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Videos from "./Videos";
import Pictures from "./Pictures";
import Audios from "./Audios";
import Texts from "./Texts";

export default class Content extends Component {
  render() {
    return (
      <Router>
        <Route path='/videos' component={Videos} />
        <Route path='/pictures' component={Pictures} />
        <Route path='/audios' component={Audios} />
        <Route path='/texts' component={Texts} />
      </Router>
    );
  }
}
