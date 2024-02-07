import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import heronlogo from "../../heronLogo.svg";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import './style.css'

export default function Header() {
  const [show, setShow] = useState(false);

  const handleShowOffCanvas = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <Navbar
    style={{background: " linear-gradient(90deg, #e19b62, #b04646, #b5c0d8, #6c82b7, #1f3d85,  #1f3d85, #1f3d85, #b04646)"}}
      //data-bs-theme="light"
      fixed="top"
      expand="lg"
      className="bg-body-tertiary mb-3"
    >
      <Container fluid>
        <Navbar.Brand href="/" tabIndex={1}>
          <img
            alt="heron logo"
            width="50"
            height="50"
            src={heronlogo}
            className="d-inline-block align top"
          />{" "}
          Heron Data
        </Navbar.Brand>
        <div id="main" tabIndex={1}>
          <span
            style={{ fontSize: "30px", float: "right", cursor: "pointer" }}
            onClick={handleShowOffCanvas}
          >
            &#9776;
          </span>
        </div>

        <Offcanvas
          key={"anyKey"}
          backdrop
          scroll
          placement={"end"}
          show={show}
          onHide={() => setShow(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Directory</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              <ListGroup.Item action href="/">
                About
              </ListGroup.Item>
              <ListGroup.Item action href="/">
                Upload New File
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}
