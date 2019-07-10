import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import serverURL from "./serverURL";

export default class App extends Component {
  state = {
    content: "",
    isAuth: false
  };

  componentDidMount() {
    if (!this.state.isAuth) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        this.setState({
          isAuth: true
        });
      }
    }
    this.fetchContent();
  }

  updateData = () => {
    this.fetchContent();
  };

  fetchContent = () => {
    fetch(`${serverURL}/api/content/all`)
      .then(res => res.json())
      .then(data => this.setState({ content: data }));
  };
  render() {
    const { content, isAuth } = this.state;
    return (
      <Router>
        <div className='App'>
          <Header isAuth={isAuth} />
          <Main onUpload={this.updateData} content={content} isAuth={isAuth} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
