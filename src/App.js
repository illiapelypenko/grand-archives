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
      sortby: "new",
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

  handleSubmenuClick = async name => {
    await this.setState(state => ({
      contentProps: {
        page: 0,
        sortby: "new",
        filters: {
          videos: false,
          pictures: false,
          audios: false,
          texts: false,
          [name]: true
        },
        search: ""
      }
    }));
    this.fetchContent();
  };

  handleChangeFilters = e => {
    const { name } = e.target;

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

  // fetch after
  setFiltration = async (searchWord, sortby) => {
    await this.setState(state => ({
      contentProps: {
        ...state.contentProps,
        search: searchWord,
        sortby: sortby
      }
    }));
    this.setPage(this.state.contentProps.page);
  };

  switchMenu = () => {
    this.setState(state => ({ menuOpened: !state.menuOpened }));
  };

  // fetch after
  login = async name => {
    localStorage.setItem("name", name);
    await this.setState({
      isAuth: true,
      name
    });
    this.setPage(this.state.contentProps.page);
  };

  // fetch after
  logout = async () => {
    await this.setState({
      isAuth: false
    });
    this.setPage(this.state.contentProps.page);
  };

  updateData = () => {
    this.fetchContent();
  };

  fetchContent = async () => {
    let { sortby, search, page } = this.state.contentProps;
    let { videos, pictures, audios, texts } = this.state.contentProps.filters;

    let res = await fetch(
      encodeURI(
        `${serverURL}/api/content/all?videos=${videos}&pictures=${pictures}&audios=${audios}&texts=${texts}&sortby=${sortby}&search=${search}&page=${page}`
      )
    );
    let data = await res.json();
    let pagesAmount = Math.ceil(data.contentLength / 9);
    let number;
    if (pagesAmount < +page) {
      number = 0;
      res = await fetch(
        encodeURI(
          `${serverURL}/api/content/all?videos=${videos}&pictures=${pictures}&audios=${audios}&texts=${texts}&sortby=${sortby}&search=${search}&page=${number}`
        )
      );
      data = await res.json();
    } else {
      number = +page;
    }
    this.setState(state => ({
      content: data.contentItems,
      pagesAmount,
      contentProps: {
        ...state.contentProps,
        page: number
      }
    }));
  };

  // fetch after
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
            onSubmenuClick={this.handleSubmenuClick}
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
