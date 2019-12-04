import React from "react";
import { Navbar, Image, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Navbar className="nav-area" variant="dark">
        <Image
          className="logo"
          src="https://s1.upanh.pro/2019/12/02/Panoko_logo.png"
        />
        <Nav className="mr-auto">
          <Nav.Link href="#home">Shots</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">About Us</Nav.Link>
        </Nav>
        <Button className="signin-btn">
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button className="signup-btn" variant="outline-info">
          <Link to="/signup">Sign Up</Link>
        </Button>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button className="search-btn" variant="outline-info">
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}
