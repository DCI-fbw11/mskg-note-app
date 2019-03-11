import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container} from "react-bootstrap";

class Welcome extends Component {
  render() {
    return (

      <Container className="mt-5"style={{textAlign:"center"}}>
        <h1>Welcome!</h1>
        <p>Notes are fun. Take some notes.</p>
        <p>
          <Link to="/login">
            <Button className="m-2" variant="outline-dark">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="m-2" variant="outline-dark">Register</Button>
          </Link>
        </p>
        </Container>

    );
  }
}
export default Welcome;
