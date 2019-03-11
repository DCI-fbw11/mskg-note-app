import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

class Welcome extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col sm={5} >
            <h1 style={{textAlign:"center"}}>Welcome</h1>

              <Link to="/login">
                <Button variant="outline-dark">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-dark">Register</Button>
              </Link>

          </Col>
        </Row>
      </Container>
    );
  }
}
export default Welcome;
