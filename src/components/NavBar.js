import React from "react";
import { Navbar, Image, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function NavBar(props) {
  const history = useHistory();

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = "https://127.0.0.1:5000/user/logout";
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          props.setUser(null);
          localStorage.removeItem("token");
          history.push("/signin");
        }
      }
    }
  };
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
        {!props.user ? (
          <span>
            <Button className="signin-btn">
              <Link className="signin-btn" to="/signin">
                Sign In
              </Link>
            </Button>
            <Button className="signup-btn mr-2" variant="outline-info">
              <Link className="signup-btn" to="/signup">
                Sign Up
              </Link>
            </Button>
          </span>
        ) : (
          <Button
            className="signin-btn"
            variant="outline-info"
            onClick={logout}
          >
            Logout
          </Button>
        )}

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
