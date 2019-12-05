import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import notify from "../utils/Notification";

export default function NewPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const { token } = useParams();
  const { setFlash } = props;

  const newPassword = async e => {
    e.preventDefault();

    const url = `https://127.0.0.1:5000/user/new-password/${token}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        confirm_password: confirmPassword
      })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        history.push("/signin");
        // setFlash({ show: true, message: `Create new password succsessfully` });
        notify("Info", "Create new password successfully", "success")
      } else if (data.code === 400) {
        // setFlash({ show: true, message: "Password not match" });
        notify("Warning", "Password not match!", "warning")
      } else if (data.code === 404) {
        setFlash({ show: true, message: "Invalid Token" });
      }
    }
  };
  return (
    <div>
      <div
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
      </div>
      <div className="signup-area">
        <section className="left-signin-area">
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
        </section>

        <section className="container col-8">
          <form className="form-signin col-6 container">
            <h3
              style={{
                fontWeight: "600",
                color: "#333333",
                marginTop: "100px",
                marginBottom: "20px"
              }}
            >
              Sign In To Panoko
            </h3>
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
            <p style={{ fontWeight: "600" }}>Confirm Password</p>
            <input
              style={{ marginBottom: "20px" }}
              type="password"
              id="inputEmail"
              className="form-control"
              placeholder="Confirm password"
              required=""
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />

            <button
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
              type="button"
              onClick={newPassword}
            >
              Send
            </button>
            <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
          </form>
        </section>
      </div>
    </div>
  );
}
