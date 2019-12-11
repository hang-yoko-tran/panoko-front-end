import React from "react";
import { Navbar, Image, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function NavBar(props) {
  const history = useHistory();

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/user/logout`;
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
        <div className="logo-tabs-area">
          <div className="logo">
            <Image
              className="logo"
              src="https://s1.upanh.pro/2019/12/02/Panoko_logo.png"
            />
          </div>
          <div className="tabs-area">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Artworks</Nav.Link>
              <Nav.Link href="/features">Features</Nav.Link>
              <Nav.Link href="/about-us">About Us</Nav.Link>
            </Nav>
          </div>
        </div>
        <div className="signin-signup-logout-search-area-nav">
          <div className="signin-signup-logout-area">
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
              <>
              <Button variant="primary" className="upload-btn">
                <Link className="signin-btn-v2" to="/upload-post">Upload your artwork</Link>
              </Button>    
              {/* <p>{ current_user.firstname }</p> */}
              <Button
                className="signin-btn"
                variant="outline-info"
                onClick={logout}
              >
                Logout
              </Button>
              </>
            )}
          </div>
          <div className="search-input-search-btn-area">
            <Form inline>
              <div className="search-area">
                <div>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2 search-input"
                  />
                </div>
                <div className="search-btn">
                  <Button className="search-btn" variant="outline-info">
                    Search
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
