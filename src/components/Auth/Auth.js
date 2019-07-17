import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import "./Auth.scss";
import Login from "./Login";
import Registration from "./Registration";

class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth__container'>
          <div className='auth__nav'>
            <Link
              className={`auth__nav-item ${
                /\/login$/.test(this.props.location.pathname) ? "active" : ""
              }`}
              to='/auth/login'
            >
              Log in
            </Link>
            <Link
              className={`auth__nav-item ${
                /\/registration$/.test(this.props.location.pathname)
                  ? "active"
                  : ""
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
                render={() => <Login login={this.props.login} />}
              />
              <Route
                path='/auth/registration'
                render={() => <Registration login={this.props.login} />}
              />
            </div>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Auth);
