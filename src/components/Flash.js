import React from "react";
import { Row, Col, Toast, Button } from "react-bootstrap";

export default function Flash(props) {
  const { flash, setFlash } = props;
  return (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => setFlash({ ...flash, show: false })}
          show={flash.show}
          delay={20000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Panoko</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>{flash.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
