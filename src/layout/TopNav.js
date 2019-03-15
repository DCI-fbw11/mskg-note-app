import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";

const TopNav = props => {
  const logout = () => {
    const { firebase } = props;
    firebase.logout();
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Link to="/">
        <Navbar.Brand>
          <i className="far fa-lemon" />
          &nbsp;&nbsp;<span style={{ color: "#eeee66" }}>Lemon</span>&nbsp;Notes
        </Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
        {props.auth.hasOwnProperty("uid") ? (
          <span className="logged-in-user nav-link disabled">
            {props.auth.email}
          </span>
        ) : null}

        {props.auth.hasOwnProperty("uid") ? null : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}
        {props.auth.hasOwnProperty("uid") ? null : (
          <Link className="nav-link" to="/register">
            Register
          </Link>
        )}
        {props.auth.hasOwnProperty("uid") ? (
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        ) : null}
      </Nav>
    </Navbar>
  );
};
export default compose(
  withFirebase,
  connect(state => ({
    auth: state.firebase.auth
  }))
)(TopNav);
