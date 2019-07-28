import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import serverURL from "./serverURL";
import Auth from "./components/Auth/Auth";
import Contacts from "./components/Main/Contacts/Contacts";

export default class App extends Component {
  state = {
    content: [],
    isAuth: false,
    slider: true,
    name: "",
    menuOpened: false,
    pagesAmount: 0,
    contentProps: {
      page: 0,
      sortedBy: "new",
      filters: {
        videos: true,
        pictures: true,
        audios: true,
        texts: true
      },
      search: ""
    }
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState(state => ({
        isAuth: true,
        name: localStorage.getItem("name")
      }));
    }
    this.fetchContent();
  }

  handleChangeFilters = e => {
    const { name } = e.target;
    console.log(name);

    this.setState(state => ({
      contentProps: {
        ...state.contentProps,
        filters: {
          ...state.contentProps.filters,
          [name]: !state.contentProps.filters[name]
        }
      }
    }));
  };

  setFiltration = async searchWord => {
    await this.setState(state => ({
      contentProps: {
        ...state.contentProps,
        search: searchWord
      }
    }));
    this.updateData();
  };

  switchMenu = () => {
    this.setState(state => ({ menuOpened: !state.menuOpened }));
  };

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
    this.fetchContent();
  };

  fetchContent = async () => {
    const { sortedBy, search, page } = this.state.contentProps;
    const { videos, pictures, audios, texts } = this.state.contentProps.filters;

    const res = await fetch(
      encodeURI(
        `${serverURL}/api/content/all?videos=${videos}&pictures=${pictures}&audios=${audios}&texts=${texts}&sortedBy=${sortedBy}&search=${search}&page=${page}`
      )
    );
    const data = await res.json();
    const pagesAmount = Math.ceil(data.contentLength / 9);
    this.setState({ content: data.contentItems, pagesAmount });
  };

  setPage = async number => {
    await this.setState(state => ({
      contentProps: {
        ...state.contentProps,
        page: number
      }
    }));
    this.updateData();
  };

  render() {
    const {
      content,
      isAuth,
      slider,
      name,
      menuOpened,
      pagesAmount
    } = this.state;
    return (
      <Router>
        <div className='app'>
          <Header
            isAuth={isAuth}
            slider={slider}
            logout={this.logout}
            name={name}
            switchMenu={this.switchMenu}
            menuOpened={menuOpened}
          />
          <Switch>
            <Route
              path='/content'
              render={route => (
                <Main
                  route={route}
                  onUpload={this.updateData}
                  content={content}
                  isAuth={isAuth}
                  menuOpened={menuOpened}
                  setFiltration={this.setFiltration}
                  filters={this.state.contentProps.filters}
                  onChangeFilters={this.handleChangeFilters}
                  pagesAmount={pagesAmount}
                  setPage={this.setPage}
                />
              )}
            />
            <Route path='/auth' render={() => <Auth login={this.login} />} />
            <Route path='/contacts' render={() => <Contacts />} />
            <Redirect to='/content' />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
