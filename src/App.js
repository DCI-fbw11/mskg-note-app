import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Welcome from "./components/Welcome";
import Notes from "./components/Notes";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "./auth/auth";
import { store } from "./config/store";
import { withFirebase } from "react-redux-firebase";
import TopNav from "./layout/TopNav";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <TopNav />
            <Switch>
              <Route
                exact
                path="/"
                component={withFirebase(UserIsAuthenticated(Notes))}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
              <Route
                exact
                path="/welcome"
                component={UserIsNotAuthenticated(Welcome)}
              />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
