import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import serverURL from "./serverURL";
import Auth from "./components/Auth/Auth";

export default class App extends Component {
  state = {
    content: "",
    isAuth: false,
    slider: true
  };

  componentDidMount() {
    if (!this.state.isAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        this.setState({
          isAuth: true
        });
      }
    }
    this.fetchContent();
  }

  componentDidUpdate() {}

  login = () => {
    this.setState({ isAuth: true });
  };

  updateData = () => {
    this.fetchContent();
  };

  fetchContent = () => {
    fetch(`${serverURL}/api/content/all`)
      .then(res => res.json())
      .then(data => this.setState({ content: data }));
  };
  render() {
    const { content, isAuth, slider } = this.state;
    return (
      <Router>
        <div className='App'>
          <Header isAuth={isAuth} slider={slider} />
          <Switch>
            <Route
              path='/content'
              render={() => (
                <Main
                  onUpload={this.updateData}
                  content={content}
                  isAuth={isAuth}
                />
              )}
            />
            <Route path='/auth' render={() => <Auth login={this.login} />} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
