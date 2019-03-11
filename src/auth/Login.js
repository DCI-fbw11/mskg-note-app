import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { firebaseConnect } from "react-redux-firebase";

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
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col sm={5}>
            <h4>Login</h4>
            <Form onSubmit={this.loginUser}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.changeHander}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.changeHander}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <h5 className="mt-3">{this.state.error}</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default firebaseConnect()(Login);
