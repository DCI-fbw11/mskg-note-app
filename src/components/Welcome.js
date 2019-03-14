import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

class Welcome extends Component {
  render() {
    return (
      <Container className="welcome" style={{ textAlign: "center" }} fluid>
        <Row className="welcomeContent">
          <Col
            lg={6}
            className="pt-2"
            style={{
              color: "white",
              borderRadius: "10px"
            }}
          >
            <h1>Welcome!</h1>
            <p>Notes are fun. Take some notes. Lemon notes.</p>
            <p>
              <Link to="/login">
                <Button className="m-2" variant="outline-light">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="m-2" variant="outline-light">
                  Register
                </Button>
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Welcome;
