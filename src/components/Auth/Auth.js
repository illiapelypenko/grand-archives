import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Auth.scss";
import Login from "./Login";
import Registration from "./Registration";

export default class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth__nav'>
          <Link className='auth__nav-item' to='/auth/login'>
            Log in
          </Link>
          <Link className='auth__nav-item' to='/auth/registration'>
            Registration
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
    );
  }
}
