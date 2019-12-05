import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Flash from "./components/Flash";
import { Spinner } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(null);
  const [flash, setFlash] = useState({ show: false, message: "Change me!" });
  const [loading, setLoading] = useState(true);

  function getParam(name) {
    const url = window.location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  }

  const getUser = async () => {
    const token = localStorage.getItem("token") || getParam("api_key");
    if (token) {
      const url = "https://127.0.0.1:5000/user/get_user";
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", token);
        setUser(data.user);
      } else {
        console.log("not login, invalid key");
        setUser = null;
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          <Flash className="toast" flash={flash} setFlash={setFlash} />
          <Switch>
            <Route path="/" exact>
              <WelcomePage />
            </Route>
            <Route path="/signup" exact>
              {!user ? (
                <SignupPage setUser={setUser} setFlash={setFlash} />
              ) : (
                <HomePage user={user} />
              )}
            </Route>
            <Route path="/signin" exact>
              {!user ? (
                <SigninPage setUser={setUser} setFlash={setFlash} />
              ) : (
                <HomePage />
              )}
            </Route>
            <Route path="/forgot-password" exact>
              {!user ? (
                <ForgotPassword setFlash={setFlash} />
              ) : (
                <HomePage user={user} />
              )}
            </Route>
            <Route path="/new-password/:token" exact>
              <ForgotPassword setFlash={setFlash} />
              {!user ? (
                <NewPassword setFlash={setFlash} />
              ) : (
                <HomePage user={user} />
              )}
            </Route>
            <ProtectedRoute path="/home" exact>
              <HomePage user={user} />
            </ProtectedRoute>
          </Switch>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
