import React, { Component } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import "./Auth.scss";
import Login from "./Login";
import Registration from "./Registration";

class Auth extends Component {
  render() {
    const { pathname } = this.props.location;
    const { login } = this.props;

    return (
      <div className='auth'>
        <div className='auth__container'>
          <div className='auth__nav'>
            <Link
              className={`auth__nav-item ${
                /\/login$/.test(pathname) ? "active" : ""
              }`}
              to='/auth/login'
            >
              Log in
            </Link>
            <Link
              className={`auth__nav-item ${
                /\/registration$/.test(pathname) ? "active" : ""
              }`}
              to='/auth/registration'
            >
              Register
            </Link>
          </div>
          <Switch>
            <div className='auth__forms'>
              <Route
                path='/auth/login'
                render={() => <Login login={login} />}
              />
              <Route
                path='/auth/registration'
                render={() => <Registration login={login} />}
              />
            </div>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Auth);
