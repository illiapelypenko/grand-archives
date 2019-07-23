import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import serverURL from "./serverURL";
import Auth from "./components/Auth/Auth";
import Contacts from "./components/Main/Contacts/Contacts";

export default class App extends Component {
  state = {
    content: "",
    isAuth: false,
    slider: true,
    name: ""
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        isAuth: true,
        name: localStorage.getItem("name")
      });
    }
    this.fetchContent();
  }

  login = name => {
    localStorage.setItem("name", name);
    this.setState({
      isAuth: true,
      name
    });
  };

  logout = () => {
    this.setState({
      isAuth: false
    });
  };

  updateData = () => {
    console.log("updated");
    this.fetchContent();
  };

  fetchContent = () => {
    fetch(`${serverURL}/api/content/all`)
      .then(res => res.json())
      .then(data => this.setState({ content: data }));
  };

  render() {
    const { content, isAuth, slider, name } = this.state;
    return (
      <Router>
        <div className='app'>
          <Header
            isAuth={isAuth}
            slider={slider}
            logout={this.logout}
            name={name}
          />
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Main
                  onUpload={this.updateData}
                  content={content}
                  isAuth={isAuth}
                />
              )}
            />
            <Route path='/auth' render={() => <Auth login={this.login} />} />
            <Route path='/contacts' render={() => <Contacts />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
