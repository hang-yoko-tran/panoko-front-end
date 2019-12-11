import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import notify from "../utils/Notification";

export default function Signup(props) {
  const [email, setEmail] = useState("hang@gmail.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [password, setPassword] = useState("");
  const history = useHistory();

  const singUp = async e => {
    e.preventDefault();
    // const url = "https://127.0.0.1:5000/user/register";
    const url = `${process.env.REACT_APP_API_URL}/user/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        firstname: firstName,
        lastname: lastName,
        password
      })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        history.push("/signin");
        notify("Info", "User Created", "success")
        console.log("user created");
      } else if (data.code === 409) {
        notify("Error", "Email already exist!", "danger");
      }
    }
  };

  return (
    <div>
      <div className="signup-area">
        <section className="left-signup-area">
          <h3
            style={{
              color: "#865C6C",
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
            src="https://s5.upanh.pro/2019/12/02/bcg-signup.jpg"
            fluid
          />
        </section>

        <section className="container right-signup-area">
          {/* <form className="form-signin col-6 container" method="POST"> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "30px",
              marginTop: "50px"
            }}
          >
            <p>Already member?</p>

            <a href="#" className="signup-link">
              <Link
                to="/signin"
                style={{ color: "#EA4C89", marginLeft: "10px" }}
              >
                Sign In
              </Link>
            </a>
          </div>
          <div>
          <form className="form-signin ">
            <h3
              style={{
                fontWeight: "600",
                color: "#333333",
                marginTop: "30px",
                marginBottom: "20px"
              }}
            >
              Sign Up To Panoko
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
            <p style={{ fontWeight: "600" }}>Frist Name</p>
            <input
              style={{ marginBottom: "20px" }}
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="Frist Name"
              required=""
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            <p style={{ fontWeight: "600" }}>Last Name</p>
            <input
              style={{ marginBottom: "20px" }}
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="Last Name"
              required=""
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
            {/* <p style={{ fontWeight: "600" }}>Profile Image</p>
            <input
              style={{ marginBottom: "20px" }}
              type="text"
              name="img_url"
              id="inputEmail"
              className="form-control"
              placeholder="Profile Image"
              required=""
              value={profileImage}
              onChange={e => {
                setProfileImage(e.target.value);
              }}
            /> */}
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
            </div>
            <button
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
              type="submit"
              onClick={singUp}
            >
              Sign Up
            </button>
            {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
            {/* </form> */}
          </form>
          </div>
        </section>
        
      </div>
    </div>
  );
}
