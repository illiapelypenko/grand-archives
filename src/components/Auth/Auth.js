import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Auth.scss";
import Login from "./Login";
import Register from "./Register";

export default class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <Switch>
          <Route
            path='/auth/login'
            render={() => <Login login={this.props.login} />}
          />
          <Route path='/auth/register' render={() => <Register />} />
        </Switch>
      </div>
    );
  }
}
