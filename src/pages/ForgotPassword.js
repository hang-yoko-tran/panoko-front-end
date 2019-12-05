import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import notify from "../utils/Notification";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("hang@gmail.com");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setFlash } = props;

  const forgotPassword = async e => {
    e.preventDefault();
    const url = "https://127.0.0.1:5000/user/forgot-password";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        // history.push("/home");
        // setFlash({ show: true, message: `Please check you email` });
        notify("Info", "Please check you email", "info")
        
      } else if (data.code === 404){
        // setFlash({ show: true, message: `Email not exist` });
        notify("Warning", "Email not exist", "warning")

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
              Forgot password
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

            <button
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
              type="button"
              onClick={forgotPassword}
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
