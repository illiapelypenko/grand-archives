import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Videos from "./Videos";

export default class Content extends Component {
  render() {
    return (
      <Router>
        <Route path='/videos' component={Videos} />
      </Router>
    );
  }
}
