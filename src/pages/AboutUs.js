import React from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function About(props) {
  return (
    <div className="welcome-area-about-us">
      <section className="welcome-contain container">
        <div>
          <h1 className="welcome-title">
          The Heart of the Designer Community
          </h1>
          <p>
          We’re on a mission to build the world’s best community for creatives to share.
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
            src="https://cdn.dribbble.com/assets/art-banners/itsa-me-time_dennis-salvatier-b841932f47297051d03e315df1df0d93e7c20bc065540182cb0554a8184bd3cc.jpg"
            fluid
          />
        </div>
      </section>
      <section className="second-part-about-us container welcome-contain">
          <Image
            className="welcome-img"
            src="https://s8.upanh.pro/2019/12/10/us.png"
            fluid
          />
          <div>
          <h3>The Helpers</h3>
          <p>Tens of millions of people look for design inspiration and feedback. We help players like you share small screenshots (shots) to show off your current projects, boost your portfolio, and love what you do—no matter what kind of creative professional you are.</p>
          <p>Dribbble is a 100% remote team. We believe that creative collaboration can happen anywhere and want our team to work where they feel most comfortable and inspired.</p>
          </div>
        </section>

      
    </div>
  );
}
