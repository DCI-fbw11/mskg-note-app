import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <div className="container">
          <Link to="/login">
            <Button variant="outline-dark">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-dark">Register</Button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Welcome;
