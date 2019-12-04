import React from "react";
import { Row, Col, Toast, Button } from "react-bootstrap";

export default function MyToast(props) {
  return (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => props.setShow(false)}
          show={props.show}
          delay={10000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
