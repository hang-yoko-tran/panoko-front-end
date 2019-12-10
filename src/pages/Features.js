import React from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Features(props) {
  return (
    <div className="welcome-area">
      <section className="welcome-contain container">
        <div>
          <h1 className="welcome-title">
            Discover the world’s top designers & creatives
          </h1>
          <p>
            Panoko is the leading destination to find & showcase creative work
            and home to the world's best design professionals.
          </p>
          {/* <Button className="signin-btn-v2">Sign Up</Button> */}
          {/* {!props.user ? (
            <>
              <Button variant="primary" className="upload-btn">
                <Link className="signin-btn-v2" to="/upload-post">
                  Upload your artwork
                </Link>
              </Button>
            </>
          ) : (
            <Button className="signin-btn-v2" variant="outline-info">
              <Link className="signin-btn-v2" to="/signup">
                Sign Up
              </Link>
            </Button>
          )} */}
          <Button className="signin-btn-v2" variant="outline-info">
            <Link className="signin-btn-v2" to="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
        <div>
          <Image
            className="welcome-img"
            src="https://cdn.dribbble.com/assets/art-banners/jmezz-d2ef687fdfb6ead021c81817ec7fdac686f566dd0a7900374399e16b7c6f8c7e.png"
            fluid
          />
        </div>
      </section>
    </div>
  );
}
