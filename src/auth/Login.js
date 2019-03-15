import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { firebaseConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  changeHander = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loginUser = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .then(this.setState({ password: "" }))
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    const { error, password } = this.state;

    return (
      <Container className="welcome" fluid>
        <Row className="welcomeContent">
          <Col
            lg={6}
            className="pt-2"
            style={{
              color: "white",
              backgroundColor: "rgba(52,58,64,0.6)",
              borderRadius: "10px"
            }}
          >
            <h4>Login</h4>
            <Form onSubmit={this.loginUser}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.changeHander}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.changeHander}
                  value={password}
                  required
                />
              </Form.Group>
              <Button variant="outline-light" type="submit">
                Login
              </Button>
              <span className="redirect-text ml-2">
                Don't have an account?{" "}
                <Link to="/register" className="card-link">
                  Register
                </Link>
              </span>
            </Form>
            <h5 className="mt-3">{error}</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default firebaseConnect()(Login);
