import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <div>
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
            <h1>OOPS!</h1>
            <p>TH4T P4G3 D035 N0T 3X15T</p>
            <p>
              <Link to="/welcome" className="card-link">
                go back to the start of things.
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default PageNotFound;
