import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ReactNotifications from "react-notifications-component";

import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ForgotPassword from "./pages/ForgotPassword";
import UploadPost from "./pages/UploadPost";
import NewPassword from "./pages/NewPassword";
import SinglePost from "./pages/SinglePost";
import HomePage from "./pages/HomePage";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import PostEdit from "./components/PostEdit";

import Footer from "./components/Footer";
import { Spinner } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(null);
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
      // const url = "https://127.0.0.1:5000/user/get_user";
      const url = `${process.env.REACT_APP_API_URL}/user/get_user`;
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
        setUser(null)
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
          <ReactNotifications />
          <Switch>
            <Route path="/" exact>
              <WelcomePage />
            </Route>
            <Route path="/features" exact>
              <Features />
            </Route>
            <Route path="/about-us" exact>
              <AboutUs />
            </Route>
            <Route path="/signup" exact>
              {!user ? (
                <SignupPage setUser={setUser} />
              ) : (
                <HomePage user={user} />
              )}
            </Route>
            <Route path="/signin" exact>
              {!user ? (
                <SigninPage setUser={setUser} />
              ) : (
                <HomePage />
              )}
            </Route>
            <Route path="/forgot-password" exact>
              {!user ? (
                <ForgotPassword />
              ) : (
                <HomePage user={user} />
              )}
            </Route>
            <Route path="/new-password/:token" exact>
              <ForgotPassword />
              {!user ? (
                <NewPassword />
              ) : (
                <HomePage user={user} />
              )}
            </Route>
            <ProtectedRoute path="/home" exact>
              <HomePage user={user} />
            </ProtectedRoute>

          <Route path="/upload-post" exact>
            <UploadPost user={user} />
          </Route>
          <Route path="/post/:id" exact>
            <SinglePost 
              user={user} 
            />
          </Route>

          </Switch>

        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
