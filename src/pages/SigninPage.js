import React, { useState } from "react";
import { Image, Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import notify from "../utils/Notification";

export default function Signin(props) {
  const [email, setEmail] = useState("hang@gmail.com");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = async e => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/user/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        localStorage.setItem("token", data.apiKey);
        props.setUser(data.user);
        history.push("/home");
        notify("Info", `Welcome ${data.user.email}!`, "success");
      } else if (data.code === 401) {
        props.setUser(null);
        localStorage.removeItem("token");
        notify("Error", "Invalid email or password", "danger");
      }
    }
  };

  return (
    <div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px"
        }}
      >
        <p>Not a member?</p>

          <a href="#" style={{ color: "#EA4C89" }}>
            Sign Up Now
          </a>
          <Button className="signup-btn mr-2" variant="outline-info">
            <Link className="signup-btn" to="/signup">
              Sign Up
            </Link>
          </Button>

      </div> */}
      <div className="signup-area">
        <div className="left-signin-area">
          <h3
            style={{
              color: "#866117",
              fontWeight: "600",
              textAlign: "center",
              marginTop: "100px",
              marginLeft: "20px",
              marginRight: "20px"
            }}
          >
            Discover the world’s top designers & creatives
          </h3>
          <Image
            style={{ marginTop: "50px" }}
            className="welcome-img"
            src="https://s8.upanh.pro/2019/12/02/bcg-signin.jpg"
            fluid
          />
        </div>

        <div className="container right-signup-area">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "30px",
              marginTop: "50px"
            }}
          >
            <p>Not a member?</p>

            <a href="#" className="signup-link">
              <Link
                to="/signup"
                style={{ color: "#EA4C89", marginLeft: "10px" }}
              >
                Sign Up
              </Link>
            </a>
          </div>
          <form className="form-signin">
            <h3
              style={{
                fontWeight: "600",
                color: "#333333",
                marginTop: "30px",
                marginBottom: "20px"
              }}
            >
              Sign In To Panoko
            </h3>
            <p style={{ fontWeight: "600" }}>Email</p>
            <input
              style={{ marginBottom: "20px" }}
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <p style={{ fontWeight: "600" }}>Password</p>
            <input
              style={{ marginBottom: "20px" }}
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                style={{ color: "#EA4C89", marginLeft: "170px" }}
              >
                ForgotPassword
              </Link>
            </div>

            <button
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
              type="button"
              onClick={signIn}
            >
              Sign In
            </button>
            <hr style={{ marginTop: "20px" }}></hr>

            <a
              // type="button"
              className="btn btn-lg btn-primary btn-block signin-fb-btn"
              href={`${process.env.REACT_APP_API_URL}/login/facebook`}
            >
              Sign In With Facebook
            </a>
            <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
          </form>
        </div>
      </div>
    </div>
  );
}
