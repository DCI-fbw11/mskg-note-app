import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { firebaseConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import "../styles/prelogin.css";
import ReCAPTCHA from "react-google-recaptcha";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordRepeat: "",
      error: "",
      falsy: true
    };
  }

  recapChange = () => {
    this.setState({ falsy: false });
  };

  changeHander = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerUser = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password, passwordRepeat } = this.state;

    if (password === passwordRepeat) {
      firebase
        .createUser({
          email,
          password
        })
        .catch(err => this.setState({ error: err.message }));
    } else {
      this.setState({ error: "Passwords don't match." });
    }
  };

  render() {
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
            <h4>Register</h4>
            <Form onSubmit={this.registerUser}>
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
              <Form.Group controlId="formBasicPasswordRepeat">
                <Form.Label>Password Repeat</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="passwordRepeat"
                  onChange={this.changeHander}
                />
              </Form.Group>
              <Button
                variant="outline-light"
                type="submit"
                disabled={this.state.falsy}
              >
                Register
              </Button>
              <span className="redirect-text ml-2">
                Have an account?{" "}
                <Link to="/login" className="card-link">
                  Login
                </Link>
              </span>
              <Form.Row>
                <ReCAPTCHA
                  className="mt-2"
                  onChange={this.recapChange}
                  sitekey="6LeBppcUAAAAAGK8qfGsRGBofYrEq3tovNZFyF6o"
                  theme="dark"
                />
              </Form.Row>
            </Form>
            <h5 className="mt-3">{this.state.error}</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default firebaseConnect()(Register);
