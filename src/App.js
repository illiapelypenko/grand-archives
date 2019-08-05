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
    token: "",
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

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(`${serverURL}/api/users/isuser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });
      if (res.status === 200) {
        await this.setState({
          isAuth: true,
          name: localStorage.getItem("name"),
          token
        });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
      }
    }
    const localSettings = localStorage.getItem("settings");
    if (localSettings) {
      const settings = JSON.parse(localSettings);
      await this.setState({
        contentProps: settings
      });
    }
    this.fetchContent();
  }

  handleSubmenuClick = async name => {
    await this.setState({
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
    });
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

  setFiltration = async () => {
    await this.setState(state => ({
      contentProps: {
        ...state.contentProps
      }
    }));
    this.setPage(this.state.contentProps.page);
  };

  switchMenu = () => {
    this.setState(state => ({
      menuOpened: !state.menuOpened
    }));
  };

  login = async name => {
    localStorage.setItem("name", name);
    const token = localStorage.getItem("token");
    await this.setState({
      isAuth: true,
      name,
      token
    });
    this.setPage(this.state.contentProps.page);
  };

  logout = async () => {
    await this.setState({
      isAuth: false,
      token: ""
    });
    this.setPage(this.state.contentProps.page);
  };

  fetchContent = async () => {
    localStorage.setItem("settings", JSON.stringify(this.state.contentProps));

    let { sortby, search, page } = this.state.contentProps;
    let { videos, pictures, audios, texts } = this.state.contentProps.filters;

    let res = await fetch(
      encodeURI(
        `${serverURL}/api/content/all?videos=${videos}&pictures=${pictures}&audios=${audios}&texts=${texts}&sortby=${sortby}&search=${search}&page=${page}`
      ),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.state.token
        })
      }
    );
    let data = await res.json();
    let pagesAmount = Math.ceil(data.contentLength / 9);
    let number;
    if (pagesAmount < +page) {
      number = 0;
      res = await fetch(
        encodeURI(
          `${serverURL}/api/content/all?videos=${videos}&pictures=${pictures}&audios=${audios}&texts=${texts}&sortby=${sortby}&search=${search}&page=${number}`
        ),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.state.token
          })
        }
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

  setPage = async number => {
    await this.setState(state => ({
      contentProps: {
        ...state.contentProps,
        page: number
      }
    }));
    this.fetchContent();
  };

  handleSortWordChange = name => {
    this.setState({
      contentProps: {
        ...this.state.contentProps,
        sortby: name
      }
    });
  };

  handleSearchWordChange = name => {
    this.setState({
      contentProps: {
        ...this.state.contentProps,
        search: name
      }
    });
  };

  render() {
    const {
      content,
      isAuth,
      slider,
      name,
      menuOpened,
      pagesAmount,
      token
    } = this.state;
    return (
      <Router>
        <div className={`app ${menuOpened ? "menuopened" : ""}`}>
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
                  onUpload={this.fetchContent}
                  content={content}
                  isAuth={isAuth}
                  setFiltration={this.setFiltration}
                  filters={this.state.contentProps.filters}
                  onChangeFilters={this.handleChangeFilters}
                  pagesAmount={pagesAmount}
                  setPage={this.setPage}
                  token={token}
                  currentPage={this.state.contentProps.page}
                  sortby={this.state.contentProps.sortby}
                  search={this.state.contentProps.search}
                  onSortWordChange={this.handleSortWordChange}
                  onSearchWordChange={this.handleSearchWordChange}
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
